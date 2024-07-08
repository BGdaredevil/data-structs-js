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

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node = new Node(item);
        this.length++;

        if (!this.head) {
            this.head = node;

            return;
        }

        node.next = this.head;
        this.head = node;
    }

    pop(): T | undefined {
        if (!this.head) {
            return;
        }

        const item = this.head;
        this.head = this.head?.next;
        this.length--;

        return item.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
