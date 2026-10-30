export function validateSchema(obj) {
    if (!obj.id || !obj.name) {
        throw new Error('Invalid Schema');
    }
}

export function calculateResponseTime(startTime) {
    return Date.now() - startTime;
}