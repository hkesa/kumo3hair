import React, { useState, useMemo } from 'react';
import { FileRecord } from '../types';
import { KANBAN_FILTERS, KANBAN_WORKFLOWS } from '../constants';
import { formatDateForDisplay } from '../utils';

interface ProgressCheckProps {
  records: FileRecord[];
  updateRecord: (id: string, updates: Partial<FileRecord>) => void;
}

type WorkflowType = 'philOverseas' | 'philFinish' | 'philRenewal' | 'indoOverseas' | 'indoFinish' | 'indoRenewal';

export const ProgressCheck: React.FC<ProgressCheckProps> = ({ records, updateRecord }) => {
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>('philOverseas');

  const tabs: { id: WorkflowType; label: string }[] = [
    { id: 'philOverseas', label: '菲傭海外' },
    { id: 'philFinish', label: '菲傭完約' },
    { id: 'philRenewal', label: '菲傭續約' },
    { id: 'indoOverseas', label: '印傭海外' },
    { id: 'indoFinish', label: '印傭完約' },
    { id: 'indoRenewal', label: '印傭續約' },
  ];

  // Calculate Dashboard Summary
  const summaryCounts = useMemo(() => {
      let waitingSubmit = 0;
      let waitingConsulate = 0;
      let waitingImm = 0;
      let waitingSchoolFlight = 0;
      let waitingFiling = 0;

      // Filter statuses for counting.
      const statusSubmit = ['未收錢', '已收錢但未齊文件', '未夠鐘交 (已收錢+齊文件)'];
      const statusConsulate = ['已交領事館', '領事館已批', '已驗身'];
      const statusImm = [
          '已交入境處', '已收確認信', '等補交文件 (如有)', '等批簽證', 
          '已批簽證', '已批簽證 (買保險)', '合約已寄學校', '驗身 (直聘除外)'
      ];
      const statusSchoolFlight = [
          '已寄學校', '學校完成 (等飛)', 'WhatsApp簽證給學校',
          '已安排飛（機票、講座、身份證、\n　　　　　香港驗身、保險)'
      ];
      const statusFiling = ['等簽收文件', '等Filing歸檔'];

      records.forEach(r => {
          // Filter out completed/cancelled
          const appStatus = String(r['applicationStatus'] || '');
          if (['已完成', '已退款', '已取消', '其他'].includes(appStatus)) return;

          // Check if it belongs to valid workflow (Phil/Indo + Type)
          const nat = r['helperNationality'];
          const type = String(r['helperType'] || '');
          
          // Basic validation for workflow matching (simplified)
          let isValidWorkflow = false;
          if (nat === '菲律賓') {
              if (KANBAN_FILTERS.overseas.includes(type) || KANBAN_FILTERS.finish.includes(type) || KANBAN_FILTERS.renewal.includes(type)) isValidWorkflow = true;
          } else if (nat === '印尼') {
              if (KANBAN_FILTERS.overseas.includes(type) || KANBAN_FILTERS.finish.includes(type) || KANBAN_FILTERS.renewal.includes(type)) isValidWorkflow = true;
          }
          
          if (!isValidWorkflow) return;

          const status = String(r.progressStatus || '未收錢');

          if (statusSubmit.includes(status)) waitingSubmit++;
          else if (statusConsulate.includes(status)) waitingConsulate++;
          else if (statusImm.includes(status)) waitingImm++;
          else if (statusSchoolFlight.includes(status)) waitingSchoolFlight++;
          else if (statusFiling.includes(status)) waitingFiling++;
      });

      return { waitingSubmit, waitingConsulate, waitingImm, waitingSchoolFlight, waitingFiling };
  }, [records]);

  // Helper to filter records based on workflow rules
  const getFilteredRecords = (workflow: WorkflowType) => {
    return records.filter(record => {
      // 1. Filter out completed/cancelled applications
      const appStatus = record['applicationStatus'];
      if (appStatus && ['已完成', '已退款', '已取消', '其他'].includes(String(appStatus))) {
          return false;
      }

      // 2. Filter by workflow type (Nationality & Application Type)
      const nat = record['helperNationality'];
      const type = record['helperType'] as string;

      if (!nat || !type) return false;

      switch (workflow) {
        case 'philOverseas':
          return nat === '菲律賓' && KANBAN_FILTERS.overseas.includes(type);
        case 'philFinish':
          return nat === '菲律賓' && KANBAN_FILTERS.finish.includes(type);
        case 'philRenewal':
          return nat === '菲律賓' && KANBAN_FILTERS.renewal.includes(type);
        case 'indoOverseas':
          return nat === '印尼' && KANBAN_FILTERS.overseas.includes(type);
        case 'indoFinish':
          return nat === '印尼' && KANBAN_FILTERS.finish.includes(type);
        case 'indoRenewal':
          return nat === '印尼' && KANBAN_FILTERS.renewal.includes(type);
        default:
          return false;
      }
    });
  };

  const columns = KANBAN_WORKFLOWS[activeWorkflow];
  const filteredRecords = getFilteredRecords(activeWorkflow);

  const moveCard = (recordId: string, direction: 'prev' | 'next') => {
    const record = records.find(r => r.id === recordId);
    if (!record) return;

    const currentStatus = record.progressStatus || '未收錢';
    const currentIndex = columns.indexOf(currentStatus);
    
    // Ensure status is valid for current workflow
    if (currentIndex === -1) {
         updateRecord(recordId, { progressStatus: columns[0] });
         return;
    }

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < columns.length) {
      updateRecord(recordId, { progressStatus: columns[newIndex] });
    }
  };

  // Logic to override display value for "Next Progress" based on column and workflow
  const getDisplayNextProgress = (record: FileRecord, colName: string, workflow: WorkflowType) => {
      // 1. N/A Logic
      const naColumns = [
          '未收錢', 
          '已收錢但未齊文件', 
          '未夠鐘交 (已收錢+齊文件)',
          '已安排飛（機票、講座、身份證、\n　　　　　香港驗身、保險)',
          '等Filing歸檔',
          '等簽收文件'
      ];

      // Indo Finish / Renewal Special N/A
      if ((workflow === 'indoFinish' || workflow === 'indoRenewal') && colName === '已驗身') {
           return 'N/A';
      }

      if (naColumns.includes(colName)) {
          return 'N/A';
      }

      // Default value from record
      const dateVal = record['progressNextDate'];
      // If it looks like a date (YYYY-MM-DD), format it to dd-mm-yyyy. 
      if (dateVal && typeof dateVal === 'string' && dateVal.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return formatDateForDisplay(dateVal);
      }
      return dateVal || '';
  };

  // Determine width based on column name length
  const getColumnWidth = (colName: string) => {
      if (colName.includes('已安排飛')) return 'min-w-[420px] w-[420px]'; // Slightly wider for double line
      if (colName.includes('未夠鐘交')) return 'min-w-[360px] w-[360px]';
      return 'min-w-[320px] w-80';
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      
      {/* Legend & Info - Icon aligned */}
      <div className="border-b border-gray-200 p-2 text-sm text-gray-700 flex flex-col space-y-2">
         <div className="flex items-start space-x-2">
            <div className="pt-1"><i className="fas fa-info-circle text-blue-500"></i></div>
            <span className="leading-relaxed">欄位名稱如有閃電圖案⚡代表當你在「檔案管理」填寫相應的日期後，系統會自動移動卡片進度。沒有⚡的卡片要人手按箭咀鍵▶️移動卡片進度。</span>
         </div>
      </div>

      {/* Summary Dashboard - Independent Section with Solid Colors */}
      <div className="bg-white p-2 border-b border-gray-200 grid grid-cols-5 gap-2">
         <div className="bg-green-100 rounded p-2 flex justify-center items-center space-x-2 shadow-sm">
             <div className="text-green-900 font-bold">等遞交</div>
             <div className="text-green-900 font-bold text-xl">{summaryCounts.waitingSubmit}</div>
         </div>
         <div className="bg-green-100 rounded p-2 flex justify-center items-center space-x-2 shadow-sm">
             <div className="text-green-900 font-bold">等領事館</div>
             <div className="text-green-900 font-bold text-xl">{summaryCounts.waitingConsulate}</div>
         </div>
         <div className="bg-green-100 rounded p-2 flex justify-center items-center space-x-2 shadow-sm">
             <div className="text-green-900 font-bold">等入境處</div>
             <div className="text-green-900 font-bold text-xl">{summaryCounts.waitingImm}</div>
         </div>
         <div className="bg-green-100 rounded p-2 flex justify-center items-center space-x-2 shadow-sm">
             <div className="text-green-900 font-bold">等學校+未飛</div>
             <div className="text-green-900 font-bold text-xl">{summaryCounts.waitingSchoolFlight}</div>
         </div>
         <div className="bg-green-100 rounded p-2 flex justify-center items-center space-x-2 shadow-sm">
             <div className="text-green-900 font-bold">等Filing歸檔</div>
             <div className="text-green-900 font-bold text-xl">{summaryCounts.waitingFiling}</div>
         </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex space-x-2 p-2 bg-white border-b overflow-x-auto shadow-sm mb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveWorkflow(tab.id)}
            className={`px-6 py-3 rounded-md text-base font-bold whitespace-nowrap transition-all shadow-sm flex items-center justify-center border-2 ${
              activeWorkflow === tab.id
                ? 'bg-white text-blue-600 border-blue-600 shadow-md' // Active: White + Blue Border
                : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' // Inactive: Blue
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Kanban Board Area */}
      <div className="flex-grow overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex h-full space-x-4 px-4">
          {columns.map((colName, colIndex) => {
            const columnRecords = filteredRecords.filter(r => {
                const status = r.progressStatus || '未收錢';
                return status === colName;
            });
            
            // Check if column is automated (rough check based on logic)
            const isAutomated = [
                '已交入境處', '已收確認信', '等補交文件 (如有)', '等批簽證', 
                '已批簽證', '已批簽證 (買保險)', '已交領事館', '領事館已批',
                '已寄學校', '合約已寄學校', '學校完成 (等飛)'
            ].includes(colName);

            const widthClass = getColumnWidth(colName);
            
            const isFlightColumn = colName.includes('已安排飛');
            const showFlightDate = isFlightColumn && (activeWorkflow === 'philOverseas' || activeWorkflow === 'indoOverseas');

            return (
              <div key={colName} className={`flex flex-col ${widthClass} bg-gray-100 rounded-lg shadow-inner flex-shrink-0 border border-gray-200 max-h-full`}>
                {/* Column Header */}
                <div className="p-3 bg-gray-200 rounded-t-lg border-b border-gray-300">
                  <h3 className="font-bold text-gray-700 text-lg flex justify-between items-center leading-tight min-h-[3rem]">
                    <span>
                         {colName.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                  {line}
                                  {i < colName.split('\n').length - 1 && <br />}
                              </React.Fragment>
                          ))}
                        {isAutomated && <span className="text-yellow-600 ml-1">⚡</span>}
                    </span>
                    <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full ml-2">{columnRecords.length}</span>
                  </h3>
                </div>

                {/* Cards Container */}
                <div className="p-2 overflow-y-auto flex-grow space-y-3 custom-scrollbar">
                  {columnRecords.map(record => {
                      const displayNext = getDisplayNextProgress(record, colName, activeWorkflow);
                      
                      // Calculate border color based on urgency
                      let borderClass = "border border-white"; // Default (Changed to white instead of gray/blue for base)
                      if (record.urgency === '急') {
                          borderClass = "border-4 border-red-500";
                      } else if (record.urgency === '慢') {
                          borderClass = "border-4 border-green-500";
                      } else {
                          // Default / Normal
                          borderClass = "border border-white";
                      }

                      return (
                        <div key={record.id} className={`bg-white p-3 rounded shadow hover:shadow-lg transition-shadow ${borderClass}`}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-blue-900 text-lg">{record.id}</span>
                            <div className="flex space-x-1">
                                <button 
                                    onClick={() => moveCard(record.id, 'prev')}
                                    disabled={colIndex === 0}
                                    className={`p-1 rounded hover:bg-gray-100 ${colIndex === 0 ? 'text-gray-300' : 'text-gray-600'}`}
                                >
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button 
                                    onClick={() => moveCard(record.id, 'next')}
                                    disabled={colIndex === columns.length - 1}
                                    className={`p-1 rounded hover:bg-gray-100 ${colIndex === columns.length - 1 ? 'text-gray-300' : 'text-gray-600'}`}
                                >
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div className="text-gray-800 font-bold mb-1 text-lg">{record['empNameChi']}</div>
                        <div className="text-sm text-gray-500 mb-2">{record['helperType']}</div>
                        
                        <div className="mt-2 border-t pt-2 space-y-2">
                            {/* Next Progress - Read Only or Date Picker if flight column */}
                            <div className={`p-1 rounded ${showFlightDate ? 'bg-red-50' : 'bg-blue-50'}`}>
                                {showFlightDate ? (
                                    <>
                                        <label className="text-xs text-red-600 block font-bold">飛香港日期：</label>
                                        <input 
                                            type="date"
                                            value={record.progressNextDate || ''}
                                            onChange={(e) => updateRecord(record.id, { progressNextDate: e.target.value })}
                                            className="w-full border border-blue-300 rounded px-1 py-1 text-base mt-1"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <label className="text-xs text-blue-800 block font-semibold">預計下個進度：</label>
                                        <span className="block pl-1 font-medium text-gray-700" style={{ fontSize: '16px' }}>
                                            {displayNext}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Employer Target Date - Read Only */}
                            <div className="bg-green-50 p-1 rounded">
                                <label className="text-xs text-green-800 block font-semibold">僱主要求上班：</label>
                                <span className="block pl-1 font-medium text-gray-700" style={{ fontSize: '16px' }}>
                                    {record['employerTargetDate'] ? formatDateForDisplay(String(record['employerTargetDate'])) : '--'}
                                </span>
                            </div>
                        </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
