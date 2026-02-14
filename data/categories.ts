export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Analgésicos', slug: 'analgesicos', icon: 'pill' },
  { id: '2', name: 'Resfrío y Gripe', slug: 'resfrio-gripe', icon: 'thermometer' },
  { id: '3', name: 'Dermocosmética', slug: 'dermocosmetica', icon: 'sparkles' },
  { id: '4', name: 'Vitaminas y Suplementos', slug: 'vitaminas', icon: 'heart-pulse' },
  { id: '5', name: 'Bebés y Niños', slug: 'bebes-ninos', icon: 'baby' },
  { id: '6', name: 'Higiene Personal', slug: 'higiene', icon: 'hand' },
  { id: '7', name: 'Cuidado Bucal', slug: 'bucal', icon: 'smile' },
  { id: '8', name: 'Primeros Auxilios', slug: 'primeros-auxilios', icon: 'cross' },
  { id: '9', name: 'Digestivos', slug: 'digestivos', icon: 'circle-dot' },
  { id: '10', name: 'Antiinflamatorios', slug: 'antiinflamatorios', icon: 'activity' },
];
