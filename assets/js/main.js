// ============================================
// ملف JavaScript الرئيسي - دليل فعاليات المدينة
// ============================================
// الملف يحتوي على جميع الدوال والميزات المطلوبة للمشروع
// تاريخ الإنشاء: 2025
// ============================================

// ============================================
// 1. التهيئة الأولية
// ============================================

// تهيئة عندما يتم تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ دليل فعاليات المدينة - جاهز للعمل!');
    
    // تهيئة جميع المكونات
    initializeComponents();
    
    // تحميل تفضيلات المستخدم
    loadUserPreferences();
    
    // إنشاء زر الانتقال للأعلى
    createScrollToTopButton();
    
    // إضافة أنماط وضع الليل
    addDarkModeStyles();
    
    // التحقق من وضع الليل المحفوظ
    initializeDarkMode();
    
    // إظهار حدث اليوم إذا كان موجوداً
    showTodayEvent();
    
    // تهيئة السنة الحالية في الفوتر
    setCurrentYear();
    
    // تهيئة التمرير السلس
    initializeSmoothScrolling();
    
    // إضافة تأثيرات للبطاقات عند الظهور
    initializeIntersectionObserver();
});

// ============================================
// 2. دالة تهيئة جميع المكونات
// ============================================

function initializeComponents() {
    // تهيئة Tooltips من Bootstrap إذا كانت موجودة
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        
        console.log(`تم تهيئة ${tooltipList.length} من التلميحات`);
    }
    
    // تهيئة Popovers من Bootstrap إذا كانت موجودة
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    
    // تهيئة إضافية حسب الصفحة
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'events.html':
            initializeEventsPage();
            break;
        case 'event.html':
            initializeEventDetailsPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        case 'about.html':
            initializeAboutPage();
            break;
    }
}

// ============================================
// 3. وضع الليل (Dark Mode) - الميزة الإضافية
// ============================================

// دالة تهيئة وضع الليل
function initializeDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateDarkModeButton(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateDarkModeButton(false);
    }
}

// دالة تبديل وضع الليل
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        updateDarkModeButton(false);
        showToast('تم تفعيل وضع النهار', 'info');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        updateDarkModeButton(true);
        showToast('تم تفعيل وضع الليل', 'dark');
    }
    
    // حفظ التفضيل
    saveUserPreference('darkMode', !isDarkMode);
}

// دالة تحديث نص وأيقونة زر وضع الليل
function updateDarkModeButton(isDarkMode) {
    const buttons = document.querySelectorAll('#darkModeToggle, .dark-mode-toggle');
    
    buttons.forEach(button => {
        if (button) {
            if (isDarkMode) {
                button.innerHTML = '<i class="fas fa-sun me-1"></i> وضع النهار';
                button.classList.remove('btn-outline-secondary');
                button.classList.add('btn-warning');
            } else {
                button.innerHTML = '<i class="fas fa-moon me-1"></i> وضع الليل';
                button.classList.remove('btn-warning');
                button.classList.add('btn-outline-secondary');
            }
        }
    });
}

