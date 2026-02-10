    
        // Filename generator
        function slugify(text) {
            return text.toString().toLowerCase().trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-');
        }

        const menuData = [
            { title: "Home & Vision", content: "Welcome to Whitehall Colmcille" },
            {
                title: "Structure & Roles",
                sub: [
                    { title: "Executive Committee", content: "WCC Executive Committee" },
                    { title: "Juvenile Roles", content: "Juvenile section coordinator and officers" },
                    { title: "Juvenile Meetings", content: "Reporting and meeting structures" },
                    { title: "Team Contacts", content: "Mentor and lead contact lists" }
                ]
            },
            {
                title: "Mentoring & Coaching",
                sub: [
                    { title: "Role & Responsibilities", content: "What it means to be a WCC mentor" },
                    { title: "Membership & Registration", content: "Club membership and registration processes" },
                    { 
                        title: "Coaching", 
                        sub: [
                            { title: "Process & Planning", content: "Overall coaching process" },
                            { title: "Player Pathway", content: "Development stages for players" },
                            { title: "Mentor Development", content: "Coaching courses and education" },
                            { title: "Coaching Content", content: "Drills and training assets" }
                        ]
                    },
                    { title: "Player Injuries", content: "Injury reporting and claims process" },
                    { title: "PJ Troy", content: "Annual tournament information" },
                    { title: "Beano Harte", content: "Annual tournament information" },
                    { title: "U15 Féile", content: "Feile preparations and rules" }
                ]
            },
            {
                title: "Child Protection",
                sub: [
                    { title: "Roles & Responsibilities", content: "Summary of mentor responsibilities" },    
                    { title: "Garda Vetting", content: "Garda vetting requirements and process" },
                    { title: "Safeguarding", content: "Safeguarding requirements and process" },
                    { title: "Communications", content: "Contact rules for juvenile players" },
                    { title: "Transport & Lifts", content: "Safe travel procedures" },
                    { title: "Away Trips", content: "Overnight and travel guidelines" },
                    { title: "Photos & Filming", content: "Consent and usage policy" },
                    { title: "Challenge Games", content: "Permission and reporting" }
                ]
            },
            {
                title: "Playing Games",
                sub: [
                    { 
                        title: "Boys Games", 
                        sub: [
                            { title: "Boys Calendar", content: "Dublin County Board dates" },
                            { title: "CCC1 Boys U8+", content: "Under 8 to Under 12" },
                            { title: "CCC2 Boys U13+", content: "Under 13 to Under 16" }
                        ]
                    },
                    { 
                        title: "Girls Games", 
                        sub: [
                            { title: "Girls Calendar", content: "LGFA and Camogie schedules" },
                            { title: "CCC1 Girls U8+", content: "Girls Under 8 to Under 12" },
                            { title: "CCC2 Girls U13+", content: "Girls Under 13 to Under 16" }
                        ]
                    },
                    { title: "Referees", content: "Referee allocations and payments" },
                    { title: "Playing Within Age", content: "Rules on playing up" },
                    { title: "Principles of Streaming", content: "Team selection guidelines" }
                ]
            },
            {
                title: "Facilities",
                sub: [
                    { 
                        title: "Pitch Allocations", 
                        sub: [
                            { title: "Booking Process", content: "How to book a pitch" },
                            { title: "Current Schedule", content: "Master pitch timetable" }
                        ]
                    },
                    { title: "Defibrillators", content: "AED locations at all club grounds" },
                    { title: "Ellenfield Grass", content: "Pitch layout, access and facilities" },
                    { title: "Ellenfield All Weather", content: "Pitch layout, access and facilities" },
                    { title: "Cloghran", content: "Pitch layout, access and facilities" },
                    { title: "Cloghran All Weather", content: "Pitch layout, access and facilities" },
                    { title: "Collins Avenue", content: "Pitch layout, access and facilities" },
                    { title: "Belcamp", content: "Pitch layout, access and facilities" },
                    { title: "Lorcan Green", content: "Pitch layout, access and facilities" },
                    { title: "Indoor Arena", content: "Winter training slots" }
                ]
            }
        ];

        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const menuBtn = document.getElementById('menuBtn');
        const menuContainer = document.getElementById('menu-container');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        function toggleMenu() {
            const isOpen = sidebar.classList.contains('sidebar-open');
            sidebar.classList.toggle('sidebar-open', !isOpen);
            sidebar.classList.toggle('sidebar-closed', isOpen);
            overlay.classList.toggle('hidden', isOpen);
        }

        // Logic to build menu with working toggles
        function buildMenu(data, level = 0) {
            const container = document.createElement('div');

            data.forEach(item => {
                const itemWrapper = document.createElement('div');
                itemWrapper.className = `level-${level}`;

                if (item.sub) {
                    // This is a folder
                    const btn = document.createElement('button');
                    btn.className = `menu-item-btn text-gray-800 ${level === 0 ? 'font-bold' : 'font-medium'}`;
                    btn.innerHTML = `
                        <span>${item.title}</span>
                        <svg class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    `;

                    const subDiv = document.createElement('div');
                    subDiv.className = "hidden";
                    
                    btn.onclick = (e) => {
                        e.preventDefault();
                        const isHidden = subDiv.classList.contains('hidden');
                        subDiv.classList.toggle('hidden');
                        btn.querySelector('svg').classList.toggle('rotate-180', isHidden);
                    };

                    subDiv.appendChild(buildMenu(item.sub, level + 1));
                    itemWrapper.appendChild(btn);
                    itemWrapper.appendChild(subDiv);
                } else {
                    // This is a final page link
                    const link = document.createElement('a');
                    link.href = `./${slugify(item.title)}.html`;
                    link.className = `block p-4 pl-6 text-gray-600 hover:text-wcc-red hover:bg-red-50 transition-colors border-l-4 border-transparent hover:border-wcc-red`;
                    link.innerText = item.title;
                    itemWrapper.appendChild(link);
                }
                container.appendChild(itemWrapper);
            });

            return container;
        }

        // Setup Search
        function getSearchableList(data, path = "") {
            let list = [];
            data.forEach(item => {
                const currentPath = path ? `${path} > ${item.title}` : item.title;
                if (item.sub) {
                    list = list.concat(getSearchableList(item.sub, currentPath));
                } else {
                    list.push({
                        title: item.title,
                        path: currentPath,
                        content: item.content,
                        url: `./${slugify(item.title)}.html`
                    });
                }
            });
            return list;
        }

        const searchData = getSearchableList(menuData);

        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            if (val.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }

            const results = searchData.filter(i => 
                i.title.toLowerCase().includes(val) || 
                i.content.toLowerCase().includes(val)
            );

            if (results.length) {
                searchResults.innerHTML = results.map(r => `
                    <a href="${r.url}" class="search-result-item">
                        <div class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">${r.path.replace(' > ' + r.title, '')}</div>
                        <div class="text-sm font-bold text-gray-800">${r.title}</div>
                        <div class="text-xs text-gray-500 truncate">${r.content}</div>
                    </a>
                `).join('');
                searchResults.classList.remove('hidden');
            } else {
                searchResults.innerHTML = `<div class="p-4 text-xs text-center text-gray-400 italic">No matches found</div>`;
                searchResults.classList.remove('hidden');
            }
        });

        // Initialize
        menuContainer.appendChild(buildMenu(menuData));
        menuBtn.addEventListener('click', toggleMenu);
        
        // Close search on click outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target)) searchResults.classList.add('hidden');
        });
    
