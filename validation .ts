export const validateNumbers = (...inputs: unknown[]): string | null => {
    for (const val of inputs) {
        if (typeof val !== 'number' || Number.isNaN(val) || !Number.isFinite(val)) {
            return `Invalid input: ${val}. Please provide valid numbers.`;
        }
    }
    return null
}


