#### `src/App.jsx`
```jsx
import './style.css';
import React from "react";
import FairValueCalculator from "./components/FairValueCalculator";

export default function App() {
  return (
    <div className="App">
      <FairValueCalculator />
    </div>
  );
}
