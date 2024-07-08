export default function quick_sort(arr: number[]): void {
    main(arr, 0, arr.length - 1);
}

function main(arr: number[], start: number, end: number) {
    if (start >= end) {
        return;
    }

    const index = sort(arr, start, end);

    sort(arr, start, index - 1);
    sort(arr, index + 1, end);
}

function sort(arr: number[], start: number, end: number): number {
    const pivot = arr[end];
    let ptr = start - 1;

    for (let i = start; i < end; i++) {
        if (arr[i] <= pivot) {
            ptr++;
            const tmp = arr[i];
            arr[i] = arr[ptr];
            arr[ptr] = tmp;
        }
    }

    ptr++;
    arr[end] = arr[ptr];
    arr[ptr] = pivot;

    return ptr;
}
