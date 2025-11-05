// 크레스티드 게코 샘플 데이터
const geckosData = [
    {
        id: "gecko-001",
        name: "Flame",
        genetics: ["Super Sable", "Lilly White"],
        sex: "Male",
        size: "Adult",
        birthDate: "2023-05-15",
        price: 350000,
        images: [
            "https://via.placeholder.com/400x300/4a7c2b/ffffff?text=Flame+1",
            "https://via.placeholder.com/400x300/2d5016/ffffff?text=Flame+2"
        ],
        parents: {
            sire: "breeder-001",
            dam: "breeder-002"
        },
        description: {
            ko: "아름다운 슈퍼 세이블 릴리 화이트 개체입니다. 건강하고 활발한 성격을 가지고 있습니다.",
            en: "Beautiful Super Sable Lilly White gecko. Healthy and active personality."
        },
        status: "available",
        featured: true
    },
    {
        id: "gecko-002",
        name: "Aurora",
        genetics: ["Lilly Azantic"],
        sex: "Female",
        size: "Subadult",
        birthDate: "2024-02-20",
        price: 280000,
        images: [
            "https://via.placeholder.com/400x300/c9a961/ffffff?text=Aurora+1",
            "https://via.placeholder.com/400x300/8b6914/ffffff?text=Aurora+2"
        ],
        parents: {
            sire: "breeder-003",
            dam: "breeder-004"
        },
        description: {
            ko: "릴리 아잔틱 암컷입니다. 색상이 매우 선명하고 아름답습니다.",
            en: "Lilly Azantic female. Very vibrant and beautiful coloration."
        },
        status: "available",
        featured: true
    },
    {
        id: "gecko-003",
        name: "Mocha",
        genetics: ["Cappuccino", "Luwak"],
        sex: "Male",
        size: "Baby",
        birthDate: "2024-08-10",
        price: 180000,
        images: [
            "https://via.placeholder.com/400x300/8b6914/ffffff?text=Mocha+1"
        ],
        parents: {
            sire: "breeder-001",
            dam: "breeder-005"
        },
        description: {
            ko: "카푸치노 루왁 베이비입니다. 성장 잠재력이 뛰어납니다.",
            en: "Cappuccino Luwak baby. Excellent growth potential."
        },
        status: "available",
        featured: false
    },
    {
        id: "gecko-004",
        name: "Shadow",
        genetics: ["Super Sable Lilly", "Hypo"],
        sex: "Male",
        size: "Adult",
        birthDate: "2022-11-05",
        price: 420000,
        images: [
            "https://via.placeholder.com/400x300/1a3309/ffffff?text=Shadow+1",
            "https://via.placeholder.com/400x300/2d5016/ffffff?text=Shadow+2",
            "https://via.placeholder.com/400x300/4a7c2b/ffffff?text=Shadow+3"
        ],
        parents: {
            sire: "breeder-003",
            dam: "breeder-002"
        },
        description: {
            ko: "슈퍼 세이블 릴리 하이포 수컷입니다. 종친으로도 사용 가능한 최상급 개체입니다.",
            en: "Super Sable Lilly Hypo male. Premium quality, suitable for breeding."
        },
        status: "reserved",
        featured: true
    },
    {
        id: "gecko-005",
        name: "Luna",
        genetics: ["Lilly ChoCho", "50% Het Azantic"],
        sex: "Female",
        size: "Subadult",
        birthDate: "2024-03-15",
        price: 320000,
        images: [
            "https://via.placeholder.com/400x300/c9a961/ffffff?text=Luna+1",
            "https://via.placeholder.com/400x300/8b6914/ffffff?text=Luna+2"
        ],
        parents: {
            sire: "breeder-006",
            dam: "breeder-004"
        },
        description: {
            ko: "릴리 초코 50% Het 아잔틱 암컷입니다. 희귀한 유전자 조합입니다.",
            en: "Lilly ChoCho 50% Het Azantic female. Rare genetic combination."
        },
        status: "available",
        featured: true
    },
    {
        id: "gecko-006",
        name: "Blaze",
        genetics: ["Frappuccino"],
        sex: "Indiscriminate",
        size: "Baby",
        birthDate: "2024-09-01",
        price: 150000,
        images: [
            "https://via.placeholder.com/400x300/c9a961/ffffff?text=Blaze+1"
        ],
        parents: {
            sire: "breeder-001",
            dam: "breeder-005"
        },
        description: {
            ko: "프라푸치노 베이비입니다. 성별 미감별 상태입니다.",
            en: "Frappuccino baby. Sex not yet determined."
        },
        status: "available",
        featured: false
    },
    {
        id: "gecko-007",
        name: "Crystal",
        genetics: ["Lilly White", "100% Het Azantic"],
        sex: "Female",
        size: "Adult",
        birthDate: "2023-01-20",
        price: 380000,
        images: [
            "https://via.placeholder.com/400x300/ffffff/4a7c2b?text=Crystal+1",
            "https://via.placeholder.com/400x300/f0f0f0/2d5016?text=Crystal+2"
        ],
        parents: {
            sire: "breeder-003",
            dam: "breeder-007"
        },
        description: {
            ko: "릴리 화이트 100% Het 아잔틱 암컷입니다. 종친용으로 최적의 개체입니다.",
            en: "Lilly White 100% Het Azantic female. Perfect for breeding programs."
        },
        status: "available",
        featured: true
    },
    {
        id: "gecko-008",
        name: "Titan",
        genetics: ["Sable", "Luwak Lilly"],
        sex: "Male",
        size: "Adult",
        birthDate: "2022-08-30",
        price: 400000,
        images: [
            "https://via.placeholder.com/400x300/2d5016/ffffff?text=Titan+1",
            "https://via.placeholder.com/400x300/1a3309/ffffff?text=Titan+2"
        ],
        parents: {
            sire: "breeder-008",
            dam: "breeder-002"
        },
        description: {
            ko: "세이블 루왁 릴리 대형 수컷입니다. 체형이 매우 우수합니다.",
            en: "Sable Luwak Lilly large male. Excellent body structure."
        },
        status: "sold",
        featured: false
    }
];

// 유전자 목록 (필터용)
const geneticsList = [
    "Normal",
    "Lilly White",
    "Cappuccino",
    "Frappuccino",
    "Luwak",
    "Luwak Lilly",
    "Sable",
    "Lilly Sable",
    "Super Sable",
    "Super Sable Lilly",
    "Azantic",
    "Lilly Azantic",
    "100% Het Azantic",
    "66% Het Azantic",
    "50% Het Azantic",
    "100% Het Lilly Azantic",
    "66% Het Lilly Azantic",
    "50% Het Lilly Azantic",
    "Chocho",
    "Lilly ChoCho",
    "100% Het ChoCho",
    "66% Het ChoCho",
    "50% Het ChoCho",
    "100% Het Lilly ChoCho",
    "66% Het Lilly ChoCho",
    "50% Het Lilly ChoCho",
    "Hypo",
    "Lilly Hypo"
];

// 성별 목록
const sexList = ["Male", "Female", "Indiscriminate"];

// 크기 목록
const sizeList = ["Baby", "Subadult", "Adult"];
