export default class ArrayList<T> {
    public length: number;
    private store: (T | undefined)[];
    private capacity: number;

    constructor(capacity: number) {
        this.store = new Array(capacity);
        this.capacity = capacity;
        this.length = 0;
    }

    prepend(item: T): void {
        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        while (idx >= this.capacity) {
            this.grow();
        }

        if (this.length + 1 > this.capacity) {
            this.grow();
        }

        let tmp = this.store[idx];
        this.store[idx] = item;

        for (let i = idx + 1; i < this.capacity; i++) {
            let curr = this.store[i];
            this.store[i] = tmp;
            tmp = curr;
        }

        this.length++;
    }

    append(item: T): void {
        if (this.capacity == this.length) {
            this.grow();
        }

        this.store[this.length] = item;
        this.length++;
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            return;
        }

        const foundItem = this.store[idx];

        for (let i = idx; i < this.length - 1; i++) {
            this.store[i] = this.store[i + 1];
        }

        this.length--;
        this.store[this.length] = undefined;

        return foundItem;
    }

    remove(item: T): T | undefined {
        let foundItem = undefined;
        let foundIdx = 0;

        for (let i = 0; i < this.length; i++) {
            if (this.store[i] === item) {
                foundItem = this.store[i];
                foundIdx = i;

                break;
            }
        }

        if (!foundItem) {
            return;
        }

        for (let i = foundIdx; i < this.length - 1; i++) {
            this.store[i] = this.store[i + 1];
        }

        this.length--;
        this.store[this.length] = undefined;

        return foundItem;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return;
        }

        return this.store[idx];
    }

    private grow(): void {
        this.capacity = this.capacity * 2;
        const newStore = new Array(this.capacity);

        for (let i = 0; i < this.store.length; i++) {
            newStore[i] = this.store[i];
        }

        this.store = newStore;
    }
}
