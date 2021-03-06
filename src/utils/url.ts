import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useUrlQueryParam = <T extends string>(keys: T[]) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const rtnVal = useMemo(() => {
        return keys.reduce((prev, key) => {
            return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in T]: string })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    return [rtnVal, (params: Partial<{ [key in T]: unknown }>) => {
        const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
        setSearchParams(o);
    }] as const
}