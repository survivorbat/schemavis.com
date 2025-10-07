import React, { useState } from 'react';
import Diagram from './diagram/Diagram';
import Sidebar from './Sidebar';
import { Schema } from './models/schema';
import Header from './Header';

function App() {
  const [schema, setSchema] = useState(null as Schema | null)

  return (
    <div className="container-fluid" >
      <div className="row">
        <div className="col-12">
          <Header></Header>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Sidebar setSchema={setSchema}></Sidebar>
        </div>
        <div className="col-md-8">
          <Diagram schema={schema}></Diagram>
        </div>
      </div>
    </div>
  );
}

export default App;
