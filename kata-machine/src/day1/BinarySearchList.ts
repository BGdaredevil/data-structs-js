// recursive
// export default function bs_list(haystack: number[], needle: number): boolean {
//     if (haystack.length <= 1) {
//         return haystack[0] === needle;
//     }

//     const median = Math.floor(haystack.length / 2);

//     const item = haystack[median];

//     if (item === needle) {
//         return true;
//     }

//     if (item < needle) {
//         return bs_list(haystack.slice(median + 1), needle);
//     }

//     return bs_list(haystack.slice(0, median), needle);
// }

// non recursive

export default function bs_list(haystack: number[], needle: number): boolean {
    let hiIndex = haystack.length;
    let loIndex = 0;

    while (loIndex < hiIndex) {
        const median = Math.floor(loIndex + (hiIndex - loIndex) / 2);
        const value = haystack[median];

        if (value === needle) {
            return true;
        }

        if (value < needle) {
            loIndex = median + 1;
            continue;
        }

        hiIndex = median;
    }

    return false;
}