// دالة إضافة أنماط وضع الليل الديناميكية
function addDarkModeStyles() {
    if (!document.getElementById('dark-mode-styles')) {
        const style = document.createElement('style');
        style.id = 'dark-mode-styles';
        style.textContent = `
            /* أنماط وضع الليل */
            .dark-mode {
                background-color: #121212 !important;
                color: #e0e0e0 !important;
                transition: all 0.3s ease;
            }
            
            .dark-mode .navbar-light {
                background-color: #1e1e1e !important;
                border-bottom: 1px solid #333;
            }
            
            .dark-mode .navbar-light .navbar-brand,
            .dark-mode .navbar-light .nav-link,
            .dark-mode .navbar-light .navbar-text {
                color: #e0e0e0 !important;
            }
            
            .dark-mode .navbar-light .navbar-toggler {
                border-color: #555;
            }
            
            .dark-mode .navbar-light .navbar-toggler-icon {
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
            }
            
            .dark-mode .card {
                background-color: #1e1e1e !important;
                color: #e0e0e0 !important;
                border-color: #333;
            }
            
            .dark-mode .card-header {
                background-color: #2d2d2d !important;
                border-bottom: 1px solid #333;
            }
            
            .dark-mode .bg-light {
                background-color: #1e1e1e !important;
            }
            
            .dark-mode .text-dark {
                color: #e0e0e0 !important;
            }
            
            .dark-mode .text-muted {
                color: #aaa !important;
            }
            
            .dark-mode .form-control,
            .dark-mode .form-select {
                background-color: #2d2d2d !important;
                color: #e0e0e0 !important;
                border-color: #444;
            }
            
            .dark-mode .form-control:focus,
            .dark-mode .form-select:focus {
                background-color: #2d2d2d !important;
                color: #e0e0e0 !important;
                border-color: #4361ee;
                box-shadow: 0 0 0 0.25rem rgba(67, 97, 238, 0.25);
            }
            
            .dark-mode .alert {
                background-color: #2d2d2d !important;
                border-color: #444;
                color: #e0e0e0 !important;
            }
            
            .dark-mode .alert-info {
                background-color: #0c5460 !important;
                border-color: #0a3c45;
                color: #d1ecf1 !important;
            }
            
            .dark-mode .alert-success {
                background-color: #155724 !important;
                border-color: #0f4019;
                color: #d4edda !important;
            }
            
            .dark-mode .alert-warning {
                background-color: #856404 !important;
                border-color: #664d03;
                color: #fff3cd !important;
            }
            
            .dark-mode .btn-outline-primary {
                color: #4361ee !important;
                border-color: #4361ee;
            }
            
            .dark-mode .btn-outline-primary:hover {
                background-color: #4361ee !important;
                color: white !important;
            }
            
            .dark-mode .btn-outline-secondary {
                color: #aaa !important;
                border-color: #666;
            }
            
            .dark-mode .btn-outline-secondary:hover {
                background-color: #666 !important;
                color: white !important;
            }
            
            .dark-mode footer {
                background-color: #0a0a0a !important;
            }
            
            .dark-mode .table {
                color: #e0e0e0 !important;
            }
            
            .dark-mode .modal-content {
                background-color: #1e1e1e !important;
                color: #e0e0e0 !important;
            }
            
            .dark-mode .modal-header,
            .dark-mode .modal-footer {
                border-color: #444;
            }
            
            .dark-mode .accordion-button {
                background-color: #2d2d2d !important;
                color: #e0e0e0 !important;
            }
            
            .dark-mode .accordion-button:not(.collapsed) {
                background-color: #4361ee !important;
                color: white !important;
            }
            
            .dark-mode .accordion-body {
                background-color: #1e1e1e !important;
                color: #e0e0e0 !important;
            }
            
            .dark-mode .list-group-item {
                background-color: #2d2d2d !important;
                color: #e0e0e0 !important;
                border-color: #444;
            }
            
            .dark-mode .badge.bg-light {
                background-color: #333 !important;
                color: #e0e0e0 !important;
            }
            
            .dark-mode .carousel-caption {
                background-color: rgba(0, 0, 0, 0.7) !important;
            }
            
            .dark-mode .nav-tabs .nav-link.active {
                background-color: #4361ee !important;
                color: white !important;
            }
            
            .dark-mode .nav-tabs {
                border-bottom: 1px solid #444;
            }
            
            .dark-mode .nav-tabs .nav-link {
                color: #aaa;
            }
            
            .dark-mode .nav-tabs .nav-link:hover {
                color: #e0e0e0;
            }
            
            .dark-mode .toast {
                background-color: #2d2d2d !important;
                color: #e0e0e0 !important;
                border-color: #444;
            }
            
            .dark-mode .dropdown-menu {
                background-color: #1e1e1e !important;
                color: #e0e0e0 !important;
                border-color: #444;
            }
            
            .dark-mode .dropdown-item {
                color: #e0e0e0 !important;
            }
            
            .dark-mode .dropdown-item:hover {
                background-color: #4361ee !important;
                color: white !important;
            }
        `;
        document.head.appendChild(style);
        console.log('✅ تم تحميل أنماط وضع الليل');
    }
}

// ============================================
// 4. دالة إظهار إشعار (Toast)
// ============================================

