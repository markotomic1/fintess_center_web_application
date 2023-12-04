// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
export const uploadFile = (
  file: File,
  setImgUrl: React.Dispatch<React.SetStateAction<string>>,
  setImg: React.Dispatch<React.SetStateAction<null | File>>
) => {
  const storage = getStorage(app);

  //create the file metadata
  const metadata = {
    contentType: "image/png",
  };
  // Upload file and metadata to the object 'images'
  const filename = new Date().getTime() + file.name;
  const storageRef = ref(storage, "images/" + filename);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.error(error);
          toast.error("Unauthorized!");
          break;
        case "storage/canceled":
          // User canceled the upload
          console.error(error);
          toast.error("Upload canceled!");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          console.error(error);
          toast.error("An Error Occured!");
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgUrl(downloadURL);
        setImg(null);
      });
    }
  );
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
