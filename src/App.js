import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Tickets from "./components/Tickets";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:eventAddress/:category" element={<Tickets />}/>
      </Routes>
    </div>
  );
}

export default App;
