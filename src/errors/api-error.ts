export class CortexAIError extends Error {
    constructor(
        message: string,
        public type?: string,
        public param?: string | null,
        public code?: string | null
    ) {
        super(message);
        this.name = 'CortexAIError';
    }
}
