export function sum(num1: number, num2: number): number {
    let total = num1 + num2;
    return parseFloat(total.toFixed(2));
}

export function rest(num1: number, num2: number): number {
    let total = num1 - num2;
    return parseFloat(total.toFixed(2));
}

export function multiply(num1: number, num2: number): number {
    let total = num1 * num2;
    return parseFloat(total.toFixed(2));
}

export function divide(num1: number, num2: number): number {
    let total = num1 / num2;
    return parseFloat(total.toFixed(2));
}