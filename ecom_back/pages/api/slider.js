import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { SliderImages } from "@/models/SliderImages";
import { storage } from "@/lib/firebase";
import { ref, deleteObject } from "firebase/storage";
import { extractImageNameFromUrl } from "@/components/UrlUtils";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await SliderImages.findOne({ _id: req.query.id }));
    } else {
      res.json(await SliderImages.find());
    }
  }

  if (method == "POST") {
    const { title, description, images } = req.body;
    const sliderDoc = await SliderImages.create({
      title,
      description,
      images,
    });

    res.json(sliderDoc);
  }

  if (method === "PUT") {
    const { title, description, images, _id } = req.body;
    await SliderImages.updateOne({ _id }, { title, description, images });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      const slider = await SliderImages.findOne({ _id: req.query?.id });

      // Delete images from Firebase Storage
      if (slider && slider.images && Array.isArray(slider.images)) {
        for (const imageUrl of slider.images) {
          try {
            const fileName = extractImageNameFromUrl(imageUrl);
            const fileRef = ref(storage, "sliderImages/" + fileName);
            await deleteObject(fileRef);
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        }
      }

      // Delete the slider entry from MongoDB
      await SliderImages.deleteOne({ _id: req.query?.id });

      res.json(true);
    }
  }
}
