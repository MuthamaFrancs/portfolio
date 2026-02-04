/**
 * BIRTHDAY MODE CONTROLLER - FLOATING BAR EDITION
 * Features: Unified Bottom Bar, Smart Reordering, Default ON, Responsive UI
 */

(function() {
    // ------------------------------------------------
    // 1. CONFIGURATION
    // ------------------------------------------------
    const CONFIG = {
        storageKeyMode: 'musau_birthday_mode_v2', // Changed key to force reset default to ON
        storageKeyWishlist: 'musau_birthday_gifts',
        floatingBarId: 'birthday-floating-bar',
        styleId: 'birthday-dynamic-styles',
        wishlistId: 'birthday-wishlist-section',
        guestbookId: 'birthday-guestbook-section',
        giftBtnId: 'birthday-hero-gift-btn',
        
        // DATES
        birthdayDate: new Date('2026-02-06T00:00:00'),
        endDate: new Date('2026-02-10T23:59:59'),
        birthYear: 2002, 
        
        // VISUALS: Warm Sunset Gradient (Salmon -> Orange)
        gradientCss: 'linear-gradient(to right, #FF5F6D, #FFC371)', 
        barGradient: 'linear-gradient(to right, #ec008c, #fc6767)', // A slightly punchier pink/red for the bar
    };

    // FIREBASE CONFIG
    const FB_CONFIG = {
        apiKey: "AIzaSyDQnA85LvvSePUNOZTZpuNFVR2jdUy7AWE",
        authDomain: "birthday-web-aa4b7.firebaseapp.com",
        projectId: "birthday-web-aa4b7",
        storageBucket: "birthday-web-aa4b7.firebasestorage.app",
        messagingSenderId: "525224867975",
        appId: "1:525224867975:web:22ca7d3d73862dac012022",
        measurementId: "G-NCPGDP0MGC"
    };

    // STATE
    // Logic: If null (first visit), Default to TRUE. Else use stored value.
    const storedState = localStorage.getItem(CONFIG.storageKeyMode);
    let isBirthdayMode = storedState === null ? true : storedState === 'true';
    
    let giftedItems = JSON.parse(localStorage.getItem(CONFIG.storageKeyWishlist) || '[]');
    let db = null;

    // WISHLIST DATA
    const WISHLIST_ITEMS = [
        { id: '1', title: 'Smart Watch', category: 'Tech', img: 'assets/images/sw2.jpeg', link: '#', price: 'Ile design nitakeep time...' },
        { id: '2', title: 'Water Bottle', category: 'Lifestyle', img: 'assets/images/waterbottle2.jpg', link: '', price: 'I will Hydrate ipasavyo.' },
        { id: '3', title: 'Vans', category: 'Lifestyle', img: 'assets/images/vans.jpeg', link: '#', price: 'Walking by Faith.😂 Si ata wewe unaona zinanikaa tu 😂 ' },
        { id: '4', title: 'Wireless Keyboard', category: 'Tech', img: 'assets/images/wkb.jpeg', link: '#', price: 'Nitacode I Promise' },
        { id: '5', title: 'Jersey', category: 'Lifestyle', img: 'assets/images/jsy.jpeg', link: '#', price: 'I think I wanna start supporting a team💭' },
        { id: '6', title: 'Lip Moischeraiza', category: 'Lifestyle', img: 'assets/images/cs3.jpeg', link: '#', price: 'Kupaka Glossy💄' }
    ];

    // TEXT REPLACEMENTS
    const TEXT_MAP = {
        h1: { selector: 'h1', original: null, birthday: `Musau the <span class="text-primary">Birthday Boy!</span>` },
        p: { selector: '#home p.max-w-prose', original: null, birthday: `Taking a small break from automation to celebrate another year of life! Explore my work, check out my <span class="font-semibold text-primary">Wishlist</span> or leave a message in the Guestbook!` },
        role: { selector: '#role', original: null, birthday: `older, wiser, and deploying to prod.` }
    };

    // ------------------------------------------------
    // 2. LOADER & INIT
    // ------------------------------------------------
    function init() {
        if (new Date() > CONFIG.endDate) return;

        console.log("%c 🎉 Birthday Mode Active %c", "background: #FF5F6D; color: white; padding: 4px; border-radius: 4px;", "color: #FF5F6D;");

        loadExternalScripts();
        
        // 1. Create Sections (in specific order)
        createWishlistSection();   // After Resume
        createGuestbookSection();  // After Projects
        
        // 2. Create Controls
        createFloatingBar();       // The new Bottom Bar
        injectHeroButton();

        // 3. Apply Visuals
        applyMode();
    }

    function loadExternalScripts() {
        if (!window.confetti) {
            const s1 = document.createElement('script');
            s1.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
            document.body.appendChild(s1);
        }
        if (!window.firebase) {
            const sApp = document.createElement('script');
            sApp.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
            sApp.onload = () => {
                const sStore = document.createElement('script');
                sStore.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
                sStore.onload = initFirebase;
                document.body.appendChild(sStore);
            };
            document.body.appendChild(sApp);
        }
    }

    function initFirebase() {
        if (!window.firebase) return;
        const app = firebase.initializeApp(FB_CONFIG);
        db = firebase.firestore(app);
        if (document.getElementById(CONFIG.guestbookId) && isBirthdayMode) subscribeToMessages();
    }

    // ------------------------------------------------
    // 3. UI GENERATION: FLOATING BAR (New!)
    // ------------------------------------------------
    function createFloatingBar() {
        if (document.getElementById(CONFIG.floatingBarId)) return;

        const bar = document.createElement('div');
        bar.id = CONFIG.floatingBarId;
        
        // Tailwind: Fixed Bottom, Gradient, Shadow, Flex Layout
        // Responsive: Width 95% on mobile, auto on desktop
        bar.className = `
            fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]
            w-[95%] max-w-2xl
            rounded-full shadow-2xl
            flex items-center justify-between
            px-4 py-2 md:px-6 md:py-3
            transition-all duration-500 ease-in-out
            backdrop-blur-sm
        `;
        // Set Gradient Background manually to ensure specific colors
        bar.style.background = CONFIG.barGradient;
        bar.style.border = "1px solid rgba(255,255,255,0.2)";

        // Inner HTML: Icon + Countdown + Toggle
        bar.innerHTML = `
            <!-- Left: Icon -->
            <div class="flex items-center gap-3 md:gap-4">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner">
                    <span class="text-xl md:text-2xl animate-bounce">🎂</span>
                </div>
                
                <!-- Middle: Countdown Text -->
                <div class="flex flex-col text-white">
                    <span class="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-90">Countdown to the 6th</span>
                    <span id="birthday-timer-val" class="text-sm md:text-xl font-mono font-black tracking-wide leading-none">
                        Loading...
                    </span>
                </div>
            </div>

            <!-- Right: Toggle -->
            <div class="flex items-center gap-2 md:gap-3 ml-2">
                <span class="hidden md:inline text-[10px] font-bold text-white uppercase tracking-wider">Celebration</span>
                
                <!-- Custom Toggle Switch -->
                <button id="mode-switch" class="relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none shadow-inner" style="background-color: rgba(255,255,255,0.3);">
                    <div id="mode-knob" class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center">
                        <span class="text-[10px]">🎉</span>
                    </div>
                </button>
            </div>
        `;

        document.body.appendChild(bar);

        // Toggle Event Listener
        const switchBtn = bar.querySelector('#mode-switch');
        switchBtn.addEventListener('click', () => {
            isBirthdayMode = !isBirthdayMode;
            localStorage.setItem(CONFIG.storageKeyMode, isBirthdayMode);
            applyMode();
        });

        // Start Timer
        setInterval(updateTimer, 1000);
        updateTimer();
    }

    function updateTimer() {
        const timerEl = document.getElementById('birthday-timer-val');
        if (!timerEl) return;

        const now = new Date();
        const diff = CONFIG.birthdayDate - now;

        if (diff <= 0) {
            timerEl.textContent = "It's Party Time!";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        // Format: 2d : 0h : 47m : 53s
        timerEl.textContent = `${d}d : ${h}h : ${m}m : ${s}s`;
    }

    // ------------------------------------------------
    // 4. SECTION INJECTION (Smart Ordering)
    // ------------------------------------------------

    // Helper to insert AFTER a node
    function insertAfter(newNode, referenceNode) {
        if(referenceNode && referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }

    function createWishlistSection() {
        if (document.getElementById(CONFIG.wishlistId)) return;
        const section = document.createElement('section');
        section.id = CONFIG.wishlistId;
        section.className = 'py-24 px-6 hidden bg-gradient-to-b from-orange-50 to-white relative overflow-hidden'; 
        
        // PLACE AFTER RESUME
        const resumeSection = document.getElementById('resume');
        if (resumeSection) {
            insertAfter(section, resumeSection);
        }
        renderWishlist();
    }

    function createGuestbookSection() {
        if (document.getElementById(CONFIG.guestbookId)) return;
        const section = document.createElement('section');
        section.id = CONFIG.guestbookId;
        section.className = 'py-20 px-6 hidden bg-white relative';
        
        // PLACE AFTER PROJECTS (Before Labs)
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            insertAfter(section, projectsSection);
        }
        renderGuestbookHTML(section);
    }

    // ------------------------------------------------
    // 5. RENDERING CONTENT
    // ------------------------------------------------

    function renderWishlist() {
        const section = document.getElementById(CONFIG.wishlistId);
        if (!section) return;

        const sorted = [...WISHLIST_ITEMS].sort((a, b) => giftedItems.includes(a.id) - giftedItems.includes(b.id));

        let html = `
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink-100/30 blur-[100px] rounded-full -z-10"></div>
            <div class="max-w-6xl mx-auto relative z-10">
                <div class="text-center mb-16">
                    <div class="inline-block animate-bounce mb-2 text-4xl">🎁</div>
                    <h2 class="text-4xl md:text-5xl font-extrabold mb-6 transparent-text bg-clip-text text-transparent" 
                        style="background-image: ${CONFIG.gradientCss}; -webkit-background-clip: text; color: transparent;">
                        The Birthday Wishlist
                    </h2>
                    <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        If you are Feeling generous or want to know what I'd love for my birthday. 
                        Here are a few things I have put together that would make my year awesome. Courtesy of you😌!
                    </p>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
        `;

        sorted.forEach(item => {
            const isGifted = giftedItems.includes(item.id);
            const cardClass = isGifted 
                ? 'opacity-60 grayscale bg-gray-50 border-gray-100' 
                : 'bg-white hover:-translate-y-2 hover:shadow-2xl border-white/50';
            const btnText = isGifted ? '🎁 Gifted! (Undo)' : 'Mark as Gifted';
            const btnClass = isGifted 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-neutral-900 text-white hover:bg-gradient-to-r hover:from-[#FF5F6D] hover:to-[#FFC371] hover:shadow-lg hover:border-transparent';

            html += `
                <div class="rounded-3xl overflow-hidden shadow-sm border transition-all duration-300 flex flex-col ${cardClass}">
                    <div class="h-56 overflow-hidden relative bg-gray-100 group">
                        <img src="${item.img}" onerror="this.src='https://placehold.co/600x400?text=No+Image'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${item.title}" loading="lazy" />
                        <span class="absolute top-4 left-4 bg-white/95 backdrop-blur text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest text-neutral-800 shadow-sm">${item.category}</span>
                    </div>
                    <div class="p-8 flex flex-col flex-grow">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-xl text-neutral-800 leading-tight">${item.title}</h3>
                        </div>
                        <p class="text-sm text-gray-400 font-medium mb-8 italic">"${item.price}"</p>
                        <div class="mt-auto flex gap-3">
                            <a href="${item.link}" target="_blank" class="flex-1 py-3 px-4 border border-gray-200 rounded-xl text-center text-sm font-bold hover:bg-gray-50 transition">Link</a>
                            <button onclick="window.toggleGiftStatus('${item.id}')" class="flex-1 py-3 px-4 rounded-xl text-sm font-bold transition shadow-sm ${btnClass}">${btnText}</button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div></div>`;
        section.innerHTML = html;
    }

    function renderGuestbookHTML(section) {
        section.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-neutral-800">🖊️ The Guestbook</h2>
                    <p class="text-gray-500 mt-2">Leave a birthday wish (or a roast)!</p>
                </div>
                <div class="grid md:grid-cols-2 gap-12">
                    <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <form id="gb-form" onsubmit="window.submitMessage(event)">
                            <div class="mb-5">
                                <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Your Name</label>
                                <input type="text" id="gb-name" required class="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5F6D]/50 focus:border-[#FF5F6D]" placeholder="Arnold Schwarzenegger">
                            </div>
                            <div class="mb-6">
                                <label class="block text-xs font-bold uppercase text-gray-400 mb-2">Message</label>
                                <textarea id="gb-msg" required rows="3" class="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5F6D]/50 focus:border-[#FF5F6D]" placeholder="Happy birthday!"></textarea>
                            </div>
                            <button type="submit" class="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-lg">Sign Guestbook</button>
                        </form>
                    </div>
                    <div class="relative">
                        <div id="gb-list" class="space-y-4 max-h-[450px] overflow-y-auto pr-2 pb-10">
                            <div class="text-center text-gray-400 italic py-10">Loading wishes...</div>
                        </div>
                        <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // ------------------------------------------------
    // 6. MAIN CONTROLLER
    // ------------------------------------------------

    function applyMode() {
        const body = document.body;
        const bar = document.getElementById(CONFIG.floatingBarId);
        const knob = document.getElementById('mode-knob');
        const wishlist = document.getElementById(CONFIG.wishlistId);
        const guestbook = document.getElementById(CONFIG.guestbookId);
        const giftBtn = document.getElementById(CONFIG.giftBtnId);
        
        if (isBirthdayMode) {
            // --- ON ---
            body.classList.add('birthday-mode');
            injectPartyStyles();
            
            // Text Swap
            for(let key in TEXT_MAP) {
                const item = TEXT_MAP[key];
                if(!item.original) item.original = document.querySelector(item.selector)?.innerHTML;
                if(document.querySelector(item.selector)) document.querySelector(item.selector).innerHTML = item.birthday;
            }

            // Show Sections
            if(wishlist) wishlist.classList.remove('hidden');
            if(guestbook) { guestbook.classList.remove('hidden'); subscribeToMessages(); }
            if(giftBtn) giftBtn.classList.remove('hidden');

            // Bar Visuals
            if (bar) {
                bar.style.background = CONFIG.barGradient; 
                bar.style.filter = "grayscale(0%)";
            }
            if (knob) knob.style.transform = "translateX(20px)";

            // Extras
            if (window.confetti && !document.hidden) window.confetti({ particleCount: 50, colors: ['#FF5F6D', '#FFC371'] });
            togglePartyHat(true);
            toggleSkillBadge(true);
            toggleFooter(true);

        } else {
            // --- OFF ---
            body.classList.remove('birthday-mode');
            removePartyStyles();

            // Text Revert
            for(let key in TEXT_MAP) { 
                const item = TEXT_MAP[key]; 
                if(item.original && document.querySelector(item.selector)) document.querySelector(item.selector).innerHTML = item.original; 
            }

            // Hide Sections
            if(wishlist) wishlist.classList.add('hidden');
            if(guestbook) guestbook.classList.add('hidden');
            if(giftBtn) giftBtn.classList.add('hidden');

            // Bar Visuals (Dimmed)
            if (bar) {
                bar.style.background = "#374151"; // Gray-700
                bar.style.filter = "grayscale(100%)";
            }
            if (knob) knob.style.transform = "translateX(0px)";
            
            // Extras OFF
            togglePartyHat(false);
            toggleSkillBadge(false);
            toggleFooter(false);
        }
    }

    // ------------------------------------------------
    // 7. ACTIONS & HELPERS
    // ------------------------------------------------

    window.toggleGiftStatus = function(id) {
        if (giftedItems.includes(id)) {
            if (confirm("Unmark this gift?")) {
                giftedItems = giftedItems.filter(i => i !== id);
                localStorage.setItem(CONFIG.storageKeyWishlist, JSON.stringify(giftedItems));
                renderWishlist();
            }
        } else {
            giftedItems.push(id);
            localStorage.setItem(CONFIG.storageKeyWishlist, JSON.stringify(giftedItems));
            if (window.confetti) window.confetti({ origin: { y: 0.7 }, colors: ['#FF5F6D', '#FFC371'] });
            renderWishlist();
        }
    };

    window.submitMessage = function(e) {
        e.preventDefault();
        if (!db) { alert("Database not connected yet!"); return; }
        const name = document.getElementById('gb-name').value.trim();
        const message = document.getElementById('gb-msg').value.trim();
        if (!name || !message) return;
        
        db.collection('messages').add({ name, message, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
            .then(() => { 
                document.getElementById('gb-name').value = ''; 
                document.getElementById('gb-msg').value = ''; 
                if (window.confetti) window.confetti({ origin: { x: 0.7, y: 0.5 }, colors: ['#FF5F6D', '#FFC371'] }); 
            })
            .catch((err) => { console.error("Error", err); alert("Error saving message."); });
    };

    function subscribeToMessages() {
        if (!db) return;
        db.collection('messages').orderBy('timestamp', 'desc').limit(20).onSnapshot((snapshot) => {
            const listEl = document.getElementById('gb-list');
            if (!listEl) return;
            if (snapshot.empty) { listEl.innerHTML = `<div class="text-center text-gray-400 italic py-10">Be the first to sign!</div>`; return; }
            let html = '';
            snapshot.forEach(doc => {
                const d = doc.data();
                const safeName = d.name.replace(/</g, "&lt;");
                const safeMsg = d.message.replace(/</g, "&lt;");
                html += `
                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <p class="text-gray-700 text-base mb-3 leading-relaxed">"${safeMsg}"</p>
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center text-xs font-bold text-orange-600 border border-white shadow-sm">
                                ${safeName.charAt(0).toUpperCase()}
                            </div>
                            <span class="text-sm font-bold text-neutral-900">${safeName}</span>
                        </div>
                    </div>
                `;
            });
            listEl.innerHTML = html;
        });
    }

    function injectHeroButton() {
        const existingBtn = document.querySelector('a[href="#projects"]');
        if (!existingBtn || document.getElementById(CONFIG.giftBtnId)) return;
        const giftBtn = document.createElement('a');
        giftBtn.id = CONFIG.giftBtnId;
        giftBtn.href = `#${CONFIG.wishlistId}`;
        giftBtn.className = `hidden ml-4 inline-block rounded-full bg-white text-neutral-800 px-8 py-3 font-bold shadow-lg border-2 border-[#FF5F6D] hover:bg-pink-50 hover:-translate-y-1 transition-all cursor-pointer`;
        giftBtn.innerHTML = `Gift Me ✨`;
        existingBtn.parentNode.appendChild(giftBtn);
    }

    function injectPartyStyles() {
        if (document.getElementById(CONFIG.styleId)) return;
        const style = document.createElement('style');
        style.id = CONFIG.styleId;
        style.innerHTML = `
            .birthday-mode .text-primary { color: #FF5F6D !important; }
            .birthday-mode .bg-primary { background-color: #FF5F6D !important; }
            .birthday-mode h1 span.text-primary { background: ${CONFIG.gradientCss}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .birthday-mode #home { padding-top: 140px !important; }
            #gb-list::-webkit-scrollbar { width: 4px; }
            #gb-list::-webkit-scrollbar-thumb { background: #eee; border-radius: 4px; }
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        `;
        document.head.appendChild(style);
    }

    function removePartyStyles() {
        const style = document.getElementById(CONFIG.styleId);
        if (style) style.remove();
    }

    // EXTRAS: Hat, Badge, Footer
    function togglePartyHat(show) {
        const img = document.querySelector('img[alt="Francis Musau"]');
        if (!img) return;
        const parent = img.parentElement; 
        let hat = document.getElementById('birthday-hat');
        if (show) {
            if (!hat) {
                hat = document.createElement('div');
                hat.id = 'birthday-hat';
                hat.innerHTML = '🥳';
                hat.style.cssText = 'position: absolute; top: -30px; right: 20%; font-size: 4rem; z-index: 20; animation: bounce 2s infinite; pointer-events: none;';
                parent.appendChild(hat);
            }
        } else {
            if (hat) hat.remove();
        }
    }

    function toggleSkillBadge(show) {
        const containers = document.querySelectorAll('.flex.flex-wrap.gap-3');
        if (containers.length === 0) return;
        const skillContainer = containers[0]; 
        let badge = document.getElementById('birthday-skill');
        if (show) {
            if (!badge) {
                badge = document.createElement('div');
                badge.id = 'birthday-skill';
                badge.className = 'tech-card flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm text-white animate-pulse';
                badge.style.background = CONFIG.gradientCss;
                badge.innerHTML = '<span class="text-xl">🍰</span> <span class="text-sm font-bold">Cake Driven Dev</span>';
                skillContainer.appendChild(badge);
            }
        } else {
            if (badge) badge.remove();
        }
    }

    function toggleFooter(show) {
        const yearEl = document.getElementById('year');
        if (!yearEl) return;
        const currentYear = new Date().getFullYear();
        yearEl.textContent = show ? `${CONFIG.birthYear} - ${currentYear}` : currentYear;
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

})();