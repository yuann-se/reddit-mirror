import axios from "axios";
import { useEffect, useState } from "react";

export interface ICommentsData {
  data: {
    children: ICommentsData[]
    id: string;
    body: string;
    author: string;
    created: string;
    replies: ICommentsData;
  }
}

export function useCommentsData(subreddit: string, postID: string) {

  const [commentsData, setCommentsData] = useState<ICommentsData[]>([]);

  useEffect(() => {
    axios.get(
      `https://api.reddit.com/r/${subreddit}/comments/${postID}?sort=top`,
    )
      .then((res) => {
        setCommentsData(res.data[1].data.children)
        // console.log(res.data[1].data.children)
      })
  }, []);
  return commentsData
}


