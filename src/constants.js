export const STORAGE_KEYS = {
  profile: 'geek_spa_profile',
  bookings: 'geek_spa_bookings',
  businessProfile: 'geek_spa_business_profile',
}

export const MOCK_SERVICES = [
  { id: '1', name: 'Haircut and Styling', price: 3500, duration: 40 },
  { id: '2', name: 'MakeUp', price: 2000, duration: 40 },
  { id: '3', name: 'Manicure & Pedicure', price: 4000, duration: 60 },
  { id: '4', name: 'Skin Care', price: 4500, duration: 50 },
  { id: '5', name: 'Body Treatment', price: 5000, duration: 60 },
  { id: '6', name: 'Massage', price: 3000, duration: 45 },
]

export const SERVICE_NAMES = {
  haircut: 'Haircut and Styling',
  makeup: 'MakeUp',
  'manicure-pedicure': 'Manicure & Pedicure',
  skincare: 'Skin Care',
  'body-treatment': 'Body Treatment',
  massage: 'Massage',
}

export const SERVICE_IDS = {
  haircut: '1',
  makeup: '2',
  'manicure-pedicure': '3',
  skincare: '4',
  'body-treatment': '5',
  massage: '6',
}

export const PRICING_SERVICES = [
  { id: 'haircut', name: 'Haircut', desc: 'Expert haircuts designed to suit you.', price: 3500, duration: '40min', icon: '✂️' },
  { id: 'makeup', name: 'MakeUp', desc: 'Flawless makeup, fast look your best in just 30 minutes.', price: 2000, duration: '40min', icon: '💄' },
  { id: 'manicure-pedicure', name: 'Manicure & Pedicure', desc: 'Pamper yourself with our manicure & pedicure services that will bring sensational results.', price: 4000, duration: '60min', icon: '💅' },
  { id: 'skincare', name: 'Skin Care', desc: 'Gentle glowing skin with our professional skincare treatments.', price: 4500, duration: '50min', icon: '✨' },
  { id: 'body-treatment', name: 'Body Treatment', desc: 'Relax, refresh, and renew with our professional body treatments.', price: 5000, duration: '60min', icon: '🌿' },
  { id: 'massage', name: 'Massage', desc: 'Relax your body and mind after a long, busy day with our massage services.', price: 3000, duration: '45min', icon: '💆' },
]
