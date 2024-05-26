import { Task } from "../types";
import compare from './compare-date';
import { quickSort } from "./quick-sort";

class Sorting {
    flag: string = '';


    withoutSorting(arr: Task[]) {
        this.flag = 'withoutSorting'
        quickSort(arr, 0, arr.length - 1, this.flag);

        return arr;
    }

    sortingByResponsible(arr: Task[]) {
        this.flag = 'sortingByResponsible';
        quickSort(arr, 0, arr.length - 1, this.flag);

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
        const tempTasks = compare.compareDays(arr, today);
        quickSort(tempTasks, 0, tempTasks.length - 1, this.flag);
        return tempTasks;
    }

    sortByWeek(arr: Task[]) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const week = new Date();
        week.setDate(today.getDate() + 7);
        const tempTasks = compare.compareDays(arr, today, week);
        quickSort(tempTasks, 0, tempTasks.length - 1, this.flag);
        return tempTasks;
    }

    sortMoreThanByWeek(arr: Task[]) {
        const today = new Date();
        const eighthDay = new Date();
        eighthDay.setDate(today.getDate() + 8);
        const tempTasks = compare.compareDays(arr, today, eighthDay, 'eighthDay');
        quickSort(tempTasks, 0, tempTasks.length - 1, this.flag);
        return tempTasks;
    }
}

export default new Sorting();