// ========================================
// 크레스티드 게코 분양 사이트 - 메인 로직
// ========================================

// 전역 상태
let filteredGeckos = [...geckosData];
let activeFilters = {
    genetics: new Set(),
    sex: new Set(),
    size: new Set(),
    search: ''
};
let currentSort = 'newest';
let currentLightboxIndex = 0;
let currentLightboxImages = [];

// ========================================
// 초기화
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // 필터 생성
    createFilterPills();
    
    // 이벤트 리스너 등록
    setupEventListeners();
    
    // 초기 렌더링
    renderGeckos();
    
    // 언어 초기화
    updatePageLanguage();
}

// ========================================
// 필터 필 생성
// ========================================
function createFilterPills() {
    // 유전자 필터
    const geneticsContainer = document.getElementById('geneticsFilter');
    geneticsList.forEach(genetic => {
        const pill = createFilterPill(genetic, 'genetics');
        geneticsContainer.appendChild(pill);
    });
    
    // 성별 필터
    const sexContainer = document.getElementById('sexFilter');
    sexList.forEach(sex => {
        const pill = createFilterPill(sex, 'sex');
        sexContainer.appendChild(pill);
    });
    
    // 크기 필터
    const sizeContainer = document.getElementById('sizeFilter');
    sizeList.forEach(size => {
        const pill = createFilterPill(size, 'size');
        sizeContainer.appendChild(pill);
    });
}

function createFilterPill(value, category) {
    const pill = document.createElement('button');
    pill.className = 'filter-pill';
    pill.textContent = t(value) || value;
    pill.dataset.value = value;
    pill.dataset.category = category;
    
    pill.addEventListener('click', () => {
        toggleFilter(category, value, pill);
    });
    
    return pill;
}

// ========================================
// 이벤트 리스너 설정
// ========================================
function setupEventListeners() {
    // 언어 토글
    document.getElementById('langToggle').addEventListener('click', () => {
        toggleLanguage();
        updateFiltersLanguage();
        renderGeckos();
    });
    
    // 검색
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce((e) => {
        activeFilters.search = e.target.value.toLowerCase();
        applyFilters();
    }, 300));
    
    // 정렬
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderGeckos();
    });
    
    // 필터 초기화
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    
    // 모달 닫기
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', closeModal);
    
    // 라이트박스
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));
    
    // ESC 키로 모달/라이트박스 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeLightbox();
        }
        if (document.getElementById('lightbox').classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

// ========================================
// 필터링
// ========================================
function toggleFilter(category, value, pill) {
    if (activeFilters[category].has(value)) {
        activeFilters[category].delete(value);
        pill.classList.remove('active');
    } else {
        activeFilters[category].add(value);
        pill.classList.add('active');
    }
    applyFilters();
}

function applyFilters() {
    filteredGeckos = geckosData.filter(gecko => {
        // 검색 필터
        if (activeFilters.search && !gecko.name.toLowerCase().includes(activeFilters.search)) {
            return false;
        }
        
        // 유전자 필터 (OR 조건)
        if (activeFilters.genetics.size > 0) {
            const hasMatchingGenetic = gecko.genetics.some(g => 
                activeFilters.genetics.has(g)
            );
            if (!hasMatchingGenetic) return false;
        }
        
        // 성별 필터
        if (activeFilters.sex.size > 0 && !activeFilters.sex.has(gecko.sex)) {
            return false;
        }
        
        // 크기 필터
        if (activeFilters.size.size > 0 && !activeFilters.size.has(gecko.size)) {
            return false;
        }
        
        return true;
    });
    
    renderGeckos();
}

function resetFilters() {
    // 필터 상태 초기화
    activeFilters = {
        genetics: new Set(),
        sex: new Set(),
        size: new Set(),
        search: ''
    };
    
    // UI 초기화
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'newest';
    currentSort = 'newest';
    
    // 재렌더링
    applyFilters();
}

// ========================================
// 정렬
// ========================================
function sortGeckos(geckos) {
    const sorted = [...geckos];
    
    switch (currentSort) {
        case 'newest':
            sorted.sort((a, b) => new Date(b.birthDate) - new Date(a.birthDate));
            break;
        case 'oldest':
            sorted.sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate));
            break;
        case 'priceHigh':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'priceLow':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    return sorted;
}

