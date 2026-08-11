export interface ProductItem {
  id: string;
  name: string;
  type: 'pin' | 'magnet' | 'mirror';
  emoji: string;
  headline: string;
  tagline: string;
  description: string;
  perfectFor: string[];
  shapes: ('Round' | 'Square')[];
  basePriceAED: number; // For 1-9 pcs
  badgeColor: string;
  bgGradient: string;
  image: string;
}

export interface PricingTier {
  range: string;
  min: number;
  max: number | null;
  label: string;
  discountPercentage: number;
  note: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Pins' | 'Magnets' | 'Mirrors' | 'Events' | 'Corporate';
  type: 'pin' | 'magnet' | 'mirror';
  shape: 'Round' | 'Square';
  image: string;
  story: string;
  client: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Customization' | 'Ordering & Pricing' | 'File Requirements' | 'Delivery & Timing';
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'pin',
    name: 'CUSTOM PINS',
    type: 'pin',
    emoji: '📌',
    headline: 'Your Story, Worn Your Way.',
    tagline: 'Personalized pins featuring your photos, artwork, logos, or designs.',
    description: 'Make your favorite photo, illustration, logo, or message into a personalized pin that you can wear on your jacket, backpack, lanyard, or tote bag with pride.',
    perfectFor: [
      'Personal keepsakes',
      'Gifts',
      'Events',
      'Souvenirs',
      'Sports events',
      'Corporate giveaways',
      'Clubs and organizations'
    ],
    shapes: ['Round', 'Square'],
    basePriceAED: 15,
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    bgGradient: 'from-amber-50 to-orange-50',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'magnet',
    name: 'CUSTOM MAGNETS',
    type: 'magnet',
    emoji: '🧲',
    headline: 'Keep Your Favorite Memories Close.',
    tagline: 'Turn your favorite memories into something you can display every day.',
    description: 'Transform your favorite photographs, artwork, logos, or special designs into personalized magnets that brighten up your refrigerator, locker, or office whiteboard.',
    perfectFor: [
      'Souvenirs',
      'Wedding favors',
      'Birthday giveaways',
      'Travel memories',
      'Family photos',
      'Business promotions',
      'Event merchandise'
    ],
    shapes: ['Round', 'Square'],
    basePriceAED: 18,
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    bgGradient: 'from-emerald-50 to-teal-50',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mirror',
    name: 'CUSTOM MIRRORS',
    type: 'mirror',
    emoji: '🪞',
    headline: 'A Little Mirror With a Lot of Personality.',
    tagline: 'A practical little keepsake with your own personalized design.',
    description: 'Make your everyday mirror uniquely yours with a personalized photo, artwork, logo, or design on the back. Compact, durable, and stylish enough to carry everywhere.',
    perfectFor: [
      'Gifts',
      'Souvenirs',
      'Bridesmaid gifts',
      'Event giveaways',
      'Corporate merchandise',
      'Personalized keepsakes'
    ],
    shapes: ['Round', 'Square'],
    basePriceAED: 22,
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    bgGradient: 'from-rose-50 to-pink-50',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    range: '1–9 pieces',
    min: 1,
    max: 9,
    label: 'Standard Pricing',
    discountPercentage: 0,
    note: 'Ideal for single personalized gifts & small family keepsakes.'
  },
  {
    range: '10–24 pieces',
    min: 10,
    max: 24,
    label: 'Small Group Discount',
    discountPercentage: 10,
    note: '10% off per piece. Great for bridal parties & club teams.'
  },
  {
    range: '25–49 pieces',
    min: 25,
    max: 49,
    label: 'Bulk Discount',
    discountPercentage: 20,
    note: '20% off per piece. Popular for birthday favors & school events.'
  },
  {
    range: '50–99 pieces',
    min: 50,
    max: 99,
    label: 'Special Bulk Pricing',
    discountPercentage: 30,
    note: '30% off per piece. Best value for weddings & community rallies.'
  },
  {
    range: '100+ pieces',
    min: 100,
    max: null,
    label: 'Custom Quotation',
    discountPercentage: 40,
    note: 'Max volume savings & custom packaging options for corporate branding.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Sarah & Tariq Wedding Favors',
    category: 'Events',
    type: 'magnet',
    shape: 'Round',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    story: '150 custom floral photo magnets created as memory keepsakes for wedding guests in Dubai.',
    client: 'Private Client (Wedding)'
  },
  {
    id: 'g2',
    title: 'Tech Summit 2026 Attendee Pins',
    category: 'Corporate',
    type: 'pin',
    shape: 'Square',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    story: '500 square glossy logo pins crafted for event badges at Abu Dhabi Innovation Week.',
    client: 'Abu Dhabi Tech Forum'
  },
  {
    id: 'g3',
    title: 'Bridesmaid Floral Pocket Mirrors',
    category: 'Mirrors',
    type: 'mirror',
    shape: 'Round',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop',
    story: 'Personalized compact mirrors with gold foil calligraphy names for a luxury wedding shower.',
    client: 'Elena V.'
  },
  {
    id: 'g4',
    title: 'Al Ain Marathon Runner Keepsakes',
    category: 'Events',
    type: 'pin',
    shape: 'Round',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
    story: '300 finisher pins featuring custom race artwork and runner numbers.',
    client: 'Al Ain Sports Club'
  },
  {
    id: 'g5',
    title: 'Artisan Coffee Shop Brand Pins',
    category: 'Corporate',
    type: 'pin',
    shape: 'Round',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
    story: 'Branded apron pins for baristas and loyal customer merchandise giveaways.',
    client: 'Roast & Co. Cafe'
  },
  {
    id: 'g6',
    title: 'Family Desert Safari Travel Magnets',
    category: 'Magnets',
    type: 'magnet',
    shape: 'Square',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
    story: 'Custom photo magnets made from family dune bashing photographs.',
    client: 'The Miller Family'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'f1',
    category: 'Customization',
    question: 'Can I use my own photo or design?',
    answer: 'Yes! You can upload your own photo, artwork, logo, or design directly on our custom order form, or send it to us via WhatsApp after submitting your quote request.'
  },
  {
    id: 'f2',
    category: 'Customization',
    question: 'What shapes are available?',
    answer: 'Our pins, magnets, and mirrors are available in two classic shapes: Round (58mm diameter) and Square (50mm x 50mm).'
  },
  {
    id: 'f3',
    category: 'Ordering & Pricing',
    question: 'Can I order only one piece?',
    answer: 'Yes! We accept single-piece orders. Whether you need 1 unique keepsake or 1,000+ event giveaways, we treat every order with the same attention to detail.'
  },
  {
    id: 'f4',
    category: 'Ordering & Pricing',
    question: 'Can I place a bulk order?',
    answer: 'Yes. We welcome bulk orders for weddings, corporate events, birthday parties, schools, and brand merchandise with tiered quantity discounts (10–24 pcs, 25–49 pcs, 50–99 pcs, and 100+ pcs).'
  },
  {
    id: 'f5',
    category: 'Ordering & Pricing',
    question: 'Do you offer corporate orders?',
    answer: 'Yes! We specialize in custom corporate merchandise, employee appreciation gifts, trade show giveaways, and event branding. Contact us for a personalized quotation.'
  },
  {
    id: 'f6',
    category: 'File Requirements',
    question: 'How do I send my design?',
    answer: 'You can upload your design file through our interactive website order form (JPG, PNG, or PDF format), or share it with our design team through WhatsApp.'
  },
  {
    id: 'f7',
    category: 'File Requirements',
    question: 'What file formats can I submit?',
    answer: 'We recommend high-quality JPG, PNG, or PDF files. Higher resolution images (300 DPI) produce the sharpest, most vibrant print clarity.'
  },
  {
    id: 'f8',
    category: 'File Requirements',
    question: 'Can you help me with my design?',
    answer: 'Yes! If you have an idea or raw photo but need help with cropping, adding text, or placing your logo, our team will provide complimentary artwork assistance before production.'
  },
  {
    id: 'f9',
    category: 'Delivery & Timing',
    question: 'How long does an order take?',
    answer: 'Standard production takes 2–4 business days depending on quantity and design approval. Once ready, express delivery across the UAE typically takes 24–48 hours.'
  },
  {
    id: 'f10',
    category: 'Delivery & Timing',
    question: 'Do you offer delivery?',
    answer: 'Yes! We offer nationwide courier delivery across all 7 Emirates in the UAE (Dubai, Abu Dhabi, Sharjah, Ajman, RAK, UAQ, Fujairah). Pickup options are also available.'
  },
  {
    id: 'f11',
    category: 'Customization',
    question: 'Can I see my design before production?',
    answer: 'Absolutely! For all custom orders, we send a digital proof (mockup) via WhatsApp or email for your final review and approval before starting production.'
  },
  {
    id: 'f12',
    category: 'Delivery & Timing',
    question: 'Do you accept urgent orders?',
    answer: 'Yes, depending on our daily production capacity we can accommodate rush orders for last-minute events. Please contact us on WhatsApp with your required date.'
  }
];

export const PRESET_SAMPLE_ARTWORK = [
  {
    id: 'preset-1',
    name: 'Floral Monogram',
    category: 'Wedding & Family',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'preset-2',
    name: 'Desert Golden Hour',
    category: 'Travel & Photography',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'preset-3',
    name: 'Minimalist Brand Logo',
    category: 'Corporate & Brand',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'preset-4',
    name: 'Pet Watercolor Portrait',
    category: 'Art & Keepsake',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=400&auto=format&fit=crop'
  }
];
