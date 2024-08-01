export default class Map<T extends string | number, V> {
    private length: number;
    private capacity: number;
    private store: { key: T; value: V }[][];

    constructor(capacity = 3) {
        this.length = 0;
        this.capacity = capacity;
        this.store = new Array(capacity);

        for (let i = 0; i < this.store.length; i++) {
            this.store[i] = [];
        }
    }

    get(key: T): V | undefined {
        const hash = this.hashKey(key);
        let returnValue: V | undefined = undefined;

        for (let i = 0; i < this.store[hash].length; i++) {
            const item = this.store[hash][i];
            if (item?.key === key) {
                returnValue = item.value;
                break;
            }
        }

        return returnValue;
    }

    set(key: T, value: V): void {
        const hash = this.hashKey(key);

        this.store[hash].push({ key, value });

        if (this.length / this.capacity > 0.7) {
            this.grow();
        }

        this.length++;
    }

    delete(key: T): V | undefined {
        const hash = this.hashKey(key);
        let returnValue: V | undefined = undefined;

        for (let i = 0; i < this.store[hash].length; i++) {
            const item = this.store[hash][i];
            if (item?.key === key) {
                returnValue = item.value;
                break;
            }
        }

        if (returnValue) {
            this.store[hash] = this.store[hash].filter((e) => e.key !== key);
            this.length--;
        }

        return returnValue;
    }

    size(): number {
        return this.length;
    }

    private hashKey(key: T): number {
        let code = 0;

        if (typeof key === "number") {
            code = key % this.capacity;
        }

        if (typeof key === "string") {
            for (let i = 0; i < key.length; i++) {
                code += key.charCodeAt(i);
            }

            code = code % this.capacity;
        }

        return code;
    }

    private grow() {
        const items: { key: T; value: V }[] = [];
        this.capacity = this.capacity * 2;
        const newStore = new Array(this.capacity);

        for (let i = 0; i < newStore.length; i++) {
            newStore[i] = [];
        }

        for (let i = 0; i < this.store.length; i++) {
            const list = this.store[i];
            items.push(...list);
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const hash = this.hashKey(item.key);
            newStore[hash].push(item);
        }

        this.store = newStore;
    }
}

// const map = new Map<string, number>();
// map.set("foo", 55);
// // expect(map.size()).toEqual(1);
// map.set("fool", 75);
// // expect(map.size()).toEqual(2);
// map.set("foolish", 105);
// // expect(map.size()).toEqual(3);
// map.set("bar", 69);
// // expect(map.size()).toEqual(4);

// // expect(map.get("bar")).toEqual(69);
// // expect(map.get("blaz")).toEqual(undefined);

// map.delete("barblabr");
// // expect(map.size()).toEqual(4);

// map.delete("bar");
// // expect(map.size()).toEqual(3);
// // expect(map.get("bar")).toEqual(undefined);
