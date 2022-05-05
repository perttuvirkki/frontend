import React from "react";
import Header from "./Header";
import ThemeContext from "./ThemeContext";

export const buttonThemes = {
  blue: {
    color: "white",
    backgroundColor: "blue",
  },
  black: {
    color: "white",
    backgroundColor: "black",
  },
};

function App() {
  return (
    <ThemeContext.Provider value={buttonThemes.black}>
      <Header />
    </ThemeContext.Provider>
  );
}

export default App;
