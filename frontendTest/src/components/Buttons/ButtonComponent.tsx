import type { NewPost } from "../../interfaces/NewPost";
import type { Post } from "../../interfaces/Post";

type Props = {
  btnType: "edit" | "delete";
  onEdit?: () => void;
  onDelete?: (postId: number) => void;
  post?: Post | NewPost;
};

function ButtonComponent({ btnType, onEdit, onDelete, post }: Props) {
  if (btnType === "delete") {
    return (
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md
             transition-all duration-300 ease-out
             hover:bg-red-600 hover:shadow-lg hover:scale-[1.02]"
        onClick={() => onDelete && onDelete(post!.id!)}
      >
        Delete
      </button>
    );
  }

  return (
    <button
      className="bg-yellow-500 text-white px-4 py-2 rounded-md
             transition-all duration-300 ease-out
             hover:bg-yellow-600 hover:shadow-lg hover:scale-[1.02]"
      onClick={onEdit}
    >
      Edit
    </button>
  );
}

export default ButtonComponent;
