type Node<U> = {
    value: U;
    next?: Node<U>;
};

export default class SinglyLinkedList<T> {
    public length: number = 0;
    private head?: Node<T> = undefined;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const newNode: Node<T> = {
            value: item,
            next: this.head,
        };

        this.head = newNode;
        this.length++;
    }

    append(item: T): void {
        const newNode: Node<T> = {
            value: item,
            next: undefined,
        };

        let curr = this.head;

        while (curr?.next) {
            curr = curr?.next;
        }

        if (curr) {
            curr.next = newNode;
        }

        if (!curr) {
            this.head = newNode;
        }

        this.length++;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return;
        }

        if (idx === 0) {
            const curr = this.head;
            this.head = curr?.next;
            this.length--;

            return curr?.value;
        }

        let temp = idx - 1;
        let prevIdxNode = this.head;

        while (temp > 0) {
            if (!prevIdxNode?.next) {
                return;
            }
            prevIdxNode = prevIdxNode?.next;
        }

        const currentItem = prevIdxNode?.next;
        prevIdxNode!.next = currentItem?.next;
        this.length--;

        return currentItem?.value;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx >= this.length) {
            return;
        }

        const newNode: Node<T> = {
            value: item,
        };

        let tmp = idx;
        let curr = this.head;
        let prev = this.head;

        while (tmp > 0) {
            prev = curr;
            curr = curr?.next;
        }

        if (!prev) {
            this.head = newNode;
            return;
        }

        prev.next = newNode;
        newNode.next = curr;
    }

    remove(item: T): T | undefined {
        let found = false;
        let prevNode = this.head;
        let currNode = this.head;

        while (currNode?.next) {
            const currVal = currNode.value;

            if (currVal === item) {
                found = true;
                break;
            } else {
                prevNode = currNode;
                currNode = currNode.next;
            }
        }

        if (!found) {
            return;
        }

        if (prevNode) {
            prevNode.next = currNode?.next;
        }

        if (prevNode === this.head) {
            this.head = prevNode?.next;
        }

        this.length--;

        return currNode?.value;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return;
        }

        let count = idx;
        let item = this.head;

        while (count > 0) {
            if (!item?.next) {
                return undefined;
            }

            item = item.next;
            count--;
        }

        return item?.value;
    }
}
