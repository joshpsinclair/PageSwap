import type { IValidationError, IPropertyError } from '../types/IValidationError';

/**
 * ValidationError - Custom error class for validation failures
 *
 * Extends Error and implements IValidationError to provide structured
 * validation error information with field-level details.
 */
export class ValidationError extends Error implements IValidationError {
    public readonly propertyErrors: IPropertyError[];

    constructor(message: string, propertyErrors: IPropertyError[]) {
        super(message);
        this.name = 'ValidationError';
        this.propertyErrors = propertyErrors;
    }

    /**
     * Check if this error is a ValidationError
     */
    static isValidationError(error: unknown): error is ValidationError {
        return error instanceof ValidationError;
    }
}
