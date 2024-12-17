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

// In mixin.js
export function convertDate(dateString) {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} lúc ${hours}h:${minutes}m`;
}

// Example usage:
// convertDate("2024-12-04T10:36:52.077") => "04 12 2024 lúc 10:36"