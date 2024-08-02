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

export default class LRU<K, V> {
    private capacity: number;
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(capacity: number = 10) {
        this.capacity = capacity;
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        const item = this.lookup.get(key);

        if (item) {
            item.value = value;
            this.detatch(item);
            this.prepend(item);
        } else {
            const newItem = new Node(value);

            this.length++;
            this.prepend(newItem);
            this.lookup.set(key, newItem);
            this.reverseLookup.set(newItem, key);
            this.removeLast();
        }
    }

    get(key: K): V | undefined {
        const item = this.lookup.get(key);

        if (!item) {
            return undefined;
        }

        if (item === this.head) {
            return item.value;
        }

        this.detatch(item);
        this.prepend(item);

        return item.value;
    }

    debug() {
        console.log(this.head, this.lookup);
    }

    private removeLast(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const lastTail = this.tail;
        this.detatch(lastTail!);

        const lastTailKey = this.reverseLookup.get(lastTail!);

        this.lookup.delete(lastTailKey!);
        this.reverseLookup.delete(lastTail!);

        this.length--;

        // if (this.length === this.capacity) {
        //     const lastTail = this.tail;
        //     const lastItem = this.tail?.prev;
        //     this.detatch(this.tail!);
        //     this.tail = lastItem;
        //     const lastTailKey = this.reverseLookup.get(lastTail!);
        //     this.reverseLookup.delete(lastTail!);
        //     this.lookup.delete(lastTailKey!);
        // } else {
        //     this.length++;
        //     this.prepend(newItem);
        //     this.lookup.set(key, newItem);
        //     this.reverseLookup.set(newItem, key);
        // }
    }

    private detatch(node: Node<V>): void {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = node.prev = undefined;
    }

    private prepend(node: Node<V>): void {
        this.debug();

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;

        this.head = node;
    }
}
