export function generateRandomState(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const hyphenIndexes = [8, 13, 18, 23]; // Positions to insert hyphens
    let randomState = '';
    for (let i = 0; i < length; i++) {
        if (hyphenIndexes.includes(i)) {
            randomState += '-';
        } else {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomState += charset[randomIndex];
        }
    }
    return randomState;
}

export function toFormUrlEncoded(obj: any): string {
    const formBody: string[] = [];
    for (const property in obj) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(obj[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}

export function getParameterByName(name: string): string | null {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

