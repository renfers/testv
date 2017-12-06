var DateFilter = (value) => {
    const date = new Date(value)
    return date.toLocaleString(['en-US'], {month: 'short',
    day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
  }
var SimpleDate = (value) => {
    const date = new Date(value)
    return date.toLocaleString(['fr-FR'],{month: 'short',
    day: '2-digit', year: 'numeric'})
}
export { DateFilter, SimpleDate}
