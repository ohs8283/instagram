import { addComment, deleteComment } from "@/service/posts";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment, commentId } = await req.json();

    if (!id || !comment || !commentId) {
      return new Response("Bad Request", { status: 400 });
    }

    return addComment(id, user.id, comment, commentId)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}

export async function DELETE(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, commentId } = await req.json(); // commentId를 요청에서 받아옴

    if (!id || !commentId) {
      return new Response("Bad Request", { status: 400 });
    }

    return deleteComment(id, commentId) // deleteComment 함수에 commentId 전달
      .then(() => NextResponse.json({ success: true }))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
