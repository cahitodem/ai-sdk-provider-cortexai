import { CortexAIError } from '../errors/api-error';

export abstract class BaseProvider {
    protected baseUrl: string;
    protected apiKey: string;

    constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.apiKey = apiKey;
    }

    protected getHeaders(): Record<string, string> {
        return {
            'Authorization': `Bearer ${this.apiKey}`,
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
