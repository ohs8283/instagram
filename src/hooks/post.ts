import { Comment, FullPost } from "@/model/post";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

async function addComment(id: string, comment: string, commentId: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment, commentId }),
  }).then((res) => res.json());
}

async function deleteComment(id: string, commentId: string) {
  return fetch("/api/comments ", {
    method: "DELETE",
    body: JSON.stringify({ id, commentId }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();

  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return;
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment, comment.commentId), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
    },
    [post, mutate, globalMutate]
  );

  const deletePostComment = useCallback(
    (commentId: string) => {
      if (!post) return;
      const newPost = {
        ...post,
        comments: post.comments.filter(
          (comment) => comment.commentId !== commentId
        ),
      };

      return mutate(deleteComment(post.id, commentId), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
    },
    [post, mutate, globalMutate]
  );

  return { post, isLoading, error, postComment, deletePostComment };
}
