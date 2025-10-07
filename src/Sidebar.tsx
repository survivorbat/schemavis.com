import { useState } from "react";
import { parseSchema, Schema } from "./models/schema";

interface HeaderProps {
  setSchema: (schema: Schema) => void;
}

function Sidebar({ setSchema }: HeaderProps) {
  const [errorMessage, setErrorMessage] = useState("")

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setErrorMessage("")
      const data = JSON.parse(event.target.value);
      const parsed = parseSchema(data, '');
      setSchema(parsed)
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }

  return <aside>
    <span className="text-error">{errorMessage}</span>
    <textarea
      className="form-control"
      placeholder="Insert AVRO schema here"
      style={{ "width": "100%", "height": "50vh" }}
      onChange={onChange}
    >
    </textarea>
  </aside>
}

export default Sidebar;
