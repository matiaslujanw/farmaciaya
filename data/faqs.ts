export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'productos' | 'farmacias' | 'pedidos';
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: '¿Cómo funciona FarmaciaYA?',
    answer: 'FarmaciaYA te permite buscar productos farmacéuticos, elegir tu farmacia preferida (o encontrar la más cercana a tu ubicación), y armar un pedido. Nuestro asistente virtual te ayuda a confirmar disponibilidad y coordinar con la farmacia.',
    category: 'general'
  },
  {
    id: '2',
    question: '¿Los precios son reales?',
    answer: 'Los precios mostrados son referenciales y pueden variar según la farmacia. Te recomendamos confirmar el precio final con la farmacia seleccionada antes de retirar tu pedido.',
    category: 'productos'
  },
  {
    id: '3',
    question: '¿Cómo sé si un producto está disponible?',
    answer: 'La disponibilidad mostrada es referencial en tiempo real según información de las farmacias. Podés preguntarle al Asistente Virtual por productos específicos, o verificar directamente con la farmacia.',
    category: 'productos'
  },
  {
    id: '4',
    question: '¿Puedo cambiar de farmacia después de armar mi carrito?',
    answer: 'Sí, podés cambiar de farmacia en cualquier momento usando el selector en el header. Tu carrito se mantendrá, pero te recomendamos verificar disponibilidad en la nueva farmacia.',
    category: 'farmacias'
  },
  {
    id: '5',
    question: '¿Cómo encuentro la farmacia más cercana?',
    answer: 'Al ingresar por primera vez, te pedimos permiso para acceder a tu ubicación. Con esa información te mostramos las farmacias más cercanas ordenadas por distancia.',
    category: 'farmacias'
  },
  {
    id: '6',
    question: '¿Las farmacias hacen envíos a domicilio?',
    answer: 'Algunas farmacias ofrecen envío a domicilio. Podés consultar los servicios de cada farmacia en su página de detalle o preguntarle al Asistente Virtual.',
    category: 'farmacias'
  },
  {
    id: '7',
    question: '¿Cómo confirmo mi pedido?',
    answer: 'Una vez que armaste tu carrito, hacé clic en "Continuar" y nuestro Asistente Virtual te ayudará a confirmar stock y coordinar con la farmacia seleccionada.',
    category: 'pedidos'
  },
  {
    id: '8',
    question: '¿Necesito receta para todos los productos?',
    answer: 'Algunos medicamentos requieren receta médica según normativa vigente. La farmacia te informará qué productos la necesitan al momento de retirar tu pedido.',
    category: 'productos'
  },
  {
    id: '9',
    question: '¿Qué es el Asistente Virtual?',
    answer: 'Es un chatbot inteligente que te ayuda a encontrar productos, consultar disponibilidad, ubicar farmacias y responder tus dudas sobre cómo usar la aplicación.',
    category: 'general'
  },
  {
    id: '10',
    question: '¿Puedo ver el horario de las farmacias?',
    answer: 'Sí, en la página de cada farmacia encontrás los horarios de atención, dirección, teléfono y servicios disponibles.',
    category: 'farmacias'
  },
  {
    id: '11',
    question: '¿FarmaciaYA realiza los pagos?',
    answer: 'Por el momento, FarmaciaYA es un catálogo y servicio de consulta. El pago se realiza directamente en la farmacia al momento de retirar tu pedido.',
    category: 'pedidos'
  },
  {
    id: '12',
    question: '¿Cómo actualizo mis datos de contacto?',
    answer: 'Podés actualizar tu teléfono y preferencias desde el modal de onboarding que aparece al ingresar, o desde tu navegador (localStorage).',
    category: 'general'
  },
];
