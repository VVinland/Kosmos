import { Task } from "../types";

class Compare {

    compareDate(date1: string, date2: string) {
        const millisecondsOne = Date.parse(date1);
        const millisecondsTwo = Date.parse(date2);

        const result = millisecondsOne > millisecondsTwo;
        return result;
    }

    compareString(task1: Task, task2: Task) {
        const maxLength = Math.max(task1.responsible.length, task2.responsible.length);
        for (let i = 0; i < maxLength; i++) {
            if (task1.responsible[i] === task2.responsible[i]) continue;

            if (task1.responsible[i] < task2.responsible[i]) return false;

            if (task1.responsible[i] > task2.responsible[i]) return true;
        }

        return this.compareDate(task1.updateDate, task2.updateDate);
    }

    compareSwitch(task1: Task, task2: Task, flag: string) {
        if (flag === 'withoutSorting') {
            const result = this.compareDate(task1.updateDate, task2.updateDate);
            return result;
        }

        if (flag === 'sortingByResponsible') {
            const result = this.compareString(task1, task2)
            return result;
        }
    }

    compareDays(arr: Task[], today: Date): Task[];
    compareDays(arr: Task[], today: Date, aboutDate: Date): Task[];
    compareDays(arr: Task[], today: Date, aboutDate: Date, sign: string): Task[];
    compareDays(arr: Task[], today: Date, aboutDate?: Date, sign?: string) {
        const resultArray = [] as Task[]
        if (aboutDate === undefined) {
            for (let i = 0; i < arr.length; i++) {
                const date = new Date(arr[i].dateEnd);
                if (Date.parse(String(today)) === Date.parse(String(date))) {
                    resultArray.push(arr[i]);
                }
            }
        }

        if (!!aboutDate && sign === undefined) {
            for (let i = 0; i < arr.length; i++) {
                const date = new Date(arr[i].dateEnd);
                if (Date.parse(String(date)) >= Date.parse(String(today)) &&
                    Date.parse(String(date)) <= Date.parse(String(aboutDate))) {
                    resultArray.push(arr[i]);
                }
            }
        }

        if (!!aboutDate && !!sign) {
            for (let i = 0; i < arr.length; i++) {
                const date = new Date(arr[i].dateEnd);
                if (Date.parse(String(date)) >= Date.parse(String(aboutDate))) {
                    resultArray.push(arr[i]);
                }
            }
        }
        return resultArray;
    }
}

export default new Compare();