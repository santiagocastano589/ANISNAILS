import { Service, TechniqueInfo, GalleryItem, Review, StudioConfig } from '../types';

export const DEFAULT_STUDIO_CONFIG: StudioConfig = {
  name: "Anis Nails",
  tagline: "El arte de embellecer tus manos con elegancia, precisión y estilo único.",
  phoneWhatsApp: "573041056827", // Default studio phone (configurable in Admin panel)
  email: "citas@anisnails.com",
  instagram: "luxenails_studio",
  address: "Parque Residencial Oviedo",
  city: "Armenia, Colombia",
  workingDays: "Lunes a Sábado",
  workingHours: "9:00 AM - 7:00 PM",
  currencySymbol: "$"
};

export const AVAILABLE_EXTRAS = [
  { id: 'ret-1', name: 'Retiro de sistema anterior (Acrílico/Gel)', price: 15000, duration: 25 },
  { id: 'art-2', name: 'Nail Art en 2 uñas (efecto mano alzada o cristales)', price: 10000, duration: 15 },
  { id: 'art-all', name: 'Full Nail Art (diseño temático en todas las uñas)', price: 30000, duration: 40 },
  { id: 'spa-hydra', name: 'Exfoliación e Hidratación Profunda con parafina', price: 18000, duration: 20 },
  { id: 'chrome', name: 'Efecto Espejo / Glazed Donut / Cat Eye', price: 12000, duration: 15 },
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'acrilicas-esculpidas',
    name: 'Uñas Acrílicas Esculpidas',
    category: 'acrilico',
    price: 95000,
    durationMinutes: 120,
    description: 'Estructura esculpida sobre molde a la medida de tu lecho ungueal. Máxima resistencia, largo personalizado y forma impecable (coffin, almendra, cuadrada o stiletto).',
    technique: 'Esculpido en monómero y polímero con acabado de esmaltado semipermanente.',
    includes: [
      'Manicura rusa de preparación',
      'Esculpido con estructura balanceada',
      'Largo hasta número 3 (mediano)',
      'Esmaltado en gel 1 o 2 tonos',
      'Hidratación de cutículas con aceite esencial'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'soft-gel-system',
    name: 'Soft Gel / Gel X Full Cover',
    category: 'soft-gel',
    price: 85000,
    durationMinutes: 90,
    description: 'La revolución en extensiones: tips 100% de gel adheridos con base curada en lámpara. Acabado ultra ligero, natural y sin olor fuerte de monómero.',
    technique: 'Extensión full cover preformada de gel flexible soak-off.',
    includes: [
      'Limpieza profunda y retiro de perigio',
      'Adaptación de tips a medida',
      'Nivelación y refuerzo de apex',
      'Esmaltado semipermanente de larga duración',
      'Top coat ultra brillante Diamond'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'kapping-gel',
    name: 'Baño de Acrílico / Kapping Gel',
    category: 'acrilico',
    price: 65000,
    durationMinutes: 75,
    description: 'Una fina capa de refuerzo de acrílico o gel builder sobre tu uña natural para protegerla contra roturas, permitiéndole crecer sana y fuerte.',
    technique: 'Blindaje ungueal sin alargamiento artificial.',
    includes: [
      'Manicura en seco o combinada',
      'Capa protectora de refuerzo estructurada',
      'Nivelación de surcos en uña natural',
      'Esmaltado semipermanente al gusto',
      'Masaje relajante con crema de almendras'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    popular: false
  },
  {
    id: 'semipermanente-rusa',
    name: 'Esmaltado Semipermanente con Nivelación',
    category: 'semipermanente',
    price: 50000,
    durationMinutes: 60,
    description: 'Manicura rusa con torno para limpiar el contorno de cutícula a la perfección, logrando una aplicación bajo cutícula que prolonga la duración hasta por 25 días.',
    technique: 'Manicura de precisión con fresas diamantadas + Rubber Base.',
    includes: [
      'Limpieza con torno (técnica rusa)',
      'Alineación y arquitectura con Rubber Base',
      'Esmaltado de alta pigmentación',
      'Brillo de alto impacto no-wipe',
      'Nutrición intensiva de cutícula'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'nail-art-3d-glam',
    name: 'Set Especial Nail Art 3D & Cristalería',
    category: 'nail-art',
    price: 115000,
    durationMinutes: 135,
    description: 'Para las amantes del diseño exclusivo: flores en 3D en relieve, pedrería Swarovski encapsulada, efectos cromados, degradados ombré y texturas.',
    technique: 'Técnicas mixtas de micropintura, plastilina gel y gemas con resina.',
    includes: [
      'Set base a elección (Gel o Acrílico)',
      'Diseños personalizados en múltiples uñas',
      'Cristales de alta calidad con fijación garantizada',
      'Efectos visuales (Chrome, Glazed, Cat Eye)',
      'Sellado protector multicapa'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    popular: false
  },
  {
    id: 'pedicura-spa-semi',
    name: 'Pedicura Spa Profunda + Semipermanente',
    category: 'spa-cuidado',
    price: 60000,
    durationMinutes: 75,
    description: 'Cuidado integral de pies: tina con sales minerales, exfoliación de callosidades, hidratación profunda y esmaltado en gel de máxima duración.',
    technique: 'Podología estética + esmaltado curado en LED.',
    includes: [
      'Baño relajante con sales de eucalipto',
      'Remoción de durezas y exfoliación frutal',
      'Corte higiénico y limado de uñas',
      'Esmaltado semipermanente en gel',
      'Masaje podal estimulante'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
    popular: false
  }
];

export const TECHNIQUES_DATA: TechniqueInfo[] = [
  {
    id: 'tech-acrilico',
    name: 'Uñas Acrílicas (Esculpido)',
    shortDescription: 'La técnica clásica más resistente y duradera para quienes desean un largo pronunciado o tienen uñas que se parten con facilidad.',
    fullDescription: 'Se forma combinando un polvo polímero con un líquido monómero especial para moldear una uña fuerte sobre moldes o tips. Permite corregir uñas mordidas, desalineadas o crear formas de fantasía con una durabilidad inigualable.',
    benefits: [
      'Máxima resistencia a golpes y trabajo manual',
      'Permite cualquier longitud y forma geométrica',
      'Retoque cada 20 a 25 días sin retirar el set completo',
      'Ideal para personas con uñas quebradizas o onicofagia'
    ],
    durability: '3 a 4 semanas entre retoques',
    idealFor: 'Uñas largas, formas estructuradas (coffin, stiletto) y máxima resistencia.',
    maintenance: 'Retoque periódico cada 3 semanas y evitar usarlas como herramientas.',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tech-soft-gel',
    name: 'Soft Gel / Gel-X',
    shortDescription: 'Extensiones de gel premoldeadas súper ligeras, flexibles y que se retiran sin dañar la uña natural.',
    fullDescription: 'Es el método más moderno y saludable de alargamiento. Se utilizan tips transparentes fabricados 100% con gel soak-off que se adhieren directamente a la uña con una base en gel. Son mucho más ligeras que el acrílico y no generan olores químicos durante la aplicación.',
    benefits: [
      'Sensación ligera y ultra cómoda, como tu propia uña',
      'No daña la uña natural al retirarse con removedor suave',
      'Acabado estilizado y delgado sin grosor excesivo',
      'Aplicación más rápida y libre de olores de monómero'
    ],
    durability: '3 a 4 semanas',
    idealFor: 'Quienes buscan extensiones elegantes, ligeras y con cero agresión a su uña natural.',
    maintenance: 'Se retiran y renuevan en cada cita o se realiza mantenimiento con nivelación.',
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tech-kapping',
    name: 'Kapping / Blindaje de Uña Natural',
    shortDescription: 'Un escudo protector sobre tu propio largo para que crezcan sin romperse ni descamarse.',
    fullDescription: 'Consiste en aplicar una fina capa de gel constructor, poligel o acrílico directamente sobre la uña sin agregar extensiones ni tips. Su objetivo es aportar rigidez y elasticidad para acompañar el crecimiento natural.',
    benefits: [
      'Favorece el crecimiento de tus uñas reales',
      'Previene que el esmalte se salte por flexión',
      'Aspecto 100% natural',
      'Corrige estrías y desniveles de la placa ungueal'
    ],
    durability: '3 a 4 semanas',
    idealFor: 'Personas que ya tienen cierto largo pero sus uñas se quiebran en las esquinas.',
    maintenance: 'Relleno del crecimiento cada 3 semanas.',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tech-rusa',
    name: 'Manicura Rusa (Hardware / Combinada)',
    shortDescription: 'Técnica de limpieza milimétrica con torno para un acabado impecable y de larga duración.',
    fullDescription: 'Originaria de Europa del Este, utiliza diferentes fresas de diamante con micromotor para levantar, exfoliar y cortar la cutícula en seco con precisión quirúrgica. Permite esmaltar milímetros por debajo del eponiquio, haciendo que el crecimiento tarde más en notarse.',
    benefits: [
      'Cutículas limpias y libres de piel muerta por semanas',
      'El esmalte parece brotar de debajo de la piel',
      'Efecto pulcro y estilizado de alta gama',
      'Menor frecuencia de retoques visibles'
    ],
    durability: '20 a 28 días',
    idealFor: 'Cualquier clienta que valore la perfección en el acabado y la durabilidad extrema.',
    maintenance: 'Hidratar cutículas a diario con aceite de jojoba o almendras.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'French Nails Almendradas con Toque Dorado',
    category: 'french-nude',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
    technique: 'Soft Gel + Rubber Base + Nail Art de precisión',
    likes: 142,
    tags: ['Elegante', 'French', 'Almendra', 'Nude']
  },
  {
    id: 'gal-2',
    title: 'Acrílicas Coffin Nude con Cristalería Swarovski',
    category: 'glam',
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=900&q=80',
    technique: 'Acrílico Esculpido + Cristales encapsulados',
    likes: 215,
    tags: ['Glam', 'Cristales', 'Coffin', 'Boda']
  },
  {
    id: 'gal-3',
    title: 'Glazed Donut Effect / Efecto Perla Iridiscente',
    category: 'todas',
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80',
    technique: 'Semipermanente con nivelación + Polvo Chrome White',
    likes: 189,
    tags: ['Tendencia', 'Glazed', 'Minimalista', 'Chrome']
  },
  {
    id: 'gal-4',
    title: 'Efecto Cat Eye Terciopelo con Imán',
    category: 'nail-art',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80',
    technique: 'Esmalte Magnético 9D sobre base oscura',
    likes: 174,
    tags: ['CatEye', 'Velvet', 'Brillo', 'Misterio']
  },
  {
    id: 'gal-5',
    title: 'Ombré Baby Boomer con Manicura Rusa',
    category: 'french-nude',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    technique: 'Degradado aerógrafo + Rubber base lechosa',
    likes: 230,
    tags: ['BabyBoomer', 'Rusa', 'Natural', 'Delicado']
  },
  {
    id: 'gal-6',
    title: 'Diseño Floral 3D en Relieve Texturizado',
    category: 'nail-art',
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=900&q=80',
    technique: 'Acrílico en polvo 3D + Microescultura a mano',
    likes: 310,
    tags: ['3D', 'Flores', 'NailArt', 'Artesanal']
  },
  {
    id: 'gal-7',
    title: 'Rojo Carmesí Clásico de Alto Brillo',
    category: 'acrilico',
    imageUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=900&q=80',
    technique: 'Acrílico cuadrado corto + Rojo pasión',
    likes: 98,
    tags: ['Rojo', 'Clásico', 'Elegante', 'Atemporal']
  },
  {
    id: 'gal-8',
    title: 'Nude Minimalista con Líneas Geométricas',
    category: 'soft-gel',
    imageUrl: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=900&q=80',
    technique: 'Soft Gel corto + Liner de alta pigmentación',
    likes: 165,
    tags: ['Minimalista', 'LineArt', 'Moderno', 'Chic']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    clientName: 'Valentina Restrepo',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hace 3 días',
    serviceName: 'Uñas Acrílicas Esculpidas',
    comment: '¡Quedé enamorada de mis uñas! El nivel de detalle en la cutícula y la estructura perfecta es algo que nunca antes me habían hecho en otro salón. Duran intactas y no se sienten pesadas.',
    verified: true
  },
  {
    id: 'rev-2',
    clientName: 'Camila Morales',
    clientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hace 1 semana',
    serviceName: 'Soft Gel / Gel X Full Cover',
    comment: 'La técnica de soft gel es lo mejor que me ha pasado. Mis uñas naturales no sufrieron nada y el diseño francés con brillos duró más de 4 semanas. La atención es impecable y súper puntual.',
    verified: true
  },
  {
    id: 'rev-3',
    clientName: 'Mariana Ospina',
    clientAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hace 2 semanas',
    serviceName: 'Set Especial Nail Art 3D & Cristalería',
    comment: 'Llegué con una foto de Pinterest muy complicada pensando que no quedaría igual, ¡y quedó todavía más hermosa! Además el sistema para agendar y el recordatorio por WhatsApp te hace la vida facilísima.',
    verified: true
  },
  {
    id: 'rev-4',
    clientName: 'Daniela Giraldo',
    clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Hace 3 semanas',
    serviceName: 'Baño de Acrílico / Kapping Gel',
    comment: 'El kapping salvó mis uñas, siempre se me partían al trabajar en la computadora. Ahora tienen un largo precioso y se ven súper saludables. 100% recomendada.',
    verified: true
  }
];
