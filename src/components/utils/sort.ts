export const getSpendsTypes = (spends: string[]) => {
    return new Set(spends.map((spend: string) => spend.type))
}