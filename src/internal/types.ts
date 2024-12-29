export interface ModelCapabilities {
    vision: boolean;
    usage: boolean;
}

export interface ModelTag {
    name: string;
}

export interface ModelMeta {
    profile_image_url: string;
    description: string | null;
    capabilities: ModelCapabilities | null;
    position: number;
    tags?: ModelTag[];
    hidden?: boolean;
    toolIds?: string[];
    filterIds?: string[];
}

export interface ModelInfo {
    id: string;
    user_id: string;
    base_model_id: string | null;
    name: string;
    params: Record<string, any>;
    meta: ModelMeta;
    updated_at: number;
    created_at: number;
}

export interface OpenAIModelInfo {
    id: string;
    object: string;
    created: number;
    owned_by: string;
}

export interface Model {
    id: string;
    object: string;
    created: number;
    owned_by: string;
    name: string;
    openai: OpenAIModelInfo;
    urlIdx: number;
    info: ModelInfo;
    actions: any[];
}

export interface ModelsResponse {
    data: Model[];
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface ChatCompletionRequest {
    stream?: boolean;
    model: string;
    messages: ChatMessage[];
}

export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        message: ChatMessage;
        index: number;
        logprobs: null;
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    error: null | string;
}

export interface CortexAIConfig {
    apiKey: string;
    baseUrl?: string;
}
