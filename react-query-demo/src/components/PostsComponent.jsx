import { useQuery } from "@tanstack/react-query";

function PostsComponent() {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts", 10], // unique identifier for this query
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    },
    staleTime: 5000,
  });
  console.log(posts);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  ["isError", "fetchPosts"];
  ["cacheTime", "refetchOnWindowFocus", "keepPreviousData"];
  return (
    <>
      <div>
        <h1>Posts</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <hr />
          </div>
        ))}
      </div>
      <button onClick={(e) => e.target.value}></button>
    </>
  );
}

export default PostsComponent;
