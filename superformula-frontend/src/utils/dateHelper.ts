const formatDate = (date: Date | string): string => {
    const dateObject = new Date(date)
    return dateObject.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
}

export { formatDate }
