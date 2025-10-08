import React, { JSX, useState } from 'react';
import Diagram from './diagram/Diagram';
import Sidebar from './Sidebar';
import { parseSchema } from './models/parse';
import Header from './Header';
import dummySchema from "./dummy-schema.json";

const parsedDummy = parseSchema(dummySchema, 0, "")

function App(): JSX.Element {
  const [schema, setSchema] = useState(parsedDummy);

  return (
    <div className="container-fluid" >
      <div className="row">
        <div className="col-12">
          <Header></Header>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Sidebar setSchema={setSchema}></Sidebar>
        </div>
        <div className="col-md-9">
          <Diagram schema={schema}></Diagram>
        </div>
      </div>
    </div>
  );
}

export default App;
