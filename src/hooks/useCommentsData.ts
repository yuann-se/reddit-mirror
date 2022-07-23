import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app";
import { saveComments } from "../store/comments";

export function useCommentsData(postID: string) {

  const dispatch = useDispatch<any>();
  const commentsData = useSelector((state: RootState) => state.comments.commentsData[postID]);

  useEffect(() => {
    if (!commentsData)
      dispatch(saveComments(postID))
  }, []);

  return commentsData
}
