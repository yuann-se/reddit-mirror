import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { saveToken } from "../store/token";

export function useToken() {

  const dispatch = useDispatch<any>();
  const token = useSelector<RootState, string>((state) => state.token.token)

  useEffect(() => {
    dispatch(saveToken());
  }, []);

  return token
}
