import "./ImagePreviewer.css";
import image from "images/0000_samples.png";

const ImagePreviewer = ({ data }) => {
  return (
    <div className="ImagePreviewer">
      {data !== "" ? <img src={data} /> : <img src={image} />}
    </div>
  );
};

export default ImagePreviewer;
