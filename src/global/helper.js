
export function validateCurrency(amount) {
    var regex = /^[1-9]\d*(?:\.\d{0,2})?$/;
    return regex.test(amount);
}
