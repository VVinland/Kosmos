import { Task } from "../types";
import compare from "./compare-date";

function partition(arr: Task[], start: number, end: number, flag:string) {
    const pivot = arr[end];
    let storeIndex = start;

    for (let i = start; i < end; i++) {
        if (compare.compareSwitch(arr[i], pivot, flag)) {
            [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
            storeIndex++;
        }
    }
    [arr[storeIndex], arr[end]] = [arr[end], arr[storeIndex]];
    return storeIndex;
}

function quickSort(arr: Task[], start: number, end: number, flag:string) {
    if (start === end) {
        return;
    }

    const pivot = partition(arr, start, end, flag);

    if (pivot > start) quickSort(arr, start, pivot - 1, flag);

    if (pivot < end) quickSort(arr, start + 1, end, flag);
}

export {quickSort};