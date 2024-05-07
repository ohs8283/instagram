import React from "react";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import useFullPost from "@/hooks/post";

type Props = {
  post: SimplePost;
};

const PostDetail: React.FC<Props> = ({ post }: Props) => {
  const { id, userImage, username, image } = post;
  const { post: data, postComment, deletePostComment } = useFullPost(id);
  const comments = data?.comments;

  const handleDeleteComment = (commentId: string) => {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      deletePostComment(commentId);
    }
  };

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments.map(
              (
                { image, username: commentUsername, comment, commentId },
                index
              ) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2 flex items-center w-full justify-between">
                    <div className="flex items-center">
                      <span className="font-bold mr-1">{commentUsername}</span>
                      <span>{comment}</span>
                    </div>
                    {commentUsername === username && index !== 0 && (
                      <button
                        className="text-red-500 hover:text-red-700 mr-2"
                        onClick={() => handleDeleteComment(commentId)}
                      >
                        X
                      </button>
                    )}
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
};

export default PostDetail;
