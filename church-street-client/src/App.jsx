import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BentoGridDemo from "../src/components/body/Bento-grip";
import Body from "../src/components/body/Body";
import Gallery from "../src/components/gallery/gallery";
import NavBar from "../src/components/navbar/Navbar";
import CardHoverEffectDemo from "../src/components/body/card-hover-effect-demo";
import About from "../src/components/body/About";
import Contact from "../src/components/body/Contact";
import Footer from "../src/components/footer/Footer";

import SingInForm from "../src/pages/SingInForm"; // corregido el nombre
import Dashboard from "../src/pages/dashBoar/Dashboard";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing page pública */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Body />
                <Gallery />
                <BentoGridDemo />
                <CardHoverEffectDemo />
                <About />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Página de login */}
          <Route path="/signin" element={<SingInForm />} />

          {/* Ruta protegida - Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AppProvider>
                  <Dashboard />
                </AppProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
