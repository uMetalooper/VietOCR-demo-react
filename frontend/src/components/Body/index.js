import { useState } from "react";

import "./Body.css";
import ImagePicker from "components/ImagePicker";
import ImagePreviewer from "components/ImagePreviewer";
import OutputTextViewer from "components/OutputTextViewer";

const Body = () => {
  const [imagePreviewData, setImagePreviewData] = useState("");
  const [outputText, setOutputText] = useState("");
  const onPredict = async (postData) => {
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
  const onPickImage = (e) => {
    // clear previous result
    setOutputText("");

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreviewData(e.target.result);
      const postData = {
        data: e.target.result.split(",")[1],
      };
      onPredict(postData);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="Body">
      <ImagePicker onChange={onPickImage} />
      <ImagePreviewer data={imagePreviewData} />
      {outputText && <OutputTextViewer text={outputText} />}
    </div>
  );
};

export default Body;
