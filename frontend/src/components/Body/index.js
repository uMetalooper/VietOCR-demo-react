import { useState } from "react";

import "./Body.css";
import ImagePicker from "components/ImagePicker";
import ImagePreviewer from "components/ImagePreviewer";

const Body = () => {
  const [imagePreviewData, setImagePreviewData] = useState("");
  const [outputText, setOutputText] = useState("");
  const onPickImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      setImagePreviewData(e.target.result);
      const postData = {
        data: e.target.result.split(",")[1],
      };
      const res = await fetch("http://localhost:8000/api/v1/vietocr_predict", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const output = await res.json();
      setOutputText(output["output"]);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="Body">
      <ImagePicker onChange={onPickImage} />
      <ImagePreviewer data={imagePreviewData} />
    </div>
  );
};

export default Body;
