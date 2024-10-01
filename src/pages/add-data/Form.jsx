import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Navbar from "../../components/Navbar/Navbar";

const initialState = {
  province: "",
  title: "",
  details: "",
  map: "",
  img_main: "",
  img_1: "",
  img_2: "",
  img_3: "",
  img_4: "",
  img_5: "",
  img_6: "",
  img_7: "",
  img_8: "",
  img_9: "",
};

export default function Form() {
  const [data, setData] = useState(initialState);
  const { province, title, details, map } = data;
  const [filemain, setFileMain] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const [file7, setFile7] = useState(null);
  const [file8, setFile8] = useState(null);
  const [file9, setFile9] = useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // id จากการ Edit
  const { id } = useParams();

  useEffect(() => {
    id && getSingleData();
  }, [id]);

  const getSingleData = async () => {
    const docRef = doc(db, "travel", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  const uploadFile = (file, setProgress, setUrl) => {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, file.name);
    // const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload in Pause");
            break;
          case "running":
            console.log("Upload is Running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFileMain = (e) => {
    setFileMain(e.target.files[0]);
  };
  const handleFile1 = (e) => {
    setFile1(e.target.files[0]);
  };
  const handleFile2 = (e) => {
    setFile2(e.target.files[0]);
  };
  const handleFile3 = (e) => {
    setFile3(e.target.files[0]);
  };
  const handleFile4 = (e) => {
    setFile4(e.target.files[0]);
  };
  const handleFile5 = (e) => {
    setFile5(e.target.files[0]);
  };
  const handleFile6 = (e) => {
    setFile6(e.target.files[0]);
  };
  const handleFile7 = (e) => {
    setFile7(e.target.files[0]);
  };
  const handleFile8 = (e) => {
    setFile8(e.target.files[0]);
  };
  const handleFile9 = (e) => {
    setFile9(e.target.files[0]);
  };

  useEffect(() => {
    filemain &&
      uploadFile(filemain, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_main: url }))
      );
  }, [filemain]);
  useEffect(() => {
    file1 &&
      uploadFile(file1, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_1: url }))
      );
  }, [file1]);
  useEffect(() => {
    file2 &&
      uploadFile(file2, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_2: url }))
      );
  }, [file2]);
  useEffect(() => {
    file3 &&
      uploadFile(file3, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_3: url }))
      );
  }, [file3]);
  useEffect(() => {
    file4 &&
      uploadFile(file4, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_4: url }))
      );
  }, [file4]);
  useEffect(() => {
    file5 &&
      uploadFile(file5, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_5: url }))
      );
  }, [file5]);
  useEffect(() => {
    file6 &&
      uploadFile(file6, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_6: url }))
      );
  }, [file6]);
  useEffect(() => {
    file7 &&
      uploadFile(file7, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_7: url }))
      );
  }, [file7]);
  useEffect(() => {
    file8 &&
      uploadFile(file8, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_8: url }))
      );
  }, [file8]);
  useEffect(() => {
    file9 &&
      uploadFile(file9, setProgress, (url) =>
        setData((prev) => ({ ...prev, img_9: url }))
      );
  }, [file9]);

  const validata = () => {
    let errors = {};
    if (!province) {
      errors.province = "Province is Required";
    }
    if (!title) {
      errors.title = "Title is Required";
    }
    if (!details) {
      errors.details = "Details is Required";
    }
    if (!map) {
      errors.map = "Map is Required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validata();
    if (Object.keys(errors).length) {
      return setErrors(errors);
    } else {
      setErrors({});
      setIsSubmit(true);
      if (!id) {
        try {
          await addDoc(collection(db, "travel"), {
            ...data,
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("ยังไม่มีส่วน id");
        try {
          await updateDoc(doc(db, "travel", id), {
            ...data,
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          console.log(error);
        }
      }
      navigate("/");
    }
  };

  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-4">เพิ่มข้อมูล</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Province
                </label>
                <input
                  type="text"
                  name="province"
                  value={province}
                  placeholder={
                    errors.province ? errors.province : "province..."
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  placeholder={errors.title ? errors.title : "title..."}
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Details
              </label>
              <input
                type="text"
                name="details"
                value={details}
                placeholder={errors.details ? errors.details : "details..."}
                className="mt-1 p-2 w-full border rounded-md"
                onChange={handleChange}
              />
              <label className="block text-sm font-medium text-gray-700">
                Google Map
              </label>
              <input
                type="text"
                name="map"
                value={map}
                placeholder={errors.map ? errors.map : "map..."}
                className="mt-1 p-2 w-full border rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img Main
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFileMain}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 1
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 2
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 3
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 4
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 5
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 6
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 7
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile7}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 8
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Img 9
                </label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded-md"
                  onChange={handleFile9}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={progress !== null && progress < 100}
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                AddData
              </button>
            </div>
            <div className="mt-6">
              <button
                onClick={handleClose}
                className="w-full p-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