function showToast(message, type = 'info') {
    // إنشاء ID فريد
    const toastId = 'toast-' + Date.now();
    
    // تحديد أيقونة حسب النوع
    let icon = 'info-circle';
    let bgClass = 'bg-primary';
    
    switch (type) {
        case 'success':
            icon = 'check-circle';
            bgClass = 'bg-success';
            break;
        case 'warning':
            icon = 'exclamation-triangle';
            bgClass = 'bg-warning';
            break;
        case 'error':
            icon = 'times-circle';
            bgClass = 'bg-danger';
            break;
        case 'dark':
            icon = 'moon';
            bgClass = 'bg-dark';
            break;
        case 'info':
        default:
            icon = 'info-circle';
            bgClass = 'bg-info';
    }
    
    // HTML للإشعار
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0 position-fixed bottom-0 end-0 m-3" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-${icon} me-2"></i> ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    // إضافة الإشعار إلى الصفحة
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    
    // إنشاء وعرض الإشعار
    if (typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
        toast.show();
        
        // إزالة العنصر بعد الاختفاء
        toastElement.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    } else {
        // Fallback إذا لم يكن Bootstrap متوفراً
        setTimeout(() => {
            if (toastElement.parentNode) {
                toastElement.remove();
            }
        }, 3000);
    }
}

// ============================================
// 5. التحقق من نموذج "اتصل بنا"
// ============================================

function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const subject = document.getElementById('subject');
    
    let isValid = true;
    
    // إعادة تعيين أخطاء سابقة
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    // التحقق من الاسم
    if (!name || name.value.trim().length < 2) {
        if (name) {
            name.classList.add('is-invalid');
            name.nextElementSibling.textContent = 'الاسم يجب أن يكون على الأقل حرفين';
        }
        isValid = false;
    }
    
    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value.trim())) {
        if (email) {
            email.classList.add('is-invalid');
            email.nextElementSibling.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
        }
        isValid = false;
    }
    
    // التحقق من الموضوع
    if (subject && subject.value === '') {
        subject.classList.add('is-invalid');
        subject.nextElementSibling.textContent = 'يرجى اختيار موضوع الرسالة';
        isValid = false;
    }
    
    // التحقق من الرسالة
    if (!message || message.value.trim().length < 10) {
        if (message) {
            message.classList.add('is-invalid');
            message.nextElementSibling.textContent = 'الرسالة يجب أن تحتوي على 10 أحرف على الأقل';
        }
        isValid = false;
    }
    
    if (isValid) {
        // إظهار رسالة نجاح
        showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
        
        // إعادة تعيين النموذج
        if (name) name.value = '';
        if (email) email.value = '';
        if (subject) subject.value = '';
        if (message) message.value = '';
        
        // في تطبيق حقيقي، هنا نرسل البيانات للخادم
        // sendFormDataToServer(formData);
        
        return false; // منع إعادة تحميل الصفحة (للتجربة)
    } else {
        showToast('يرجى تصحيح الأخطاء في النموذج', 'warning');
        return false;
    }
}

// ============================================
// 6. فلترة الفعاليات في صفحة events.html
// ============================================

function filterEvents() {
    const category = document.getElementById('categoryFilter')?.value;
    const date = document.getElementById('dateFilter')?.value;
    const location = document.getElementById('locationFilter')?.value?.toLowerCase();
    const search = document.getElementById('searchFilter')?.value?.toLowerCase();
    
    const eventCards = document.querySelectorAll('.event-card');
    let visibleCount = 0;
    
    eventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardDate = card.getAttribute('data-date');
        const cardLocation = card.getAttribute('data-location')?.toLowerCase();
        const cardTitle = card.querySelector('.card-title')?.textContent?.toLowerCase() || '';
        const cardDescription = card.querySelector('.card-text')?.textContent?.toLowerCase() || '';
        
        let showCard = true;
        
        // فلترة حسب التصنيف
        if (category && category !== 'all' && category !== cardCategory) {
            showCard = false;
        }
        
        // فلترة حسب التاريخ
        if (date && date !== cardDate) {
            showCard = false;
        }
        
        // فلترة حسب المكان
        if (location && cardLocation && !cardLocation.includes(location)) {
            showCard = false;
        }
        
        // فلترة حسب البحث النصي
        if (search && !cardTitle.includes(search) && !cardDescription.includes(search)) {
            showCard = false;
        }
        
        if (showCard) {
            card.style.display = 'block';
            visibleCount++;
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
    
    // تحديث عدد الفعاليات المعروضة
    const countElement = document.getElementById('eventCount');
    if (countElement) {
        countElement.textContent = `${visibleCount} فعالية`;
    }
    
    // إظهار رسالة إذا لم توجد نتائج
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    
    return false; // منع إعادة تحميل الصفحة
}

// دالة البحث في الفعاليات
function searchEvents() {
    filterEvents(); // استدعاء نفس دالة الفلترة
}

// دالة إعادة تعيين الفلاتر
function resetFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const locationFilter = document.getElementById('locationFilter');
    const searchFilter = document.getElementById('searchFilter');
    
    if (categoryFilter) categoryFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    if (locationFilter) locationFilter.value = '';
    if (searchFilter) searchFilter.value = '';
    
    filterEvents();
    showToast('تمت إعادة تعيين الفلاتر', 'info');
}

