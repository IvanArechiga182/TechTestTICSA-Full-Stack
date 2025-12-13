import { useUploadFile } from "../../hooks/useUploadFile";
import type { Post } from "../../interfaces/Post";

type Props = {
  createPost: (e: React.FormEvent<HTMLFormElement>) => void;
  editPost?: (e: React.FormEvent<HTMLFormElement>) => void;
  initialData?: Post;
  statusMessage: string;
};

function NewPostFormComponent({ createPost, statusMessage }: Props) {
  const { file, previewUrl, errorMessage, handleFileChange, resetUpload } =
    useUploadFile();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    createPost!(e);
    resetUpload();
    e.currentTarget.reset();
  };
  return (
    <div className="flex justify-center bg-white text-black p-4 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center"
      >
        <h2 className="text-xl my-3">Create a New Post</h2>
        {statusMessage != "" && (
          <p className="mb-2 bg-green-200 rounded p-2 text-xl">
            {statusMessage}
          </p>
        )}
        <label htmlFor="title">
          <input
            required
            className="border border-black rounded-md min-w-full p-1"
            type="text"
            name="title"
            id="tilte"
            placeholder="Post title"
          />
        </label>
        <label htmlFor="content">
          <textarea
            required
            name="content"
            id="content"
            placeholder="Post Content"
            className="min-w-full max-w-full min-h-30 max-h-60 border border-black-2 p-1 rounded-md"
          ></textarea>
        </label>
        <label htmlFor="file">
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            required
            accept=".pdf, .jpg, application/pdf, image/jpeg"
            className="border border-gray-300 rounded px-2 py-1 file:mr-4 file:rounded file:border-none file:bg-blue-600 file:text-white file:px-4 file:py-2"
          />
        </label>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Uploaded image preview"
            className="w-50 my-0 mx-auto rounded"
          />
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md
             transition-all duration-300 ease-out
             hover:bg-blue-600 hover:shadow-lg hover:scale-[1.02]"
          disabled={!file}
          type="submit"
        >
          Add new post
        </button>
      </form>
    </div>
  );
}

export default NewPostFormComponent;
