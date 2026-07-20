-- Seed data for Witty Bebe Store

-- 1. Truncate tables
truncate table product_variants cascade;
truncate table product_images cascade;
truncate table products cascade;

-- 2. Insert Products
insert into products (id, name, slug, description, category, age_group, price, discount_price, thumbnail_url, status)
values
  -- Product 1
  ('88888888-8888-4888-8888-888888880001', '스칸디 오가닉 오버롤', 'scandi-organic-overalls', 
   '100% 오가닉 코튼으로 제작되어 연약한 아기 피부에도 자극이 없는 오버롤입니다. 내추럴한 크림 톤에 부드러운 우드 단추 포인트로 감성을 더했습니다.', 
   '우주복', '3-6M', 42000, 38000, 
   'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop', 'active'),
  
  -- Product 2
  ('88888888-8888-4888-8888-888888880002', '모던 린넨 등원 상하세트', 'modern-linen-play-set', 
   '시원하고 가벼운 린넨 블렌드 원단으로 여름철 활동적인 아이들에게 완벽한 등원룩입니다. 밴딩 처리된 팬츠와 오버핏 상의 세트로 편안한 착용감을 제공합니다.', 
   '상의', '1-3세', 42000, null, 
   'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 3
  ('88888888-8888-4888-8888-888888880003', '에어리 피치 리본 블라우스', 'airy-peach-bow-blouse', 
   '사랑스러운 살구빛 피치 톤에 넥라인 리본 디테일이 돋보이는 블라우스입니다. 잔잔한 셔링이 들어가 있어 입었을 때 볼륨감이 무척 사랑스럽습니다.', 
   '상의', '1-3세', 29000, null, 
   'https://images.unsplash.com/photo-1518831959646-742c3a90b378?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 4
  ('88888888-8888-4888-8888-888888880004', '베어 자수 골지 실내복', 'bear-ribbed-loungewear', 
   '쫀득한 신축성의 골지 코튼 원단에 귀여운 곰돌이 자수가 콕 박혀있는 데일리 실내복입니다. 사계절용 적당한 두께감으로 홈웨어는 물론 이너로도 좋습니다.', 
   '내복', '3-6M', 24000, null, 
   'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 5
  ('88888888-8888-4888-8888-888888880005', '세이지 소프트 코튼 카디건', 'sage-soft-knit-cardigan', 
   '고급스러운 세이지 그린 컬러의 프리미엄 하프 게이지 니트 가디건입니다. 에어리하고 부드러운 아크릴+코튼 혼방 니트로 까슬거림이 전혀 없습니다.', 
   '외투', '1-3세', 45000, 39000, 
   'https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 6
  ('88888888-8888-4888-8888-888888880006', '도토리 베이비 버킷햇', 'acorn-baby-bucket-hat', 
   '내추럴 코튼 캔버스 소재로 제작된 감성 넘치는 아동용 버킷햇입니다. 턱끈 조절이 가능해 바람 부는 날에도 잃어버릴 염려가 적습니다.', 
   '악세서리', '4-7세', 18000, null, 
   'https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 7
  ('88888888-8888-4888-8888-888888880007', '들꽃 나염 리본 원피스', 'wildflower-ribbon-dress', 
   '잔잔한 야생화 패턴이 한 편의 그림 같은 빈티지 무드의 원피스입니다. 등 뒤에 위치한 큰 리본 타이로 뒷모습까지 러블리하게 완성했습니다.', 
   '상의', '1-3세', 45000, null, 
   'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 8
  ('88888888-8888-4888-8888-888888880008', '네추럴 베이직 슈트 (신생아용)', 'natural-baby-bodysuit', 
   '피부가 극도로 민감한 아기들을 위해 100% 무형광 코튼으로 짜여진 바디수트입니다. 가랑이 부분 스냅 단추로 기저귀 교체가 간편합니다.', 
   '우주복', '신생아(0-3M)', 22000, null, 
   'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 9
  ('88888888-8888-4888-8888-888888880009', '스칸디 아일렛 원피스', 'scandi-eyelet-dress', 
   '고급스러운 자수 아일렛 원단으로 맑은 날씨에 한껏 돋보이는 원피스입니다. 안감이 덧대어져 비침 걱정이 없습니다.', 
   '상의', '1-3세', 49000, null, 
   'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 10
  ('88888888-8888-4888-8888-888888880010', '세이지 퍼프 패딩 아우터', 'sage-puff-padded-outer', 
   '무겁지 않고 깃털처럼 가볍지만 뛰어난 보온력을 자랑하는 친환경 웰론 충전재 패딩 아우터입니다. 세이지 크림 컬러와 스탠드 카라 디자인이 모던합니다.', 
   '외투', '1-3세', 78000, null, 
   'https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 11
  ('88888888-8888-4888-8888-888888880011', '코지 와플 이지팬츠', 'cozy-waffle-easy-pants', 
   '입체적인 와플 조직감으로 피부에 닿는 면적을 최소화하여 쾌적하게 착용 가능한 유아 바지입니다. 신축성이 탁월해 잠옷이나 놀이복으로 매우 좋습니다.', 
   '내복', '1-3세', 19000, null, 
   'https://images.unsplash.com/photo-1596464718042-3e284a141a0e?q=80&w=600&auto=format&fit=crop', 'active'),

  -- Product 12
  ('88888888-8888-4888-8888-888888880012', '오가닉 스트라이프 남아 셔츠', 'organic-stripe-shirt', 
   '산뜻한 블루와 화이트 스트라이프의 단정한 칼라 아동 셔츠입니다. 데님 팬츠나 면바지와 함께 매칭해 격식 있는 자리나 나들이 룩으로 입기 좋습니다.', 
   '상의', '1-3세', 32000, null, 
   'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop', 'active');

-- 3. Insert Product Images (detail / zoom / hover images)
insert into product_images (product_id, image_url, sort_order)
values
  -- Product 1
  ('88888888-8888-4888-8888-888888880001', 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880001', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop', 1),
  
  -- Product 2
  ('88888888-8888-4888-8888-888888880002', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880002', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 3
  ('88888888-8888-4888-8888-888888880003', 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880003', 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 4
  ('88888888-8888-4888-8888-888888880004', 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880004', 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 5
  ('88888888-8888-4888-8888-888888880005', 'https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880005', 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 6
  ('88888888-8888-4888-8888-888888880006', 'https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880006', 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 7
  ('88888888-8888-4888-8888-888888880007', 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880007', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 8
  ('88888888-8888-4888-8888-888888880008', 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880008', 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 9
  ('88888888-8888-4888-8888-888888880009', 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880009', 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 10
  ('88888888-8888-4888-8888-888888880010', 'https://images.unsplash.com/photo-1471286174243-e7a4d9afb277?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880010', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 11
  ('88888888-8888-4888-8888-888888880011', 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880011', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop', 1),

  -- Product 12
  ('88888888-8888-4888-8888-888888880012', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop', 0),
  ('88888888-8888-4888-8888-888888880012', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop', 1);

-- 4. Insert Product Variants (Sizes & Colors)
insert into product_variants (product_id, size, color, stock, sku, additional_price)
values
  -- Product 1 variants
  ('88888888-8888-4888-8888-888888880001', 'XS (6~12m)', '아이보리', 15, 'SCANDI-OV-XS', 0),
  ('88888888-8888-4888-8888-888888880001', 'S (1~2y)', '아이보리', 20, 'SCANDI-OV-S', 0),
  ('88888888-8888-4888-8888-888888880001', 'M (2~3y)', '아이보리', 10, 'SCANDI-OV-M', 1000),
  ('88888888-8888-4888-8888-888888880001', 'L (3~4y)', '아이보리', 5, 'SCANDI-OV-L', 1000),

  -- Product 2 variants
  ('88888888-8888-4888-8888-888888880002', 'S (1~2y)', '오트밀', 12, 'LINEN-SET-S', 0),
  ('88888888-8888-4888-8888-888888880002', 'M (2~3y)', '오트밀', 18, 'LINEN-SET-M', 0),
  ('88888888-8888-4888-8888-888888880002', 'L (3~4y)', '오트밀', 15, 'LINEN-SET-L', 1500),
  ('88888888-8888-4888-8888-888888880002', 'XL (4~5y)', '오트밀', 8, 'LINEN-SET-XL', 1500),

  -- Product 3 variants
  ('88888888-8888-4888-8888-888888880003', 'S (1~2y)', '살구', 8, 'PEACH-BL-S', 0),
  ('88888888-8888-4888-8888-888888880003', 'M (2~3y)', '살구', 12, 'PEACH-BL-M', 0),
  ('88888888-8888-4888-8888-888888880003', 'L (3~4y)', '살구', 10, 'PEACH-BL-L', 0),
  ('88888888-8888-4888-8888-888888880003', 'XL (4~5y)', '살구', 5, 'PEACH-BL-XL', 1000),
  ('88888888-8888-4888-8888-888888880003', 'XXL (6~7y)', '살구', 3, 'PEACH-BL-XXL', 1000),

  -- Product 4 variants
  ('88888888-8888-4888-8888-888888880004', 'XS (6~12m)', '크림', 25, 'BEAR-RIB-XS', 0),
  ('88888888-8888-4888-8888-888888880004', 'S (1~2y)', '크림', 30, 'BEAR-RIB-S', 0),
  ('88888888-8888-4888-8888-888888880004', 'M (2~3y)', '크림', 20, 'BEAR-RIB-M', 0),
  ('88888888-8888-4888-8888-888888880004', 'L (3~4y)', '크림', 15, 'BEAR-RIB-L', 0),

  -- Product 5 variants
  ('88888888-8888-4888-8888-888888880005', 'S (1~2y)', '세이지 그린', 10, 'SAGE-CD-S', 0),
  ('88888888-8888-4888-8888-888888880005', 'M (2~3y)', '세이지 그린', 15, 'SAGE-CD-M', 0),
  ('88888888-8888-4888-8888-888888880005', 'L (3~4y)', '세이지 그린', 12, 'SAGE-CD-L', 0),
  ('88888888-8888-4888-8888-888888880005', 'XL (4~5y)', '세이지 그린', 8, 'SAGE-CD-XL', 2000),
  ('88888888-8888-4888-8888-888888880005', 'XXL (6~7y)', '세이지 그린', 4, 'SAGE-CD-XXL', 2000),

  -- Product 6 variants
  ('88888888-8888-4888-8888-888888880006', 'Free (돌~7세)', '베이지', 30, 'ACORN-HAT-F', 0),

  -- Product 7 variants
  ('88888888-8888-4888-8888-888888880007', 'S (1~2y)', '플라워나염', 7, 'WILD-FL-DRESS-S', 0),
  ('88888888-8888-4888-8888-888888880007', 'M (2~3y)', '플라워나염', 9, 'WILD-FL-DRESS-M', 0),
  ('88888888-8888-4888-8888-888888880007', 'L (3~4y)', '플라워나염', 8, 'WILD-FL-DRESS-L', 0),
  ('88888888-8888-4888-8888-888888880007', 'XL (4~5y)', '플라워나염', 5, 'WILD-FL-DRESS-XL', 1000),
  ('88888888-8888-4888-8888-888888880007', 'XXL (6~7y)', '플라워나염', 2, 'WILD-FL-DRESS-XXL', 1000),

  -- Product 8 variants
  ('88888888-8888-4888-8888-888888880008', 'Newborn (0~3m)', '크림', 15, 'NAT-BODY-NB', 0),
  ('88888888-8888-4888-8888-888888880008', '3~6m', '크림', 20, 'NAT-BODY-3M', 0),
  ('88888888-8888-4888-8888-888888880008', '6~12m', '크림', 25, 'NAT-BODY-6M', 0),

  -- Product 9 variants
  ('88888888-8888-4888-8888-888888880009', 'S (1~2y)', '화이트', 10, 'EYELET-DRESS-S', 0),
  ('88888888-8888-4888-8888-888888880009', 'M (2~3y)', '화이트', 12, 'EYELET-DRESS-M', 0),
  ('88888888-8888-4888-8888-888888880009', 'L (3~4y)', '화이트', 8, 'EYELET-DRESS-L', 0),
  ('88888888-8888-4888-8888-888888880009', 'XL (4~5y)', '화이트', 6, 'EYELET-DRESS-XL', 1000),

  -- Product 10 variants
  ('88888888-8888-4888-8888-888888880010', 'M (2~3y)', '베이지', 5, 'SAGE-PUFF-M', 0),
  ('88888888-8888-4888-8888-888888880010', 'L (3~4y)', '베이지', 7, 'SAGE-PUFF-L', 0),
  ('88888888-8888-4888-8888-888888880010', 'XL (4~5y)', '베이지', 4, 'SAGE-PUFF-XL', 3000),
  ('88888888-8888-4888-8888-888888880010', 'XXL (6~7y)', '베이지', 2, 'SAGE-PUFF-XXL', 3000),

  -- Product 11 variants
  ('88888888-8888-4888-8888-888888880011', 'S (1~2y)', '오트밀', 20, 'WAFFLE-PANTS-S', 0),
  ('88888888-8888-4888-8888-888888880011', 'M (2~3y)', '오트밀', 25, 'WAFFLE-PANTS-M', 0),
  ('88888888-8888-4888-8888-888888880011', 'L (3~4y)', '오트밀', 15, 'WAFFLE-PANTS-L', 0),

  -- Product 12 variants
  ('88888888-8888-4888-8888-888888880012', 'M (2~3y)', '블루스트라이프', 8, 'STRIPE-SHIRT-M', 0),
  ('88888888-8888-4888-8888-888888880012', 'L (3~4y)', '블루스트라이프', 10, 'STRIPE-SHIRT-L', 0),
  ('88888888-8888-4888-8888-888888880012', 'XL (4~5y)', '블루스트라이프', 7, 'STRIPE-SHIRT-XL', 1000),
  ('88888888-8888-4888-8888-888888880012', 'XXL (6~7y)', '블루스트라이프', 3, 'STRIPE-SHIRT-XXL', 1000);

-- 5. Insert Sample Reviews
insert into reviews (id, product_id, rating, content, size_fit, child_age, images)
values
  ('77777777-7777-4777-7777-777777770001', '88888888-8888-4888-8888-888888880001', 5, '재질이 정말 보들보들해요. 등원할 때 입혔는데 너무 귀엽다고 다들 물어보네요!', '정사이즈', '15개월', array[]::text[]),
  ('77777777-7777-4777-7777-777777770002', '88888888-8888-4888-8888-888888880001', 5, '세탁해도 변형 없고 아주 탄탄해요. 역시 오가닉이라 안심이 되네요.', '정사이즈', '8개월', array[]::text[]),
  ('77777777-7777-4777-7777-777777770003', '88888888-8888-4888-8888-888888880002', 5, '색감이 감성 돋고 너무 예쁩니다. 아이도 시원한지 이 옷만 입겠다고 해요.', '정사이즈', '24개월', array[]::text[]),
  ('77777777-7777-4777-7777-777777770004', '88888888-8888-4888-8888-888888880004', 4, '곰돌이 자수가 너무 귀여워요. 다만 바지가 약간 타이트하게 나온 것 같아요.', '작아요', '18개월', array[]::text[]),
  ('77777777-7777-4777-7777-777777770005', '88888888-8888-4888-8888-888888880005', 5, '에어컨 바람 부는 실내나 가을철 아침 저녁에 입히기 딱 좋은 두께입니다. 색상 진짜 강추해요.', '정사이즈', '3세', array[]::text[]),
  ('77777777-7777-4777-7777-777777770006', '88888888-8888-4888-8888-888888880007', 5, '휴가지에서 입혔는데 인생샷 건졌어요! 면도 시원하고 너무 마음에 들어요.', '커요', '5세', array[]::text[]);
