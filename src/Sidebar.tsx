import { useState } from "react";
import { parseSchema } from "./models/parse";
import { Schema } from "./models/Schema";
import Editor from "@monaco-editor/react"
import dummySchema from "./dummy-schema.json";

const defaultJSON = JSON.stringify(dummySchema, null, 4);

interface HeaderProps {
  setSchema: (schema: Schema) => void;
}

function Sidebar({ setSchema }: HeaderProps) {
  const [errorMessage, setErrorMessage] = useState("")

  const onChange = (value: string | undefined) => {
    try {
      setErrorMessage("")
      const data = JSON.parse(value!);
      const parsed = parseSchema(data, 0, '');
      setSchema(parsed)
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }

  return <aside>
    <Editor
      height="60vh"
      width="100%"
      defaultLanguage="json"
      value={defaultJSON}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        lineNumbers: 'on',
        automaticLayout: true,
      }}
    />
    <span className="text-danger">{errorMessage}</span>
  </aside >
}

export default Sidebar;
