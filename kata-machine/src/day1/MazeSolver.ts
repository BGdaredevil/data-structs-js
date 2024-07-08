const dir = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

function walk(maze: string[], seen: boolean[][], wall: string, curr: Point, end: Point, result: Point[]): boolean {
    if (curr.y < 0 || curr.y >= maze.length) {
        return false;
    }

    if (curr.x < 0 || curr.x >= maze[curr.y].length) {
        return false;
    }

    const myLoc = maze[curr.y][curr.x];

    if (myLoc === wall) {
        return false;
    }

    if (curr.x === end.x && curr.y === end.y) {
        result.push(curr);
        return true;
    }

    if (seen[curr.y][curr.x]) {
        return false;
    }

    seen[curr.y][curr.x] = true;
    result.push(curr);

    for (let i = 0; i < dir.length; i++) {
        const [y, x] = dir[i];

        if (walk(maze, seen, wall, { x: curr.x + x, y: curr.y + y }, end, result)) {
            return true;
        }
    }

    // if (walk(maze, seen, wall, { x: curr.x, y: curr.y - 1 }, end, result)) {
    //     result.push(curr);
    //     return true;
    // }

    // if (walk(maze, seen, wall, { x: curr.x + 1, y: curr.y }, end, result)) {
    //     result.push(curr);
    //     return true;
    // }

    // if (walk(maze, seen, wall, { x: curr.x, y: curr.y + 1 }, end, result)) {
    //     result.push(curr);
    //     return true;
    // }

    // if (walk(maze, seen, wall, { x: curr.x - 1, y: curr.y }, end, result)) {
    //     result.push(curr);
    //     return true;
    // }

    result.pop();

    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const result: Point[] = [];
    const seen: boolean[][] = new Array(maze.length);

    for (let i = 0; i < maze.length; i++) {
        seen[i] = new Array(maze[i].length).fill(false);
    }

    walk(maze, seen, wall, start, end, result);

    return result;
}
