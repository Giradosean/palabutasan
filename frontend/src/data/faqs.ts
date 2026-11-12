import { FAQItem } from '../types';

export const FAQS: FAQItem[] = [
  {
    id: 'pain',
    question: 'Does getting pierced hurt?',
    answer: 'Discomfort varies depending on the individual, fatigue levels, and piercing location. Soft tissue like the lobe or septum usually feels like a quick, momentary pinch (rated 2–3/10). Cartilage areas like helix, conch, or rook involve more firm pressure and a brief warm throbbing sensation (rated 4–6/10) that subsides rapidly. Our piercers use ultra-sharp single-use surgical needles for minimal resistance.',
    category: 'procedure'
  },
  {
    id: 'duration',
    question: 'How long does a piercing appointment take?',
    answer: 'The actual piercing procedure takes only a fraction of a second. However, each appointment is booked for 30 to 45 minutes to allow unhurried consultation, meticulous anatomical assessment, sterile jewelry selection, precise placement marking, and personalized aftercare instructions.',
    category: 'procedure'
  },
  {
    id: 'healing-time',
    question: 'How long does the healing process take?',
    answer: 'Healing depends on the anatomical location and your body’s immune system. Soft earlobes heal in 6–8 weeks, while cartilage piercings (helix, conch, industrial) require 6–12 months or longer to mature fully. Surface or oral piercings typically take 2–4 months. Healing times are ranges, not guarantees.',
    category: 'aftercare'
  },
  {
    id: 'own-jewelry',
    question: 'Can I bring my own jewelry to be pierced with?',
    answer: 'For your safety, we do not pierce with outside jewelry brought from home. Initial piercings require certified implant-grade materials (ASTM F-136 titanium, 14k/18k solid gold, or niobium) with verified threadless or internal threading and mirror polish, sterilized on-site in our medical autoclave. You are welcome to bring healed outside jewelry to our piercers for inspection and installation into mature piercings.',
    category: 'policy'
  },
  {
    id: 'multiple-piercings',
    question: 'Can I get multiple piercings in a single session?',
    answer: 'We generally limit clients to a maximum of 3–4 piercings per appointment, and recommend sticking to one ear or localized area at a time. Healing multiple perforations simultaneously places greater demand on your immune system and can compromise sleep quality if both ears are pierced.',
    category: 'policy'
  },
  {
    id: 'what-to-bring',
    question: 'What should I bring to my appointment?',
    answer: 'Please bring a valid government-issued photo ID (or valid student ID for minors accompanied by a parent/legal guardian with matching documentation), comfortable clothing that allows easy neck and ear access, and your appointment reference number. We recommend having eaten a solid meal 1–2 hours beforehand.',
    category: 'procedure'
  },
  {
    id: 'cancellation',
    question: 'Can I cancel or reschedule my appointment?',
    answer: 'Yes. You can reschedule or cancel directly through our online appointment portal or by contacting the studio at least 24 hours prior to your scheduled time. This allows us to offer the slot to clients on our waitlist.',
    category: 'policy'
  },
  {
    id: 'late-arrival',
    question: 'What if I am running late for my appointment?',
    answer: 'We provide a 10-minute grace window. If you are more than 15 minutes late, your appointment may need to be rescheduled or adjusted to prevent delaying subsequent scheduled clients. If you anticipate traffic, please call us ahead of time.',
    category: 'policy'
  },
  {
    id: 'allergies',
    question: 'What if I have metal allergies or sensitive skin?',
    answer: 'Always notify your piercer before your session. We exclusively stock certified hypoallergenic ASTM F-136 implant-grade titanium, which is 100% nickel-free and biocompatible. For clients with severe hypersensitivities, medical-grade niobium is also available.',
    category: 'general'
  },
  {
    id: 'sickness',
    question: 'Can I get pierced if I am feeling sick or recovering?',
    answer: 'We strongly advise postponing your visit until you are completely recovered. If your immune system is combating an infection, cold, or virus, your body cannot efficiently direct healing energy toward a new piercing wound, leading to prolonged inflammation or complications.',
    category: 'general'
  },
  {
    id: 'cleaning-products',
    question: 'Can I use alcohol, hydrogen peroxide, or ointment on my new piercing?',
    answer: 'No. Never apply rubbing alcohol, hydrogen peroxide, antibacterial soaps, or antibiotic ointments (like Neosporin) to a healing piercing. These chemicals destroy healthy regenerating tissue and trap bacteria. Only use sterile 0.9% sodium chloride saline spray twice a day.',
    category: 'aftercare'
  },
  {
    id: 'swimming',
    question: 'When can I go swimming after getting pierced?',
    answer: 'Avoid submerging unhealed piercings in pools, hot tubs, the ocean, rivers, or bathtubs for at least 6–8 weeks for lobes and 3–6 months for cartilage. Bodies of water harbor bacteria that can quickly cause stubborn infections.',
    category: 'aftercare'
  }
];

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All FAQs' },
  { id: 'procedure', label: 'Procedure & Pain' },
  { id: 'aftercare', label: 'Aftercare & Healing' },
  { id: 'policy', label: 'Studio Policies' },
  { id: 'general', label: 'Health & Allergies' }
];
