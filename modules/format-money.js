function formatMoney(money) {
    return (Math.round(money * 100) / 100).toFixed(2);
}

module.exports = formatMoney;
