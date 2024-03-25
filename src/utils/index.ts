export const getRandom = (arr: any[], n: number) => {
    let len = arr.length;
    const result = new Array(n), taken = new Array(len);
    if (n > len) return arr;
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
}

export const generateRandomCode = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters[randomIndex];
    }

    return randomCode;
}

export const generateKey = () => {
    const randomCode1 = generateRandomCode(8);
    const randomCode2 = generateRandomCode(8);
    return `${randomCode1 + randomCode2}_${new Date().getTime().toString()}`;
}
