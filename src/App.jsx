import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './Global.css'
import Top from "./components/Top";
import Resources from './components/Resources';
import About from './components/About';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/resources/" element={<Resources />} />
          <Route path="/about/" element={<About />} />
          <Route path='resources/forvo/' component={() => {
            window.location.href = '/https://forvo.com/';
              return null;}}/>
        </Routes>
      </Router>
    </>
  );
}

export default App