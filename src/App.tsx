import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CardComponent } from "./components/cardComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>花札点数計算</h1>
      <div>
        <CardComponent />
      </div>
    </>
  );
}

export default App;
