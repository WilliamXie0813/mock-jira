import { useEffect, useState } from "react";

export function cleanObject<T>(object: any | T) {
    const result = { ...object };
    Object.keys(result).forEach(key => {
        const value = result[key];
        if (isFalsy<typeof value>(value)) {
            delete result[key];
        }
    });
    return result;
}

export function isFalsy<T>(value: T | number) {
    return value === 0 ? false : !value
};

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, [])
}

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedVal, setDebouncedVal] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedVal(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay])

    return debouncedVal;
}

export function useArray<T>(array: T[]) {

    const [arr, setArr] = useState(array);

    function add(item: T) {
        setArr([...arr, item]);
    }

    function removeIndex(index: number) {
        const copy = [...arr];
        copy.splice(index, 1);
        setArr(copy);
    }

    function clear() {
        setArr([]);
    }

    return { arr, setArr, add, removeIndex, clear }

}