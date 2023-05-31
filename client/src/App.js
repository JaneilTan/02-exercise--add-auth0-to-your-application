import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/Header";
import AddProperty from "./components/AddProperty";
import Properties from "./components/Properties";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/add" element={<AddProperty />} />
          <Route path="/" element={<Properties />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
