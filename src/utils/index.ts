import { useEffect, useRef, useState } from "react";

export function cleanObject(object: { [key: string]: unknown }) {
    const result = { ...object };
    Object.keys(result).forEach(key => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    });
    return result;
}

export function isFalsy<T>(value: T | number) {
    return value === 0 ? false : !value
};

export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === "";

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        //eslint-disable-next-line react-hooks/exhaustive-deps
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

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });

    return mountedRef;
};

export const useDocumentTitle = (title: string, keepOnUmount: boolean = true) => {
    const oldTitle = document.title;

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        if (!keepOnUmount) {
            document.title = oldTitle;
        }
    }, []);

}