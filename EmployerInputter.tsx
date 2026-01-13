
import React, { useState } from 'react';
import { EmployerRecord } from '../types';
import { 
    MEMBER_ROLES, PET_TYPES, WORKER_ROOM_OPTIONS, START_DATE_OPTIONS, 
    HIRE_TYPE_OPTIONS, NATIONALITY_REQ_OPTIONS, LANGUAGE_REQ_OPTIONS, 
    EMPLOYER_TAG_DATA, EMP_LANG_OPTIONS, PHISHING_TAGS, PHISHING_SALARIES, MTR_STATIONS 
} from '../constants';

interface EmployerInputterProps {
    currentRecord: EmployerRecord;
    setCurrentRecord: (updater: any) => void;
    handleUpload: () => void;
    handleClear: () => void;
    handleCancelEdit?: () => void;
    uploadSuccessMsg: string;
    isEditing: boolean;
    isPhishing: boolean;
    allRecords: EmployerRecord[]; // Needed for generating next U-ID
    systemSettings?: { staffs: string[] }; // Optional prop for settings access
}

const EmployerInputter: React.FC<EmployerInputterProps> = ({ 
    currentRecord, setCurrentRecord, handleUpload, handleClear, handleCancelEdit, uploadSuccessMsg, isEditing, isPhishing, allRecords, systemSettings
}) => {
    const [tempMemberRole, setTempMemberRole] = useState('');
    const [tempMemberAge, setTempMemberAge] = useState('');
    const [tempMemberCount, setTempMemberCount] = useState(''); 
    const [tempPetType, setTempPetType] = useState(''); 
    const [tempPetCount, setTempPetCount] = useState('');
    const [tempPetName, setTempPetName] = useState('');

    const generateRandomPhishingData = () => {
        // 1. Members: Adult + Child OR Adult + Elderly
        const rollType = Math.random();
        let members: { role: string; age: string }[] = [];
        const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

        let adultCount = 0;
        let childCount = 0;
        let elderlyCount = 0;

        if (rollType < 0.6) { 
             if (Math.random() < 0.7) {
                 adultCount = 2;
                 childCount = 1;
             } else {
                 adultCount = randInt(1, 2);
                 childCount = randInt(0, 2);
             }
        } else {
            adultCount = randInt(1, 2);
            elderlyCount = randInt(0, 2);
        }

        if (adultCount === 2) {
            members.push({ role: '成人 x2', age: '-' });
        } else {
            for(let i=0; i<adultCount; i++) members.push({ role: '成人', age: '-' });
        }

        for(let i=0; i<childCount; i++) members.push({ role: '小孩', age: `${randInt(0, 17)}` });
        for(let i=0; i<elderlyCount; i++) members.push({ role: '長者', age: `${randInt(65, 90)}` });

        if (members.length === 0) members.push({ role: '成人', age: '-' });

        let pets: { type: string; count: string }[] = [];
        if (Math.random() < 0.7) {
            pets.push({ type: '沒有寵物', count: '0' });
        } else {
            const availablePets = ['小狗', '中狗', '大狗', '貓', '兔', '烏龜', '鸚鵡'];
            const petType = availablePets[randInt(0, availablePets.length - 1)];
            const petCount = randInt(1, 2);
            pets.push({ type: petType, count: String(petCount) });
        }

        let tags: string[] = [];
        const numTags = randInt(0, 3);
        const shuffledTags = [...PHISHING_TAGS].sort(() => 0.5 - Math.random());
        tags = shuffledTags.slice(0, numTags);

        const region = MTR_STATIONS[randInt(0, MTR_STATIONS.length - 1)];
        const workerRoom = Math.random() < 0.8 ? '有工人房' : '與小孩同房';
        const expectedStartDate = '盡快';
        const salary = PHISHING_SALARIES[randInt(0, PHISHING_SALARIES.length - 1)];
        const nationalityReq = ['菲律賓', '印尼'];
        const languageReq = ['英文', '廣東話', '普通話'];

        let maxU = 1000;
        allRecords.forEach(r => {
            if (r.id.startsWith('U')) {
                const num = parseInt(r.id.substring(1));
                if (!isNaN(num) && num > maxU) maxU = num;
            }
        });
        const newId = `U${maxU + 1}`;

        setCurrentRecord((prev: EmployerRecord) => ({
            ...prev,
            id: newId,
            familyMembers: members,
            region: region,
            unitSize: '',
            pets: pets,
            workerRoom: workerRoom,
            expectedStartDate: expectedStartDate,
            salary: salary,
            hireType: [],
            nationalityReq: nationalityReq,
            languageReq: languageReq,
            employerMsg: '',
            publicNote: '',
            tags: tags,
            employerName: '',
            employerLanguages: [],
            employerPhone: '',
            inquiryDate: new Date().toISOString().split('T')[0],
            referrer: '',
            staff: '',
            isPublished: true,
        }));
    };

    const handleAddMember = () => {
        if (!tempMemberRole) return alert('請選擇成員類別');
        
        if (tempMemberRole === '成人') {
            if (!tempMemberCount) return alert('請輸入數量');
            const count = parseInt(tempMemberCount) || 1;
            
            if (count >= 2) {
                 setCurrentRecord((prev: EmployerRecord) => ({
                    ...prev,
                    familyMembers: [...prev.familyMembers, { role: `成人 x${count}`, age: '-' }]
                }));
            } else {
                setCurrentRecord((prev: EmployerRecord) => ({
                    ...prev,
                    familyMembers: [...prev.familyMembers, { role: '成人', age: '-' }]
                }));
            }
            setTempMemberCount('');
        } else {
            if (!tempMemberAge) return alert('請填寫年齡');
            setCurrentRecord((prev: EmployerRecord) => ({
                ...prev,
                familyMembers: [...prev.familyMembers, { role: tempMemberRole, age: tempMemberAge }]
            }));
            setTempMemberAge('');
        }
    };

    const handleAddPet = () => {
        if (!tempPetType) return alert('請選擇寵物類別');
        if (tempPetType === '其他' && !tempPetName) return alert('請填寫寵物名稱');
        if (tempPetType !== '沒有寵物' && !tempPetCount) return alert('請填寫數量');

        const petLabel = tempPetType === '其他' ? tempPetName : tempPetType;
        const countLabel = tempPetType === '沒有寵物' ? '0' : tempPetCount;

        setCurrentRecord((prev: EmployerRecord) => ({
            ...prev,
            pets: [...prev.pets, { type: petLabel, count: countLabel }]
        }));
        setTempPetCount('');
        setTempPetName('');
        setTempPetType('');
    };

    const toggleArrayItem = (key: 'hireType' | 'nationalityReq' | 'languageReq' | 'tags' | 'employerLanguages', value: string) => {
        setCurrentRecord((prev: EmployerRecord) => {
            const list = prev[key] as string[];
            if (list.includes(value)) {
                return { ...prev, [key]: list.filter(item => item !== value) };
            } else {
                return { ...prev, [key]: [...list, value] };
            }
        });
    };

    const renderCardOptions = (
        options: string[] | typeof EMPLOYER_TAG_DATA, 
        selected: string[], 
        toggleFunc: (val: string) => void,
        otherValue?: string,
        setOtherValue?: (val: string) => void
    ) => (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-1">
                {options.map((opt: any) => {
                    const isSimple = typeof opt === 'string';
                    const value = isSimple ? opt : opt.val;
                    const isSelected = selected.includes(value);

                    return (
                        <div 
                            key={value} 
                            onClick={() => toggleFunc(value)}
                            // Changed to justify-start and added padding, and ensure text container is left aligned
                            className={`flex items-center justify-start p-3 rounded cursor-pointer border transition h-full ${
                                isSelected ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            <input type="checkbox" checked={isSelected} readOnly className="w-[19px] h-[19px] mr-2 pointer-events-none flex-shrink-0" />
                            {isSimple ? (
                                <span className="text-sm select-none text-left">{opt}</span>
                            ) : (
                                <div className="flex flex-col text-left pl-1 w-full">
                                    <span className="font-bold text-sm mb-[2px] leading-tight">{opt.chi}</span>
                                    <span className="text-xs leading-none">{opt.eng}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {selected.includes('其他') && otherValue !== undefined && setOtherValue && (
                <input type="text" value={otherValue} onChange={e => setOtherValue(e.target.value)} placeholder="請註明" className="border p-2 rounded mt-1" />
            )}
            {selected.includes('其他 Other') && otherValue !== undefined && setOtherValue && (
                <input type="text" value={otherValue} onChange={e => setOtherValue(e.target.value)} placeholder="請註明" className="border p-2 rounded mt-1" />
            )}
        </div>
    );

    return (
        <div className="flex flex-col space-y-6 max-w-4xl mx-auto pb-10">
            <div className="flex justify-start">
                {isPhishing ? (
                    <button onClick={generateRandomPhishingData} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 shadow font-bold">
                        <i className="fas fa-dice mr-2"></i>隨生生成釣魚盤
                    </button>
                ) : (
                    <button onClick={handleClear} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 shadow">
                        <i className="fas fa-eraser mr-2"></i>清除內容
                    </button>
                )}
            </div>

            {/* Employer ID */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">僱主編號 (編號以{isPhishing ? 'U' : 'E'}開始)</label>
                <input 
                    type="text" 
                    value={currentRecord.id} 
                    onChange={e => setCurrentRecord((prev: EmployerRecord) => ({ ...prev, id: e.target.value }))}
                    placeholder={isPhishing ? "例如：U1001" : "例如：E2805"}
                    className="border p-2 rounded"
                    disabled={isEditing} 
                />
            </div>

            {/* Family Members */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">家庭成員及年齡 (可以多選)</label>
                <div className="flex space-x-2 mb-2 items-center">
                    <select value={tempMemberRole} onChange={e => setTempMemberRole(e.target.value)} className="border p-2 rounded h-10">
                        <option value="">請選擇</option>
                        {MEMBER_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    
                    {tempMemberRole === '成人' ? (
                        <input 
                            type="number" 
                            value={tempMemberCount} 
                            onChange={e => setTempMemberCount(e.target.value)} 
                            placeholder="數量" 
                            className="border p-2 rounded w-24 h-10"
                        />
                    ) : tempMemberRole ? (
                        <input 
                            type="number" 
                            value={tempMemberAge} 
                            onChange={e => setTempMemberAge(e.target.value)} 
                            placeholder="年齡" 
                            className="border p-2 rounded w-24 h-10"
                        />
                    ) : null}

                    <button onClick={handleAddMember} className="bg-blue-600 text-white px-6 py-2 rounded min-w-[100px] h-10 flex justify-center items-center">新增成員</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {currentRecord.familyMembers.map((m, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                            {m.role} {m.age !== '-' ? `(${m.age}歲)` : ''}
                            <button onClick={() => setCurrentRecord((prev: EmployerRecord) => ({ ...prev, familyMembers: prev.familyMembers.filter((_, i) => i !== idx) }))} className="ml-2 text-red-500">×</button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Region */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">僱主地區</label>
                <input type="text" value={currentRecord.region} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, region: e.target.value}))} placeholder="例如：Tseung Kwan O" className="border p-2 rounded" />
            </div>

            {/* Unit Size - Internal - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 單位呎數 (外傭看不到，內部紀錄)</label>
                    <input type="number" value={currentRecord.unitSize} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, unitSize: e.target.value}))} placeholder="例如：500" className="border p-2 rounded" />
                </div>
            )}

            {/* Pets */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">寵物 (可以多選)</label>
                <div className="flex space-x-2 mb-2 items-center">
                    <select value={tempPetType} onChange={e => setTempPetType(e.target.value)} className="border p-2 rounded h-10">
                        <option value="">請選擇</option>
                        {PET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    
                    {tempPetType === '其他' && (
                        <input 
                            type="text" 
                            value={tempPetName} 
                            onChange={e => setTempPetName(e.target.value)} 
                            placeholder="寵物名稱" 
                            className="border p-2 rounded w-32 h-10"
                        />
                    )}

                    {tempPetType && tempPetType !== '沒有寵物' && (
                        <input 
                            type="number" 
                            value={tempPetCount} 
                            onChange={e => setTempPetCount(e.target.value)} 
                            placeholder="數量" 
                            className="border p-2 rounded w-24 h-10"
                        />
                    )}
                    <button onClick={handleAddPet} className="bg-blue-600 text-white px-6 py-2 rounded min-w-[100px] h-10 flex justify-center items-center">新增寵物</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {currentRecord.pets.map((p, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                            {p.type} {p.count !== '0' ? `x${p.count}` : ''}
                            <button onClick={() => setCurrentRecord((prev: EmployerRecord) => ({ ...prev, pets: prev.pets.filter((_, i) => i !== idx) }))} className="ml-2 text-red-500">×</button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Worker Room */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">工人房</label>
                <select value={currentRecord.workerRoom} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, workerRoom: e.target.value}))} className="border p-2 rounded mb-1">
                    <option value="">請選擇</option>
                    {WORKER_ROOM_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {currentRecord.workerRoom === '其他' && (
                    <input type="text" value={currentRecord.workerRoomOther || ''} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, workerRoomOther: e.target.value}))} placeholder="請註明" className="border p-2 rounded" />
                )}
            </div>

            {/* Expected Start Date */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">期望上班日期</label>
                <select value={currentRecord.expectedStartDate} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, expectedStartDate: e.target.value}))} className="border p-2 rounded">
                    {START_DATE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </div>

            {/* Salary */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">外傭薪金</label>
                <input type="number" value={currentRecord.salary} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, salary: e.target.value}))} placeholder="例如：5100" className="border p-2 rounded" />
            </div>

            {/* Hire Type - Internal - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 聘請類別 (可以多選) 外傭看不到，內部紀錄</label>
                    {renderCardOptions(HIRE_TYPE_OPTIONS, currentRecord.hireType, (v) => toggleArrayItem('hireType', v), currentRecord.hireTypeOther, (v) => setCurrentRecord((prev: EmployerRecord) => ({...prev, hireTypeOther: v})))}
                </div>
            )}

            {/* Nationality Req */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">國籍要求 (可以多選)</label>
                {renderCardOptions(NATIONALITY_REQ_OPTIONS, currentRecord.nationalityReq, (v) => toggleArrayItem('nationalityReq', v), currentRecord.nationalityReqOther, (v) => setCurrentRecord((prev: EmployerRecord) => ({...prev, nationalityReqOther: v})))}
            </div>

            {/* Language Req */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">語言要求 (可以多選)</label>
                {renderCardOptions(LANGUAGE_REQ_OPTIONS, currentRecord.languageReq, (v) => toggleArrayItem('languageReq', v))}
            </div>

            {/* Employer Internal Msg - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 僱主要求或留言 (如有) 外傭看不到，內部紀錄</label>
                    <textarea value={currentRecord.employerMsg} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, employerMsg: e.target.value}))} placeholder="公司內部使用，不外傳" className="border p-2 rounded resize-y h-24" />
                </div>
            )}

            {/* Public Note */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">公開備註給外傭看 (如有)</label>
                <textarea value={currentRecord.publicNote} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, publicNote: e.target.value}))} placeholder="請以英文填寫內容，給外傭看，會外傳" className="border p-2 rounded resize-y h-24" />
            </div>

            {/* Tags */}
            <div className="flex flex-col">
                <label className="font-bold mb-1">標籤 (如有) 可以多選</label>
                {renderCardOptions(EMPLOYER_TAG_DATA, currentRecord.tags, (v) => toggleArrayItem('tags', v), currentRecord.tagsOther, (v) => setCurrentRecord((prev: EmployerRecord) => ({...prev, tagsOther: v})))}
            </div>

            {/* Employer Name (Internal) - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 僱主姓名 (外傭看不到，內部紀錄)</label>
                    <input type="text" value={currentRecord.employerName} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, employerName: e.target.value}))} className="border p-2 rounded" />
                </div>
            )}

            {/* Employer Language (Internal) - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 僱主語言 (外傭看不到，內部紀錄) 可以多選</label>
                    {renderCardOptions(EMP_LANG_OPTIONS, currentRecord.employerLanguages, (v) => toggleArrayItem('employerLanguages', v))}
                </div>
            )}

            {/* Employer Phone (Internal) - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 僱主電話 (外傭看不到，內部紀錄)</label>
                    <input type="tel" value={currentRecord.employerPhone} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, employerPhone: e.target.value}))} className="border p-2 rounded" />
                </div>
            )}

            {/* Inquiry Date (Internal) - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 查詢日期 (外傭看不到，內部紀錄)</label>
                    <input type="date" value={currentRecord.inquiryDate} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, inquiryDate: e.target.value}))} className="border p-2 rounded" />
                </div>
            )}

            {/* Referrer (Internal) - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 介紹人 (外傭看不到，內部紀錄)</label>
                    <input type="text" value={currentRecord.referrer} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, referrer: e.target.value}))} placeholder="例如：舊客E1234、Google廣告" className="border p-2 rounded" />
                </div>
            )}

            {/* Responsible Staff (Internal) - Added V1.19G */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 負責同事 (外傭看不到，內部紀錄)</label>
                    <select 
                        value={currentRecord.staff || ''} 
                        onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, staff: e.target.value}))} 
                        className="border p-2 rounded"
                    >
                        <option value="">請選擇</option>
                        {systemSettings?.staffs.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            )}

            {/* Company Remarks (Internal) - Hide for Phishing */}
            {!isPhishing && (
                <div className="flex flex-col">
                    <label className="font-bold mb-1"><i className="fas fa-lock mr-1 text-gray-500"></i> 公司備註 (外傭看不到，內部紀錄)</label>
                    <textarea value={currentRecord.companyRemarks || ''} onChange={e => setCurrentRecord((prev: EmployerRecord) => ({...prev, companyRemarks: e.target.value}))} placeholder="公司內部使用" className="border p-2 rounded resize-y h-24" />
                </div>
            )}

            <div className="flex flex-col mt-6">
                {isEditing && handleCancelEdit ? (
                    <div className="flex space-x-2">
                        <button onClick={handleUpload} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded shadow">
                            儲存修改
                        </button>
                        <button onClick={handleCancelEdit} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded shadow">
                            取消修改
                        </button>
                    </div>
                ) : (
                    <button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded shadow">
                        {isPhishing ? '上載釣魚盤' : '上載資料'}
                    </button>
                )}
                {uploadSuccessMsg && (
                    <div className="bg-red-100 text-red-900 font-bold p-2 mt-2 text-center rounded border border-red-200">
                        {uploadSuccessMsg}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerInputter;
