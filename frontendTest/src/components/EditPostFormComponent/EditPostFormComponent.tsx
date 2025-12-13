import type { Post } from "../../interfaces/Post";
import { useState } from "react";
type Props = {
  editPost: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  initialData: Post;
};

function EditPostFormComponent({ editPost, initialData }: Props) {
  const [formData, setFormData] = useState<Post>({
    id: initialData.id,
    title: initialData.title,
    body: initialData.body,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center w-100 bg-white text-black p-4 rounded-lg shadow-md">
      <form
        onSubmit={(e) => editPost(e, initialData.id!)}
        className="flex flex-col gap-4 w-full"
      >
        <h2 className="text-xl my-3">Edit Post</h2>
        <label htmlFor="title">
          Title <br />
          <input
            name="title"
            type="text"
            className="border border-black rounded-md p-1 w-70"
            value={formData.title!}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="body">
          Body <br />
          <textarea
            name="body"
            className="border border-black rounded-md min-h-28 w-60 p-1"
            value={formData.body!}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md
          transition-all duration-300 ease-out
          hover:bg-blue-600 hover:shadow-lg hover:scale-[1.02]"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

export default EditPostFormComponent;
