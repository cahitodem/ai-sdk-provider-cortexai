import { CortexAIClient } from '../../../src';

const client = new CortexAIClient({
    apiKey: process.env.CORTEXAI_API_KEY!
});

export async function POST(req: Request) {
    try {
        const completion = await client.chatCompletions.createCompletion({
            model: 'anthropic:claude-v3.5-sonnet',
            messages: [
                {
                    role: 'system',
                    content: 'You are Bolt, an expert AI assistant.'
                },
                {
                    role: 'user',
                    content: 'Merhaba!'
                }
            ]
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
