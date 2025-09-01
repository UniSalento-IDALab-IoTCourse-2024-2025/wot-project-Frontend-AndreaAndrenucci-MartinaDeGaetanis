const getEventDonationDateLimit = (dateStr) => {
    // Esempio di input: "2025-04-07T12:00:00"
    const trimmed = dateStr.substring(0, dateStr.length - 6); // "2025-04-07"
    const date = new Date(trimmed);
    date.setDate(date.getDate() - 7);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() è zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export{getEventDonationDateLimit}