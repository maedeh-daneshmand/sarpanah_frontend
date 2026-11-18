// Mock data for Sarpanah accommodation booking system

export interface Location {
  id: number;
  name: string;
  province: string;
  imageUrl: string;
  propertyCount: number;
  description: string;
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export interface PropertyType {
  id: number;
  name: string;
  icon: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  cityId: number;
  cityName: string;
  typeId: number;
  typeName: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: number[];
  isVerified: boolean;
  isFeatured: boolean;
  badge?: 'ویژه' | 'جدید' | 'تخفیف' | 'داغ';
  discountPercent?: number;
  lat?: number;
  lng?: number;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  propertyId: number;
  rating: number;
  comment: string;
  date: string;
}

// ===== LOCATIONS =====
export const locations: Location[] = [
  {
    id: 1,
    name: 'تهران',
    province: 'تهران',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80',
    propertyCount: 234,
    description: 'پایتخت پر جنب و جوش ایران',
  },
  {
    id: 2,
    name: 'اصفهان',
    province: 'اصفهان',
    imageUrl: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80',
    propertyCount: 187,
    description: 'نصف جهان، گنجینه‌ای از معماری اسلامی',
  },
  {
    id: 3,
    name: 'مشهد',
    province: 'خراسان رضوی',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
    propertyCount: 312,
    description: 'شهر مقدس، مقصد زیارتی ایران',
  },
  {
    id: 4,
    name: 'شیراز',
    province: 'فارس',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    propertyCount: 156,
    description: 'شهر شعر و ادب، باغ‌های افسانه‌ای',
  },
  {
    id: 5,
    name: 'گیلان',
    province: 'گیلان',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    propertyCount: 203,
    description: 'جنگل‌های سرسبز و دریای خزر',
  },
  {
    id: 6,
    name: 'مازندران',
    province: 'مازندران',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    propertyCount: 278,
    description: 'ساحل و کوه در کنار هم',
  },
  {
    id: 7,
    name: 'کرمان',
    province: 'کرمان',
    imageUrl: 'https://images.unsplash.com/photo-1590254553792-7e37e7a4c6be?w=800&q=80',
    propertyCount: 89,
    description: 'کویر، قلعه‌ها و باغ‌های باستانی',
  },
  {
    id: 8,
    name: 'تبریز',
    province: 'آذربایجان شرقی',
    imageUrl: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',
    propertyCount: 134,
    description: 'بازار تاریخی و آرارات در افق',
  },
];

// ===== PROPERTY TYPES =====
export const propertyTypes: PropertyType[] = [
  { id: 1, name: 'ویلا', icon: '🏡' },
  { id: 2, name: 'آپارتمان', icon: '🏢' },
  { id: 3, name: 'کلبه', icon: '🌲' },
  { id: 4, name: 'هتل بوتیک', icon: '🏨' },
  { id: 5, name: 'خانه سنتی', icon: '🏛️' },
  { id: 6, name: 'اکو لاج', icon: '🌿' },
];

// ===== AMENITIES =====
export const amenities: Amenity[] = [
  { id: 1, name: 'وای‌فای رایگان', icon: '📶' },
  { id: 2, name: 'پارکینگ', icon: '🚗' },
  { id: 3, name: 'استخر', icon: '🏊' },
  { id: 4, name: 'آشپزخانه', icon: '🍳' },
  { id: 5, name: 'تهویه مطبوع', icon: '❄️' },
  { id: 6, name: 'بالکن', icon: '🌅' },
  { id: 7, name: 'باربیکیو', icon: '🔥' },
  { id: 8, name: 'واشر/خشک‌کن', icon: '👕' },
  { id: 9, name: 'تلویزیون هوشمند', icon: '📺' },
  { id: 10, name: 'جکوزی', icon: '🛁' },
  { id: 11, name: 'باغ', icon: '🌳' },
  { id: 12, name: 'دسترسی به ساحل', icon: '🏖️' },
];

// ===== PROPERTIES =====
export const properties: Property[] = [
  {
    id: 1,
    title: 'ویلای جنگلی سرسبز لاهیجان',
    description: 'ویلایی دنج و آرام در دل جنگل‌های شمال با چشم‌انداز فوق‌العاده به دریای خزر. این اقامتگاه با معماری مدرن و طراحی داخلی لوکس، تجربه‌ای بی‌نظیر از اقامت در طبیعت را برایتان فراهم می‌کند.',
    address: 'لاهیجان، جاده جنگلی نوکیا',
    cityId: 5,
    cityName: 'گیلان',
    typeId: 1,
    typeName: 'ویلا',
    pricePerNight: 2500000,
    maxGuests: 8,
    bedrooms: 3,
    bathrooms: 2,
    rating: 4.9,
    reviewCount: 127,
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80',
    ],
    amenities: [1, 2, 3, 4, 5, 6, 7, 11],
    isVerified: true,
    isFeatured: true,
    badge: 'ویژه',
  },
  {
    id: 2,
    title: 'آپارتمان لوکس ولیعصر تهران',
    description: 'آپارتمان مدرن و مجهز در قلب تهران با نزدیکی به مراکز تجاری و فرهنگی. دسترسی آسان به مترو و بزرگراه‌ها.',
    address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک',
    cityId: 1,
    cityName: 'تهران',
    typeId: 2,
    typeName: 'آپارتمان',
    pricePerNight: 1800000,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    ],
    amenities: [1, 2, 4, 5, 9],
    isVerified: true,
    isFeatured: true,
    badge: 'داغ',
  },
  {
    id: 3,
    title: 'خانه سنتی نزدیک میدان نقش جهان',
    description: 'خانه‌ای اصیل با معماری قاجاری در قلب اصفهان، پنج دقیقه تا میدان نقش جهان. حیاط مرکزی با حوض و گل‌های سنتی.',
    address: 'اصفهان، کوچه باغ قدیم، نزدیک میدان نقش جهان',
    cityId: 2,
    cityName: 'اصفهان',
    typeId: 5,
    typeName: 'خانه سنتی',
    pricePerNight: 1200000,
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.8,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    ],
    amenities: [1, 4, 11],
    isVerified: true,
    isFeatured: true,
    badge: 'ویژه',
  },
  {
    id: 4,
    title: 'کلبه کوهستانی دیزین',
    description: 'کلبه چوبی دنج در ارتفاع ۲۵۰۰ متری، مناسب برای اسکی‌بازان و طبیعت‌دوستان. نزدیک به پیست‌های اسکی.',
    address: 'دیزین، پیست اسکی، کلبه‌های کوهستانی',
    cityId: 1,
    cityName: 'تهران',
    typeId: 3,
    typeName: 'کلبه',
    pricePerNight: 950000,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.6,
    reviewCount: 65,
    images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1200&q=80',
    ],
    amenities: [1, 4, 5, 7],
    isVerified: true,
    isFeatured: false,
    badge: 'جدید',
    discountPercent: 15,
  },
  {
    id: 5,
    title: 'هتل بوتیک باغ ارم شیراز',
    description: 'هتل بوتیک با الهام از باغ‌های ایرانی، با استخر روباز، رستوران سنتی و ماساژ. چشم‌انداز زیبا به کوه‌های اطراف شیراز.',
    address: 'شیراز، خیابان ارم، کنار باغ ارم',
    cityId: 4,
    cityName: 'شیراز',
    typeId: 4,
    typeName: 'هتل بوتیک',
    pricePerNight: 3200000,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.9,
    reviewCount: 341,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80',
    ],
    amenities: [1, 2, 3, 4, 5, 9, 10],
    isVerified: true,
    isFeatured: true,
    badge: 'ویژه',
  },
  {
    id: 6,
    title: 'ویلای ساحلی چالوس',
    description: 'ویلا با دسترسی مستقیم به ساحل دریای خزر. تراس بزرگ با دید به دریا، باربیکیو و زمین بازی برای کودکان.',
    address: 'چالوس، ساحل نور، کنار دریا',
    cityId: 6,
    cityName: 'مازندران',
    typeId: 1,
    typeName: 'ویلا',
    pricePerNight: 2800000,
    maxGuests: 10,
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.7,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    ],
    amenities: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12],
    isVerified: true,
    isFeatured: true,
    badge: 'تخفیف',
    discountPercent: 20,
  },
  {
    id: 7,
    title: 'اکو لاج کویر مرنجاب',
    description: 'تجربه شب‌مانی در کویر با چادرهای مجهز و رصد ستارگان. سفر به دل طبیعت بکر، شترسواری و سافاری شبانه.',
    address: 'آران و بیدگل، مرنجاب، کویر مرکزی',
    cityId: 2,
    cityName: 'اصفهان',
    typeId: 6,
    typeName: 'اکو لاج',
    pricePerNight: 750000,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.5,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=80',
      'https://images.unsplash.com/photo-1533044309907-0fa3413da946?w=1200&q=80',
    ],
    amenities: [4, 7],
    isVerified: true,
    isFeatured: false,
    badge: 'جدید',
  },
  {
    id: 8,
    title: 'آپارتمان استودیو مشهد نزدیک حرم',
    description: 'آپارتمان تمیز و مجهز، ۱۵ دقیقه تا حرم مطهر رضوی. مناسب برای زائران و گردشگران.',
    address: 'مشهد، خیابان امام رضا، نزدیک صحن آزادی',
    cityId: 3,
    cityName: 'مشهد',
    typeId: 2,
    typeName: 'آپارتمان',
    pricePerNight: 850000,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.4,
    reviewCount: 456,
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
    ],
    amenities: [1, 4, 5, 9],
    isVerified: true,
    isFeatured: false,
  },
];

