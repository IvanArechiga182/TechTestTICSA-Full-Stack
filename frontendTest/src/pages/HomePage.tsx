import PostCardComponent from "../components/PostCardComponent/PostCardComponent";
import { usePostsPagination } from "../hooks/usePostsPagination";
import NewPostFormComponent from "../components/NewPostFormComponent/NewPostFormComponent";
import { useState, useRef } from "react";
import type { NewPost } from "../interfaces/NewPost";
import type { Post } from "../interfaces/Post";
import "../styles/HomePageStyles.css";
import EditPostFormComponent from "../components/EditPostFormComponent/EditPostFormComponent";
import { useUploadFile } from "../hooks/useUploadFile";

const HomePage = () => {
  const [createPostStatusMessage, setCreatePostStatusMessage] = useState<
    string | null
  >(null);
  const [generalPostStatusMessage, setGeneralPostStatusMessage] = useState<
    string | null
  >(null);
  const [localPosts, setLocalPosts] = useState<NewPost[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const pageSize = 10;
  const postId = useRef<number>(0);

  const {
    posts,
    loading,
    handleNextPage,
    handleLastPage,
    handleUpdatePosts,
    handleDeletePosts,
  } = usePostsPagination(pageSize);

  const { resetUpload } = useUploadFile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("file") as File;

    if (title && content && file) {
      const postData: NewPost = {
        id: (postId.current += 1),
        title,
        content,
        file,
      };
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          setCreatePostStatusMessage("Failed to create post.");
          setTimeout(() => setCreatePostStatusMessage(null), 3000);
        }
      } finally {
        setCreatePostStatusMessage("Post created successfully!");
        setLocalPosts((prev) => [...prev, postData]);
        resetUpload();
        form.reset();
        setTimeout(() => setCreatePostStatusMessage(null), 3000);
      }
    } else {
      console.error("Form data is incomplete.");
      setCreatePostStatusMessage("Please fill in all fields.");
    }
  };

  const handleEdit = (post: Post) => {
    setPostToEdit(post);
    setIsEditing(true);
  };

  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const id = postToEdit?.id;
    if (title && body && id) {
      const updatedData: Post = {
        id,
        title,
        body,
      };
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          setGeneralPostStatusMessage("Post was not updated.");
        }
      } finally {
        setGeneralPostStatusMessage(`Post ${id} was updated successfully`);
        setTimeout(() => setGeneralPostStatusMessage(null), 3000);
      }
      handleUpdatePosts(updatedData);
      setIsEditing(false);
      setPostToEdit(null);
    } else {
      console.log("Missing data.");
    }
  };

  const handleDeletePost = async (postToDelete: Post) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postToDelete.id}`,
      {
        method: "DELETE",
        body: JSON.stringify(postToDelete),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      console.log("Post was not successfully deleted.");
      return;
    }

    handleDeletePosts(postToDelete);
    setGeneralPostStatusMessage(
      `Post ${postToDelete.id} was deleted successfully`
    );
    setTimeout(() => {
      setGeneralPostStatusMessage(null);
    }, 3000);
  };

  const handleDeleteLocalPost = (postToDelete: NewPost) => {
    console.log(postToDelete);
    setLocalPosts((prev) => prev.filter((post) => post.id != postToDelete.id));
  };

  return (
    <div className="App">
      <main className="flex justify-center flex-col items-center text-center">
        <section
          id="getPosts"
          className="flex flex-col justify-center align-center"
        >
          <h1 className="text-sm"> 1. GET Posts</h1>
          <h2 className="text-xl my-3">Recent Posts</h2>
          {posts.length === 0 ||
            (loading && <p>There are no posts available yet!</p>)}
          {generalPostStatusMessage && (
            <h2 className="text-bold p-2 text-lg bg-green-600 w-70 border-1 border-white my-0 mx-auto mb-3 rounded border-white-100">
              {generalPostStatusMessage}
            </h2>
          )}
          <div className="mx-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            {posts.map(
              (post) =>
                post.id && (
                  <PostCardComponent
                    isLocalPost={false}
                    onEdit={() => handleEdit(post)}
                    onDelete={() => handleDeletePost(post)}
                    key={post.id}
                    post={post}
                  />
                )
            )}
          </div>
          <div className="my-5" id="controlBtns">
            <button
              onClick={handleLastPage}
              className="px-3 py-1 border rounded mx-2 bg-sky-600 hover:bg-sky-500"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              className="px-3 py-1 border rounded mx-2 bg-sky-600 hover:bg-sky-500"
            >
              Next
            </button>
          </div>
          {isEditing && postToEdit && (
            <div className="flex justify-center">
              <EditPostFormComponent
                initialData={postToEdit}
                editPost={(e) => handleUpdatePost(e)}
              ></EditPostFormComponent>
            </div>
          )}
        </section>
        <section id="PostNewPost">
          <h1 className="text-sm mt-10 m-2"> 2. POST New Post</h1>
          <NewPostFormComponent
            createPost={handleSubmit}
            statusMessage={createPostStatusMessage || ""}
          ></NewPostFormComponent>
        </section>
        <section id="localPostsCards">
          {localPosts.length === 0 ? (
            <h2 className="mb-3 text-xl mt-2 underline font-bold">
              No local Posts are available to display
            </h2>
          ) : (
            <h2 className="mb-3 text-xl mt-2 underline font-bold">
              Local Posts Created
            </h2>
          )}

          <div className="mx-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {localPosts.map(
              (localPost) =>
                localPost.id && (
                  <PostCardComponent
                    isLocalPost={true}
                    localPost={localPost}
                    onDelete={() => handleDeleteLocalPost(localPost)}
                    key={localPost.id}
                  ></PostCardComponent>
                )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
