import comments from "@/app/data/comments";

export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (query) {
    const filteredComments = comments.filter((comment) =>
      comment.text.toLowerCase().includes(query)
    );

    return Response.json(filteredComments);
  }

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
      "Content-Type": "application/json",
    },
    status: 201,
  });
};
