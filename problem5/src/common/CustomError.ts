export interface ErrorDetail {
    field: string;
    message: string;
}

export class CustomError extends Error {
    public status: string;
    public code: number;
    public details: ErrorDetail[];

    constructor(code: number, message: string, details: ErrorDetail[] = []) {
        super(message);
        this.status = 'error';
        this.code = code;
        this.details = details;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
