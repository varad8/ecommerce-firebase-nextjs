import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function SlilderForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [goToSlider, setGoToSlider] = useState(false);

  const router = useRouter();

  //Upload Image Function That Can be reusable but we try to upload on anohter directory so we create new handle functio n on same file
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/sliderimageupload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  //this function for saving the data on the MongoDB
  async function saveSlider(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      images,
    };
    if (_id) {
      //update
      await axios.put("/api/slider", { ...data, _id });
    } else {
      //create
      await axios.post("/api/slider", data);
    }
    setGoToSlider(true);
  }
  if (goToSlider) {
    router.push("/slidermain");
  }
  return (
    <form onSubmit={saveSlider}>
      <label>Slider Title</label>
      <input
        type="text"
        placeholder="slider title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Slider description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 bg-white p-1 shadow-sm rounded-sm border border-gray-200"
              >
                <Image src={link} alt="Slider Image" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer  text-center text-primary border border-primary shadow-sm rounded-sm gap-1 flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Add image
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
      </div>
      <button className="btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}
