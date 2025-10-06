import React, { useState } from 'react';
import './App.css';
import Diagram from './diagram/Diagram';
import Header from './Header';

function App() {
  const [schema, setSchema] = useState(null as unknown)

  return (
    <div className="App" >
      <Header setSchema={setSchema}></Header>
      <Diagram schema={schema}></Diagram>
    </div>
  );
}

export default App;
