#### `src/App.jsx`
```jsx
import React from "react";
import FairValueCalculator from "./components/FairValueCalculator";
import './style.css';

export default function App() {
  return (
    <div className="App">
      <FairValueCalculator />
    </div>
  );
}
