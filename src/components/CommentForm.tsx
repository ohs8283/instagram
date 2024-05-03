import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: { comment: string; commentId: string }) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const commentId = generateCommentId(); // 댓글을 식별할 고유한 ID 생성
    onPostComment({ comment, commentId }); // comment와 commentId를 함께 전달
    setComment("");
  };

  const generateCommentId = () => {
    // 원하는 방식으로 댓글의 고유 식별자를 생성합니다.
    // 예를 들어 UUID 라이브러리를 사용하거나 현재 시간을 이용하여 고유한 값 생성 등이 가능합니다.
    // 이 예제에서는 단순히 현재 시간의 타임스탬프를 문자열로 반환하는 방식을 사용합니다.
    return Date.now().toString();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 border-t border-neutral-300"
    >
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
      >
        Post
      </button>
    </form>
  );
}
