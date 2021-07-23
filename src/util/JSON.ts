export const parse = <T>(data: string, withError = true): T => {
    try {
        return JSON.parse(data);
    } catch (error) {
        throw withError ? new Error(error.message) : data;
    }
};
