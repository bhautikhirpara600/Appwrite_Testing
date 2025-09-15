import { useEffect } from "react";
import { Link } from "react-router-dom";
import { appwriteGetUserData, appwriteLogOut } from "../service/appwrite";

const Header = ({ isLogin, setIsLogin, setLoading }) => {
  const handleLogout = () => {
    setLoading(true);
    const func = async () => {
      await appwriteLogOut();
      setLoading(false);
      setIsLogin(false);
    };
    func();
  };

  useEffect(() => {
    const func = async () => {
      const userData = await appwriteGetUserData();
      setLoading(false);
      userData?.status && setIsLogin(true);
    };
    func();
  }, []);
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-orange-300">
      <div className="text-3xl font-bold">Bhautik</div>
      <ul className="flex space-x-5 text-2xl font-bold">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {isLogin ? (
          <li onClick={handleLogout}>
            <Link>Logout</Link>
          </li>
        ) : (
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
