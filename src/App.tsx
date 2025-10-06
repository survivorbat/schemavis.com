import React, { useState } from 'react';
import Diagram from './diagram/Diagram';
import Header from './Header';
import dummySchema from "./dummy-schema.json";

function App() {
  const [schema, setSchema] = useState(dummySchema as unknown)

  return (
    <div className="container-fluid" >
      <Header setSchema={setSchema}></Header>
      <Diagram schema={schema}></Diagram>
    </div>
  );
}

export default App;
