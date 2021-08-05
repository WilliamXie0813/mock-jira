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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({ ...defaultInitialState, ...initialState });

  const setData = (data: D) => setState({ data, stat: 'success', error: null })

  const setError = (err: Error) => setState({ data: null, stat: 'error', error: err });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("");
    }

    setState({ ...state, stat: 'loading' });

    return promise.then(data => {
      setData(data);
      return data;
    }).catch(err => {
      setError(err);
      return Promise.reject(err);
    })
  }
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry 被调用时重新跑一遍run，让state刷新一遍
    // retry,
    ...state,
  };
}