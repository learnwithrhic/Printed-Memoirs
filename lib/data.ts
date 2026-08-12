export interface ProductItem {
  id: string;
  name: string;
  type: 'pin' | 'magnet' | 'mirror' | 'collage';
  emoji: string;
  headline: string;
  tagline: string;
  description: string;
  perfectFor: string[];
  shapes: string[];
  basePriceAED: number; // For 1-9 pcs or base grid set
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
  category: 'Pins' | 'Magnets' | 'Mirrors' | 'Collages' | 'Events' | 'Corporate';
  type: 'pin' | 'magnet' | 'mirror' | 'collage';
  shape: string;
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
    tagline: 'Personalized 65mm round pins featuring your photos, artwork, logos, or designs.',
    description: 'Make your favorite photo, illustration, logo, or message into a personalized 65mm round pin that you can wear on your jacket, backpack, lanyard, or tote bag with pride.',
    perfectFor: [
      'Personal keepsakes',
      'Gifts',
      'Events & Souvenirs',
      'Sports meets',
      'Corporate giveaways',
      'Clubs and organizations'
    ],
    shapes: ['65mm Round'],
    basePriceAED: 15,
    badgeColor: 'bg-[#EFC257]/20 text-[#777F56] border-[#EFC257]',
    bgGradient: 'from-[#EFE2C2]/40 to-[#EFC257]/20',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'magnet',
    name: 'CUSTOM MAGNETS',
    type: 'magnet',
    emoji: '🧲',
    headline: 'Keep Your Favorite Memories Close.',
    tagline: 'Turn your favorite memories into round or square photo magnets.',
    description: 'Transform photographs, artwork, or logos into personalized fridge magnets. Choose from 65mm Round, 58mm Square with soft rounded corners, or 50mm Square.',
    perfectFor: [
      'Travel souvenirs',
      'Wedding favors',
      'Birthday giveaways',
      'Family photo grids',
      'Business promotions',
      'Fridge & locker displays'
    ],
    shapes: ['65mm Round', '58mm Square (Rounded Corners)', '50mm Square'],
    basePriceAED: 18,
    badgeColor: 'bg-[#99A86F]/20 text-[#777F56] border-[#99A86F]',
    bgGradient: 'from-[#EFE2C2]/40 to-[#99A86F]/20',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mirror',
    name: 'CUSTOM MIRRORS',
    type: 'mirror',
    emoji: '🪞',
    headline: 'A Little Mirror With a Lot of Personality.',
    tagline: 'A practical 65mm round compact mirror with your custom design.',
    description: 'Make your everyday pocket mirror uniquely yours with a custom photo, artwork, logo, or monogram printed on the back. Durable, stylish, and built to travel everywhere.',
    perfectFor: [
      'Bridesmaid gifts',
      'Souvenirs',
      'Event giveaways',
      'Corporate merchandise',
      'Personalized keepsakes'
    ],
    shapes: ['65mm Round'],
    basePriceAED: 22,
    badgeColor: 'bg-[#E1A77A]/20 text-[#777F56] border-[#E1A77A]',
    bgGradient: 'from-[#EFE2C2]/40 to-[#E1A77A]/20',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'collage',
    name: 'COLLAGE / PUZZLE MAGNETS',
    type: 'collage',
    emoji: '🧩',
    headline: 'Interactive Multi-Piece Photo Puzzle Grids.',
    tagline: 'A statement magnetic collage assembled from 50mm square magnets.',
    description: 'Transform a single high-resolution photograph or artwork into an interactive puzzle grid made of 50mm square magnets. Available in 2×3 (6 pcs), 3×3 (9 pcs), 3×4 (12 pcs), and 4×4 (16 pcs) grid configurations.',
    perfectFor: [
      'Statement fridge displays',
      'Wedding memory mosaics',
      'Anniversary gifts',
      'Travel photo collections',
      'Interactive brand artwork'
    ],
    shapes: ['2×3 Grid (6 Pcs)', '3×3 Grid (9 Pcs)', '3×4 Grid (12 Pcs)', '4×4 Grid (16 Pcs)'],
    basePriceAED: 65,
    badgeColor: 'bg-[#777F56]/15 text-[#777F56] border-[#777F56]/40',
    bgGradient: 'from-[#EFE2C2]/50 to-[#99A86F]/30',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop'
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
    question: 'What sizes and shapes are available?',
    answer: 'We offer exact specifications tailored to each product type:\n1. 65mm Round (available for Pins, Magnets, and Mirrors)\n2. 58mm Square with soft rounded corners (available for Magnets only)\n3. 50mm Square (available for Magnets only)\n4. Collage / Puzzle Magnets made of 50mm square magnets in 2×3 (6 pcs), 3×3 (9 pcs), 3×4 (12 pcs), or 4×4 (16 pcs) grids.'
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
