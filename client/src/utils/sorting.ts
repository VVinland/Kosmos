import { Task } from "../types";

interface User {
    firstname: string,
    lastname: string,
    middlename: string
}

class Sorting {
    flag: string = '';

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

    compare(task1: Task, task2: Task) {
        if (this.flag === 'withoutSorting') {
            const result = this.compareDate(task1.updateDate, task2.updateDate);
            return result;
        }

        if (this.flag === 'sortingByResponsible') {
            const result = this.compareString(task1, task2)
            return result;
        }
    }

    partition(arr: Task[], start: number, end: number) {
        const pivot = arr[end];
        let storeIndex = start;

        for (let i = start; i < end; i++) {
            if (this.compare(arr[i], pivot)) {
                [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
                storeIndex++;
            }
        }
        [arr[storeIndex], arr[end]] = [arr[end], arr[storeIndex]];
        return storeIndex;
    }

    quickSort(arr: Task[], start: number, end: number) {
        if (start === end) {
            return;
        }

        const pivot = this.partition(arr, start, end);

        if (pivot > start) this.quickSort(arr, start, pivot - 1);

        if (pivot < end) this.quickSort(arr, start + 1, end);

    }

    withoutSorting(arr: Task[]) {
        this.flag = 'withoutSorting'
        this.quickSort(arr, 0, arr.length - 1);

        return arr;
    }

    sortingByResponsible(arr: Task[]) {
        this.flag = 'sortingByResponsible';
        this.quickSort(arr, 0, arr.length - 1);

        return arr;
    }

    sortingByDateEnd(arr: Task[], value: string) {
        this.flag = 'withoutSorting';
        if (value === 'today') {
            const newTasks = this.sortByToday(arr);
            return newTasks;
        }

        if (value === 'week') {
            const newTasks = this.sortByWeek(arr);
            return newTasks;
        }

        if (value === 'moreWeek') {
            const newTasks = this.sortMoreThanByWeek(arr);
            return newTasks;
        }

        return arr;
    }

    sortByToday(arr: Task[]) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tempTasks = this.compareDays(arr, today);
        this.quickSort(tempTasks, 0, tempTasks.length - 1);
        return tempTasks;
    }

    sortByWeek(arr: Task[]) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const week = new Date();
        week.setDate(today.getDate() + 7);
        const tempTasks = this.compareDays(arr, today, week);
        this.quickSort(tempTasks, 0, tempTasks.length - 1);
        return tempTasks;
    }

    sortMoreThanByWeek(arr: Task[]) {
        const today = new Date();
        const eighthDay = new Date();
        eighthDay.setDate(today.getDate() + 8);
        const tempTasks = this.compareDays(arr, today, eighthDay, 'eighthDay');
        this.quickSort(tempTasks, 0, tempTasks.length - 1);
        return tempTasks;
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

export default new Sorting();