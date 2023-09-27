import React from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import  Detail from "./views/Detail/Detail";
import  Landing  from './views/Landing/Landing'
import  Home  from './views/Home/Home';
import  Form  from './views/Form/Form';
//import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Router>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/create" element={<Form />} />
      </Router>
    </div>
  );
}

export default App;
