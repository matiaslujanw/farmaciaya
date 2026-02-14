export interface Pharmacy {
  id: string;
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  hours: string;
  services: string[];
  isOnDuty?: boolean;
}

export const pharmacies: Pharmacy[] = [
  { id: '1', name: 'Farmacia del Centro', phone: '011-4567-8901', address: 'Av. Corrientes 1234', neighborhood: 'Centro', lat: -34.6037, lng: -58.3816, hours: 'Lun a Vie 8:00-20:00, Sáb 9:00-14:00', services: ['Inyectables', 'Medición de presión', 'Perfumería'], isOnDuty: false },
  { id: '2', name: 'Farmacia Palermo', phone: '011-4567-8902', address: 'Av. Santa Fe 3456', neighborhood: 'Palermo', lat: -34.5875, lng: -58.4052, hours: 'Lun a Dom 9:00-22:00', services: ['Inyectables', 'Ortopedia', 'Dermocosmética'], isOnDuty: true },
  { id: '3', name: 'Farmacia Belgrano', phone: '011-4567-8903', address: 'Av. Cabildo 2345', neighborhood: 'Belgrano', lat: -34.5553, lng: -58.4590, hours: 'Lun a Vie 8:30-21:00, Sáb 9:00-18:00', services: ['Inyectables', 'Medición de presión', 'Vacunación'], isOnDuty: false },
  { id: '4', name: 'Farmacia Caballito 24hs', phone: '011-4567-8904', address: 'Av. Rivadavia 5678', neighborhood: 'Caballito', lat: -34.6177, lng: -58.4403, hours: 'Abierto 24 horas', services: ['Inyectables', 'Medición de presión', 'Perfumería', 'Guardia 24hs'], isOnDuty: true },
  { id: '5', name: 'Farmacia Recoleta', phone: '011-4567-8905', address: 'Av. Callao 1890', neighborhood: 'Recoleta', lat: -34.5922, lng: -58.3922, hours: 'Lun a Vie 8:00-20:00, Sáb 9:00-13:00', services: ['Inyectables', 'Dermocosmética', 'Ortopedia'], isOnDuty: false },
  { id: '6', name: 'Farmacia Villa Urquiza', phone: '011-4567-8906', address: 'Av. Triunvirato 4567', neighborhood: 'Villa Urquiza', lat: -34.5682, lng: -58.4821, hours: 'Lun a Sáb 9:00-21:00', services: ['Inyectables', 'Medición de presión'], isOnDuty: false },
  { id: '7', name: 'Farmacia Flores', phone: '011-4567-8907', address: 'Av. Avellaneda 3210', neighborhood: 'Flores', lat: -34.6282, lng: -58.4639, hours: 'Lun a Vie 8:00-19:00, Sáb 9:00-14:00', services: ['Inyectables', 'Perfumería'], isOnDuty: false },
  { id: '8', name: 'Farmacia San Telmo', phone: '011-4567-8908', address: 'Defensa 890', neighborhood: 'San Telmo', lat: -34.6207, lng: -58.3724, hours: 'Lun a Dom 10:00-20:00', services: ['Inyectables', 'Dermocosmética'], isOnDuty: false },
  { id: '9', name: 'Farmacia Núñez', phone: '011-4567-8909', address: 'Av. Cabildo 4567', neighborhood: 'Núñez', lat: -34.5432, lng: -58.4625, hours: 'Lun a Vie 8:30-20:00, Sáb 9:00-15:00', services: ['Inyectables', 'Medición de presión', 'Ortopedia'], isOnDuty: false },
  { id: '10', name: 'Farmacia Almagro', phone: '011-4567-8910', address: 'Av. Corrientes 5432', neighborhood: 'Almagro', lat: -34.6041, lng: -58.4232, hours: 'Lun a Sáb 8:00-22:00', services: ['Inyectables', 'Medición de presión', 'Perfumería'], isOnDuty: false },
  { id: '11', name: 'Farmacia Barrio Norte', phone: '011-4567-8911', address: 'Av. Santa Fe 2123', neighborhood: 'Barrio Norte', lat: -34.5963, lng: -58.3934, hours: 'Lun a Vie 8:00-21:00, Sáb 9:00-18:00', services: ['Inyectables', 'Dermocosmética', 'Vacunación'], isOnDuty: false },
  { id: '12', name: 'Farmacia Villa Crespo', phone: '011-4567-8912', address: 'Av. Corrientes 6789', neighborhood: 'Villa Crespo', lat: -34.5992, lng: -58.4329, hours: 'Lun a Dom 9:00-22:00', services: ['Inyectables', 'Medición de presión'], isOnDuty: true },
  { id: '13', name: 'Farmacia Devoto', phone: '011-4567-8913', address: 'Av. Francisco Beiró 4321', neighborhood: 'Villa Devoto', lat: -34.6025, lng: -58.5112, hours: 'Lun a Vie 8:30-20:00, Sáb 9:00-14:00', services: ['Inyectables', 'Ortopedia'], isOnDuty: false },
  { id: '14', name: 'Farmacia Colegiales', phone: '011-4567-8914', address: 'Av. Federico Lacroze 2345', neighborhood: 'Colegiales', lat: -34.5734, lng: -58.4462, hours: 'Lun a Sáb 9:00-21:00', services: ['Inyectables', 'Medición de presión', 'Perfumería'], isOnDuty: false },
  { id: '15', name: 'Farmacia Congreso', phone: '011-4567-8915', address: 'Av. Rivadavia 1876', neighborhood: 'Congreso', lat: -34.6093, lng: -58.3927, hours: 'Lun a Vie 7:30-20:00, Sáb 8:00-14:00', services: ['Inyectables', 'Medición de presión'], isOnDuty: false },
  { id: '16', name: 'Farmacia Boedo', phone: '011-4567-8916', address: 'Av. Boedo 987', neighborhood: 'Boedo', lat: -34.6326, lng: -58.4169, hours: 'Lun a Dom 8:00-22:00', services: ['Inyectables', 'Dermocosmética', 'Perfumería'], isOnDuty: false },
  { id: '17', name: 'Farmacia Chacarita', phone: '011-4567-8917', address: 'Av. Corrientes 7654', neighborhood: 'Chacarita', lat: -34.5888, lng: -58.4492, hours: 'Lun a Sáb 8:30-21:00', services: ['Inyectables', 'Medición de presión'], isOnDuty: false },
  { id: '18', name: 'Farmacia Liniers', phone: '011-4567-8918', address: 'Av. Rivadavia 10987', neighborhood: 'Liniers', lat: -34.6411, lng: -58.5204, hours: 'Lun a Vie 8:00-19:00, Sáb 9:00-13:00', services: ['Inyectables', 'Perfumería'], isOnDuty: false },
  { id: '19', name: 'Farmacia Mataderos', phone: '011-4567-8919', address: 'Av. Eva Perón 8765', neighborhood: 'Mataderos', lat: -34.6613, lng: -58.5052, hours: 'Lun a Sáb 9:00-20:00', services: ['Inyectables', 'Medición de presión'], isOnDuty: false },
  { id: '20', name: 'Farmacia Once 24hs', phone: '011-4567-8920', address: 'Av. Pueyrredón 345', neighborhood: 'Once', lat: -34.6098, lng: -58.4018, hours: 'Abierto 24 horas', services: ['Inyectables', 'Medición de presión', 'Guardia 24hs', 'Perfumería'], isOnDuty: true },
];
