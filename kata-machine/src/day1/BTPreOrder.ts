export default function pre_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];

    function visit(node: BinaryNode<number>): void {
        result.push(node.value);
    }

    function traverse(node: BinaryNode<number> | null): void {
        if (!node) {
            return;
        }

        visit(node);
        traverse(node?.left);
        traverse(node?.right);
    }

    traverse(head);

    return result;
}
