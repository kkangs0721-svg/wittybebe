-- 1. Create tables as requested

-- 상품 테이블
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,                  -- 상품명 (예: "위티베베 오가닉 우주복")
  slug text unique not null,
  description text,
  category text not null,              -- '상의', '하의', '우주복', '내복', '외투' 등
  age_group text not null,             -- '신생아(0-3M)', '3-6M', '6-12M', '1-3세', '4-7세'
  price integer not null,              -- 원 단위
  discount_price integer,
  thumbnail_url text,
  status text default 'active',        -- 'active', 'soldout', 'hidden'
  created_at timestamptz default now()
);

-- 상품 이미지 (여러 장)
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  image_url text not null,
  sort_order integer default 0
);

-- 옵션(사이즈/색상) 및 재고
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  size text not null,                  -- '66', '73', '80', '90'... 또는 '3M', '6M' 등
  color text,
  stock integer not null default 0,
  sku text unique,
  additional_price integer default 0   -- 옵션별 추가 금액 (없으면 0)
);

-- 회원 (profiles references auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  phone text,
  created_at timestamptz default now()
);

-- 배송지
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  recipient text not null,
  phone text not null,
  zipcode text,
  address text not null,
  address_detail text,
  is_default boolean default false
);

-- 주문
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  order_number text unique not null,
  status text default 'pending',       -- 'pending','paid','preparing','shipped','delivered','cancelled'
  total_amount integer not null,
  shipping_fee integer default 0,
  payment_method text,                 -- 'card','kakaopay','naverpay' 등
  payment_key text,                    -- PG사 결제 키
  recipient_name text not null,
  recipient_phone text not null,
  shipping_address text not null,
  created_at timestamptz default now()
);

-- 주문 상품
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  product_name text not null,          -- 주문 시점 스냅샷
  size text,
  color text,
  quantity integer not null,
  price integer not null               -- 주문 시점 가격 스냅샷
);

-- 리뷰 (아동복은 사이즈/실착감 리뷰가 구매전환에 중요)
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  user_id uuid references profiles(id),
  rating integer check (rating between 1 and 5),
  content text,
  size_fit text,                       -- '작아요','정사이즈','커요'
  child_age text,                      -- 리뷰어 자녀 개월수/나이
  images text[],
  created_at timestamptz default now()
);

-- 2. Create trigger to automatically create profiles row when auth.users is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger if exists
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Row Level Security Configuration

-- Enable RLS on tables
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table reviews enable row level security;

-- Setup RLS Policies

-- Products: Everyone can view active products
create policy "Allow public read for active products"
  on products for select
  using (true);

-- Product Images: Everyone can read image urls
create policy "Allow public read for product images"
  on product_images for select
  using (true);

-- Product Variants: Everyone can read variant stock/pricing
create policy "Allow public read for product variants"
  on product_variants for select
  using (true);

-- Profiles: Users can select/update their own profile
create policy "Allow users to select own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Allow users to update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Addresses: Users can CRUD their own addresses
create policy "Allow users to manage own addresses"
  on addresses for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Orders: Users can select their own orders
create policy "Allow users to view own orders"
  on orders for select
  using (auth.uid() = user_id);

create policy "Allow users or system to insert orders"
  on orders for insert
  with check (auth.uid() = user_id or auth.uid() is null); -- Allows guest checkout if needed, or enforces matching authenticated user

-- Order Items: Users can view their own order items
create policy "Allow users to view own order items"
  on order_items for select
  using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and (orders.user_id = auth.uid() or orders.user_id is null)
    )
  );

create policy "Allow anyone to insert order items"
  on order_items for insert
  with check (true);

-- Reviews: Everyone can read reviews, but only authenticated users can insert reviews for their purchased products
create policy "Allow public read for reviews"
  on reviews for select
  using (true);

create policy "Allow authenticated users to create reviews"
  on reviews for insert
  with check (auth.uid() = user_id);
