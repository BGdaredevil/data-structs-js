export default function in_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];

    function visit(node: BinaryNode<number>): void {
        result.push(node.value);
    }

    function traverse(node: BinaryNode<number> | null): void {
        if (!node) {
            return;
        }

        traverse(node?.left);
        visit(node);
        traverse(node?.right);
    }

    traverse(head);

    return result;
}
