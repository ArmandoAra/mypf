export function capitalize(palabra: string) {
    if (!palabra) return palabra; // Manejo de caso si la cadena está vacía
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}