import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Popularproperties from "./components/popularProperties/PopularProperties";
import FeaturedProperties from "./components/featuredProperties/FeaturedProperties";
import Newsletter from "./components/newsletter/Newsletter";
import Footer from "./components/footer/Footer";
import Properties from "./components/properties/Properties";
import PropertiyDetail from "./components/propertyDetail/PropertyDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Popularproperties />
              <FeaturedProperties />
              <Newsletter />
              <Footer />
            </>
          }
        />

        <Route
          path="/properties"
          element={
            <>
              <Navbar />
              <Properties />
              <Footer />
            </>
          }
        />
        <Route
          path="/propertyDetail/:id"
          element={
            <>
              <Navbar />
              <PropertiyDetail />
              <Footer />
            </>
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
