import Props from "./props";

const TimePicker: React.FC<Props> = ({ date }) => {
  return (
    <input style={{
      width: "100%",
      height: "40px",
      padding: "5px",
      border: "1px solid rgba(0, 0, 0, 0.5)",
      borderRadius: "5px",
      fontSize: "1.1rem"
    }} 
    type="datetime-local"
    value={date}
    readOnly={true} />
  )
}

export default TimePicker