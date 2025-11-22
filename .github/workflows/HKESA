<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <!-- 關鍵：Viewport 設定確保移動設備正確縮放 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>香港僱傭服務協會 | 教你創業</title>
    
    <!-- Tailwind CSS: 自動處理瀏覽器兼容性 (Vendor Prefixes) -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Noto Sans TC', sans-serif;
            scroll-behavior: smooth;
            -webkit-font-smoothing: antialiased; /* 讓 Mac/iOS 字體更清晰 */
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* 漸變文字效果 - 增加瀏覽器兼容性 */
        .gradient-text {
            background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            /* Fallback for older browsers */
            color: #2563eb; 
        }
        @supports (-webkit-background-clip: text) {
            .gradient-text {
                color: transparent;
            }
        }

        /* 背景特效 */
        .hero-bg {
            background-color: #1e293b; /* Slate 800 */
            background-image: radial-gradient(at 0% 0%, hsla(222, 47%, 11%, 1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(210, 29%, 24%, 1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(263, 29%, 24%, 1) 0, transparent 50%);
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* 強調文字特效 */
        .highlight-text {
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }

        /* 解決 iOS Safari 點擊高亮問題 */
        * {
            -webkit-tap-highlight-color: transparent;
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">

    <!-- 導航欄 -->
    <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 supports-backdrop-blur:bg-white/60" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo 區域 -->
                <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer" onclick="window.scrollTo(0,0)">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        H
                    </div>
                    <span class="font-bold text-lg md:text-xl tracking-tight text-slate-900">香港僱傭服務協會</span>
                </div>
                
                <!-- 電腦版菜單 -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="#home" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">首頁</a>
                        <a href="#industry" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">行業優勢</a>
                        <a href="#services" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">課程內容</a>
                        <a href="#seminar" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">免費分享會</a>
                        <a href="#contact" class="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
                            <i class="fab fa-whatsapp mr-1"></i> 立即諮詢
                        </a>
                    </div>
                </div>

                <!-- 手機版菜單按鈕 -->
                <div class="-mr-2 flex md:hidden">
                    <button type="button" onclick="toggleMenu()" aria-label="Toggle menu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- 手機版展開菜單 -->
        <div class="hidden md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-40" id="mobile-menu">
            <div class="px-4 pt-2 pb-6 space-y-2">
                <a href="#home" onclick="toggleMenu()" class="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">首頁</a>
                <a href="#industry" onclick="toggleMenu()" class="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">行業優勢</a>
                <a href="#services" onclick="toggleMenu()" class="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">課程內容</a>
                <a href="#contact" onclick="toggleMenu()" class="block px-3 py-3 rounded-md text-base font-medium text-blue-600 font-bold bg-blue-50 mt-4">
                    <i class="fab fa-whatsapp mr-2"></i>立即諮詢
                </a>
            </div>
        </div>
    </nav>

    <!-- 首頁封面 (Hero Section) -->
    <!-- pt-32 (mobile) / pt-20 (desktop) 確保文字不被導航欄遮擋 -->
    <section id="home" class="hero-bg min-h-screen flex items-center justify-center pt-32 pb-16 md:pt-20 relative overflow-hidden">
        <!-- 動畫背景裝飾 -->
        <div class="absolute top-1/4 left-10 w-48 h-48 md:w-72 md:h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute top-1/3 right-10 w-48 h-48 md:w-72 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div class="animate-fade-in-up">
                <!-- 強調文字：手機版適當縮小，電腦版放大 -->
                <h2 class="text-xl md:text-4xl font-bold text-blue-300 mb-6 md:mb-8 highlight-text leading-normal">
                    🏃💨 你已經厭倦，每日朝9晚6返工？
                </h2>
                
                <!-- 主標題：RWD 字體大小調整 -->
                <h1 class="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    唔想打工，但又唔識創業？<br>
                    <span class="gradient-text bg-gradient-to-r from-blue-400 to-indigo-400 block mt-2 md:inline md:mt-0">一個課程，一次創業，改變一生</span>
                </h1>
                
                <!-- 副標題 -->
                <p class="mt-4 max-w-2xl mx-auto text-base md:text-xl text-gray-300 mb-8 md:mb-10 px-2">
                    本協會專注「教你創業」。僱傭公司是少數不受經濟環境影響的行業，讓我們帶你避開雷區，掌握行業秘密。
                </p>
                
                <!-- 按鈕：手機版垂直排列，電腦版水平排列 -->
                <div class="flex flex-col sm:flex-row justify-center gap-4 px-4">
                    <a href="#seminar" class="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-blue-500 transition duration-300 transform hover:-translate-y-1 flex items-center justify-center">
                        <i class="fab fa-whatsapp mr-2"></i> 免費參加線上ZOOM分享會
                    </a>
                    <a href="#industry" class="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-600 text-gray-300 rounded-full font-bold text-lg hover:bg-white/5 hover:border-white hover:text-white transition duration-300 flex items-center justify-center">
                        了解行業前景
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 行業優勢 (Industry Analysis) -->
    <section id="industry" class="py-16 md:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- 修改佈局：取消左右兩欄 (lg:grid-cols-2)，改為上下排列 -->
            <div class="flex flex-col gap-12 items-center">
                <!-- 上方：Why Choose Employment Industry -->
                <div class="w-full max-w-4xl">
                    <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-6">為什麼選擇僱傭行業？</h2>
                    <p class="text-base md:text-lg text-blue-600 font-semibold mb-4">
                        🧕🏻 少數生意不受經濟環境影響的行業
                    </p>
                    <div class="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                        <p>無論面對以下任何挑戰，僱傭行業依然屹立不倒：</p>
                    </div>

                    <!-- 列表區域 -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
                            <i class="fas fa-chart-line text-red-500 mr-3 text-xl w-6 text-center"></i>
                            <span class="text-gray-700">經濟衰退 📉</span>
                        </div>
                        <div class="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
                            <i class="fas fa-virus text-green-500 mr-3 text-xl w-6 text-center"></i>
                            <!-- 修改文字 -->
                            <span class="text-gray-700">Covid-19流行病 😷</span>
                        </div>
                        <div class="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
                            <i class="fas fa-shopping-bag text-orange-500 mr-3 text-xl w-6 text-center"></i>
                            <span class="text-gray-700">北上消費 🇨🇳</span>
                        </div>
                        <div class="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
                            <i class="fas fa-plane-departure text-blue-500 mr-3 text-xl w-6 text-center"></i>
                            <span class="text-gray-700">移民潮 🇬🇧</span>
                        </div>
                        <div class="flex items-center bg-gray-50 p-3 rounded-lg sm:col-span-2 border-2 border-blue-100">
                            <i class="fas fa-robot text-purple-500 mr-3 text-xl w-6 text-center"></i>
                            <span class="text-gray-700 font-bold">AI 人工智能 🤖</span>
                        </div>
                    </div>
                </div>

                <!-- 下方：Rigid Demand (已移動至此) -->
                <div class="w-full max-w-4xl relative">
                    <div class="bg-indigo-50 rounded-3xl p-6 md:p-8 shadow-lg relative border border-indigo-100">
                        <div class="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                        
                        <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">☕️ 剛性需求</h3>
                        <p class="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                            對於「用慣外傭」的人來講，<br>
                            <span class="font-bold text-indigo-600 text-xl">請工人是必需品</span>。<br><br>
                            「假期可以唔請，工人唔可以唔請。」
                        </p>
                        <div class="flex items-center justify-center">
                            <i class="fas fa-home text-6xl text-indigo-200 transform transition hover:scale-110 duration-500"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 服務內容 (Services Section) -->
    <section id="services" class="py-16 md:py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 class="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">What We Teach</h2>
                <h2 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4">我們的專業課程</h2>
                <p class="text-gray-600 text-base md:text-lg">無論你想創業做老闆，還是做一個精明的僱主，我們都有適合你的方案。</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <!-- Card 1: 教你創業 (已新增細項) -->
                <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-blue-500 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <i class="fas fa-briefcase text-8xl md:text-9xl text-blue-600"></i>
                    </div>
                    <div class="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 z-10 relative">
                        <i class="fas fa-rocket text-xl md:text-2xl"></i>
                    </div>
                    <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">💪 教你創業</h3>
                    <p class="text-gray-500 mb-6 text-sm md:text-base">你適唔適合創業？你睇睇免費分享會再決定。</p>
                    <ul class="space-y-3 text-gray-600 text-sm md:text-base z-10 relative">
                        <li class="flex items-start"><i class="fas fa-check-circle text-blue-500 mr-2 mt-1 flex-shrink-0"></i> <span>分析創業各類別比較 🔍</span></li>
                        <li class="flex items-start"><i class="fas fa-check-circle text-blue-500 mr-2 mt-1 flex-shrink-0"></i> <span>分析僱傭業好處缺點 💡</span></li>
                        <li class="flex items-start"><i class="fas fa-check-circle text-blue-500 mr-2 mt-1 flex-shrink-0"></i> <span>教授：開業、行政、營運、發展、財政👩‍🏫</span></li>
                        <li class="flex items-start"><i class="fas fa-check-circle text-blue-500 mr-2 mt-1 flex-shrink-0"></i> <span>行業秘密、知識 🪄</span></li>
                        <!-- 新增細項 1 -->
                        <li class="flex items-start"><i class="fas fa-check-circle text-blue-500 mr-2 mt-1 flex-shrink-0"></i> <span>開張流程、成本結構、周邊伙伴、技巧傳授、工具介紹 🛠️</span></li>
                        <!-- 新增細項 2 -->
                        <li class="flex items-start"><i class="fas fa-check-circle text-blue-500 mr-2 mt-1 flex-shrink-0"></i> <span>搵客方法、搵外傭方法、搵舖技巧 🎯</span></li>
                    </ul>
                </div>

                <!-- Card 2: 教你做僱主 -->
                <div class="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-green-500 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <i class="fas fa-users text-8xl md:text-9xl text-green-600"></i>
                    </div>
                    <div class="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 z-10 relative">
                        <i class="fas fa-user-check text-xl md:text-2xl"></i>
                    </div>
                    <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">🧮 唔創業都得，教你做僱主</h3>
                    <p class="text-gray-500 mb-6 text-sm md:text-base">做個精明僱主，避免不必要的損失與麻煩。</p>
                    <ul class="space-y-3 text-gray-600 text-sm md:text-base z-10 relative">
                        <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i> <span>教你揀選好外傭 🧕🏻</span></li>
                        <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i> <span>教你填寫申請表格✍🏻</span></li>
                        <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i> <span>避免外傭財務借錢 💸</span></li>
                        <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i> <span>避雷僱傭公司⚡</span></li>
                        <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i> <span>請外傭慳錢方法 💰</span></li>
                        <li class="flex items-start"><i class="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i> <span>常見問題、犯法位 💯</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- 分享會資訊 (Seminar Section) -->
    <section id="seminar" class="py-16 md:py-24 bg-white overflow-hidden">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="inline-block p-4 rounded-full bg-red-100 mb-6">
                <i class="fas fa-fire text-red-500 text-2xl animate-pulse"></i>
            </div>
            <h2 class="text-2xl md:text-5xl font-bold text-gray-900 mb-6">收生有限，額滿即止</h2>
            <p class="text-lg md:text-xl text-gray-600 mb-12">
                機會不等人，立即報名我們的免費線上ZOOM分享會，了解更多行業內幕。
            </p>
            
            <div class="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
                <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                
                <div class="relative z-10">
                    <h3 class="text-xl md:text-2xl text-white font-bold mb-8">📺 免費參加線上ZOOM分享會</h3>
                    
                    <!-- RWD Grid: 手機單欄，平板雙欄，電腦三欄 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                        <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <div class="text-blue-400 font-bold text-lg mb-2">Step 1</div>
                            <p class="text-gray-200">了解自己的創業屬性，分析市場機會。</p>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <div class="text-blue-400 font-bold text-lg mb-2">Step 2</div>
                            <p class="text-gray-200">學習如何篩選外傭與管理財務風險。</p>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <div class="text-blue-400 font-bold text-lg mb-2">Step 3</div>
                            <p class="text-gray-200">加入協會，獲得持續的專業支援。</p>
                        </div>
                    </div>

                    <a href="https://wa.me/85294422414" target="_blank" class="inline-flex items-center justify-center w-full md:w-auto px-6 md:px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-lg transition transform hover:scale-105 shadow-lg">
                        <i class="fab fa-whatsapp text-2xl mr-3"></i>
                        👉🏻 按此鍵 WhatsApp 本協會 👈🏻
                    </a>
                    <!-- 修改文字 -->
                    <p class="mt-4 text-gray-400 text-sm">點擊上面按鈕會直接跳轉至 WhatsApp 對話</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 聯絡我們 (Contact Section) -->
    <section id="contact" class="py-16 bg-slate-50 border-t border-gray-200">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">聯絡我們</h2>
            <div class="flex justify-center">
                <a href="https://wa.me/85294422414" target="_blank" class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center group border border-gray-100 w-full max-w-sm">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                        <i class="fab fa-whatsapp text-green-500 text-4xl"></i>
                    </div>
                    <h4 class="text-xl font-bold text-gray-800 mb-2">WhatsApp</h4>
                    <p class="text-2xl font-bold text-green-600">9442 2414</p>
                    <span class="text-gray-400 text-sm mt-2">點擊立即聯絡</span>
                </a>
            </div>
        </div>
    </section>

    <!-- 頁尾 (Footer) -->
    <footer class="bg-slate-900 border-t border-slate-800 pt-12 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="flex items-center justify-center gap-2 text-white font-bold text-xl mb-4">
                    香港僱傭服務協會
                </div>
                <p class="text-gray-400 text-sm leading-relaxed mb-8">
                    教你創業，教你做精明僱主。
                </p>
                <p class="text-gray-500 text-sm">&copy; 2025 香港僱傭服務協會. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // 手機版菜單切換功能
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
            } else {
                menu.classList.add('hidden');
            }
        }

        // 滾動時導航欄變色
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md', 'bg-white/95');
            } else {
                navbar.classList.remove('shadow-md', 'bg-white/95');
            }
        });
    </script>
</body>
</html>
