import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { tokenContext } from "../shared/context/tokenContext";

const postPreviewDefault = 'https://oksimetr.ru/wp-content/uploads/a/f/5/af5c6b86f119f4d8905d178695017163.jpeg';

interface IPost {
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

interface IInitPost {
  data: {
    author: string;
    avatarSrc: string;
    created: string;
    title: string;
    url: string
    // preview: {
    //   images: [
    //     {
    //       source: {
    //         url: string;
    //       }
    //     }
    //   ]
    // };
    ups: number;
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

        initData.map(({ data }: IInitPost) => {
          const post = {
            author: data.author,
            authorUrl: `https://www.reddit.com/user/${data.author}/`,
            avatarSrc: data.sr_detail.icon_img,
            createdAt: data.created,
            postTitle: data.title,
            postUrl: data.url,
            previewSrc: data.thumbnail.length < 10 ? postPreviewDefault : data.thumbnail,
            // previewSrc: data.preview ? data.preview.images[0].source.url : '',
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
