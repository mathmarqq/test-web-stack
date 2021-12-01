function getIntegerQueryParam(searchParams: URLSearchParams | undefined, key: string): number {
    const decimalRadix = 10
    return parseInt(searchParams?.get(key) || '0', decimalRadix)
}

export { getIntegerQueryParam }
