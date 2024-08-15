export default function bfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const path = new Array(graph.length).fill(-1);
    const que = [source];
    seen[source] = true;

    do {
        const currNode = que.shift();
        if (currNode === needle) {
            break;
        }

        const connectedNodes = graph[currNode!];

        for (let i = 0; i < connectedNodes.length; i++) {
            const node = connectedNodes[i];

            if (seen[node.to]) {
                continue;
            }

            path[node.to] = currNode;
            seen[node.to] = true;
            que.push(node.to);
        }

        seen[currNode!] = true;
    } while (que.length > 0);

    let point = needle;
    const route: number[] = [];

    if (path[point] === -1) {
        return null;
    }

    while (path[point] !== -1) {
        route.push(point);
        point = path[point];
    }

    route.push(source);

    return route.reverse();
}
