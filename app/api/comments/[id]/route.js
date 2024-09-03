import comments from "@/app/data/comments";
import { redirect } from "next/navigation";

const GET = async (_request, { params }) => {
  const commentId = params.id;

  if (parseInt(commentId) > comments.length) {
    redirect("/api/comments");
  }

  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );

  return Response.json(comment);
};

const PATCH = async (request, { params }) => {
  const comment = await request.json();
  const commentId = params.id;

  const commentIndex = comments.findIndex(
    (comment) => comment.id === parseInt(commentId)
  );

  comments[commentIndex].text = comment.text;

  return Response.json(comments[commentIndex]);
};

const DELETE = async (_request, { params }) => {
  const commentId = params.id;

  const commentIndex = comments.findIndex(
    (comment) => comment.id === parseInt(commentId)
  );

  const commentToDelete = comments[commentIndex];

  comments.slice(commentIndex, 1);

  return Response.json(commentToDelete);
};
