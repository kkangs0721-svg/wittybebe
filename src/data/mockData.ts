export interface Product {
  id: string;
  name: string;
  englishName: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  category: "신생아" | "베이비" | "여아" | "남아" | "실내복" | "등원룩" | "아우터" | "악세서리";
  isNew: boolean;
  isBest: boolean;
  description: string;
  detailImages: string[];
  sizes: string[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    content: string;
    sizePurchased: string;
  }[];
  qna: {
    id: string;
    author: string;
    date: string;
    question: string;
    answer?: string;
    isPrivate: boolean;
  }[];
}

export interface Blog {
  id: string;
  title: string;
  category: "육아정보" | "등원룩 추천" | "계절별 코디" | "신상품 소식" | "스타일링 팁";
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "스칸디 오가닉 오버롤",
    englishName: "Scandi Organic Overalls",
    price: 38000,
    originalPrice: 42000,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop",
    category: "베이비",
    isNew: true,
    isBest: true,
    description: "100% 오가닉 코튼으로 제작되어 연약한 아기 피부에도 자극이 없는 오버롤입니다. 내추럴한 크림 톤에 부드러운 우드 단추 포인트로 감성을 더했습니다.",
    detailImages: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["XS (6~12m)", "S (1~2y)", "M (2~3y)", "L (3~4y)"],
    reviews: [
      { id: "r1", author: "김*영", rating: 5, date: "2026-07-10", content: "재질이 정말 보들보들해요. 등원할 때 입혔는데 너무 귀엽다고 다들 물어보네요!", sizePurchased: "S (1~2y)" },
      { id: "r2", author: "이*지", rating: 5, date: "2026-07-08", content: "세탁해도 변형 없고 아주 탄탄해요. 역시 오가닉이라 안심이 되네요.", sizePurchased: "XS (6~12m)" }
    ],
    qna: [
      { id: "q1", author: "박*아", date: "2026-07-12", question: "8개월 아기 몸무게 9kg인데 어떤 사이즈 해야 할까요?", answer: "안녕하세요 위티베베입니다. 9kg 아기의 경우 XS 사이즈가 예쁘게 잘 맞습니다. 여유있는 핏을 원하신다면 S 사이즈도 추천드립니다.", isPrivate: false }
    ]
  },
  {
    id: "2",
    name: "모던 린넨 등원 상하세트",
    englishName: "Modern Linen Play Set",
    price: 42000,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop",
    category: "등원룩",
    isNew: true,
    isBest: true,
    description: "시원하고 가벼운 린넨 블렌드 원단으로 여름철 활동적인 아이들에게 완벽한 등원룩입니다. 밴딩 처리된 팬츠와 오버핏 상의 세트로 편안한 착용감을 제공합니다.",
    detailImages: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["S (1~2y)", "M (2~3y)", "L (3~4y)", "XL (4~5y)"],
    reviews: [
      { id: "r3", author: "최*진", rating: 5, date: "2026-07-14", content: "색감이 감성 돋고 너무 예쁩니다. 아이도 시원한지 이 옷만 입겠다고 해요.", sizePurchased: "M (2~3y)" }
    ],
    qna: []
  },
  {
    id: "3",
    name: "에어리 피치 리본 블라우스",
    englishName: "Airy Peach Bow Blouse",
    price: 29000,
    image: "https://images.unsplash.com/photo-1604467707321-70d5ac404aab?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop",
    category: "여아",
    isNew: true,
    isBest: false,
    description: "사랑스러운 살구빛 피치 톤에 넥라인 리본 디테일이 돋보이는 블라우스입니다. 잔잔한 셔링이 들어가 있어 입었을 때 볼륨감이 무척 사랑스럽습니다.",
    detailImages: [
      "https://images.unsplash.com/photo-1604467707321-70d5ac404aab?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["S (1~2y)", "M (2~3y)", "L (3~4y)", "XL (4~5y)", "XXL (6~7y)"],
    reviews: [],
    qna: []
  },
  {
    id: "4",
    name: "베어 자수 골지 실내복",
    englishName: "Bear Ribbed Loungewear",
    price: 24000,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "실내복",
    isNew: true,
    isBest: false,
    description: "쫀득한 신축성의 골지 코튼 원단에 귀여운 곰돌이 자수가 콕 박혀있는 데일리 실내복입니다. 사계절용 적당한 두께감으로 홈웨어는 물론 이너로도 좋습니다.",
    detailImages: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["XS (6~12m)", "S (1~2y)", "M (2~3y)", "L (3~4y)"],
    reviews: [
      { id: "r4", author: "정*희", rating: 4, date: "2026-07-05", content: "곰돌이 자수가 너무 귀여워요. 다만 바지가 약간 타이트하게 나온 것 같아요.", sizePurchased: "S (1~2y)" }
    ],
    qna: []
  },
  {
    id: "5",
    name: "세이지 소프트 코튼 카디건",
    englishName: "Sage Soft Knit Cardigan",
    price: 39000,
    originalPrice: 45000,
    image: "https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop",
    category: "아우터",
    isNew: false,
    isBest: true,
    description: "고급스러운 세이지 그린 컬러의 프리미엄 하프 게이지 니트 가디건입니다. 에어리하고 부드러운 아크릴+코튼 혼방 니트로 까슬거림이 전혀 없습니다.",
    detailImages: [
      "https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["S (1~2y)", "M (2~3y)", "L (3~4y)", "XL (4~5y)", "XXL (6~7y)"],
    reviews: [
      { id: "r5", author: "송*은", rating: 5, date: "2026-07-11", content: "에어컨 바람 부는 실내나 가을철 아침 저녁에 입히기 딱 좋은 두께입니다. 색상 진짜 강추해요.", sizePurchased: "L (3~4y)" }
    ],
    qna: []
  },
  {
    id: "6",
    name: "도토리 베이비 버킷햇",
    englishName: "Acorn Baby Bucket Hat",
    price: 18000,
    image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "악세서리",
    isNew: true,
    isBest: false,
    description: "내추럴 코튼 캔버스 소재로 제작된 감성 넘치는 아동용 버킷햇입니다. 턱끈 조절이 가능해 바람 부는 날에도 잃어버릴 염려가 적습니다.",
    detailImages: [
      "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["Free (돌~7세)"],
    reviews: [],
    qna: []
  },
  {
    id: "7",
    name: "들꽃 나염 리본 원피스",
    englishName: "Wildflower Ribbon Dress",
    price: 45000,
    image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1604467707321-70d5ac404aab?q=80&w=600&auto=format&fit=crop",
    category: "여아",
    isNew: false,
    isBest: true,
    description: "잔잔한 야생화 패턴이 한 편의 그림 같은 빈티지 무드의 원피스입니다. 등 뒤에 위치한 큰 리본 타이로 뒷모습까지 러블리하게 완성했습니다.",
    detailImages: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["S (1~2y)", "M (2~3y)", "L (3~4y)", "XL (4~5y)", "XXL (6~7y)"],
    reviews: [
      { id: "r6", author: "윤*정", rating: 5, date: "2026-07-02", content: "휴가지에서 입혔는데 인생샷 건졌어요! 면도 시원하고 너무 마음에 들어요.", sizePurchased: "XL (4~5y)" }
    ],
    qna: []
  },
  {
    id: "8",
    name: "네추럴 베이직 슈트 (신생아용)",
    englishName: "Natural Baby Bodysuit",
    price: 22000,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop",
    category: "신생아",
    isNew: true,
    isBest: false,
    description: "피부가 극도로 민감한 아기들을 위해 100% 무형광 코튼으로 짜여진 바디수트입니다. 가랑이 부분 스냅 단추로 기저귀 교체가 간편합니다.",
    detailImages: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
    ],
    sizes: ["Newborn (0~3m)", "3~6m", "6~12m"],
    reviews: [],
    qna: []
  },
  {
    id: "9",
    name: "스칸디 아일렛 원피스",
    englishName: "Scandi Eyelet Dress",
    price: 49000,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop",
    category: "여아",
    isNew: false,
    isBest: true,
    description: "고급스러운 자수 아일렛 원단으로 맑은 날씨에 한껏 돋보이는 원피스입니다. 안감이 덧대어져 비침 걱정이 없습니다.",
    detailImages: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop"],
    sizes: ["S (1~2y)", "M (2~3y)", "L (3~4y)", "XL (4~5y)"],
    reviews: [],
    qna: []
  },
  {
    id: "10",
    name: "세이지 퍼프 패딩 아우터",
    englishName: "Sage Puff Padded Outer",
    price: 78000,
    image: "https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop",
    category: "아우터",
    isNew: false,
    isBest: true,
    description: "무겁지 않고 깃털처럼 가볍지만 뛰어난 보온력을 자랑하는 친환경 웰론 충전재 패딩 아우터입니다. 세이지 크림 컬러와 스탠드 카라 디자인이 모던합니다.",
    detailImages: ["https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=600&auto=format&fit=crop"],
    sizes: ["M (2~3y)", "L (3~4y)", "XL (4~5y)", "XXL (6~7y)"],
    reviews: [],
    qna: []
  },
  {
    id: "11",
    name: "코지 와플 이지팬츠",
    englishName: "Cozy Waffle Easy Pants",
    price: 19000,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop",
    category: "실내복",
    isNew: false,
    isBest: true,
    description: "입체적인 와플 조직감으로 피부에 닿는 면적을 최소화하여 쾌적하게 착용 가능한 유아 바지입니다. 신축성이 탁월해 잠옷이나 놀이복으로 매우 좋습니다.",
    detailImages: ["https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop"],
    sizes: ["S (1~2y)", "M (2~3y)", "L (3~4y)"],
    reviews: [],
    qna: []
  },
  {
    id: "12",
    name: "오가닉 스트라이프 남아 셔츠",
    englishName: "Organic Stripe Shirt",
    price: 32000,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop",
    category: "남아",
    isNew: false,
    isBest: true,
    description: "산뜻한 블루와 화이트 스트라이프의 단정한 칼라 아동 셔츠입니다. 데님 팬츠나 면바지와 함께 매칭해 격식 있는 자리나 나들이 룩으로 입기 좋습니다.",
    detailImages: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop"],
    sizes: ["M (2~3y)", "L (3~4y)", "XL (4~5y)", "XXL (6~7y)"],
    reviews: [],
    qna: []
  }
];

export const mockBlogs: Blog[] = [
  {
    id: "b1",
    title: "아름다운 아이 사진을 찍기 위한 내추럴 아동복 코디 공식",
    category: "스타일링 팁",
    summary: "인스타그램 감성을 그대로 담은 인생샷 코디법! 톤온톤 배치와 자연주의 배경 선택 가이드를 전해드립니다.",
    content: `
      많은 부모들이 아이의 자라는 모습을 예쁜 사진으로 남기고 싶어 합니다. 
      특히 인스타그램 속 감성 사진처럼 내추럴하면서도 프리미엄한 감성이 담긴 스냅을 촬영하려면 코디가 절반 이상을 차지한다고 해도 과언이 아닙니다.
      
      여기에 몇 가지 스타일링 팁을 전해드립니다.
      
      1. **톤온톤(Tone-on-Tone) 배색을 사용하세요**
         너무 튀는 단색 원색보다는 아이보리, 크림, 베이지, 소프트 코랄, 민트그린 등 자연스러운 뉴트럴 계열의 옷들이 카메라 필터나 채광 아래에서 가장 부드러운 분위기를 자아냅니다.
      
      2. **패턴보다는 텍스처로 변화를 주세요**
         지나치게 큰 캐릭터나 요란한 무늬보다는 코튼 와플, 린넨, 하프 게이지 니트 등 소재 특유의 텍스처가 부각되면 옷의 퀄리티도 훨씬 올라가 보이고 시선이 아이의 사랑스러운 얼굴로 집중됩니다.
      
      3. **배경과 소품의 선택**
         나무 질감이 느껴지는 카페, 따뜻한 햇살이 비추는 잔디밭, 화이트 톤의 거실 등 따스함이 가득한 배경에서 스칸디나비아 패션이 진가를 발휘합니다.
    `,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-15",
    author: "위티베베 에디터"
  },
  {
    id: "b2",
    title: "여름철 연약한 아기 피부를 지키는 100% 오가닉 코튼의 진실",
    category: "육아정보",
    summary: "땀이 많아지는 계절, 왜 많은 엄마들이 오가닉 코튼을 다시 찾을까요? 아기 피부 트러블 예방을 위한 가이드.",
    content: `
      여름이 되면 영유아들의 목 뒤, 가랑이, 팔꿈치 안쪽 등에 쉽게 땀띠가 나고 붉게 부어오릅니다.
      이 시기 아기 의류를 고를 때 단순 디자인뿐만 아니라 '원사'까지 세심하게 체크해야 하는 이유입니다.
      
      오가닉 코튼은 3년 이상 화학 비료와 농약을 전혀 사용하지 않은 토양에서 유기농법으로 재배된 면화를 말합니다. 
      방적과 제직 과정에서도 화학 처리를 최소화하여, 아기가 옷을 빨거나 살을 비벼도 피부 유해 자극 물질이 전혀 방출되지 않습니다.
      
      특히 위티베베 오가닉 오버롤 제품군은 염색도 내추럴 컬러 가공만을 고집하여 원단 그대로의 공기 함유량을 지키고 있습니다. 
      이번 여름, 아이의 시원하고 깨끗한 등원을 위해 오가닉 코튼을 선물해보세요.
    `,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-11",
    author: "위티베베 맘센터 소장"
  },
  {
    id: "b3",
    title: "활동성과 사랑스러움을 둘 다 잡은 어린이집 등원룩 베스트 5",
    category: "등원룩 추천",
    summary: "선생님도 칭찬하고 아이도 편해하는, 어린이집에 입혀 보내기 좋은 코디 셋업을 추천합니다.",
    content: `
      아이들이 어린이집에 있는 시간은 신체 활동의 연속입니다. 
      옷이 너무 꽉 끼거나 리본, 지퍼 등 거추장스러운 소품이 많으면 화장실에 가거나 낮잠을 잘 때 불편합니다.
      
      어린이집 등원룩을 연출할 때의 핵심은 '단순함 속의 포인트'입니다.
      
      - **허리 밴딩 팬츠 + 루즈핏 티셔츠 세트**: 배를 압박하지 않으면서 귀엽게 퍼지는 실루엣이 활동성을 지켜줍니다.
      - **단추 없는 티셔츠**: 스스로 입고 벗기를 연습하는 3~5세 아이들에게도 성취감을 줍니다.
      - **가벼운 카디건**: 냉방이 활성화된 실내에서 온도 변화에 민감한 호흡기를 보호해주는 든든한 꿀템입니다.
    `,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-06",
    author: "어린이집 경력 10년 교사"
  }
];

export const mockReviews = [
  { id: "rev1", author: "강*은", rating: 5, date: "2026-07-14", content: "옷이 정말 마음에 듭니다. 세련된 베이지 색상이라 어디에 매칭해도 스냅 사진처럼 화보를 만들어주네요.", productName: "스칸디 오가닉 오버롤", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=300&auto=format&fit=crop" },
  { id: "rev2", author: "임*민", rating: 5, date: "2026-07-12", content: "어린이집 보낼 때 린넨 상하복 입혀 보내는데 엄청 시원하다고 좋아합니다. 얼른 다른 색깔도 오픈해주세요!", productName: "모던 린넨 등원 상하세트", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=300&auto=format&fit=crop" },
  { id: "rev3", author: "송*아", rating: 4, date: "2026-07-10", content: "디자인은 100점 만점에 100점이에요. 골지 실내복은 평소 정사이즈보다 약간 더 길어서 한 치수 작게 사도 될 뻔했어요.", productName: "베어 자수 골지 실내복", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=300&auto=format&fit=crop" },
  { id: "rev4", author: "조*윤", rating: 5, date: "2026-07-08", content: "들꽃 나염 원피스 입혀서 야외 스냅 촬영하고 왔어요. 보는 사람마다 옷 어디서 샀냐고 귀엽대요~", productName: "들꽃 나염 리본 원피스", image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=300&auto=format&fit=crop" },
  { id: "rev5", author: "배*주", rating: 5, date: "2026-07-05", content: "버킷햇 너무 이뻐요. 아이가 모자 쓰는 거 귀찮아하는데 이건 흘러내림 없고 가벼워서 그런지 잘 쓰고 있네요.", productName: "도토리 베이비 버킷햇", image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=300&auto=format&fit=crop" },
  { id: "rev6", author: "안*연", rating: 5, date: "2026-07-01", content: "가디건 색감이 너무 이쁜 살구베이지 같아요. 에어컨 많이 트는 유치원에서 요즘 매일 입고 지냅니다.", productName: "세이지 소프트 코튼 카디건", image: "https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=300&auto=format&fit=crop" }
];

export const mockLookbook = [
  { id: "lk1", image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=800&auto=format&fit=crop", title: "Natural Morning", desc: "오가닉 롬퍼와 코지 니삭스의 조화", productIds: ["1", "6"] },
  { id: "lk2", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop", title: "Sweet Playtime", desc: "활동성과 스타일을 고루 갖춘 등원룩 세트", productIds: ["2"] },
  { id: "lk3", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop", title: "Warm Sunny Breeze", desc: "살구빛 블라우스와 사랑스러운 셔링 스냅", productIds: ["3"] },
  { id: "lk4", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop", title: "Vintage Wildflowers", desc: "풀밭 위에 핀 들꽃을 담은 리본 드레스", productIds: ["7"] },
  { id: "lk5", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop", title: "Bear Hug Naptime", desc: "피부에 가장 부드럽고 쫀득한 오가닉 골지 라인", productIds: ["4"] },
  { id: "lk6", image: "https://images.unsplash.com/photo-1537655780520-1e392edd816a?q=80&w=800&auto=format&fit=crop", title: "Sage Garden Walks", desc: "계절과 계절을 이어주는 세이지 그린 카디건", productIds: ["5"] }
];
