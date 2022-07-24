import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { saveBestPosts } from "../store/bestPosts";

export function useBestPostsData() {

  const dispatch = useDispatch<any>();
  const data = useSelector((state: RootState) => state.bestPosts);

  useEffect(() => {
    if (data.data.length === 0)
      dispatch(saveBestPosts());
  }, []);

  return data
}
