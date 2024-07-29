// personal implementation
class Node<U> {
    public value: U;
    public children: (Node<U> | null)[];
    public isWord: boolean;
    // public prev?: Node<U>;

    constructor(val: U) {
        this.value = val;
        this.children = new Array(26).fill(null);
        this.isWord = false;
    }
}

export default class Trie {
    private normConstant = "a".charCodeAt(0);
    private head: Node<string> | null;

    constructor() {
        this.head = new Node("");
    }

    insert(item: string): void {
        let current = this.head;

        for (let i = 0; i < item.length; i++) {
            const char = item[i];
            const charIdx = this.getIdx(char);

            if (!current!.children[charIdx]) {
                current!.children[charIdx] = new Node(char);
            }

            current = current!.children[charIdx];

            if (i === item.length - 1) {
                current!.isWord = true;
            }
        }
    }

    delete(item: string): void {
        let current = this.head;

        if (!current) {
            return;
        }

        let nodes: Node<string>[] = [];

        for (let i = 0; i < item.length; i++) {
            const char = item[i];
            const charIdx = this.getIdx(char);

            if (!current!.children[charIdx]) {
                return;
            }

            nodes.push(current!);
            current = current!.children[charIdx];
        }

        if (current!.isWord) {
            current!.isWord = false;
        }

        if (current!.children.some((e) => e !== null)) {
            return;
        }

        for (let i = nodes.length; i >= 0; i--) {
            const currNode = nodes[i];
            const currChar = item[i];
            const itemidx = this.getIdx(currChar);
            const node = currNode.children[itemidx];

            if (node?.children.some((e) => e !== null)) {
                continue;
            } else {
                currNode.children[itemidx] = null;
            }
        }
    }

    find(partial: string): string[] {
        const result: string[] = [];
        let current = this.head;

        for (let i = 0; i < partial.length; i++) {
            const char = partial[i];
            const charIdx = this.getIdx(char);
            const nextNode = current?.children[charIdx];

            if (!nextNode) {
                return result;
            }

            current = nextNode;
        }

        if (!current) {
            return result;
        }

        const items = this.traverse(current, []);
        // hack

        const ss = partial.split("");
        ss.pop();
        const tt = ss.join("");

        // result.push(...items.map((e) => partial + e));
        result.push(...items.map((e) => tt + e));

        return result;
    }

    private traverse(node: Node<string>, results: string[]) {
        for (let i = 0; i < node.children.length; i++) {
            const nextNode = node.children[i];

            if (nextNode) {
                // results.push(...this.traverse(nextNode, []));
                this.traverse(nextNode, results);
            }
        }

        for (let i = 0; i < results.length; i++) {
            results[i] = node.value + results[i];
        }

        if (node.isWord) {
            results.push(node.value);
        }

        return results;
    }

    private getIdx(str: string) {
        return str.charCodeAt(0) - this.normConstant;
    }
}

// const trie = new Trie();
// trie.insert("foo");
// trie.insert("fool");
// trie.insert("foolish");
// trie.insert("bar");

// console.log(trie.find("fo").sort());
// // [
// //     "foo",
// //     "fool",
// //     "foolish",
// // ]

// trie.delete("fool");

// console.log(trie.find("fo").sort());

// // [
// //     "foo",
// //     "foolish",
// // ]
