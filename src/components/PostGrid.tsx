import PostGridCard from "./PostGridCard";
import GridSpinner from "./ui/GridSpinner";
import usePosts from "@/hooks/posts";

export default function PostGrid() {
  const { posts, isLoading } = usePosts();

  return (
    <div className="w-full text-center">
      <div className={`flex justify-center ${isLoading ? "pt-24" : ""}`}>
        {isLoading && <GridSpinner />}
      </div>
      <ul
        className={`grid grid-cols-3 gap-4 py-4 px-8 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
