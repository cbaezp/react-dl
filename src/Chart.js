const Chart = (props) => {
  const data = props.data;
  const label = data.label;
  const confidence = parseFloat(data.confidence.toFixed(2) * 100).toFixed(2);

  return (
    <div className="pt-2 pb-2">
      <h3 className="text-center text-semibold text-2xl text-gray-200">
        {label} - CONFIDENCE: {confidence}%{" "}
      </h3>
    </div>
  );
};
export default Chart;