// ============================================
// 7. إضافة للتقويم ومشاركة الفعاليات
// ============================================

// دالة إضافة فعالية للتقويم
function addToCalendar(eventTitle, eventDate, eventLocation) {
    // في تطبيق حقيقي، هنا نستخدم Google Calendar API أو iCalendar
    const calendarData = {
        title: eventTitle,
        start: eventDate,
        location: eventLocation
    };
    
    // محاكاة إضافة للتقويم
    const success = true; // محاكاة للنجاح
    
    if (success) {
        showToast(`تمت إضافة "${eventTitle}" إلى تقويمك`, 'success');
        
        // حفظ في localStorage (ميزة إضافية)
        let savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        savedEvents.push({
            ...calendarData,
            addedAt: new Date().toISOString()
        });
        localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));
    } else {
        showToast('حدث خطأ في إضافة الفعالية للتقويم', 'error');
    }
    
    return false;
}

// دالة مشاركة الفعالية
function shareEvent(eventTitle, eventUrl) {
    // التحقق إذا كان واجهة المشاركة متوفرة
    if (navigator.share) {
        navigator.share({
            title: eventTitle,
            text: 'تفضل بزيارة هذا الحدث المميز:',
            url: eventUrl
        })
        .then(() => {
            console.log('✅ تمت المشاركة بنجاح');
        })
        .catch(error => {
            console.log('❌ تم إلغاء المشاركة:', error);
            copyToClipboard(eventUrl);
        });
    } else {
        // Fallback: نسخ الرابط إلى الحافظة
        copyToClipboard(eventUrl);
    }
}

// دالة نسخ النص إلى الحافظة
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showToast('تم نسخ رابط الحدث إلى الحافظة', 'success');
        })
        .catch(err => {
            console.error('❌ فشل نسخ النص:', err);
            showToast('فشل نسخ الرابط، يرجى المحاولة يدوياً', 'error');
        });
}

// ============================================
// 8. زر الانتقال للأعلى (Scroll to Top)
// ============================================

function createScrollToTopButton() {
    // التحقق إذا كان الزر موجوداً بالفعل
    if (document.getElementById('scrollToTopBtn')) {
        return;
    }
    
    // إنشاء الزر
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scrollToTopBtn';
    scrollButton.className = 'btn btn-primary rounded-circle shadow-lg';
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '20px';
    scrollButton.style.left = '20px';
    scrollButton.style.width = '50px';
    scrollButton.style.height = '50px';
    scrollButton.style.zIndex = '1000';
    scrollButton.style.display = 'none';
    scrollButton.style.transition = 'opacity 0.3s';
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.title = 'انتقل للأعلى';
    scrollButton.setAttribute('aria-label', 'انتقل للأعلى');
    
    // إضافة حدث النقر
    scrollButton.onclick = scrollToTop;
    
    // إضافة الزر إلى الصفحة
    document.body.appendChild(scrollButton);
    
    // إظهار/إخفاء الزر عند التمرير
    window.addEventListener('scroll', toggleScrollButton);
    
    console.log('✅ تم إنشاء زر الانتقال للأعلى');
}

