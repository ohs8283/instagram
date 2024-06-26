import { useCacheKeys } from "@/context/CacheKeysContext";
import { Comment, SimplePost } from "@/model/post";
import { useCallback } from "react";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string, commentId: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment, commentId }),
  }).then((res) => res.json());
}

async function deleteComment(id: string, userId: string) {
  return fetch("/api/comments ", {
    method: "DELETE",
    body: JSON.stringify({ id, userId }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => item !== username),
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newCommentCount = post.comments + 1;
      const newPost = {
        ...post,
        comments: newCommentCount,
      };

      const newPosts: SimplePost[] | undefined = posts?.map((p) =>
        p.id === post.id ? newPost : p
      ) as SimplePost[] | undefined;

      return mutate(addComment(post.id, comment.comment, comment.commentId), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const deletePostComment = useCallback(
    (postId: string, commentId: string) => {
      const newPosts = posts?.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments - 1,
          };
        }
        return post;
      });

      return mutate(newPosts, {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );
  return { posts, isLoading, error, setLike, postComment, deletePostComment };
}
