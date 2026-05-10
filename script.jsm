// script.js
(function () {
    // --- 1. Elements Selection ---
    const menuBtn = document.getElementById('menuToggleBtn');
    const drawer = document.getElementById('sideDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const headerBookBtn = document.getElementById('headerBookBtn');
    const heroCta = document.getElementById('heroCtaBtn');
    const drawerBooking = document.getElementById('drawerBooking');
    const drawerServicesLink = document.getElementById('drawerServices');
    const modalCallBtn = document.getElementById('modalCallBtn');
    const modalWABtn = document.getElementById('modalWABtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const serviceCards = document.querySelectorAll('.service-card');

    // Spotlight Slider Elements
    const sliderTrack = document.getElementById('sliderTrack');
    const indicators = document.querySelectorAll('.indicator');

    // Support Menu
    const supportToggle = document.getElementById('supportToggle');
    const supportMenu = document.getElementById('supportMenu');

    // Numbers & Links
    const phoneNumber = '+919368646875';
    const whatsappUrl = 'https://wa.me/919368646875';

    // --- 2. Generic Drawer Toggle Logic ---
    // Yeh function sabhi special drawers (Repair, Install, Rental, Jet) ko handle karega
    function toggleSpecificDrawer(id, action) {
        const overlay = document.getElementById(id);
        if (overlay) {
            if (action === 'open') {
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    }

    // Global Window Functions (HTML buttons ke liye)
    window.openRepairDrawer = () => toggleSpecificDrawer('repairDrawerOverlay', 'open');
    window.closeRepairDrawer = () => toggleSpecificDrawer('repairDrawerOverlay', 'close');

    window.openServiceDrawer = () => toggleSpecificDrawer('serviceDrawerOverlay', 'open');
    window.closeServiceDrawer = () => toggleSpecificDrawer('serviceDrawerOverlay', 'close');

    window.openInstallDrawer = () => toggleSpecificDrawer('installDrawerOverlay', 'open');
    window.closeInstallDrawer = () => toggleSpecificDrawer('installDrawerOverlay', 'close');

    window.openRentalDrawer = () => toggleSpecificDrawer('rentalDrawerOverlay', 'open');
    window.closeRentalDrawer = () => toggleSpecificDrawer('rentalDrawerOverlay', 'close');

    // Click outside to close for all overlays
    const allOverlays = ['repairDrawerOverlay', 'serviceDrawerOverlay', 'installDrawerOverlay', 'rentalDrawerOverlay'];
    allOverlays.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', (e) => {
                if (e.target === el) toggleSpecificDrawer(id, 'close');
            });
        }
    });

    // --- 3. Spotlight Auto-Slider Logic ---
    let currentIdx = 0;
    const totalSlides = 4;

    window.currentSlide = function (index) {
        if (!sliderTrack) return;
        currentIdx = index;

        // Calculate movement based on card width
        const cardWidth = sliderTrack.firstElementChild.clientWidth + 15; // 15 is gap
        sliderTrack.scrollTo({
            left: currentIdx * cardWidth,
            behavior: 'smooth'
        });

        // Indicators update
        indicators.forEach((dot, i) => {
            if (i === index) { dot.classList.add('active'); }
            else { dot.classList.remove('active'); }
        });
    };

    // Auto Play Every 3 Seconds
    let slideTimer = setInterval(() => {
        currentIdx = (currentIdx + 1) % totalSlides;
        currentSlide(currentIdx);
    }, 3000);

    // Pause on Touch Interaction
    if (sliderTrack) {
        sliderTrack.addEventListener('touchstart', () => clearInterval(slideTimer), { passive: true });
        sliderTrack.addEventListener('touchend', () => {
            slideTimer = setInterval(() => {
                currentIdx = (currentIdx + 1) % totalSlides;
                currentSlide(currentIdx);
            }, 3000);
        }, { passive: true });
    }

    // --- 4. Main UI Logics (Menu, Drawer, Modal) ---
    let isSupportOpen = false;
    if (supportToggle) {
        supportToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isSupportOpen = !isSupportOpen;
            if (isSupportOpen) { supportMenu.classList.add('open'); }
            else { supportMenu.classList.remove('open'); }
        });
    }

    document.addEventListener('click', (e) => {
        if (isSupportOpen && !supportToggle.contains(e.target) && !supportMenu.contains(e.target)) {
            isSupportOpen = false;
            supportMenu.classList.remove('open');
        }
    });

    function openDrawer() { drawer.classList.add('open'); }
    function closeDrawer() { drawer.classList.remove('open'); }

    function openModal() {
        modalOverlay.classList.add('active');
        if (drawer.classList.contains('open')) closeDrawer();
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- 5. Event Listeners ---
    if (menuBtn) menuBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);

    if (headerBookBtn) headerBookBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (heroCta) heroCta.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (drawerBooking) drawerBooking.addEventListener('click', (e) => { e.preventDefault(); openModal(); });

    // Service Cards trigger Modal
    serviceCards.forEach(card => {
        card.addEventListener('click', () => openModal());
    });

    // Modal Actions
    if (modalCallBtn) modalCallBtn.addEventListener('click', () => { window.location.href = `tel:${phoneNumber}`; closeModal(); });
    if (modalWABtn) modalWABtn.addEventListener('click', () => { window.open(whatsappUrl, '_blank'); closeModal(); });
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    // Drawer Services Link Smooth Scroll
    if (drawerServicesLink) {
        drawerServicesLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeDrawer();
            const target = document.querySelector('.services-grid');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Close Main Drawer on outside click
    document.addEventListener('click', function (e) {
        if (drawer && drawer.classList.contains('open') && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
            closeDrawer();
        }
    });

})();
