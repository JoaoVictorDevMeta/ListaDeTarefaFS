import { differenceInWeeks, getDay, addDays } from "date-fns";

class TaskDateCalc {
    constructor(todayDate, weekDays) {
        this.todayDate = new Date(todayDate);
        this.weekDays = weekDays ? weekDays.split(" ").map(Number) : null;
    }

    getDayOfWeek(date) {
        let day = getDay(date);
        return day + 1; // i prefer treat weekdays from 1 to 7
    }

    isValidDate(maxDate){
        const startDate = this.todayDate;
        const endDate = new Date(maxDate);
        return startDate < endDate
    }

    calculateRepeatTimes(maxDate) {
        //basic variables
        //not accepting interval yet
        const startDate = this.todayDate;
        const endDate = new Date(maxDate);
        const currentDay = this.getDayOfWeek(startDate);
        const finalDay = this.getDayOfWeek(endDate);
        const tt = differenceInWeeks(endDate, startDate); // number os full weeks between the dates

        //
        let additionalOccurrences = 0;
        let  occurrences = tt * this.weekDays.length;

        for(let i = currentDay; i < 8; i++){
            //console.log("init I", i)
            if(this.weekDays.includes(i)){
                additionalOccurrences++;
            }
        }

        for(let i = 1; i < finalDay+1; i++){
            //console.log("final I", i)
            if(this.weekDays.includes(i)){
                additionalOccurrences++;
            }
        }

        return occurrences + additionalOccurrences;
    }

    getInterval(){
        const currentDay = this.getDayOfWeek(this.todayDate);
        let interval = this.weekDays.filter((day) => day > currentDay);
        console.log("Interval", interval)
        if(interval.length === 0){
            return this.weekDays[0];
        }
        return interval[0];
    }

    getNextDate(interval){
        const dayIndex = this.getDayOfWeek(this.todayDate);
        const sum = (dayIndex > interval) ?
            7 - (dayIndex - interval):
            interval - dayIndex;
        
        const nextDate = addDays(this.todayDate, sum);
        return nextDate;
    }
}

export default TaskDateCalc;