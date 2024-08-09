export default class RingBuffer<T> {
    public length: number;
    private capacity: number;
    private head: number;
    private tail: number;
    private store: (T | undefined)[];

    constructor() {
        this.capacity = 3;
        this.length = 0;
        this.head = 0;
        this.tail = 0;
        this.store = new Array(3).fill(undefined);
    }

    push(item: T): void {
        if (this.length == this.capacity) {
            this.grow();
        }

        this.store[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;

        this.length++;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) {
            return;
        }

        return this.store[(this.head + idx) % this.capacity];
    }

    pop(): T | undefined {
        const item = this.store[this.head];
        this.store[this.head] = undefined;

        if (item != undefined) {
            this.length--;
            this.head = (this.head + 1) % this.capacity;
        }

        return item;
    }

    private grow() {
        const newStore = new Array(this.capacity * 2).fill(undefined);

        for (let i = 0; i < this.length; i++) {
            newStore[i] = this.store[(this.head + i) % this.capacity];
        }

        this.store = newStore;
        this.head = 0;
        this.tail = this.length;
        this.capacity = this.capacity * 2;
    }
}
