export function distributeAmountOverArray(amount, array, comparisonField) {
    while (amount > 0) {
        let active = false;
        array.forEach((element) => {
            if (element[comparisonField] > 0) {
                if (amount <= 0) return;
                element[comparisonField]--;
                amount--;
                active = true;
            }
        });
        if (!active || amount <= 0) break;
    }
    return [array, amount];
}