// دالة التمرير للأعلى
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// دالة التحكم في ظهور زر التمرير للأعلى
function toggleScrollButton() {
    const scrollButton = document.getElementById('scrollToTopBtn');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
            setTimeout(() => {
                scrollButton.style.opacity = '1';
            }, 10);
        } else {
            scrollButton.style.opacity = '0';
            setTimeout(() => {
                scrollButton.style.display = 'none';
            }, 300);
        }
    }
}

// ============================================
// 9. حفظ وتحميل تفضيلات المستخدم
// ============================================

// دالة حفظ تفضيلات المستخدم
function saveUserPreference(key, value) {
    try {
        let preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
        preferences[key] = value;
        preferences.lastUpdated = new Date().toISOString();
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        return true;
    } catch (error) {
        console.error('❌ خطأ في حفظ التفضيلات:', error);
        return false;
    }
}

// دالة تحميل تفضيلات المستخدم
function loadUserPreferences() {
    try {
        const preferences = JSON.parse(localStorage.getItem('userPreferences'));
        
        if (preferences) {
            // تطبيق تفضيلات وضع الليل
            if (preferences.darkMode === true) {
                document.body.classList.add('dark-mode');
                updateDarkModeButton(true);
            }
            
            // تطبيق تفضيلات الفلترة في صفحة الفعاليات
            if (window.location.pathname.includes('events.html')) {
                const categoryFilter = document.getElementById('categoryFilter');
                const locationFilter = document.getElementById('locationFilter');
                
                if (categoryFilter && preferences.favoriteCategory) {
                    categoryFilter.value = preferences.favoriteCategory;
                }
                
                if (locationFilter && preferences.favoriteLocation) {
                    locationFilter.value = preferences.favoriteLocation;
                }
            }
            
            console.log('✅ تم تحميل تفضيلات المستخدم:', preferences);
            return preferences;
        }
    } catch (error) {
        console.error('❌ خطأ في تحميل التفضيلات:', error);
    }
    
    return null;
}

// دالة حفظ تصنيف مفضل
function saveFavoriteCategory(category) {
    if (category) {
        saveUserPreference('favoriteCategory', category);
        showToast(`تم حفظ "${category}" كتصنيف مفضل`, 'success');
    }
}

// دالة حفظ مكان مفضل
function saveFavoriteLocation(location) {
    if (location) {
        saveUserPreference('favoriteLocation', location);
        showToast(`تم حفظ "${location}" كمكان مفضل`, 'success');
    }
}

// ============================================
// 10. دالة إظهار "الحدث اليوم" (ميزة إضافية)
// ============================================

function showTodayEvent() {
    // الحصول على تاريخ اليوم
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // محاكاة حدث اليوم (في تطبيق حقيقي، سيكون من قاعدة البيانات)
    const todayEvent = {
        title: "مهرجان الطعام العالمي",
        time: "10:00 - 22:00",
        location: "الحديقة المركزية",
        date: todayStr
    };
    
    // التحقق إذا كان هناك حدث اليوم
    const eventDate = todayStr; // في تطبيق حقيقي، نقارن مع تاريخ الحدث
    
    if (eventDate === todayStr) {
        // إظهار إشعار عن حدث اليوم
        const notification = document.createElement('div');
        notification.className = 'alert alert-info alert-dismissible fade show mt-3';
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-calendar-star fa-2x me-3"></i>
                <div>
                    <h5 class="alert-heading mb-1">🎉 حدث اليوم!</h5>
                    <p class="mb-0">${todayEvent.title} - ${todayEvent.time} في ${todayEvent.location}</p>
                </div>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // إضافة الإشعار في بداية main
        const mainContainer = document.querySelector('main');
        if (mainContainer) {
            mainContainer.insertBefore(notification, mainContainer.firstChild);
        }
    }
}

// ============================================
// 11. دوال التهيئة الخاصة بكل صفحة
// ============================================

