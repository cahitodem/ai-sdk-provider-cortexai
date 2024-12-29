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

        if (!config.authToken) {
            throw new Error('Auth Token is required');
        }

        if (!config.apiKey.startsWith('sk-')) {
            throw new Error('Invalid API Key format. Should start with "sk-"');
        }

        if (!config.authToken.startsWith('eyJ')) {
            throw new Error('Invalid Auth Token format. Should start with "eyJ"');
        }

        this.models = new ModelsProvider(baseUrl, config.apiKey, config.authToken);
        this.chat = new ChatProvider(baseUrl, config.apiKey, config.authToken);
    }

    public get modelsList() {
        return this.models;
    }

    public get chatCompletions() {
        return this.chat;
    }
}
