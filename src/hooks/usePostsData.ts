import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { tokenContext } from "../shared/context/tokenContext";

interface IPostProps {
  author: string;
  authorUrl: string;
  avatarSrc: string;
  createdAt: string;
  postTitle: string;
  postUrl: string
  previewSrc: string;
  upvotes: number;
  comments: number
}

export function usePostsData() {

  const [data, setData] = useState<object[]>([]);
  const token = useContext(tokenContext);

  useEffect(() => {

    axios.get(
      'https://oauth.reddit.com/best.json',
      { headers: { Authorization: `bearer ${token}` } }
    )
      .then((res) => {
        const initData = res.data.data.children;
        const data = initData.map((initPost: object) => {
          const post = {
            author: initPost.data.author,
            authorUrl: '',
            avatarSrc: '',
            createdAt: initPost.data.created
          }
        })
        // setData(postData)
      })
      .catch(console.log)
  }, [token])

  return [data]
}
