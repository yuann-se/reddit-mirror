import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { tokenContext } from "../shared/context/tokenContext";

interface IPost {
  author: string;
  authorUrl: string;
  avatarSrc: string;
  createdAt: string;
  id: string;
  postTitle: string;
  postUrl: string
  previewSrc: string;
  upvotes: number;
  subreddit: string;
  comments: number
}

interface IInitPost {
  data: {
    author: string;
    avatarSrc: string;
    created: string;
    id: string;
    title: string;
    url: string
    ups: number;
    subreddit: string;
    num_comments: number;
    sr_detail: {
      icon_img: string
    }
    thumbnail: string;
  }
}

export function usePostsData() {

  const [data, setData] = useState<IPost[]>([]);
  const token = useContext(tokenContext);
  let postsData: IPost[] = [];

  useEffect(() => {

    axios.get(
      'https://oauth.reddit.com/best.json?sr_detail=true',
      { headers: { Authorization: `bearer ${token}` } }
    )
      .then((res) => {
        const initData = res.data.data.children;
        console.log(initData)

        initData.map(({ data }: IInitPost) => {
          const post = {
            author: data.author,
            authorUrl: `https://www.reddit.com/user/${data.author}/`,
            avatarSrc: data.sr_detail.icon_img,
            createdAt: data.created,
            id: data.id,
            postTitle: data.title,
            postUrl: data.url,
            previewSrc: data.thumbnail,
            subreddit: data.subreddit,
            upvotes: data.ups,
            comments: data.num_comments
          };

          postsData.push(post);
        })

        setData(postsData);
      })
      .catch(console.log)

  }, [token]);

  return [data]
}
