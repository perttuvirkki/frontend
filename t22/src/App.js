import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        WELCOME <br />
        <Link to="/">Home</Link> <Link to="/about">About</Link>{" "}
        <Link to="/contact">Contact</Link>{" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return <div>asd</div>;
}

function About() {
  return <div>lol</div>;
}

function Contact() {
  return <div>kek</div>;
}

export default App;
