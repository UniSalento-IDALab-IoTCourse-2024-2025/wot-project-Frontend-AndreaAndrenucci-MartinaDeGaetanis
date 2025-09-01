export default function normalizeMonthlyData(dates, values) {
    if (dates.length !== values.length) {
        throw new Error("Dates and values must have the same length.");
    }

    const latestEntryMap = {}; 

    dates.forEach((dateStr, index) => {
        const date = new Date(dateStr);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        latestEntryMap[monthKey] = values[index]; 
    });

    const sortedMonths = Object.keys(latestEntryMap).sort();
    const firstMonth = sortedMonths[0];
    const lastMonth = sortedMonths[sortedMonths.length - 1];

    const getAllMonthsBetween = (start, end) => {
        const result = [];
        let current = new Date(start + "-01");
        const last = new Date(end + "-01");

        while (current <= last) {
            const monthStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
            result.push(monthStr);
            current.setMonth(current.getMonth() + 1);
        }

        return result;
    };

    const allMonths = getAllMonthsBetween(firstMonth, lastMonth);
    const normalizedValues = [];
    let previousValue = 0;

    allMonths.forEach((month, index) => {
        if (latestEntryMap[month] !== undefined) {
            previousValue = latestEntryMap[month];
        }
        normalizedValues.push(previousValue);
    });

    const lastValue = latestEntryMap[lastMonth] !== undefined ? latestEntryMap[lastMonth] : previousValue;
    
    if (normalizedValues[normalizedValues.length - 1] !== lastValue) {
        const lastMonthIndex = allMonths.indexOf(lastMonth);
        for (let i = allMonths.length - 1; i > lastMonthIndex; i--) {
            normalizedValues[i] = normalizedValues[i - 1];
        }
    }
    
    if (normalizedValues[normalizedValues.length - 1] !== lastValue) {
        normalizedValues.push(lastValue);
        allMonths.push(lastMonth);
    }

    return { months: allMonths, values: normalizedValues };
}
