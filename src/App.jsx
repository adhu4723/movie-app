import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import { MovieProvider } from "./context/movieContext";
import { ThemeProvider } from "./context/themeContext";


function App() {
  const [count, setCount] = useState(0);

  return (
    <MovieProvider>
      <ThemeProvider>
      <Routes>
      
        <Route element={<Movies />} path="/" />
      
      </Routes>
      </ThemeProvider>
      </MovieProvider>
    
  );
}

export default App;