// ========================================
// 렌더링
// ========================================
function renderGeckos() {
    const grid = document.getElementById('geckoGrid');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');
    
    // 정렬
    const sortedGeckos = sortGeckos(filteredGeckos);
    
    // 결과 수 업데이트
    resultCount.textContent = sortedGeckos.length;
    
    // 결과가 없을 때
    if (sortedGeckos.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // 카드 렌더링
    grid.innerHTML = '';
    sortedGeckos.forEach(gecko => {
        const card = createGeckoCard(gecko);
        grid.appendChild(card);
    });
}

function createGeckoCard(gecko) {
    const card = document.createElement('div');
    card.className = 'gecko-card';
    
    const lang = getCurrentLang();
    const description = gecko.description[lang] || gecko.description.ko;
    
    card.innerHTML = `
        <div class="card-image-container" data-gecko-id="${gecko.id}">
            <img src="${gecko.images[0]}" alt="${gecko.name}" class="card-image" loading="lazy">
            <span class="card-status ${gecko.status}">${t(gecko.status)}</span>
        </div>
        <div class="card-body">
            <h3 class="card-name">${gecko.name}</h3>
            <div class="card-genetics">
                ${gecko.genetics.map(g => `<span class="genetic-tag">${g}</span>`).join('')}
            </div>
            <div class="card-info">
                <div class="info-item">
                    <span class="info-label">${t('sexLabel')}</span>
                    <span class="info-value">${t(gecko.sex)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">${t('sizeLabel')}</span>
                    <span class="info-value">${t(gecko.size)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">${t('birthLabel')}</span>
                    <span class="info-value">${formatDate(gecko.birthDate).split(' ')[0]}</span>
                </div>
            </div>
            <div class="card-parents">
                <p><strong>${t('sire')}:</strong> <span class="parent-link" data-breeder-id="${gecko.parents.sire}">${getBreederById(gecko.parents.sire)?.name || 'Unknown'}</span></p>
                <p><strong>${t('dam')}:</strong> <span class="parent-link" data-breeder-id="${gecko.parents.dam}">${getBreederById(gecko.parents.dam)?.name || 'Unknown'}</span></p>
            </div>
            <p class="card-description">${description}</p>
            <div class="card-footer">
                <span class="card-price">${formatPrice(gecko.price)}</span>
            </div>
        </div>
    `;
    
    // 이미지 클릭 이벤트
    card.querySelector('.card-image-container').addEventListener('click', () => {
        openLightbox(gecko.images, 0);
    });
    
    // 부모 링크 클릭 이벤트
    card.querySelectorAll('.parent-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const breederId = e.target.dataset.breederId;
            showBreederModal(breederId);
        });
    });
    
    return card;
}

// ========================================
// 브리더 모달
// ========================================
function showBreederModal(breederId) {
    const breeder = getBreederById(breederId);
    if (!breeder) return;
    
    const modal = document.getElementById('breederModal');
    const breederInfo = document.getElementById('breederInfo');
    const lang = getCurrentLang();
    const description = breeder.description[lang] || breeder.description.ko;
    
    breederInfo.innerHTML = `
        <h2>${breeder.name}</h2>
        <div class="card-image-container" style="margin-bottom: 1rem;">
            <img src="${breeder.images[0]}" alt="${breeder.name}" class="card-image">
        </div>
        <div class="card-genetics" style="margin-bottom: 1rem;">
            ${breeder.genetics.map(g => `<span class="genetic-tag">${g}</span>`).join('')}
        </div>
        <div class="card-info">
            <div class="info-item">
                <span class="info-label">${t('sexLabel')}</span>
                <span class="info-value">${t(breeder.sex)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">${t('birthLabel')}</span>
                <span class="info-value">${formatDate(breeder.birthDate)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">${t('offspringCount')}</span>
                <span class="info-value">${breeder.offspring.length}</span>
            </div>
        </div>
        <p class="card-description" style="margin-top: 1rem;">${description}</p>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('breederModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// 라이트박스
// ========================================
function openLightbox(images, index) {
    currentLightboxImages = images;
    currentLightboxIndex = index;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.src = images[index];
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 이전/다음 버튼 표시/숨김
    document.getElementById('lightboxPrev').style.display = images.length > 1 ? 'flex' : 'none';
    document.getElementById('lightboxNext').style.display = images.length > 1 ? 'flex' : 'none';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentLightboxImages.length - 1;
    } else if (currentLightboxIndex >= currentLightboxImages.length) {
        currentLightboxIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.src = currentLightboxImages[currentLightboxIndex];
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
}

// ========================================
// 유틸리티 함수
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function updateFiltersLanguage() {
    // 필터 필 텍스트 업데이트
    document.querySelectorAll('.filter-pill').forEach(pill => {
        const value = pill.dataset.value;
        pill.textContent = t(value) || value;
    });
}

// ========================================
// 이미지 로딩 에러 처리
// ========================================
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/400x300/e9ecef/666666?text=No+Image';
    }
}, true);

console.log('🦎 크레스티드 게코 분양 사이트 초기화 완료');
console.log(`📊 총 ${geckosData.length}개의 개체가 로드되었습니다.`);
console.log(`👨‍👩‍👧‍👦 총 ${breedersData.length}명의 브리더 정보가 로드되었습니다.`);
