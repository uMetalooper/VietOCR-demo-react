import "./ImagePicker.css";

const ImagePicker = ({ onChange }) => {
  return (
    <div className="ImagePicker">
      <input id="inputImage" type="file" onChange={onChange} />
      <label htmlFor="inputImage" className="btn btn-primary">
        Tải ảnh lên
      </label>
    </div>
  );
};

export default ImagePicker;
