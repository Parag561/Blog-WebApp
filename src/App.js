import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Home from "./pages/Home/Home";
import Write from "./pages/write/Write";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Register />}
          />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
