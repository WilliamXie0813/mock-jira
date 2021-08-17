import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);
    return [useMemo(() => {
        return { ...param, personId: +param.personId || undefined }
    },
        [param]), setParam] as const;
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam(['projectCreate']);
    const open = () => setProjectModalOpen({ projectCreate: true })
    const close = () => setProjectModalOpen({ projectCreate: undefined })
    return {
        projectModalOpen: projectCreate === 'true',
        close,
        open
    }
    // return [projectCreate === 'true', open, close] as const;
}