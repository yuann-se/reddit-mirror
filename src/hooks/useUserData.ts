
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { IUserData, meRequestAsync } from "../store/me";

export function useUserData() {

  const dispatch = useDispatch<any>();
  const data = useSelector<RootState, IUserData>((state) => state.me.data);
  const token = useSelector<RootState, string>((state) => state.token.token);
  const loading = useSelector<RootState, boolean>((state) => state.me.loading);

  useEffect(() => {
    if (token.length > 10) {
      dispatch(meRequestAsync())
    }
  }, [token])

  return {data, loading}
}
