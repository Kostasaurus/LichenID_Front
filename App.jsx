import GlossaryPage from "./pages/GlossaryPage.jsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CollectionPage from "./pages/CollectionPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import IdentifyPage from "./pages/IdentifyPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import {UserProvider} from "./contexts/UserProvider.jsx";
import SpeciesPage from "./pages/SpeciesPage.jsx";
import LiteraturePage from "./pages/LiteraturePage.jsx";

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/identify" element={<IdentifyPage />} />
          <Route path="/species" element={<SpeciesPage />} />
          <Route path="/literature" element={<LiteraturePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      
   </UserProvider>
   
  );
}

export default App;
