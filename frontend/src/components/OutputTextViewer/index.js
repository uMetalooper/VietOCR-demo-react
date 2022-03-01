import "./OutputTextViewer.css";

const OutputTextViewer = ({ text }) => {
  return (
    <div className="OutputTextViewer">
      <h3>Kết quả:</h3>
      <h4>{text}</h4>
    </div>
  );
};

export default OutputTextViewer;
