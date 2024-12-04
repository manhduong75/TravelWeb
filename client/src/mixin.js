export function formatNumber(input) {
    const numberString = input.toString();
    const parts = numberString.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    
    const regex = /(\d+)(\d{3})/;
    let formattedInteger = integerPart;
    while (regex.test(formattedInteger)) {
        formattedInteger = formattedInteger.replace(regex, '$1.$2');
    }
    return formattedInteger + decimalPart;
}