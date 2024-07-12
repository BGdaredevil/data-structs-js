// type Node<U> = {
//     value: U;
//     next?: Node<U>;
//     prev?: Node<U>;
// };

class Node<U> {
    public value: U;
    public next?: Node<U>;
    public prev?: Node<U>;

    constructor(val: U) {
        this.value = val;
        this.next = undefined;
        this.prev = undefined;
    }
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T> = undefined;
    private tail?: Node<T> = undefined;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const newNode = new Node(item);

        if (this.length === 0) {
            this.head = this.tail = newNode;
            this.length++;

            return;
        }

        newNode.next = this.head;
        this.head!.prev = newNode;

        this.head = newNode;
        this.length++;
    }

    append(item: T): void {
        const newNode = new Node(item);

        if (this.length === 0) {
            this.head = this.tail = newNode;
            this.length++;

            return;
        }

        newNode.prev = this.tail;
        this.tail!.next = newNode;
        this.tail = newNode;
        this.length++;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) {
            return;
        }

        let temp = idx;
        let curr = this.head;

        while (temp > 0) {
            curr = curr?.next;
            temp--;
        }

        return curr?.value;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            return;
        }

        let temp = idx;
        let curr = this.head;

        while (temp > 0) {
            curr = curr?.next;
            temp--;
        }

        const newNode = new Node(item);

        if (!curr) {
            this.head = this.tail = newNode;
            this.length++;
            return;
        }

        newNode.next = curr?.next;
        newNode.prev = curr;
        if (curr.next?.prev) {
            curr.next.prev = newNode
        }

        curr.next = newNode;
        this.length++;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) {
            return;
        }

        let temp = idx;
        let curr = this.head;

        while (temp > 0) {
            curr = curr?.next;
            temp--;
        }

        if (!curr) {
            return;
        }

        if (curr === this.head && curr === this.tail) {
            this.head = this.tail = undefined;
            this.length--;
            return curr.value;
        }

        if (curr === this.head) {
            this.head = curr.next;
            this.length--;
            return curr.value;
        }

        if (curr === this.tail) {
            this.tail = curr.prev;
            this.length--;
            return curr.value;
        }

        curr.next!.prev = curr.prev;
        curr.prev!.next = curr.next;
        this.length--;

        return curr.value;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        let idx = 0;

        while (curr) {
            if (curr.value === item) {
                return this.removeAt(idx);
            }
            curr = curr.next;
            idx++;
        }

        return undefined;
    }
}
