import { Outlet } from "react-router";
import { Header } from "./component";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} setLoading={setLoading} />
      <Outlet context={{ setIsLogin, loading, setLoading }} />
    </>
  );
}

export default App;
