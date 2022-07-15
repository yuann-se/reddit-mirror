import React from "react";

interface IComment {
  id: string;
  body: string;
  author: string;
  createdAt: number;
  replies: IComment[];
}

export const postCommentsContext = React.createContext<IComment[]>([]);
