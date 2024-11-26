export function calculateRepeatTimes(todayDate, maxDate, days) {
    const startDate = new Date(todayDate);
    const endDate = new Date(maxDate);

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    const weekDays = days.split(" ").map(Number);
    const occurrences = Math.floor(totalDays / 7) * weekDays.length;

    let remainingDays = totalDays % 7;
    let additionalOccurrences = 0;

    for (let i = 0; i < remainingDays; i++) {
        const dayOfWeek = (startDate.getDay() + i + 1) % 7 || 7;
        if (weekDays.includes(dayOfWeek)) {
            additionalOccurrences++;
        }
    }

    const repeatTimes = occurrences + additionalOccurrences;
    return repeatTimes;
}

export function getNextInterval(taskHour, days) {
    const currentDate = new Date(taskHour);
    const currentDayOfWeek = currentDate.getDay() + 1; // getDay() returns 0-6, add 1 to match 1-7
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const weekDays = days.split(" ").map(Number); // Convert to array of numbers

    // Sort the days to ensure correct comparison
    weekDays.sort((a, b) => a - b);

    // Find the next interval
    for (let i = 0; i < weekDays.length; i++) {
        if (weekDays[i] > currentDayOfWeek) {
            return weekDays[i];
        } else if (weekDays[i] === currentDayOfWeek) {
            // Compare hours if the day is the same
            const taskDate = new Date(taskHour);
            if (taskDate.getHours() > currentHour || (taskDate.getHours() === currentHour && taskDate.getMinutes() > currentMinutes)) {
                return weekDays[i];
            }
        }
    }

    return weekDays[0];
}
