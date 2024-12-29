import { CortexAIClient } from '../../../src';

const client = new CortexAIClient({
    apiKey: process.env.CORTEXAI_API_KEY!,
    authToken: process.env.CORTEXAI_AUTH_TOKEN!
});

export async function POST(req: Request) {
    try {
        const completion = await client.chatCompletions.createCompletion({
            model: 'anthropic:claude-v3.5-sonnet',
            messages: [
                {
                    role: 'system',
                    content: 'Senin ismin Cortex.'
                },
                {
                    role: 'user',
                    content: 'naber'
                }
            ],
            temperature: 0.8,
            top_p: 0.9,
            frequency_penalty: 0.2,
            presence_penalty: 0.1,
            max_tokens: 1000
        });

        return new Response(JSON.stringify(completion), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
