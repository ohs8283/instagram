import { addComment, deleteComment } from "@/service/posts";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await req.json();

    if (!id || comment == null) {
      return new Response("Bad Request", { status: 400 });
    }

    return addComment(id, user.id, comment)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}

export async function DELETE(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, userId } = await req.json();

    if (!id || !userId) {
      return new Response("Bad Request", { status: 400 });
    }

    return deleteComment(id, user.id)
      .then(() => NextResponse.json({ success: true }))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
