export default function dfs(head: BinaryNode<number> | null, needle: number): boolean {
    if (!head) {
        return false;
    }

    if (head.value === needle) {
        return true;
    }

    return needle < head.value ? dfs(head.left, needle) : dfs(head.right, needle);
}
