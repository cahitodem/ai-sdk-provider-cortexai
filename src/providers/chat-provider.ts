import { BaseProvider } from './base-provider';
import { ChatCompletionRequest, ChatCompletionResponse } from '../internal/types';

export class ChatProvider extends BaseProvider {
    async createCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
        validateCompletionRequest(request);
        const defaultOptions = {
            stream: false,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        };

        const finalRequest = {
            ...defaultOptions,
            ...request
        };

        const response = await fetch(`${this.baseUrl}/api/chat/completions`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(finalRequest)
        });

        return this.handleResponse<ChatCompletionResponse>(response);
    }

    async createStreamingCompletion(
        request: ChatCompletionRequest,
        onChunk: (chunk: any) => void
    ): Promise<void> {
        const finalRequest = {
            ...request,
            stream: true
        };

        const response = await fetch(`${this.baseUrl}/api/chat/completions`, {
            method: 'POST',
            headers: { ...this.getHeaders(), 'Accept': 'text/event-stream' },
            body: JSON.stringify(finalRequest)
        });

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            onChunk(JSON.parse(chunk));
        }
    }
}
