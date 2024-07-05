export default function bs_list(haystack: number[], needle: number): boolean {
    if (haystack.length <= 1) {
        return haystack[0] === needle;
    }

    const median = Math.floor(haystack.length / 2);

    const item = haystack[median];

    if (item === needle) {
        return true;
    }

    if (item < needle) {
        return bs_list(haystack.slice(median + 1), needle);
    }

    return bs_list(haystack.slice(0, median), needle);
}