// ===== REVIEWS =====
export const reviews: Review[] = [
  {
    id: 1,
    userId: 1,
    userName: 'مریم احمدی',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    propertyId: 1,
    rating: 5,
    comment: 'بهترین تجربه اقامتی که داشتیم! ویلا فوق‌العاده بود، محیط آرام و طبیعت زیبا. صاحب ویلا هم خیلی مهربان بود. حتماً دوباره میایم!',
    date: '۱۴۰۳/۰۸/۱۵',
  },
  {
    id: 2,
    userId: 2,
    userName: 'علی رضایی',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    propertyId: 1,
    rating: 5,
    comment: 'واقعاً ارزش هر ریالش رو داشت. استخر، باربیکیو، چشم‌انداز جنگل... همه‌چیز عالی بود. بچه‌ها خیلی خوش گذشت!',
    date: '۱۴۰۳/۰۷/۲۳',
  },
  {
    id: 3,
    userId: 3,
    userName: 'سارا محمدی',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    propertyId: 2,
    rating: 4,
    comment: 'آپارتمان خوب با موقعیت عالی. تمیز و مرتب بود. تنها نکته منفی پارکینگ کمی دور بود.',
    date: '۱۴۰۳/۰۹/۰۳',
  },
  {
    id: 4,
    userId: 4,
    userName: 'حسین کریمی',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    propertyId: 3,
    rating: 5,
    comment: 'خانه سنتی با روح! حیاط مرکزی با حوض و گل‌ها انگار به قرن‌های پیش برگشتیم. صبحانه اصفهانی خانگی رو هم فراموش نمی‌کنیم!',
    date: '۱۴۰۳/۰۸/۳۰',
  },
  {
    id: 5,
    userId: 5,
    userName: 'فاطمه حسینی',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    propertyId: 5,
    rating: 5,
    comment: 'هتل بوتیک رویایی! استخر روباز در کنار باغ ایرانی، رستوران با غذاهای سنتی فارس... یک تجربه کامل فرهنگی و تفریحی.',
    date: '۱۴۰۳/۱۰/۰۱',
  },
];

// ===== STATS =====
export const stats = {
  totalProperties: 1847,
  totalUsers: 52300,
  successfulBookings: 98400,
  averageRating: 4.8,
};
