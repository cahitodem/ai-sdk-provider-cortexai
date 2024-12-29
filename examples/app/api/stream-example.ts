import { CortexAIClient } from '../../../src';

const client = new CortexAIClient({
    apiKey: process.env.CORTEXAI_API_KEY!
});

export async function POST(req: Request) {
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    try {
        await client.chatCompletions.createStreamingCompletion(
            {
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
                ],
                stream: true
            },
            async (chunk) => {
                await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
            }
        );

        await writer.close();

        return new Response(stream.readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        await writer.abort(error);
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
