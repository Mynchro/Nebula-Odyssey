import "./css/App.css";
import PlayerProvider from "./context/PlayerContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Overview from "./pages/Overview/Overview";
import Spacemap from "./pages/Spacemap/Spacemap";
import Buildings from "./pages/Buildings/Buildings";
import Research from "./pages/Research/Research";
import Shipyard from "./pages/Shipyard/Shipyard";
import Defense from "./pages/Defense/Defense";
import Hangar from "./pages/Hangar/Hangar";
import Armada from "./pages/Armada/Armada";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import SettingsForm from "./pages/Settings/Settings";
import ComingSoon from "./pages/ComingSoon/ComingSoon";

function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={<SharedLayout />}>
            <Route path="comingsoon" element={<ComingSoon />} />
            <Route path="overview" element={<Overview />} />
            <Route path="spacemap" element={<Spacemap />} />
            <Route path="buildings" element={<Buildings />} />
            <Route path="research" element={<Research />} />
            <Route path="shipyard" element={<Shipyard />} />
            <Route path="defense" element={<Defense />} />
            <Route path="hangar" element={<Hangar />} />
            <Route path="armada" element={<Armada />} />
            <Route path="settings" element={<SettingsForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default App;
