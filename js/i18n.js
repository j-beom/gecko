// 다국어 번역 데이터
const translations = {
    ko: {
        // Header
        siteName: "크레스티드 게코 분양",
        breeders: "브리더 정보",
        
        // Hero
        heroTitle: "프리미엄 크레스티드 게코",
        heroSubtitle: "최고 품질의 유전자를 가진 건강한 개체를 만나보세요",
        
        // Filters
        filters: "필터",
        resetFilters: "초기화",
        search: "검색",
        searchPlaceholder: "이름으로 검색...",
        genetics: "유전자",
        sex: "성별",
        size: "크기",
        sortBy: "정렬",
        sortNewest: "최신순",
        sortOldest: "오래된순",
        sortPriceHigh: "가격 높은순",
        sortPriceLow: "가격 낮은순",
        sortName: "이름순",
        
        // Results
        showing: "표시 중:",
        geckos: "개체",
        noResults: "검색 결과가 없습니다.",
        
        // Sex
        Male: "수컷",
        Female: "암컷",
        Indiscriminate: "미감별",
        
        // Size
        Baby: "베이비",
        Subadult: "준성체",
        Adult: "성체",
        
        // Status
        available: "분양 가능",
        reserved: "예약됨",
        sold: "분양 완료",
        
        // Card Labels
        sexLabel: "성별",
        sizeLabel: "크기",
        birthLabel: "생년월일",
        parents: "부모 정보",
        sire: "부친",
        dam: "모친",
        viewBreeder: "정보 보기",
        
        // Modal
        breederInfo: "브리더 정보",
        offspringCount: "자손 개체",
        close: "닫기",
        
        // Footer
        footerNote: "모든 개체는 건강하고 검역된 상태로 분양됩니다.",
        
        // Months
        months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
    },
    en: {
        // Header
        siteName: "Crested Gecko Shop",
        breeders: "Breeders",
        
        // Hero
        heroTitle: "Premium Crested Geckos",
        heroSubtitle: "Discover healthy geckos with the finest genetics",
        
        // Filters
        filters: "Filters",
        resetFilters: "Reset",
        search: "Search",
        searchPlaceholder: "Search by name...",
        genetics: "Genetics",
        sex: "Sex",
        size: "Size",
        sortBy: "Sort By",
        sortNewest: "Newest First",
        sortOldest: "Oldest First",
        sortPriceHigh: "Price: High to Low",
        sortPriceLow: "Price: Low to High",
        sortName: "Name",
        
        // Results
        showing: "Showing:",
        geckos: "Geckos",
        noResults: "No results found.",
        
        // Sex
        Male: "Male",
        Female: "Female",
        Indiscriminate: "Unsexed",
        
        // Size
        Baby: "Baby",
        Subadult: "Subadult",
        Adult: "Adult",
        
        // Status
        available: "Available",
        reserved: "Reserved",
        sold: "Sold",
        
        // Card Labels
        sexLabel: "Sex",
        sizeLabel: "Size",
        birthLabel: "Birth Date",
        parents: "Parents",
        sire: "Sire",
        dam: "Dam",
        viewBreeder: "View Info",
        
        // Modal
        breederInfo: "Breeder Information",
        offspringCount: "Offspring",
        close: "Close",
        
        // Footer
        footerNote: "All geckos are healthy and quarantined before adoption.",
        
        // Months
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
};

// 현재 언어 상태
let currentLang = localStorage.getItem('language') || 'ko';

// 언어 가져오기
function getCurrentLang() {
    return currentLang;
}

// 언어 설정
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updatePageLanguage();
}

// 번역 텍스트 가져오기
function t(key) {
    return translations[currentLang][key] || key;
}

// 페이지의 모든 번역 가능한 요소 업데이트
function updatePageLanguage() {
    // data-i18n 속성을 가진 모든 요소 업데이트
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // Input 요소는 value 업데이트하지 않음 (사용자 입력 유지)
        } else {
            element.textContent = translation;
        }
    });
    
    // data-i18n-placeholder 속성을 가진 요소 업데이트
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // 언어 토글 버튼 업데이트
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = currentLang.toUpperCase();
    }
    
    // HTML lang 속성 업데이트
    document.documentElement.lang = currentLang;
}

// 언어 토글
function toggleLanguage() {
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
}

// 날짜 포맷팅
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    if (currentLang === 'ko') {
        return `${year}년 ${month + 1}월 ${day}일`;
    } else {
        return `${t('months')[month]} ${day}, ${year}`;
    }
}

// 가격 포맷팅
function formatPrice(price) {
    if (currentLang === 'ko') {
        return price.toLocaleString('ko-KR') + '원';
    } else {
        return '₩' + price.toLocaleString('en-US');
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();
});
