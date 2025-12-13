import type { NewPost } from "../../interfaces/NewPost";
import type { Post } from "../../interfaces/Post";
import ButtonComponent from "../Buttons/ButtonComponent";

type Props = {
  post?: Post;
  localPost?: NewPost;
  isLocalPost: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

function PostCardComponent({
  post,
  isLocalPost,
  localPost,
  onEdit,
  onDelete,
}: Props) {
  if (isLocalPost && localPost) {
    return (
      <div className="border-2 mb-2 border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white text-black ">
        <p>
          <strong>Id:</strong> {localPost.id}
        </p>
        <p>
          <strong>Title:</strong> {localPost.title}
        </p>
        <p>
          <strong>Content: </strong>
          {localPost.content!.slice(0, 50)}
        </p>
        <p>
          <strong>FileName: </strong>
          {localPost.file!.name}
        </p>
        <div id="controls" className="flex justify-center gap-3 mt-2">
          <ButtonComponent btnType={"edit"}></ButtonComponent>
          <ButtonComponent
            btnType={"delete"}
            post={localPost!}
            onDelete={onDelete}
          ></ButtonComponent>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white text-black ">
      <p>
        <strong>Id: </strong>
        {post?.id}
      </p>
      <p>
        <strong>Title:</strong> {post?.title}
      </p>
      <p>
        <strong>Body:</strong> {post?.body!.slice(0, 50)}
      </p>
      <div
        id="controls"
        onClick={onEdit}
        className="flex gap-3 justify-center mt-2"
      >
        <ButtonComponent btnType={"edit"} onEdit={onEdit}></ButtonComponent>
        <ButtonComponent
          btnType={"delete"}
          onDelete={onDelete}
          post={post}
        ></ButtonComponent>
      </div>
    </div>
  );
}

export default PostCardComponent;