function initializeEventsPage() {
    console.log('📅 تهيئة صفحة الفعاليات');
    
    // تحميل الفعاليات إذا لم تكن محملة
    if (typeof allEvents === 'undefined') {
        loadEventsFromStorage();
    }
    
    // تطبيق الفلترة إذا كانت هناك معايير في الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const date = urlParams.get('date');
    
    if (category || date) {
        setTimeout(() => {
            if (category) {
                const categoryFilter = document.getElementById('categoryFilter');
                if (categoryFilter) categoryFilter.value = category;
            }
            if (date) {
                const dateFilter = document.getElementById('dateFilter');
                if (dateFilter) dateFilter.value = date;
            }
            filterEvents();
        }, 500);
    }
}

function initializeEventDetailsPage() {
    console.log('🔍 تهيئة صفحة تفاصيل الفعالية');
    
    // تحميل بيانات الفعالية من الرابط
    loadEventFromURL();
}

function initializeContactPage() {
    console.log('📞 تهيئة صفحة اتصل بنا');
    
    // إضافة أحداث للنماذج
    const contactForm = document.getElementById('contactForm');
    const eventForm = document.getElementById('eventForm');
    const partnershipForm = document.getElementById('partnershipForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
    
    if (eventForm) {
        eventForm.addEventListener('submit', submitEventForm);
    }
    
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', submitPartnershipForm);
    }
}

function initializeAboutPage() {
    console.log('ℹ️ تهيئة صفحة عن الدليل');
    
    // تحديث الإحصائيات بتحريك الأرقام
    animateStatistics();
}

// ============================================
// 12. دوال إرسال النماذج
// ============================================

function submitEventForm(event) {
    if (event) event.preventDefault();
    
    // محاكاة إرسال النموذج
    showToast('تم استلام طلب إضافة الفعالية! سنراجعه خلال 48 ساعة.', 'success');
    
    // إعادة تعيين النموذج
    const form = document.getElementById('eventForm');
    if (form) form.reset();
    
    return false;
}

function submitPartnershipForm(event) {
    if (event) event.preventDefault();
    
    // محاكاة إرسال النموذج
    showToast('تم استلام طلب الشراكة! سيتواصل معك فريقنا خلال 3 أيام عمل.', 'success');
    
    // إعادة تعيين النموذج
    const form = document.getElementById('partnershipForm');
    if (form) form.reset();
    
    return false;
}

// ============================================
// 13. دوال التحميل من Storage
// ============================================

function loadEventsFromStorage() {
    try {
        const events = JSON.parse(localStorage.getItem('eventsData'));
        if (events && events.length > 0) {
            console.log(`📊 تم تحميل ${events.length} فعالية من التخزين المحلي`);
            return events;
        }
    } catch (error) {
        console.error('❌ خطأ في تحميل الفعاليات:', error);
    }
    
    // إذا لم توجد بيانات، نرجع مصفوفة فارغة
    return [];
}

function loadEventFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    
    if (eventId) {
        console.log(`🔍 تحميل الفعالية رقم: ${eventId}`);
        
        // في تطبيق حقيقي، هنا نطلب البيانات من الخادم
        // للآن، سنستخدم البيانات المحلية
        const event = getEventById(eventId);
        
        if (event) {
            updateEventDetails(event);
        } else {
            showEventNotFound();
        }
    }
}

function getEventById(eventId) {
    // هذه بيانات تجريبية، في تطبيق حقيقي تأتي من قاعدة بيانات
    const events = [
        {
            id: 1,
            title: "مهرجان الطعام العالمي",
            date: "الجمعة 18 ديسمبر 2025",
            time: "10:00 صباحاً - 10:00 مساءً",
            location: "الحديقة المركزية",
            category: "ثقافة",
            image: "assets/images/food-festival.jpg",
            description: "مهرجان الطعام العالمي هو حدث سنوي يجمع أفضل المطاعم والشيفات...",
            price: "مجاني",
            organizer: "بلدية المدينة",
            organizerInfo: "بلدية المدينة هي الجهة المنظمة للعديد من الفعاليات الثقافية والترفيهية في المدينة."
        },
        // ... المزيد من الفعاليات
    ];
    
    return events.find(e => e.id == eventId) || events[0];
}

