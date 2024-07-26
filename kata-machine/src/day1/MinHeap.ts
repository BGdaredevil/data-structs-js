export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.transferUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        this.length--;

        if (this.length === 0) {
            return out;
        }

        this.data[0] = this.data[this.length];

        this.transferDown(0);

        return out;
    }

    transferDown(idx: number): void {
        if (idx >= this.length) {
            return;
        }
        const leftIdx = this.getLeftChildIdx(idx);
        const rightIdx = this.getRightChildIdx(idx);

        if (leftIdx >= this.length) {
            return;
        }

        const currVal = this.data[idx];
        const leftVal = this.data[leftIdx];
        const rightVal = this.data[rightIdx];

        if (leftVal > rightVal && currVal > rightVal) {
            this.data[rightIdx] = currVal;
            this.data[idx] = rightVal;

            return this.transferDown(rightIdx);
        } else if (leftVal < rightVal && currVal > leftVal) {
            this.data[leftIdx] = currVal;
            this.data[idx] = leftVal;

            return this.transferDown(leftIdx);
        }
    }

    transferUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const currVal = this.data[idx];
        const parentIdx = this.getParrentIdx(idx);
        const parentV = this.data[parentIdx];

        if (parentV > currVal) {
            this.data[idx] = parentV;
            this.data[parentIdx] = currVal;

            return this.transferUp(parentIdx);
        }
    }

    getParrentIdx(idx: number) {
        return Math.floor((idx - 1) / 2);
    }

    getLeftChildIdx(idx: number) {
        return 2 * idx + 1;
    }

    getRightChildIdx(idx: number) {
        return 2 * idx + 2;
    }
}
