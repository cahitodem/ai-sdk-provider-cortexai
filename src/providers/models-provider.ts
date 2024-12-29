import { BaseProvider } from './base-provider';
import { ModelsResponse } from '../internal/types';

export class ModelsProvider extends BaseProvider {
    async listModels(): Promise<ModelsResponse> {
        const response = await fetch(`${this.baseUrl}/api/models`, {
            method: 'GET',
            headers: this.getHeaders()
        });

        return this.handleResponse<ModelsResponse>(response);
    }
}
