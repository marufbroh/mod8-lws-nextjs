import comments from "@/app/data/comments";

export const GET = async () => {
  return Response.json(comments);
};

export const POST = async (request) => {
  const comment = await request.json();

  const newComment = {
    id: comment.length + 1,
    text: comment.text,
  };

  comments.push(newComment);

  return new Response(JSON.stringify(newComment), {
    headers: {
        "Content-Type": "application/json"
    },
    status: 201
  })
};
