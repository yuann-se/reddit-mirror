import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { saveBestPosts } from "../store/bestPosts";

export function useBestPostsData(cursor: string) {

  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState<boolean>(false);

  const dispatch = useDispatch<any>();
  const data = useSelector((state: RootState) => state.bestPosts);

  useEffect(() => {
    if (data.data.length === 0)
      dispatch(saveBestPosts(cursor));
  }, []);

  return data
}