function updateEventDetails(event) {
    // تحديث عناصر الصفحة ببيانات الفعالية
    const elements = {
        'eventTitle': event.title,
        'eventCategory': event.category,
        'eventDate': event.date,
        'eventTime': event.time,
        'eventLocation': event.location,
        'eventDescription': event.description,
        'eventPrice': event.price,
        'eventOrganizer': event.organizer
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    // تحديث الصورة الرئيسية
    const mainImage = document.getElementById('mainEventImage');
    if (mainImage && event.image) {
        mainImage.src = event.image;
        mainImage.alt = event.title;
    }
    
    // تحديث عنوان الصفحة
    document.title = `${event.title} - دليل فعاليات المدينة`;
}

function showEventNotFound() {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div class="container mt-5 pt-5">
                <div class="row justify-content-center">
                    <div class="col-md-8 text-center">
                        <i class="fas fa-calendar-times fa-5x text-muted mb-4"></i>
                        <h1 class="display-5 text-muted mb-3">الفعالية غير موجودة</h1>
                        <p class="lead text-muted mb-4">عذراً، لم يتم العثور على الفعالية المطلوبة.</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                            <a href="events.html" class="btn btn-primary btn-lg">
                                <i class="fas fa-calendar-alt me-2"></i> عرض جميع الفعاليات
                            </a>
                            <a href="index.html" class="btn btn-outline-primary btn-lg ms-2">
                                <i class="fas fa-home me-2"></i> العودة للرئيسية
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// ============================================
// 14. دوال الرسوم المتحركة والتأثيرات
// ============================================

function animateStatistics() {
    const counters = document.querySelectorAll('.stat-counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000; // مدة التحريك بالمللي ثانية
        const increment = target / (duration / 16); // 60 إطار في الثانية
        
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

function initializeSmoothScrolling() {
    // التمرير السلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initializeIntersectionObserver() {
    // مراقبة ظهور العناصر لإضافة تأثيرات
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة البطاقات والعناصر المهمة
    document.querySelectorAll('.card, .feature-card, .stat-item').forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// 15. دوال المساعدة العامة
// ============================================

function setCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
    };
    
    return date.toLocaleDateString('ar-SA', options);
}

function formatTime(timeString) {
    return timeString; // يمكن إضافة تنسيق أكثر تطوراً
}

function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// ============================================
// 16. دوال للبحث المتقدم (ميزة إضافية)
// ============================================

function openAdvancedSearch() {
    // إنشاء مودال البحث المتقدم
    const modalHTML = `
        <div class="modal fade" id="advancedSearchModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">🔍 بحث متقدم عن الفعاليات</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="advancedSearchForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">الكلمة المفتاحية</label>
                                    <input type="text" class="form-control" placeholder="ابحث في عنوان أو وصف الفعالية">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">نطاق السعر</label>
                                    <select class="form-select">
                                        <option value="">الكل</option>
                                        <option value="free">مجاني فقط</option>
                                        <option value="paid">مدفوع فقط</option>
                                        <option value="0-50">حتى 50 ريال</option>
                                        <option value="50-100">50 - 100 ريال</option>
                                        <option value="100+">أكثر من 100 ريال</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">من تاريخ</label>
                                    <input type="date" class="form-control">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">إلى تاريخ</label>
                                    <input type="date" class="form-control">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">ترتيب النتائج حسب</label>
                                <select class="form-select">
                                    <option value="date_asc">التاريخ (من الأقرب إلى الأبعد)</option>
                                    <option value="date_desc">التاريخ (من الأبعد إلى الأقرب)</option>
                                    <option value="popularity">الشعبية</option>
                                    <option value="price_asc">السعر (من الأقل إلى الأعلى)</option>
                                    <option value="price_desc">السعر (من الأعلى إلى الأقل)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="includePast">
                                    <label class="form-check-label" for="includePast">
                                        تضمين الفعاليات الماضية
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                        <button type="button" class="btn btn-primary" onclick="performAdvancedSearch()">بحث متقدم</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة المودال إلى الصفحة
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // عرض المودال
    const modalElement = document.getElementById('advancedSearchModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    // تنظيف المودال بعد الإغلاق
    modalElement.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

function performAdvancedSearch() {
    // محاكاة البحث المتقدم
    showToast('جاري البحث المتقدم...', 'info');
    
    setTimeout(() => {
        showToast('تم العثور على 15 فعالية مطابقة لبحثك', 'success');
        
        // إغلاق المودال
        const modalElement = document.getElementById('advancedSearchModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        }
    }, 1500);
}

// ============================================
// 17. دالة طباعة تفاصيل الفعالية
// ============================================

function printEventDetails() {
    // حفظ وضع الليل الحالي
    const wasDarkMode = document.body.classList.contains('dark-mode');
    
    // إيقاف وضع الليل مؤقتاً للطباعة
    if (wasDarkMode) {
        document.body.classList.remove('dark-mode');
    }
    
    // الانتظار قليلاً ثم الطباعة
    setTimeout(() => {
        window.print();
        
        // إعادة وضع الليل إذا كان مفعلاً
        if (wasDarkMode) {
            setTimeout(() => {
                document.body.classList.add('dark-mode');
            }, 100);
        }
    }, 100);
}

// ============================================
// 18. دالة حفظ الفعالية في المفضلة
// ============================================

function saveToFavorites(eventId, eventTitle) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // التحقق إذا كانت الفعالية محفوظة مسبقاً
    const existingIndex = favorites.findIndex(fav => fav.id == eventId);
    
    if (existingIndex === -1) {
        // إضافة إلى المفضلة
        favorites.push({
            id: eventId,
            title: eventTitle,
            savedAt: new Date().toISOString()
        });
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showToast(`تمت إضافة "${eventTitle}" إلى المفضلة`, 'success');
        
        // تحديث زر المفضلة إذا كان موجوداً
        updateFavoriteButton(eventId, true);
        
        return true;
    } else {
        // إزالة من المفضلة
        favorites.splice(existingIndex, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showToast(`تمت إزالة "${eventTitle}" من المفضلة`, 'info');
        
        // تحديث زر المفضلة إذا كان موجوداً
        updateFavoriteButton(eventId, false);
        
        return false;
    }
}

function updateFavoriteButton(eventId, isFavorite) {
    const favoriteButtons = document.querySelectorAll(`[data-event-id="${eventId}"]`);
    
    favoriteButtons.forEach(button => {
        if (isFavorite) {
            button.innerHTML = '<i class="fas fa-heart text-danger"></i>';
            button.title = 'إزالة من المفضلة';
        } else {
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.title = 'أضف إلى المفضلة';
        }
    });
}

function checkIfFavorite(eventId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.id == eventId);
}

// ============================================
// 19. تهيئة الصفحات الخاصة
// ============================================

// دالة لتحميل الأحداث في الصفحة الرئيسية
function loadHomepageEvents() {
    // هذه دالة تجريبية، في تطبيق حقيقي تأتي البيانات من API
    const events = [
        {
            id: 1,
            title: "مهرجان الطعام العالمي",
            date: "2025-12-18",
            location: "الحديقة المركزية",
            category: "ثقافة",
            image: "assets/images/food-festival.jpg",
            description: "استمتع بمأكولات من حول العالم"
        },
        // ... المزيد من الفعاليات
    ];
    
    return events;
}

// ============================================
// 20. تصدير الدوال للاستخدام العام (للتجربة فقط)
// ============================================

// جعل الدوال الأساسية متاحة عالمياً للاستخدام في الصفحات
window.toggleDarkMode = toggleDarkMode;
window.validateContactForm = validateContactForm;
window.filterEvents = filterEvents;
window.searchEvents = searchEvents;
window.resetFilters = resetFilters;
window.addToCalendar = addToCalendar;
window.shareEvent = shareEvent;
window.copyToClipboard = copyToClipboard;
window.scrollToTop = scrollToTop;
window.saveFavoriteCategory = saveFavoriteCategory;
window.saveFavoriteLocation = saveFavoriteLocation;
window.openAdvancedSearch = openAdvancedSearch;
window.performAdvancedSearch = performAdvancedSearch;
window.printEventDetails = printEventDetails;
window.saveToFavorites = saveToFavorites;

console.log('✅ تم تحميل ملف JavaScript الرئيسي بنجاح');
console.log('📁 المتاحة عالمياً: toggleDarkMode, validateContactForm, filterEvents, ...');

// ============================================
// نهاية ملف main.js
// ============================================
