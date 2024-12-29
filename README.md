```markdown
# CortexAI SDK

Official TypeScript/JavaScript SDK for CortexAI API.

## Installation

```bash
npm install cortexai-sdk
# or
yarn add cortexai-sdk
# or
pnpm add cortexai-sdk
```

## Quick Start

```typescript
import { CortexAIClient } from 'cortexai-sdk';

const client = new CortexAIClient({
    token: 'sk-...'
});

// List available models
const models = await client.modelsList.listModels();
console.log('Available models:', models.data);

// Chat completion
const completion = await client.chatCompletions.createCompletion({
    model: 'anthropic:claude-v3.5-sonnet',
    messages: [
        {
            role: 'system',
            content: 'You are a helpful assistant.'
        },
        {
            role: 'user',
            content: 'Hello!'
        }
    ]
});
```

## Features

- Full TypeScript support
- Streaming chat completions
- Comprehensive error handling
- Type safety
- Easy to use API
- Support for all CortexAI models
- Advanced parameter controls (temperature, top_p, etc.)

## Advanced Usage

### Streaming Completion

```typescript
await client.chatCompletions.createStreamingCompletion(
    {
        model: 'anthropic:claude-v3.5-sonnet',
        messages: [
            { role: 'user', content: 'Tell me a story' }
        ],
        stream: true
    },
    (chunk) => {
        console.log(chunk.choices[0].delta.content);
    }
);
```

### With Advanced Parameters

```typescript
const completion = await client.chatCompletions.createCompletion({
    model: 'anthropic:claude-v3.5-sonnet',
    messages: [
        { role: 'user', content: 'Write a creative story' }
    ],
    temperature: 0.8,
    top_p: 0.9,
    frequency_penalty: 0.2,
    presence_penalty: 0.1,
    max_tokens: 1000
});
```

### Error Handling

```typescript
try {
    const completion = await client.chatCompletions.createCompletion({
        model: 'anthropic:claude-v3.5-sonnet',
        messages: [
            { role: 'user', content: 'Hello!' }
        ]
    });
} catch (error) {
    if (error instanceof CortexAIError) {
        console.error('API Error:', {
            message: error.message,
            type: error.type,
            param: error.param,
            code: error.code
        });
    } else {
        console.error('Unknown error:', error);
    }
}
```

## Environment Variables

```env
# Required
CORTEXAI_TOKEN=sk-...

# Optional
CORTEXAI_BASE_URL=https://cortexai.io
```

## API Reference

### Models

- `client.modelsList.listModels()` - List all available models

### Chat Completions

- `client.chatCompletions.createCompletion()` - Create a chat completion
- `client.chatCompletions.createStreamingCompletion()` - Create a streaming chat completion

## Types

### ChatCompletionRequest

```typescript
interface ChatCompletionRequest {
    model: string;
    messages: ChatMessage[];
    stream?: boolean;
    temperature?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    max_tokens?: number;
    stop?: string | string[];
}
```

### ChatMessage

```typescript
interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
```

## Documentation

For full documentation and API reference, visit [https://docs.openwebui.com](https://docs.openwebui.com)

## License

MIT
```

Bu README:
1. Doğru authentication yöntemini gösteriyor
2. Güncel model isimlerini kullanıyor
3. Daha kapsamlı örnekler içeriyor
4. Tip tanımlarını gösteriyor
5. Hata yönetimi örnekleri sunuyor
6. Çevre değişkenlerini açıklıyor
7. API referansını içeriyor
