import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { saveToken } from "../store/store";

export function useToken() {

  const dispatch = useDispatch<any>();
  const token = useSelector<RootState, string>((state) => state.main.token)

  useEffect(() => {
    dispatch(saveToken());
  }, []);

  return token
}
