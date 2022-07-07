import axios from "axios";
import { useEffect, useState } from "react";

interface IInitData {
  data: {
    children: IInitData[]
    id: string;
    body: string;
    author: string;
    created: number;
    // replies: object;
    replies: IInitData;
  }
}

interface IComment {
  id: string;
  body: string;
  author: string;
  createdAt: number;
  // replies: object;
  replies: IComment[];
}

export function useCommentsData(subreddit: string, postID: string) {

  const [commentsData, setCommentsData] = useState([]);
  const comments: IComment[] = [];

  useEffect(() => {
    axios.get(
      `https://api.reddit.com/r/${subreddit}/comments/${postID}?sort=top&limit=100`,
    )
      .then((res) => {
        setCommentsData(res.data[1].data.children)
        // console.log(res.data[1].data.children)
      })
  }, []);
  return [commentsData]
}


