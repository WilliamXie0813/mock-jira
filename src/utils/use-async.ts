import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils/index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const [retry, setRetry] = useState(() => () => { });
  const config = { ...defaultConfig, ...initialConfig };
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    async (
      promise: Promise<D>,
      runConfig?: { retry: () => Promise<D> }
    ): Promise<D> => {
      if (!promise || !promise.then) {
        throw new Error("");
      }

      setRetry(() => () => {
        runConfig?.retry && run(runConfig?.retry(), runConfig);
      });

      dispatch({ stat: "loading" });

      try {
        const data = await promise;
        setData(data);
        return data;
      } catch (err) {
        setError(err);
        if (config.throwOnError) return await Promise.reject(err);
        return err;
      }
    },
    [config.throwOnError, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    // retry 被调用时重新跑一遍run，让state刷新一遍
    ...state,
  };
};
