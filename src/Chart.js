const Chart = (props) => {
    const data = props.data;
    const label = data.label;
    const confidence = parseFloat(data.confidence.toFixed(2));
    console.log(label, confidence);
    return (
      <div className="">
        <h3 className="text-center text-semibold">{label}:{confidence}</h3>  
      </div>
    );
  };
  export default Chart;
  