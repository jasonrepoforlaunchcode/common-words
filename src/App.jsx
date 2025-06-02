import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Global.css'
import Home from "./components/Home";
import Resources from './components/Resources';
import About from './components/About';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources/" element={<Resources />} />
          <Route path="/about/" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App