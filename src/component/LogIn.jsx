import { useState } from "react";
import { appwriteLogIn } from "../service/appwrite";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useOutletContext();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setLogInData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const func = async () => {
      try {
        const result = await appwriteLogIn(logInData);

        if (result?.error) {
          setErrorMsg(result.message || "Login failed. Please try again.");
        } else {
          setIsLogin(result.session);
          const isEmailVerify = result.user.emailVerification;

          setLogInData({ email: "", password: "" });

          isEmailVerify ? navigate("/") : navigate("/verifyMsg");
        }
      } catch (error) {
        console.error("Login Catch Error ::", error);
        setErrorMsg(
          error?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    func();
  };

  if (loading) {
    return <h1 className="text-3xl text-center font-bold">Loading...</h1>;
  }

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-2xl my-5 font-bold">Login</h1>
      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-8"
      >
        <input
          className="border h-10 w-80 pl-4"
          onChange={handleInput}
          value={logInData.email}
          name="email"
          type="email"
          placeholder="Enter your email..."
        />
        <input
          className="border h-10 w-80 pl-4"
          onChange={handleInput}
          value={logInData.password}
          name="password"
          type="password"
          placeholder="Enter your password..."
        />
        <button
          className="px-4 py-2 text-xl font-semi-bold rounded-xl bg-orange-300 cursor-pointer"
          type="submit"
        >
          Login
        </button>
        <p
          onClick={() => navigate("/signup")}
          className="font-semibold cursor-pointer"
        >
          No account? <span className="text-blue-800">Sign Up</span>
        </p>
      </form>
    </section>
  );
};

export default Login;
