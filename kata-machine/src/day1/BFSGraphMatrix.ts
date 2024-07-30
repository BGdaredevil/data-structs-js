export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);
    const que: number[] = [source];

    seen[source] = true;

    do {
        const curr = que.shift()!;

        if (curr === needle) {
            break;
        }

        const edges = graph[curr];

        for (let i = 0; i < edges.length; i++) {
            if (!edges[i]) {
                continue;
            }

            if (seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;

            que.push(i);
        }

        seen[curr] = true;
    } while (que.length);

    let point = needle;
    const path: number[] = [];

    if (prev[point] === -1) {
        return null;
    }

    while (prev[point] !== -1) {
        path.push(point);
        point = prev[point];
    }

    path.push(source);

    return path.reverse();
}
