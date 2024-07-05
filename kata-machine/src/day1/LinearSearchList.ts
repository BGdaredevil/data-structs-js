export default function linear_search(
    haystack: number[],
    needle: number,
): boolean {
    let result = false;

    for (let i = 0; i < haystack.length; i++) {
        const element = haystack[i];

        if (element === needle) {
            result = true;
            return result;
        }
    }

    return result;
}
