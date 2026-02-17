import OpenAI from 'openai';
import { products } from '@/data/products';
import { pharmacies } from '@/data/pharmacies';
import { faqs } from '@/data/faqs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // Context preparation
        const productsContext = products.map(p =>
            `- ${p.name} (${p.brand}): $${p.price}. ${p.isAvailable ? 'En stock' : 'Sin stock'}. ${p.description}`
        ).join('\n');

        const pharmaciesContext = pharmacies.map(p =>
            `- ${p.name}: ${p.address}, ${p.neighborhood}. Horario: ${p.hours}. Tel: ${p.phone}. Servicios: ${p.services.join(', ')}`
        ).join('\n');

        const faqsContext = faqs.map(f =>
            `P: ${f.question}\nR: ${f.answer}`
        ).join('\n\n');

        const systemPrompt = `Sos el asistente virtual de FarmaciaYA. Tu objetivo es ayudar a los usuarios a encontrar productos, farmacias y resolver dudas sobre el servicio.

CONTEXTO DE PRODUCTOS:
${productsContext}

CONTEXTO DE FARMACIAS:
${pharmaciesContext}

PREGUNTAS FRECUENTES:
${faqsContext}

INSTRUCCIONES:
1. Sé amable, conciso y útil.
2. Usá la información provista para responder. Si no sabés la respuesta, sugerí contactar a soporte o a una farmacia.
3. Si preguntan por stock, aclará que la disponibilidad es referencial.
4. Si preguntan por farmacias, ofrecé la dirección, horarios y teléfono.
5. No inventes información que no esté en el contexto.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
        });

        return Response.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error in chat API:', error);
        return Response.json({ error: 'Error processing request' }, { status: 500 });
    }
}
