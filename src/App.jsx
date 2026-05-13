import "./App.css";
import { useState } from "react";
import SignInPage from "./pages/signIn";
import SignUpPage from "./pages/signUp";

function App() {
  const [currentPage, setCurrentPage] = useState("signIn");

  return (
    <>
      {currentPage === "signIn" && (
        <SignInPage onNavigate={setCurrentPage} />
      )}
      {currentPage === "signUp" && (
        <SignUpPage onNavigate={setCurrentPage} />
      )}
    </>
  );
}

export default App;