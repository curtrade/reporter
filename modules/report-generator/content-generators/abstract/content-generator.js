class ContentGenerator {
    async generate() {
        throw new Error(
            'ContentGenerator: method "generate" should be realized'
        );
    }

    calculateTotals(columns, rows) {
        const initTotals = columns.reduce(
            (acc, column) =>
                column.calculateTotals ? { ...acc, [column.field]: 0 } : acc,
            {}
        );

        const totals = rows.reduce(
            (acc, row) => {
                for (const key of Object.keys(acc)) {
                    acc[key] += parseFloat(row[key]);
                }
                return acc;
            },
            { ...initTotals }
        );

        return totals;
    }
}

module.exports = ContentGenerator;
