import { useMemo } from "react";
import { useProject } from "utils/project";
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
    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId']);
    const { data: editingProject, isLoading } = useProject(Number(editingProjectId));
    const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

    const open = () => setProjectModalOpen({ projectCreate: true })
    const close = () => {
        setProjectModalOpen({ projectCreate: undefined })
        // setEditingProjectId({ editingProjectId: undefined })
    }
    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
        close,
        open,
        startEdit,
        editingProject,
        isLoading,
    }
    // return [projectCreate === 'true', open, close] as const;
}