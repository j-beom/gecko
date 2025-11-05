// 브리더(부모) 데이터
const breedersData = [
    {
        id: "breeder-001",
        name: "Thor",
        genetics: ["Super Sable"],
        sex: "Male",
        birthDate: "2021-03-10",
        images: [
            "https://via.placeholder.com/400x300/1a3309/ffffff?text=Thor"
        ],
        description: {
            ko: "우수한 슈퍼 세이블 종친입니다. 뛰어난 체형과 색상을 자손에게 전달합니다.",
            en: "Excellent Super Sable breeder. Passes outstanding body structure and coloration to offspring."
        },
        offspring: ["gecko-001", "gecko-003", "gecko-006"]
    },
    {
        id: "breeder-002",
        name: "Freya",
        genetics: ["Lilly White", "Hypo"],
        sex: "Female",
        birthDate: "2020-11-20",
        images: [
            "https://via.placeholder.com/400x300/ffffff/2d5016?text=Freya"
        ],
        description: {
            ko: "릴리 화이트 하이포 암컷 종친입니다. 안정적인 번식 성공률을 보입니다.",
            en: "Lilly White Hypo female breeder. Shows consistent breeding success rate."
        },
        offspring: ["gecko-001", "gecko-004", "gecko-008"]
    },
    {
        id: "breeder-003",
        name: "Zeus",
        genetics: ["Azantic", "Super Sable"],
        sex: "Male",
        birthDate: "2020-05-15",
        images: [
            "https://via.placeholder.com/400x300/2d5016/ffffff?text=Zeus"
        ],
        description: {
            ko: "아잔틱 슈퍼 세이블 수컷 종친입니다. 희귀 유전자 조합을 가지고 있습니다.",
            en: "Azantic Super Sable male breeder. Carries rare genetic combinations."
        },
        offspring: ["gecko-002", "gecko-004", "gecko-007"]
    },
    {
        id: "breeder-004",
        name: "Athena",
        genetics: ["Lilly Azantic"],
        sex: "Female",
        birthDate: "2021-01-08",
        images: [
            "https://via.placeholder.com/400x300/c9a961/ffffff?text=Athena"
        ],
        description: {
            ko: "릴리 아잔틱 암컷 종친입니다. 색상이 매우 선명한 자손을 생산합니다.",
            en: "Lilly Azantic female breeder. Produces offspring with very vibrant colors."
        },
        offspring: ["gecko-002", "gecko-005"]
    },
    {
        id: "breeder-005",
        name: "Hera",
        genetics: ["Cappuccino", "Luwak"],
        sex: "Female",
        birthDate: "2021-07-22",
        images: [
            "https://via.placeholder.com/400x300/8b6914/ffffff?text=Hera"
        ],
        description: {
            ko: "카푸치노 루왁 암컷 종친입니다. 건강한 베이비를 많이 생산합니다.",
            en: "Cappuccino Luwak female breeder. Produces many healthy babies."
        },
        offspring: ["gecko-003", "gecko-006"]
    },
    {
        id: "breeder-006",
        name: "Apollo",
        genetics: ["Lilly ChoCho", "100% Het Azantic"],
        sex: "Male",
        birthDate: "2020-09-12",
        images: [
            "https://via.placeholder.com/400x300/c9a961/ffffff?text=Apollo"
        ],
        description: {
            ko: "릴리 초코 100% Het 아잔틱 수컷 종친입니다. 희귀 유전자를 보유하고 있습니다.",
            en: "Lilly ChoCho 100% Het Azantic male breeder. Carries rare genetics."
        },
        offspring: ["gecko-005"]
    },
    {
        id: "breeder-007",
        name: "Artemis",
        genetics: ["Lilly White", "100% Het Azantic"],
        sex: "Female",
        birthDate: "2020-12-05",
        images: [
            "https://via.placeholder.com/400x300/ffffff/4a7c2b?text=Artemis"
        ],
        description: {
            ko: "릴리 화이트 100% Het 아잔틱 암컷 종친입니다. 우수한 번식 라인입니다.",
            en: "Lilly White 100% Het Azantic female breeder. Excellent breeding line."
        },
        offspring: ["gecko-007"]
    },
    {
        id: "breeder-008",
        name: "Odin",
        genetics: ["Sable", "Luwak Lilly"],
        sex: "Male",
        birthDate: "2019-08-18",
        images: [
            "https://via.placeholder.com/400x300/2d5016/ffffff?text=Odin"
        ],
        description: {
            ko: "세이블 루왁 릴리 수컷 종친입니다. 대형 체형을 자손에게 전달합니다.",
            en: "Sable Luwak Lilly male breeder. Passes large body size to offspring."
        },
        offspring: ["gecko-008"]
    }
];

// 브리더 ID로 브리더 정보 가져오기
function getBreederById(breederId) {
    return breedersData.find(breeder => breeder.id === breederId);
}

// 브리더의 자손 게코 목록 가져오기
function getOffspringByBreederId(breederId) {
    const breeder = getBreederById(breederId);
    if (!breeder) return [];
    
    return geckosData.filter(gecko => 
        gecko.parents.sire === breederId || gecko.parents.dam === breederId
    );
}
