export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  presentation: string;
  description: string;
  price?: number;
  isAvailable: boolean;
  tags: string[];
  image?: string;
}

export const products: Product[] = [
  // Analgésicos
  { id: '1', name: 'Ibuprofeno', brand: 'Bayer', category: 'analgesicos', presentation: '400mg x 20 comprimidos', description: 'Analgésico y antiinflamatorio para dolor leve a moderado', price: 1500, isAvailable: true, tags: ['dolor', 'fiebre', 'antiinflamatorio'] },
  { id: '2', name: 'Paracetamol', brand: 'Roemmers', category: 'analgesicos', presentation: '500mg x 30 comprimidos', description: 'Analgésico y antipirético', price: 1200, isAvailable: true, tags: ['dolor', 'fiebre'] },
  { id: '3', name: 'Aspirina', brand: 'Bayer', category: 'analgesicos', presentation: '100mg x 50 comprimidos', description: 'Antiagregante plaquetario', price: 1800, isAvailable: true, tags: ['dolor', 'cardioprotector'] },
  { id: '4', name: 'Tafirol', brand: 'Genomma Lab', category: 'analgesicos', presentation: '1g x 16 comprimidos', description: 'Analgésico y antipirético de acción rápida', price: 1400, isAvailable: true, tags: ['dolor', 'fiebre'] },
  { id: '5', name: 'Actron', brand: 'Bayer', category: 'analgesicos', presentation: '600mg x 10 cápsulas', description: 'Ibuprofeno de acción prolongada', price: 1900, isAvailable: true, tags: ['dolor', 'antiinflamatorio'] },
  { id: '6', name: 'Migral', brand: 'Roemmers', category: 'analgesicos', presentation: '10 comprimidos', description: 'Específico para migraña', price: 2200, isAvailable: true, tags: ['migraña', 'cefalea'] },
  { id: '7', name: 'Dorixina Relax', brand: 'Microsules', category: 'analgesicos', presentation: 'x 20 comprimidos', description: 'Analgésico con relajante muscular', price: 2500, isAvailable: true, tags: ['dolor', 'espasmos'] },
  { id: '8', name: 'Ketorolac', brand: 'Fabra', category: 'analgesicos', presentation: '10mg x 10 comprimidos', description: 'Analgésico potente', price: 2100, isAvailable: true, tags: ['dolor intenso'] },
  { id: '73', name: 'Antihistamínico Loratadina', brand: 'Elea', category: 'analgesicos', presentation: '10mg x 20 comprimidos', description: 'Para alergias y urticaria', price: 1300, isAvailable: true, tags: ['alergia', 'antihistamínico'] },
  
  // Resfrío y Gripe
  { id: '9', name: 'Resfriolito', brand: 'Raffo', category: 'resfrio-gripe', presentation: '10 sobres', description: 'Alivio sintomático de gripe y resfrío', price: 1600, isAvailable: true, tags: ['gripe', 'congestión'] },
  { id: '10', name: 'Ibupirac Grip', brand: 'Pfizer', category: 'resfrio-gripe', presentation: '10 sobres', description: 'Combate síntomas de gripe', price: 1700, isAvailable: true, tags: ['gripe', 'dolor', 'fiebre'] },
  { id: '11', name: 'Tabcin', brand: 'Genomma Lab', category: 'resfrio-gripe', presentation: '12 comprimidos', description: 'Descongestivo y analgésico', price: 1400, isAvailable: true, tags: ['gripe', 'congestión'] },
  { id: '12', name: 'Nastizol', brand: 'Elea', category: 'resfrio-gripe', presentation: 'Spray nasal 20ml', description: 'Descongestivo nasal de acción rápida', price: 1300, isAvailable: true, tags: ['congestión nasal'] },
  { id: '13', name: 'Ambroxol', brand: 'Denver Farma', category: 'resfrio-gripe', presentation: 'Jarabe 120ml', description: 'Mucolítico expectorante', price: 1100, isAvailable: true, tags: ['tos', 'expectorante'] },
  { id: '14', name: 'Cortical', brand: 'Sanofi', category: 'resfrio-gripe', presentation: 'Jarabe 120ml', description: 'Antitusivo para tos seca', price: 1500, isAvailable: true, tags: ['tos seca'] },
  { id: '15', name: 'Benzonatato', brand: 'Finadiet', category: 'resfrio-gripe', presentation: '100mg x 20 cápsulas', description: 'Antitusivo de acción central', price: 1800, isAvailable: true, tags: ['tos'] },
  { id: '78', name: 'Jarabe Expectorante Bisolvon', brand: 'Sanofi', category: 'resfrio-gripe', presentation: 'Jarabe 120ml', description: 'Expectorante y mucolítico', price: 1500, isAvailable: true, tags: ['tos', 'expectorante'] },
  
  // Dermocosmética
  { id: '16', name: 'Cetaphil Limpiadora', brand: 'Cetaphil', category: 'dermocosmetica', presentation: '473ml', description: 'Limpiadora facial suave para todo tipo de piel', price: 3500, isAvailable: true, tags: ['limpieza', 'facial'] },
  { id: '17', name: 'La Roche-Posay Effaclar', brand: 'La Roche-Posay', category: 'dermocosmetica', presentation: 'Gel 200ml', description: 'Gel limpiador para piel grasa', price: 4200, isAvailable: true, tags: ['piel grasa', 'acné'] },
  { id: '18', name: 'Vichy Mineral 89', brand: 'Vichy', category: 'dermocosmetica', presentation: '50ml', description: 'Sérum hidratante con ácido hialurónico', price: 5500, isAvailable: true, tags: ['hidratación', 'sérum'] },
  { id: '19', name: 'Eucerin Q10 Anti-Wrinkle', brand: 'Eucerin', category: 'dermocosmetica', presentation: 'Crema 50ml', description: 'Crema facial antiarrugas', price: 4800, isAvailable: true, tags: ['antiarrugas', 'antiedad'] },
  { id: '20', name: 'Bioderma Sensibio H2O', brand: 'Bioderma', category: 'dermocosmetica', presentation: '500ml', description: 'Agua micelar desmaquillante', price: 3800, isAvailable: true, tags: ['desmaquillante', 'piel sensible'] },
  { id: '21', name: 'Avène Protector Solar', brand: 'Avène', category: 'dermocosmetica', presentation: 'FPS 50+ 50ml', description: 'Protector solar facial', price: 5200, isAvailable: true, tags: ['protección solar', 'fps50'] },
  { id: '22', name: 'Cicatricure Gold Lift', brand: 'Genomma Lab', category: 'dermocosmetica', presentation: 'Crema 50ml', description: 'Crema facial reafirmante', price: 3200, isAvailable: true, tags: ['reafirmante', 'antiedad'] },
  { id: '23', name: 'Cetaphil Pro AD', brand: 'Cetaphil', category: 'dermocosmetica', presentation: 'Loción 295ml', description: 'Loción para piel atópica', price: 3900, isAvailable: true, tags: ['dermatitis', 'piel seca'] },
  { id: '76', name: 'Protector Solar Neutrogena', brand: 'Neutrogena', category: 'dermocosmetica', presentation: 'FPS 50 200ml', description: 'Protector solar corporal', price: 3800, isAvailable: true, tags: ['protección solar', 'cuerpo'] },
  { id: '79', name: 'Crema Nivea', brand: 'Nivea', category: 'dermocosmetica', presentation: 'Lata 400ml', description: 'Crema corporal hidratante', price: 2200, isAvailable: true, tags: ['hidratación', 'corporal'] },
  
  // Vitaminas y Suplementos
  { id: '24', name: 'Vitamina C 1000mg', brand: 'Nutrilite', category: 'vitaminas', presentation: 'x 60 comprimidos', description: 'Refuerza el sistema inmunológico', price: 2800, isAvailable: true, tags: ['inmunidad', 'antioxidante'] },
  { id: '25', name: 'Centrum Adults', brand: 'Pfizer', category: 'vitaminas', presentation: 'x 60 comprimidos', description: 'Multivitamínico completo', price: 3500, isAvailable: true, tags: ['multivitamínico', 'energía'] },
  { id: '26', name: 'Vitamina D3', brand: 'Nutrilab', category: 'vitaminas', presentation: '2000 UI x 60 cápsulas', description: 'Fortalece huesos y sistema inmune', price: 2400, isAvailable: true, tags: ['huesos', 'inmunidad'] },
  { id: '27', name: 'Omega 3', brand: 'Naturemax', category: 'vitaminas', presentation: '1000mg x 60 cápsulas', description: 'Ácidos grasos esenciales', price: 3200, isAvailable: true, tags: ['cardiovascular', 'cerebro'] },
  { id: '28', name: 'Magnesio', brand: 'Suplementa', category: 'vitaminas', presentation: '500mg x 60 comprimidos', description: 'Previene calambres y mejora el sueño', price: 2100, isAvailable: true, tags: ['calambres', 'sueño'] },
  { id: '29', name: 'Complejo B', brand: 'Roemmers', category: 'vitaminas', presentation: 'x 30 comprimidos', description: 'Mejora energía y sistema nervioso', price: 1900, isAvailable: true, tags: ['energía', 'nervios'] },
  { id: '30', name: 'Calcio + D3', brand: 'Nutrilab', category: 'vitaminas', presentation: 'x 60 comprimidos', description: 'Para salud ósea', price: 2600, isAvailable: true, tags: ['huesos', 'osteoporosis'] },
  { id: '31', name: 'Hierro', brand: 'Suplementa', category: 'vitaminas', presentation: '14mg x 30 comprimidos', description: 'Previene anemia', price: 1800, isAvailable: true, tags: ['anemia', 'energía'] },
  { id: '72', name: 'Melatonina', brand: 'Suplementa', category: 'vitaminas', presentation: '3mg x 60 comprimidos', description: 'Mejora la calidad del sueño', price: 2400, isAvailable: true, tags: ['sueño', 'insomnio'] },
  
  // Bebés y Niños
  { id: '32', name: 'Ibupirac Pediatrico', brand: 'Pfizer', category: 'bebes-ninos', presentation: 'Suspensión 120ml', description: 'Analgésico y antipirético para niños', price: 1600, isAvailable: true, tags: ['fiebre', 'dolor', 'pediatrico'] },
  { id: '33', name: 'Tafirol Pediatrico', brand: 'Genomma Lab', category: 'bebes-ninos', presentation: 'Suspensión 100ml', description: 'Paracetamol para niños', price: 1400, isAvailable: true, tags: ['fiebre', 'dolor', 'pediatrico'] },
  { id: '34', name: 'Pañales Pampers', brand: 'Pampers', category: 'bebes-ninos', presentation: 'Talla M x 60 unidades', description: 'Pañales de alta absorción', price: 4500, isAvailable: true, tags: ['pañales', 'bebés'] },
  { id: '35', name: 'Toallitas Huggies', brand: 'Huggies', category: 'bebes-ninos', presentation: 'x 200 unidades', description: 'Toallitas húmedas para bebé', price: 1200, isAvailable: true, tags: ['higiene', 'bebés'] },
  { id: '36', name: 'Crema Hipoglós', brand: 'Bayer', category: 'bebes-ninos', presentation: '80g', description: 'Previene y trata dermatitis del pañal', price: 1800, isAvailable: true, tags: ['dermatitis', 'bebés'] },
  { id: '37', name: 'Talco Johnson\'s', brand: 'Johnson & Johnson', category: 'bebes-ninos', presentation: '200g', description: 'Talco suave para bebé', price: 1100, isAvailable: true, tags: ['talco', 'bebés'] },
  { id: '38', name: 'Shampoo Johnson\'s', brand: 'Johnson & Johnson', category: 'bebes-ninos', presentation: '400ml', description: 'Shampoo sin lágrimas', price: 1500, isAvailable: true, tags: ['shampoo', 'bebés'] },
  
  // Higiene Personal
  { id: '39', name: 'Jabón Dove', brand: 'Dove', category: 'higiene', presentation: 'x 3 unidades 90g', description: 'Jabón humectante', price: 1200, isAvailable: true, tags: ['jabón', 'hidratación'] },
  { id: '40', name: 'Desodorante Rexona', brand: 'Rexona', category: 'higiene', presentation: 'Roll-on 50ml', description: 'Protección 48hs', price: 900, isAvailable: true, tags: ['desodorante'] },
  { id: '41', name: 'Shampoo Head & Shoulders', brand: 'Head & Shoulders', category: 'higiene', presentation: '400ml', description: 'Anticaspa', price: 1600, isAvailable: true, tags: ['shampoo', 'anticaspa'] },
  { id: '42', name: 'Gel Antibacterial', brand: 'Farmacity', category: 'higiene', presentation: '500ml', description: 'Elimina 99.9% de gérmenes', price: 800, isAvailable: true, tags: ['antibacterial', 'manos'] },
  { id: '43', name: 'Papel Higiénico Elite', brand: 'Elite', category: 'higiene', presentation: 'x 12 rollos', description: 'Doble hoja', price: 2200, isAvailable: true, tags: ['papel higiénico'] },
  { id: '44', name: 'Jabón Líquido Dove', brand: 'Dove', category: 'higiene', presentation: '250ml', description: 'Jabón líquido humectante', price: 1400, isAvailable: true, tags: ['jabón', 'manos'] },
  { id: '74', name: 'Preservativos Prime', brand: 'Prime', category: 'higiene', presentation: 'x 12 unidades', description: 'Preservativos ultrasensibles', price: 1500, isAvailable: true, tags: ['preservativos'] },
  { id: '77', name: 'Repelente Off', brand: 'Off', category: 'higiene', presentation: 'Spray 165ml', description: 'Repelente de insectos', price: 1400, isAvailable: true, tags: ['repelente', 'mosquitos'] },
  
  // Cuidado Bucal
  { id: '45', name: 'Colgate Total 12', brand: 'Colgate', category: 'bucal', presentation: '90g', description: 'Pasta dental protección total', price: 1100, isAvailable: true, tags: ['pasta dental', 'protección'] },
  { id: '46', name: 'Listerine Cool Mint', brand: 'Listerine', category: 'bucal', presentation: '500ml', description: 'Enjuague bucal antiséptico', price: 1500, isAvailable: true, tags: ['enjuague bucal'] },
  { id: '47', name: 'Cepillo Oral-B', brand: 'Oral-B', category: 'bucal', presentation: 'Medio', description: 'Cepillo dental con cerdas suaves', price: 800, isAvailable: true, tags: ['cepillo dental'] },
  { id: '48', name: 'Hilo Dental Colgate', brand: 'Colgate', category: 'bucal', presentation: '50m', description: 'Hilo dental con menta', price: 600, isAvailable: true, tags: ['hilo dental'] },
  { id: '49', name: 'Sensodyne Repair', brand: 'Sensodyne', category: 'bucal', presentation: '75ml', description: 'Pasta para dientes sensibles', price: 1800, isAvailable: true, tags: ['sensibilidad', 'pasta dental'] },
  { id: '75', name: 'Test de Embarazo', brand: 'Evatest', category: 'primeros-auxilios', presentation: 'x 1 unidad', description: 'Test de embarazo de alta sensibilidad', price: 800, isAvailable: true, tags: ['embarazo', 'test'] },
  { id: '80', name: 'Alcohol 70%', brand: 'Farmacity', category: 'primeros-auxilios', presentation: '1 litro', description: 'Alcohol etílico 70%', price: 900, isAvailable: true, tags: ['antiséptico', 'desinfectante'] },
  
  // Primeros Auxilios
  { id: '51', name: 'Vendas Elásticas', brand: 'Algodonera', category: 'primeros-auxilios', presentation: '10cm x 5m', description: 'Vendas elásticas autoadhesivas', price: 900, isAvailable: true, tags: ['vendas', 'esguince'] },
  { id: '52', name: 'Gasas Estériles', brand: 'Algodonera', category: 'primeros-auxilios', presentation: 'x 20 unidades', description: 'Gasas estériles 10x10cm', price: 700, isAvailable: true, tags: ['gasas', 'curación'] },
  { id: '53', name: 'Alcohol en Gel', brand: 'Farmacity', category: 'primeros-auxilios', presentation: '250ml', description: 'Alcohol en gel 70%', price: 600, isAvailable: true, tags: ['antiséptico'] },
  { id: '54', name: 'Curitas Apositos', brand: 'Band-Aid', category: 'primeros-auxilios', presentation: 'x 40 unidades', description: 'Apósitos adhesivos variados', price: 1200, isAvailable: true, tags: ['curitas', 'apósitos'] },
  { id: '55', name: 'Termómetro Digital', brand: 'Omron', category: 'primeros-auxilios', presentation: 'Digital', description: 'Termómetro digital preciso', price: 2500, isAvailable: true, tags: ['termómetro'] },
  { id: '56', name: 'Agua Oxigenada', brand: 'Farmacity', category: 'primeros-auxilios', presentation: '100ml', description: 'Antiséptico para heridas', price: 400, isAvailable: true, tags: ['antiséptico'] },
  { id: '57', name: 'Cicatrizante Betadine', brand: 'Betadine', category: 'primeros-auxilios', presentation: '120ml', description: 'Solución antiséptica', price: 1500, isAvailable: true, tags: ['antiséptico', 'cicatrizante'] },
  { id: '71', name: 'Colirio Refresh Tears', brand: 'Allergan', category: 'primeros-auxilios', presentation: '15ml', description: 'Lágrimas artificiales', price: 1800, isAvailable: true, tags: ['ojos secos', 'colirio'] },
  
  // Digestivos
  { id: '58', name: 'Mylanta Plus', brand: 'Sanofi', category: 'digestivos', presentation: 'Suspensión 180ml', description: 'Antiácido y antigases', price: 1400, isAvailable: true, tags: ['acidez', 'gases'] },
  { id: '59', name: 'Omeprazol', brand: 'Roemmers', category: 'digestivos', presentation: '20mg x 14 cápsulas', description: 'Inhibidor de bomba de protones', price: 1800, isAvailable: true, tags: ['gastritis', 'úlcera'] },
  { id: '60', name: 'Buscapina', brand: 'Sanofi', category: 'digestivos', presentation: '10mg x 20 comprimidos', description: 'Antiespasmódico digestivo', price: 1300, isAvailable: true, tags: ['cólicos', 'espasmos'] },
  { id: '61', name: 'Enterogermina', brand: 'Sanofi', category: 'digestivos', presentation: '5ml x 10 frascos', description: 'Probiótico restaurador de flora intestinal', price: 2200, isAvailable: true, tags: ['probiótico', 'diarrea'] },
  { id: '62', name: 'Loperamida', brand: 'Fabra', category: 'digestivos', presentation: '2mg x 10 comprimidos', description: 'Antidiarreico', price: 900, isAvailable: true, tags: ['diarrea'] },
  { id: '63', name: 'Sertal Compuesto', brand: 'Roemmers', category: 'digestivos', presentation: 'x 20 comprimidos', description: 'Antiespasmódico y analgésico', price: 1600, isAvailable: true, tags: ['cólicos', 'dolor'] },
  { id: '64', name: 'Dulcolax', brand: 'Sanofi', category: 'digestivos', presentation: '5mg x 20 comprimidos', description: 'Laxante suave', price: 1100, isAvailable: true, tags: ['laxante', 'estreñimiento'] },
  
  // Antiinflamatorios
  { id: '65', name: 'Diclofenac', brand: 'Roemmers', category: 'antiinflamatorios', presentation: '50mg x 20 comprimidos', description: 'Antiinflamatorio potente', price: 1700, isAvailable: true, tags: ['inflamación', 'dolor'] },
  { id: '66', name: 'Naproxeno', brand: 'Bayer', category: 'antiinflamatorios', presentation: '550mg x 20 comprimidos', description: 'Antiinflamatorio de larga duración', price: 1900, isAvailable: true, tags: ['inflamación', 'artritis'] },
  { id: '67', name: 'Betametasona', brand: 'Elea', category: 'antiinflamatorios', presentation: 'Crema 30g', description: 'Corticoide tópico', price: 1400, isAvailable: true, tags: ['inflamación', 'tópico'] },
  { id: '68', name: 'Voltaren Emulgel', brand: 'Novartis', category: 'antiinflamatorios', presentation: 'Gel 60g', description: 'Gel antiinflamatorio tópico', price: 2800, isAvailable: true, tags: ['inflamación', 'tópico', 'dolor muscular'] },
  { id: '69', name: 'Piroxicam', brand: 'Fabra', category: 'antiinflamatorios', presentation: '20mg x 10 comprimidos', description: 'Antiinflamatorio no esteroideo', price: 1500, isAvailable: true, tags: ['inflamación', 'artritis'] },
  { id: '70', name: 'Meloxicam', brand: 'Roemmers', category: 'antiinflamatorios', presentation: '15mg x 10 comprimidos', description: 'Antiinflamatorio selectivo', price: 1600, isAvailable: true, tags: ['inflamación', 'dolor'] },
];
