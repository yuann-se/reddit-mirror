import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { saveComments } from "../store/comments";

export function useCommentsData(postID: string) {

  const dispatch = useDispatch<any>();
  const data = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    if (!data.commentsData || !data.commentsData[postID])
      dispatch(saveComments(postID))
  }, []);

  return data
}
