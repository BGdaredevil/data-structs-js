export default function two_crystal_balls(breaks: boolean[]): number {
    let jump = Math.sqrt(breaks.length);
    let lo = 0;

    while (lo < breaks.length) {
        const currIdx = Math.floor(lo + jump);

        if (breaks[currIdx]) {
            for (let i = lo; i < currIdx; i++) {
                const element = breaks[i];

                if (element) {
                    return i;
                }
            }
        }

        lo = currIdx;
    }

    return -1;
}
