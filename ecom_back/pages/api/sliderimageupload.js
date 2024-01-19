import multiparty from "multiparty";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import mime from "mime-types";
import { storage } from "@/lib/firebase";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const links = [];

  for (const file of files.file) {
    const filenameWithoutExtension = file.originalFilename
      .split(".")
      .slice(0, -1)
      .join(".");
    const ext = file.originalFilename.split(".").pop();
    const newFilename = filenameWithoutExtension + "_" + Date.now() + "." + ext;

    const fileType = mime.lookup(file.path);
    console.log("file", file);
    console.log("mimetype", fileType);

    const storageRef = ref(storage, "sliderImages/" + newFilename);
    const fileBuffer = require("fs").readFileSync(file.path); // Assuming you have 'fs' imported

    const uploadTask = uploadBytesResumable(storageRef, fileBuffer);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(storageRef);
      links.push(downloadURL);
      console.log("File uploaded to Firebase Storage:", downloadURL);
    } catch (error) {
      console.error("Error uploading file to Firebase Storage:", error);
    }
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
