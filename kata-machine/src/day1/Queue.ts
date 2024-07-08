class Node<U> {
    public value: U;
    public next?: Node<U>;
    // public prev?: Node<U>;

    constructor(val: U) {
        this.value = val;
        this.next = undefined;
        // this.prev = undefined;
    }
}

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const nodeItem = new Node(item);

        if (this.length === 0) {
            this.head = this.tail = nodeItem;
            this.length++;

            return;
        }

        this.tail!.next = nodeItem;
        this.tail = nodeItem;
        this.length++;
    }

    deque(): T | undefined {
        if (!this.head) {
            return;
        }

        const firstItem = this.head;

        this.head = this.head?.next;
        this.length--;

        if (this.length === 0) {
            this.tail = undefined;
        }

        return firstItem?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
