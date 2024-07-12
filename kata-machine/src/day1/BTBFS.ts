import Queue from "./Queue";

// recursive
// export default function bfs(head: BinaryNode<number>, needle: number): boolean {
//     const que = new Queue<BinaryNode<number>>();

//     return traverse(head, que, needle);
// }

// function traverse(node: BinaryNode<number> | undefined, nodesToDo: Queue<BinaryNode<number>>, toFind: number): boolean {
//     if (!node) {
//         return false;
//     }

//     const found = visit(node, nodesToDo, toFind);

//     if (found) {
//         return true;
//     }

//     return traverse(nodesToDo.deque(), nodesToDo, toFind);
// }

// function visit(node: BinaryNode<number>, nodesToDo: Queue<BinaryNode<number>>, itemToFind: number): boolean {
//     const found = node.value === itemToFind;

//     if (found) {
//         return found;
//     }

//     if (node.left) {
//         nodesToDo.enqueue(node.left);
//     }

//     if (node.right) {
//         nodesToDo.enqueue(node.right);
//     }

//     return found;
// }

// iterative
export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const que = new Queue<BinaryNode<number> | null>();
    que.enqueue(head);

    while (que.length) {
        const curr = que.deque();
        if (!curr) {
            continue;
        }

        if (curr.value === needle) {
            return true;
        }

        que.enqueue(curr.left);
        que.enqueue(curr.right);
    }

    return false;
}
