import { ModelsProvider } from './providers/models-provider';
import { ChatProvider } from './providers/chat-provider';
import { CortexAIConfig } from './internal/types';

export class CortexAIClient {
    private readonly models: ModelsProvider;
    private readonly chat: ChatProvider;

    constructor(config: CortexAIConfig) {
        const baseUrl = config.baseUrl || 'https://cortexai.io';
        
        if (!config.apiKey) {
            throw new Error('API Key is required');
        }

        this.models = new ModelsProvider(baseUrl, config.apiKey);
        this.chat = new ChatProvider(baseUrl, config.apiKey);
    }

    public get modelsList() {
        return this.models;
    }

    public get chatCompletions() {
        return this.chat;
    }
}
