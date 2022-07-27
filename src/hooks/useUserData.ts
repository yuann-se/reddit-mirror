
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { IUserData, meRequest } from "../store/me";

export function useUserData() {

  const dispatch = useDispatch<any>();
  const token = useSelector<RootState, string>((state) => state.token.token);
  const data = useSelector<RootState, IUserData>((state) => state.me.data);
  const loading = useSelector<RootState, boolean>((state) => state.me.loading);
  const fetchError = useSelector<RootState, string>((state) => state.me.fetchError)

  useEffect(() => {
    if (token.length > 10) {
      dispatch(meRequest(token))
    }
  }, [token])

  return { data, loading, fetchError }
}
