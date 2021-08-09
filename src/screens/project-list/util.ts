import { useMemo } from "react";
import { useQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
    const [param, setParam] = useQueryParam(["name", "personId"]);
    return [useMemo(() => { return { ...param, personId: +param.personId || undefined } }, [param]), setParam] as const;
}