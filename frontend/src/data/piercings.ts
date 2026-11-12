import { Piercing } from '../types';

export const PIERCINGS: Piercing[] = [
  // EAR PIERCINGS
  {
    id: 'lobe',
    name: 'Lobe',
    category: 'ear',
    shortDescription: 'Classic standard earlobe piercing with high versatility and the gentlest healing experience.',
    placement: 'Center of the lower flesh of the earlobe',
    healingPeriod: '6–8 weeks',
    jewelryInfo: '18G or 16G flat back labret or stud; implant-grade titanium or solid 14k/18k gold',
    startingPrice: 550,
    formattedPrice: '₱550',
    availabilityStatus: 'available',
    painLevel: 'Mild',
    coordinates: { x: 50, y: 84 },
    details: {
      about: 'The traditional standard earlobe piercing is the foundation of curated ear styling. Because the lower lobe is soft tissue without cartilage, it benefits from good blood circulation, resulting in mild sensation and the swiftest healing trajectory.',
      prepChecklist: [
        'Have a balanced meal 1–2 hours before your appointment to keep blood sugar stable',
        'Tie hair back if long to allow unobstructed ear access',
        'Avoid caffeine or energy drinks right before your appointment',
        'Bring government-issued ID or student identification'
      ],
      aftercareNotes: [
        'Spray with sterile 0.9% saline spray twice daily; avoid twisting or spinning the jewelry',
        'Sleep on a travel pillow or opposite side to prevent mechanical pressure on the ear',
        'Gently pat dry with clean disposable non-woven gauze; do not use cotton swabs that snag fibers',
        'Leave initial jewelry in place for at least 8 full weeks before considering downsize or swap'
      ],
      jewelryMaterials: [
        'ASTM F-136 Implant-Grade Titanium (Hypoallergenic)',
        '14k or 18k Solid Nickel-Free Yellow / White / Rose Gold',
        'Biocompatible Niobium'
      ],
      anatomyNote: 'Nearly universal anatomy suitability. Piercer will assess symmetry with your natural lobe fold and jawline.',
      painLevelDescription: 'Typically rated 2/10. Quick pinch followed by a brief warm sensation.'
    }
  },
  {
    id: 'upper-lobe',
    name: 'Upper Lobe',
    category: 'ear',
    shortDescription: 'Second or third piercing placed higher along the lobe contour for stacked styling.',
    placement: 'Higher lobe tissue along the auricular rim',
    healingPeriod: '8–12 weeks',
    jewelryInfo: '18G or 16G threadless flat back labret; titanium or gold',
    startingPrice: 600,
    formattedPrice: '₱600',
    availabilityStatus: 'available',
    painLevel: 'Mild',
    coordinates: { x: 56, y: 74 },
    details: {
      about: 'Upper lobe piercings stack seamlessly above the classic lobe, allowing layered studs, gradual sizing gradients, or delicate pave clusters. Approaching the lower cartilage border, healing can take slightly longer than a standard lobe.',
      prepChecklist: [
        'Wear loose, comfortable clothing with easy neckline access',
        'Be well rested and hydrated',
        'Inform the piercer if you have previous piercings close to the placement site'
      ],
      aftercareNotes: [
        'Clean twice a day with sterile saline solution',
        'Do not sleep directly on the fresh piercing',
        'Keep phone, headphones, and hair clean and away from the area',
        'Downsize post length after swelling recedes around 4–6 weeks'
      ],
      jewelryMaterials: [
        'ASTM F-136 Titanium Flat Back Studs',
        '14k/18k Solid Gold Bezel or Prong Gem Ends'
      ],
      anatomyNote: 'Anatomy will determine how many stacked piercings your lobe can accommodate safely without crowding.',
      painLevelDescription: 'Typically rated 2 to 3/10. Very fast procedure with momentary sting.'
    }
  },
  {
    id: 'helix',
    name: 'Helix',
    category: 'ear',
    shortDescription: 'Upper outer ear rim cartilage piercing known for its clean, timeless, and versatile look.',
    placement: 'Upper rim cartilage of the outer ear',
    healingPeriod: '6–12 months',
    jewelryInfo: '16G flat back labret (fitted initially for swelling; ring can be worn after full heal)',
    startingPrice: 750,
    formattedPrice: '₱750',
    availabilityStatus: 'available',
    painLevel: 'Moderate',
    coordinates: { x: 74, y: 26 },
    details: {
      about: 'The helix is an iconic cartilage piercing. It sits along the curved superior rim of the ear. While straight posts are required for initial healing to prevent migration and bumps, healed helix piercings can host delicate hoops, chains, and clusters.',
      prepChecklist: [
        'Eat a nourishing meal within 2 hours',
        'Avoid aspirin, alcohol, and blood-thinning compounds for 24 hours',
        'Bring hair ties or pins if you have long or textured hair',
        'Check which side you prefer to sleep on before choosing an ear'
      ],
      aftercareNotes: [
        'Strictly do not sleep on the ear; use an ear-piercing pillow or donut cushion',
        'Spray with sterile saline 0.9% twice daily and dry gently with unbleached paper towel or non-woven gauze',
        'Never change to a ring until fully healed (minimum 6–9 months)',
        'Schedule a mandatory 4-to-8-week downsize to prevent migration and angle shifting'
      ],
      jewelryMaterials: [
        'Threadless or Internally Threaded ASTM F-136 Titanium',
        '14k Solid Gold Tops (Cabochons, Marquise, Micro-bezel)'
      ],
      anatomyNote: 'Requires a defined rim curl. Your piercer inspects cartilage thickness and curvature during consultation.',
      painLevelDescription: 'Typically rated 4 to 5/10. Sharp pressure followed by a throbbing sensation for 20–40 minutes.'
    }
  },
  {
    id: 'forward-helix',
    name: 'Forward Helix',
    category: 'ear',
    shortDescription: 'Chic piercing situated on the upper ear curve closest to the face and hairline.',
    placement: 'Front anterior rim directly above the tragus',
    healingPeriod: '6–10 months',
    jewelryInfo: '16G or 18G short flat back labret; tiny gem or disc end',
    startingPrice: 800,
    formattedPrice: '₱800',
    availabilityStatus: 'available',
    painLevel: 'Moderate',
    coordinates: { x: 38, y: 28 },
    details: {
      about: 'The forward helix sits right where the top of the ear meets the temple. It offers a subtle, eye-catching focal point and can be done single, double, or triple depending on your anterior cartilage fold.',
      prepChecklist: [
        'Wear hair away from the face',
        'Avoid wearing makeup near the ear and temple area on appointment day',
        'Be hydrated and calm'
      ],
      aftercareNotes: [
        'Be cautious when brushing hair or washing face',
        'Keep shampoo and facial cleanser away from the fresh channel',
        'Saline spray twice daily; avoid touching with unwashed fingers',
        'Downsizing post length is essential around week 6'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium', '14k Solid Gold Petite Studs'],
      anatomyNote: 'Requires sufficient anterior cartilage ridge width so the backing sits flush without pressing the scalp.',
      painLevelDescription: 'Rated 4/10. Quick pinch with brief localized warmth.'
    }
  },
  {
    id: 'flat',
    name: 'Flat',
    category: 'ear',
    shortDescription: 'Positioned on the expansive, smooth cartilage plate between the helix and rook.',
    placement: 'Flat upper cartilage surface of the scapha',
    healingPeriod: '6–12 months',
    jewelryInfo: '16G straight flat back labret; ideal for statement clusters or motifs',
    startingPrice: 750,
    formattedPrice: '₱750',
    availabilityStatus: 'available',
    painLevel: 'Moderate',
    coordinates: { x: 55, y: 30 },
    details: {
      about: 'The flat piercing sits on the wide, planar surface of the upper ear. Its level surface makes it the premier canvas for ornate decorative jewelry ends such as snakes, celestial stars, crescents, and cluster gemstones.',
      prepChecklist: [
        'Ensure you can commit to back-sleeping or using an ear pillow',
        'Eat a meal and bring valid identification',
        'Discuss your long-term curation plan with your piercer'
      ],
      aftercareNotes: [
        'Zero pressure while sleeping is paramount to prevent permanent tilting',
        'Rinse with warm sterile saline spray twice daily',
        'Avoid tight beanies, helmets, and over-ear headphones during early healing'
      ],
      jewelryMaterials: ['Implant-grade Titanium ASTM F-136', 'Solid Gold Decorative Castings'],
      anatomyNote: 'Dependent on having a relatively flat scapha area without prominent cartilage ridges.',
      painLevelDescription: 'Rated 4 to 5/10. Distinct crunch/pop pressure that quickly subsides.'
    }
  },
  {
    id: 'conch',
    name: 'Conch',
    category: 'ear',
    shortDescription: 'Striking middle-ear piercing placed in the deep interior cup of cartilage.',
    placement: 'Central cartilage bowl of the auricle',
    healingPeriod: '6–12 months',
    jewelryInfo: '16G labret stud for initial healing; can switch to a snug hoop once fully mature',
    startingPrice: 850,
    formattedPrice: '₱850',
    availabilityStatus: 'available',
    painLevel: 'Moderate',
    coordinates: { x: 58, y: 52 },
    details: {
      about: 'The conch piercing is named after its shell-like cavity. Positioned in the deep cartilage bowl, it can be styled with an eye-catching central gem or, once fully healed, a bold hoop that hugs the entire outer ear edge.',
      prepChecklist: [
        'Plan audio habits: in-ear earbuds may interfere depending on placement',
        'Eat a solid meal before coming in',
        'Bring hair accessories to keep hair clear'
      ],
      aftercareNotes: [
        'Do not wear in-ear buds (e.g., AirPods) on the pierced ear for the first 8 weeks',
        'Saline spray twice daily and keep dry',
        'Always start with a straight post; rings rotate and delay conch healing by months'
      ],
      jewelryMaterials: ['ASTM F-136 Implant-Grade Titanium Labret', '14k Solid Gold Ends'],
      anatomyNote: 'Works on almost all ears; inner vs outer conch positioning is chosen to flatter your natural cup depth.',
      painLevelDescription: 'Rated 5/10. Cartilage is dense here, so you will feel firm pressure for a few seconds.'
    }
  },
  {
    id: 'tragus',
    name: 'Tragus',
    category: 'ear',
    shortDescription: 'Sophisticated small projection of cartilage directly over the ear canal entrance.',
    placement: 'Small triangular cartilage flap in front of the ear canal',
    healingPeriod: '6–9 months',
    jewelryInfo: '16G flat back labret (compact 2mm–3mm disc or ball)',
    startingPrice: 800,
    formattedPrice: '₱800',
    availabilityStatus: 'available',
    painLevel: 'Moderate',
    coordinates: { x: 38, y: 55 },
    details: {
      about: 'The tragus adds understated elegance right at the threshold of the ear canal. It is subtle yet modern, catching light whenever hair is tucked behind the ear.',
      prepChecklist: [
        'Prepare alternative audio solutions (no earbud in this ear during initial months)',
        'Ensure skin around the ear canal is clean',
        'Have a meal 1–2 hours beforehand'
      ],
      aftercareNotes: [
        'Strictly no in-ear headphones or earplugs until downsized and stabilized',
        'Do not use cotton swabs inside the ear canal to clean around the backing',
        'Dry thoroughly after showering with low cool air or clean gauze'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium 16G', '14k/18k Solid Gold Low-Profile Studs'],
      anatomyNote: 'Requires a tragus flap of sufficient thickness and depth to securely hold a labret post.',
      painLevelDescription: 'Rated 4/10. Noticeable pressure and a soft audible pop during needle passage.'
    }
  },
  {
    id: 'daith',
    name: 'Daith',
    category: 'ear',
    shortDescription: 'Interior cartilage ridge piercing resting nestled right above the ear canal.',
    placement: 'Crus of helix innermost cartilage fold',
    healingPeriod: '6–12 months',
    jewelryInfo: '16G captive bead ring, circular barbell, or clicker; titanium or gold',
    startingPrice: 900,
    formattedPrice: '₱900',
    availabilityStatus: 'available',
    painLevel: 'Noticeable',
    coordinates: { x: 44, y: 44 },
    details: {
      about: 'The daith is a showstopper piercing that sits deeply centered within the ear structure. Uniquely, curved jewelry (such as a captive bead ring or ornamental clicker) is standard from day one, framing the inner ear beautifully.',
      prepChecklist: [
        'Stay well rested and eat properly',
        'Practice slow diaphragmatic breathing to stay relaxed during needle insertion',
        'Consultation includes rigorous assessment of the crus fold depth'
      ],
      aftercareNotes: [
        'Clean with sterile saline spray; avoid spinning the ring through the healing fistula',
        'Rinse thoroughly in the shower to prevent crust accumulation in the inner crevice',
        'Avoid sleeping directly on the pierced side'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium Horseshoe or CBR', '14k Solid Gold Seam or Clicker Ring'],
      anatomyNote: 'Strictly anatomy-dependent. Requires a pronounced, accessible crus of the helix ridge.',
      painLevelDescription: 'Rated 6/10. Deep ache and strong pressure during insertion, resolving into mild throbbing.'
    }
  },
  {
    id: 'rook',
    name: 'Rook',
    category: 'ear',
    shortDescription: 'Distinctive vertical piercing through the prominent upper antihelix ridge.',
    placement: 'Upper antihelix cartilage shelf',
    healingPeriod: '6–12 months',
    jewelryInfo: '16G curved barbell (banana bar); titanium or gold',
    startingPrice: 850,
    formattedPrice: '₱850',
    availabilityStatus: 'available',
    painLevel: 'Noticeable',
    coordinates: { x: 46, y: 34 },
    details: {
      about: 'The rook is pierced vertically through the interior ridge between the inner and upper ear. Because it sits tucked safely inside the ear anatomy, it experiences less accidental snagging from clothing than outer rim piercings.',
      prepChecklist: [
        'Eat a balanced meal before arrival',
        'Avoid taking anti-inflammatories before the procedure unless medically prescribed',
        'Be ready to lie still during alignment'
      ],
      aftercareNotes: [
        'Saline spray twice daily; let water gently rinse over it during warm showers',
        'Do not pull or flip the curved barbell up and down',
        'Downsize after swelling subsides around month 2'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium Curved Barbell', '14k Solid Gold Curved Barbell'],
      anatomyNote: 'Requires a defined cartilage ridge with enough depth for a curved barbell to sit without tension.',
      painLevelDescription: 'Rated 5 to 6/10. Firm pinch and heavy pressure during procedure.'
    }
  },
  {
    id: 'industrial',
    name: 'Industrial',
    category: 'ear',
    shortDescription: 'Bold statement consisting of two connected helix holes joined by a single straight bar.',
    placement: 'Forward helix across the scapha to the opposite outer helix rim',
    healingPeriod: '9–15 months',
    jewelryInfo: '14G long straight industrial barbell; implant-grade titanium',
    startingPrice: 1200,
    formattedPrice: '₱1,200',
    availabilityStatus: 'limited',
    painLevel: 'Noticeable',
    coordinates: { x: 62, y: 22 },
    details: {
      about: 'An industrial piercing connects two cartilage perforations with one solid straight barbell. It requires precision angling and meticulous aftercare due to the shared tension between two separate healing points.',
      prepChecklist: [
        'Eat a hearty meal prior to arrival',
        'Commit to sleep discipline (no sleeping on this ear for up to 1 year)',
        'Have long hair securely tied back'
      ],
      aftercareNotes: [
        'Never sleep on the barbell; pressure causes permanent angle shift and unsightly bumps',
        'Avoid wearing tight over-ear headphones, beanies, or helmets',
        'Spray both puncture sites twice daily with sterile 0.9% saline spray',
        'Never bend or force the bar'
      ],
      jewelryMaterials: ['ASTM F-136 Implant-Grade Titanium Barbell (Custom length)'],
      anatomyNote: 'Very strictly anatomy-dependent. Requires a defined outer rim curl and a non-protruding scapha/flat.',
      painLevelDescription: 'Rated 6 to 7/10. You undergo two piercings back-to-back with a single barbell connection.'
    }
  },

  // FACIAL PIERCINGS
  {
    id: 'nostril',
    name: 'Nostril',
    category: 'facial',
    shortDescription: 'Classic nasal piercing that accentuates facial features with a subtle stud or ring.',
    placement: 'Crease or curve of the left or right nasal flare',
    healingPeriod: '4–6 months',
    jewelryInfo: '18G flat back labret or nostril screw initially; hoops only after full maturation',
    startingPrice: 750,
    formattedPrice: '₱750',
    availabilityStatus: 'available',
    painLevel: 'Mild',
    details: {
      about: 'Nostril piercings are one of the world’s oldest and most flattering body adornments. Placed thoughtfully in the gentle curve of the nostril flare, initial jewelry is always a secure flat back post to allow smooth healing without rotation.',
      prepChecklist: [
        'Gently blow nose and clean facial area before appointment',
        'Do not apply foundation, concealer, or bronzer on or around the nose',
        'Eat 1–2 hours before arriving'
      ],
      aftercareNotes: [
        'Spray outside with sterile saline spray twice daily; use a saline rinse inside if needed',
        'Never pick inside the nose near the post; pat dry with clean tissue or gauze',
        'Do not swap to a hoop until at least 6 months have passed and the fistula is stable',
        'Downsize the post length around 4–6 weeks to prevent snagging on washcloths'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium Flat Back Labret', '14k/18k Solid Gold Low-Profile Studs'],
      anatomyNote: 'The piercer marks the natural crease of your nostril to balance your profile and smile lines.',
      painLevelDescription: 'Rated 3 to 4/10. Causes an involuntary tear in the eye on that side due to common facial nerves.'
    }
  },
  {
    id: 'septum',
    name: 'Septum',
    category: 'facial',
    shortDescription: 'Placed through the tender "sweet spot" of the nasal septum; easily flipped to hide.',
    placement: 'Membranous tissue between the nasal cartilage and columella tip',
    healingPeriod: '2–3 months',
    jewelryInfo: '16G circular barbell (horseshoe), captive bead ring, or clicker',
    startingPrice: 900,
    formattedPrice: '₱900',
    availabilityStatus: 'available',
    painLevel: 'Mild',
    details: {
      about: 'When performed correctly by an experienced professional, a septum piercing passes through the non-cartilaginous "sweet spot" of soft flesh. Healing is remarkably swift, and jewelry can easily be flipped up inside the nostrils for work or school.',
      prepChecklist: [
        'Blow nose thoroughly before the procedure',
        'Inform the piercer if you have a known deviated septum',
        'Eat a light meal beforehand'
      ],
      aftercareNotes: [
        'Cup warm sterile saline solution in clean hands or shot glass and blow gentle bubbles to rinse',
        'If you need to heal it flipped up for professional reasons, keep it flipped up until healed',
        'Avoid rotating or adjusting with dirty fingers'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium Horseshoe or Retainer', '14k Solid Gold Clicker'],
      anatomyNote: 'Requires a clear membranous sweet spot. Piercer checks with clean gloved fingers before needle selection.',
      painLevelDescription: 'Rated 2 to 3/10 when passing through the sweet spot. Produces an immediate eye-water response.'
    }
  },
  {
    id: 'eyebrow',
    name: 'Eyebrow',
    category: 'facial',
    shortDescription: 'Modern surface piercing tracking the natural arch and angle of the brow.',
    placement: 'Outer third of the eyebrow ridge, vertical or slight diagonal angle',
    healingPeriod: '3–4 months',
    jewelryInfo: '16G curved barbell (titanium)',
    startingPrice: 850,
    formattedPrice: '₱850',
    availabilityStatus: 'available',
    painLevel: 'Mild',
    details: {
      about: 'The eyebrow piercing accentuates the brow bone and frames the eye. It is performed with a curved barbell that respects facial movement during expression and speech.',
      prepChecklist: [
        'Avoid plucking or waxing eyebrows on the day of the appointment',
        'Do not apply brow makeup or pomade before the visit',
        'Have a meal and drink water'
      ],
      aftercareNotes: [
        'Be extremely gentle when pulling shirts over your head to avoid snags',
        'Clean twice daily with saline spray; avoid getting face wash or makeup in the channel',
        'Downsizing the barbell length around week 6 is critical to prevent surface migration'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium Curved Barbell'],
      anatomyNote: 'Requires sufficient pinchable tissue and depth on the supraorbital ridge.',
      painLevelDescription: 'Rated 3/10. Fast pinch with mild localized tenderness.'
    }
  },
  {
    id: 'lip',
    name: 'Lip (Labret / Philtrum)',
    category: 'facial',
    shortDescription: 'Clean oral piercing centered or offset on the lower or upper lip perimeter.',
    placement: 'Lower lip (Labret/Side Lip) or Cupid’s bow (Philtrum/Medusa)',
    healingPeriod: '2–3 months',
    jewelryInfo: '16G flat back labret post with soft backing disc',
    startingPrice: 850,
    formattedPrice: '₱850',
    availabilityStatus: 'available',
    painLevel: 'Moderate',
    details: {
      about: 'Lip piercings can be placed centered below the lip, on either side, or centrally in the upper cupid’s bow. Initial posts are longer to accommodate customary initial swelling for the first 7–10 days.',
      prepChecklist: [
        'Brush teeth and rinse with alcohol-free antibacterial mouthwash beforehand',
        'Eat a substantial meal before appointment since eating may feel tender for the first day',
        'Bring a cold water bottle'
      ],
      aftercareNotes: [
        'External care: sterile saline spray twice daily. Internal care: alcohol-free mouthwash after eating and smoking',
        'Switch to a new soft-bristle toothbrush during healing',
        'Mandatory downsize between weeks 3–4 to prevent contact with teeth and gums'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium Flat Back Post with Disc', '14k Gold Top'],
      anatomyNote: 'The piercer checks frenulum attachment and dental clearance to safeguard your teeth and gum health.',
      painLevelDescription: 'Rated 4/10. Sharp pinch that subsides quickly into moderate swelling.'
    }
  },

  // OTHER PIERCINGS
  {
    id: 'navel',
    name: 'Navel (Belly Button)',
    category: 'other',
    shortDescription: 'Classic torso piercing placed through the upper rim of the belly button.',
    placement: 'Superior rim of the navel cavity',
    healingPeriod: '6–12 months',
    jewelryInfo: '14G curved navel barbell; titanium or solid gold with bezel gems',
    startingPrice: 950,
    formattedPrice: '₱950',
    availabilityStatus: 'available',
    painLevel: 'Moderate',
    details: {
      about: 'The navel piercing is a perennial favorite. It requires proper seating of the bottom gem inside the navel shelf so it doesn’t collapse when sitting or bending.',
      prepChecklist: [
        'Wear loose, low-rise pants or sweatpants; avoid tight high-waisted jeans',
        'Eat a meal 1–2 hours prior',
        'Shower prior to arriving'
      ],
      aftercareNotes: [
        'Avoid high-waisted waistbands that put friction or pressure on the jewelry',
        'Saline spray twice daily and rinse well during shower; keep area dry afterwards',
        'Avoid submerged water (swimming pools, lakes, hot tubs) for at least 8 weeks'
      ],
      jewelryMaterials: ['ASTM F-136 Titanium Curved Navel Barbell', '14k Solid Gold Bezel Barbell'],
      anatomyNote: 'Requires a defined top ledge and adequate space in the navel cavity when seated and standing.',
      painLevelDescription: 'Rated 4 to 5/10. Brief deep pressure followed by mild tightness.'
    }
  }
];

export const PIERCING_CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'ear', label: 'Ear Piercings' },
  { id: 'facial', label: 'Facial Piercings' },
  { id: 'other', label: 'Body Piercings' }
];
