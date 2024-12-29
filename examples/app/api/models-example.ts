import { CortexAIClient } from '../../../src';

const client = new CortexAIClient({
    apiKey: process.env.CORTEXAI_API_KEY!
});

export async function GET(req: Request) {
    try {
        // Modelleri listele
        const models = await client.modelsList.listModels();
        
        return new Response(JSON.stringify(models), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
