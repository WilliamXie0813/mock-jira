import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "types/project";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    return useQuery<Project[], Error>(['projects', param], () => client("projects", { data: cleanObject(param || {}) }));
}

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: Partial<Project>) => {
        return client(`projects/${params.id}`, { data: params, method: 'PATCH' })
    }, useEditConfig(queryKey))

}

export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((params: Partial<Project>) => {
        return client(`projects`, { data: params, method: 'POST' })
    }, useAddConfig(queryKey))
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();
    return useMutation((id: number) => {
        return client(`projects/${id}`, { method: 'DELETE' })
    }, useDeleteConfig(queryKey))
}

export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
        enabled: Boolean(id)
    })
}