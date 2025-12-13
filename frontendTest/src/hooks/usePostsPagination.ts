import { useState, useEffect } from "react";
import type { Post } from "../interfaces/Post";
import type { NewPost } from "../interfaces/NewPost";

export function usePostsPagination(pageSize: number = 18) {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pageSize);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setAllPosts(data);
        setPosts(data.slice(start, end));
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [start, end]);

  const handleNextPage = () => {
    if (end >= allPosts.length) return;
    setStart(start + pageSize);
    setEnd(end + pageSize);
    setPosts(allPosts.slice(start + pageSize, end + pageSize));
  };

  const handleLastPage = () => {
    if (start === 0) return;
    setStart(start - pageSize);
    setEnd(end - pageSize);
    setPosts(allPosts.slice(start - pageSize, end - pageSize));
  };

  const handleUpdatePosts = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((post) => (post.id == updatedPost.id ? updatedPost : post))
    );
  };

  const handleDeletePosts = (postToDelete: Post | NewPost) => {
    setPosts((prev) => prev.filter((post) => post.id != postToDelete.id));
  };

  return {
    posts,
    loading,
    handleNextPage,
    handleLastPage,
    handleUpdatePosts,
    handleDeletePosts,
  };
}
