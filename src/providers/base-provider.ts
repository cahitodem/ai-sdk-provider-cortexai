import { CortexAIError } from '../errors/api-error';

export abstract class BaseProvider {
    protected baseUrl: string;
    protected apiKey: string;
    protected authToken: string;

    constructor(baseUrl: string, apiKey: string, authToken: string) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.apiKey = apiKey;
        this.authToken = authToken;
    }

    protected getHeaders(): Record<string, string> {
        return {
            'Authorization': `Bearer ${this.authToken}`, // JWT token'ı Bearer olarak gönder
            'Content-Type': 'application/json'
        };
    }

    protected async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error) {
                throw new CortexAIError(
                    errorData.error.message,
                    errorData.error.type,
                    errorData.error.param,
                    errorData.error.code
                );
            }
            throw new Error('Unknown API error');
        }
        return response.json();
    }
}
