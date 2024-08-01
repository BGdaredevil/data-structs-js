export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    const result = traverse(graph, source, needle, seen, path);

    return result ? path : null;
}

function traverse(
    graph: WeightedAdjacencyList,
    current: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (seen[current]) {
        return false;
    }

    seen[current] = true;

    path.push(current);

    if (current === needle) {
        return true;
    }

    const edges = graph[current];

    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];

        if (traverse(graph, edge.to, needle, seen, path)) {
            // path.push(edge.to)
            return true;
        }
    }

    path.pop();
    return false;
}
