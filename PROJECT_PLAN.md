# 크레스티드 게코 분양 사이트 개발 계획서

## 📋 프로젝트 개요
- **목적**: 크레스티드 게코 분양 개체를 효과적으로 소개하는 전문 웹사이트
- **타겟**: GitHub Pages 호스팅 → 향후 커스텀 도메인 연결
- **기술 스택**: HTML5, CSS3, Vanilla JavaScript (백엔드 없는 정적 사이트)

## 🎯 핵심 기능 요구사항

### 1. 다중 필터링 시스템
**유전자 필터** (29종)
- Normal, Lilly White, Cappuccino, Frappuccino, Luwak, Luwak Lilly
- Sable, Lilly Sable, Super Sable, Super Sable Lilly
- Azantic, Lilly Azantic, 100% Het Azantic, 66% Het Azantic, 50% Het Azantic
- 100% Het Lilly Azantic, 66% Het Lilly Azantic, 50% Het Lilly Azantic
- Chocho, Lilly ChoCho, 100% Het ChoCho, 66% Het ChoCho, 50% Het ChoCho
- 100% Het Lilly ChoCho, 66% Het Lilly ChoCho, 50% Het Lilly ChoCho
- Hypo, Lilly Hypo

**성별 필터** (3종)
- Male (수컷), Female (암컷), Indiscriminate (미감별)

**크기 필터** (3종)
- Baby (베이비), Subadult (준성체), Adult (성체)

### 2. 브리더(부모) 정보 시스템
- 부모 개체 전용 페이지/데이터베이스
- 모달 팝업으로 부모 정보 표시 (현재 페이지 유지)
- 부모 이미지, 유전자, 특징 등 상세 정보

### 3. 다국어 지원
- 한글/English 토글 버튼
- localStorage로 언어 설정 저장
- 모든 UI 텍스트 다국어 대응

### 4. 데이터 관리
- JSON 기반 데이터 구조
- 이미지는 `/images/geckos/` 폴더에 저장
- Git을 통한 손쉬운 추가/수정/삭제

### 5. 전문적인 UX/UI 기능
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 카드 그리드 레이아웃
- 이미지 라이트박스
- 로딩 애니메이션
- 검색 기능
- 정렬 기능 (가격, 이름, 날짜)
- 페이지네이션 or 무한 스크롤
- SEO 최적화 (메타 태그, Open Graph)

## 🏗️ 프로젝트 구조

```
crested-gecko-site/
├── index.html                 # 메인 페이지
├── breeders.html             # 브리더(부모) 정보 페이지
├── css/
│   ├── main.css              # 메인 스타일
│   ├── filters.css           # 필터 스타일
│   ├── cards.css             # 카드 스타일
│   └── responsive.css        # 반응형 스타일
├── js/
│   ├── config.js             # 설정 및 상수
│   ├── data.js               # 게코 데이터 (JSON)
│   ├── breeders.js           # 브리더 데이터
│   ├── i18n.js               # 다국어 처리
│   ├── filters.js            # 필터링 로직
│   ├── cards.js              # 카드 렌더링
│   ├── modal.js              # 모달 관리
│   └── main.js               # 메인 앱 로직
├── images/
│   ├── geckos/               # 게코 이미지
│   ├── breeders/             # 브리더 이미지
│   └── ui/                   # UI 아이콘
├── data/
│   ├── geckos.json           # 게코 데이터
│   └── breeders.json         # 브리더 데이터
├── README.md                 # 사용 설명서
└── .gitignore
```

## 📊 데이터 스키마

### Gecko 데이터 구조
```json
{
  "id": "gecko-001",
  "name": "Flame",
  "genetics": ["Super Sable", "Lilly White"],
  "sex": "Male",
  "size": "Adult",
  "birthDate": "2023-05-15",
  "price": 250000,
  "images": ["gecko-001-1.jpg", "gecko-001-2.jpg"],
  "parents": {
    "sire": "breeder-001",
    "dam": "breeder-002"
  },
  "description": {
    "ko": "아름다운 슈퍼 세이블 릴리 화이트 개체입니다.",
    "en": "Beautiful Super Sable Lilly White gecko."
  },
  "status": "available",
  "featured": true
}
```

### Breeder 데이터 구조
```json
{
  "id": "breeder-001",
  "name": "Thor",
  "genetics": ["Super Sable"],
  "sex": "Male",
  "birthDate": "2021-03-10",
  "images": ["breeder-001-1.jpg"],
  "description": {
    "ko": "우수한 슈퍼 세이블 종친",
    "en": "Excellent Super Sable breeder"
  },
  "offspring": ["gecko-001", "gecko-005"]
}
```

## 🎨 디자인 컨셉
- **색상**: 자연스러운 녹색/갈색 톤 (게코 서식지 연상)
- **폰트**: Pretendard (한글), Inter (영문)
- **레이아웃**: 카드 그리드 (3열 데스크톱, 2열 태블릿, 1열 모바일)
- **애니메이션**: 부드러운 fade-in, hover 효과

## ⚙️ 기술적 구현 전략

### 1. 필터링 시스템
```javascript
// 다중 선택 필터 (AND 조건)
// 각 필터 카테고리 내에서는 OR 조건
// 실시간 필터링 (debounce 적용)
```

### 2. 부모 정보 모달
```javascript
// 부모 ID 클릭 시 모달 오픈
// 모달 내 부모 상세 정보 표시
// ESC 키, 배경 클릭으로 닫기
// 스크롤 방지 처리
```

### 3. 다국어 처리
```javascript
// i18n 객체로 모든 텍스트 관리
// localStorage에 언어 설정 저장
// 언어 변경 시 전체 페이지 재렌더링
```

### 4. 이미지 최적화
- WebP 포맷 사용 (fallback: JPG)
- Lazy loading 구현
- 썸네일/원본 분리
- 이미지 압축 (80% 품질)

### 5. GitHub Pages 배포
```bash
# gh-pages 브랜치 자동 배포
# Custom domain 설정 (CNAME 파일)
# HTTPS 자동 적용
```

## 📱 반응형 브레이크포인트
- Mobile: < 768px (1열)
- Tablet: 768px - 1024px (2열)
- Desktop: > 1024px (3열)
- Large Desktop: > 1440px (4열)

## 🚀 개발 단계

### Phase 1: 기본 구조 (예시 제작)
- HTML 템플릿 생성
- CSS 기본 스타일링
- 샘플 데이터 3-5개
- 기본 필터링 기능

### Phase 2: 핵심 기능
- 전체 필터링 시스템
- 브리더 모달
- 다국어 시스템
- 카드 렌더링

### Phase 3: 고급 기능
- 검색 기능
- 정렬 기능
- 이미지 라이트박스
- 애니메이션

### Phase 4: 최적화
- 성능 최적화
- SEO 최적화
- 크로스 브라우저 테스트
- 접근성 개선

## 📝 데이터 추가 프로세스
1. 이미지를 `/images/geckos/` 폴더에 업로드
2. `data/geckos.json` 파일에 데이터 추가
3. Git commit & push
4. GitHub Pages 자동 업데이트

## 🔒 보안 고려사항
- XSS 방지 (텍스트 sanitize)
- 이미지 경로 검증
- CORS 설정

## 📈 향후 확장 가능성
- 관리자 페이지 (별도 인증)
- 예약 시스템
- 결제 연동
- 이메일 문의 폼
- 소셜 미디어 연동
- Google Analytics

---

## ✅ 다음 단계
지금부터 **Phase 1** 예시 코드를 생성하겠습니다.
간단하면서도 전문적인 프로토타입을 만들어 드리겠습니다.
