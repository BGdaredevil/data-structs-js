// type GraphEdge = { to: number; weight: number };
// type WeightedAdjacencyList = GraphEdge[][];

export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    const seen: boolean[] = new Array(arr.length).fill(false);
    const dists: number[] = new Array(arr.length).fill(Infinity);
    const prev: number[] = new Array(arr.length).fill(-1);
    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const lo = getLowestUnvisited(seen, dists);

        seen[lo] = true;
        const edges = arr[lo];

        for (let i = 0; i < edges.length; i++) {
            const edge = edges[i];
            if (seen[edge.to]) {
                continue;
            }

            const dist = dists[lo] + edge.weight;
            if (dist < dists[edge.to]) {
                prev[edge.to] = lo;
                dists[edge.to] = dist;
            }
        }
    }

    let point = sink;
    const path: number[] = [];

    while (prev[point] !== -1) {
        path.push(point);
        point = prev[point];
    }

    path.push(source);

    return path.reverse();
}

function getLowestUnvisited(seen: boolean[], dists: number[]) {
    let lowDist = Infinity;
    let lowIdx = -1;

    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
            continue;
        }

        if (dists[i] < Infinity && lowDist > dists[i]) {
            lowDist = dists[i];
            lowIdx = i;
        }
    }

    return lowIdx;
}

function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((e, i) => !e && dists[i] < Infinity);
}

// const list1: WeightedAdjacencyList = [];

// //      (1) --- (4) ---- (5)
// //    /  |       |       /|
// // (0)   | ------|------- |
// //    \  |/      |        |
// //      (2) --- (3) ---- (6)
// list1[0] = [
//     { to: 1, weight: 3 },
//     { to: 2, weight: 1 },
// ];
// list1[1] = [
//     { to: 0, weight: 3 },
//     { to: 2, weight: 4 },
//     { to: 4, weight: 1 },
// ];
// list1[2] = [
//     { to: 1, weight: 4 },
//     { to: 3, weight: 7 },
//     { to: 0, weight: 1 },
// ];
// list1[3] = [
//     { to: 2, weight: 7 },
//     { to: 4, weight: 5 },
//     { to: 6, weight: 1 },
// ];
// list1[4] = [
//     { to: 1, weight: 1 },
//     { to: 3, weight: 5 },
//     { to: 5, weight: 2 },
// ];
// list1[5] = [
//     { to: 6, weight: 1 },
//     { to: 4, weight: 2 },
//     { to: 2, weight: 18 },
// ];
// list1[6] = [
//     { to: 3, weight: 1 },
//     { to: 5, weight: 1 },
// ];

// console.log(dijkstra_list(0, 6, list1));

// [0, 1, 4, 5, 6]
