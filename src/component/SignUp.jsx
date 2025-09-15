import { useState } from "react";
import { appwriteSignUp } from "../service/appwrite";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInput = (e) =>
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(userData);
    const func = async () => {
      try {
        const result = await appwriteSignUp(userData);

        if (result?.error) {
          setErrorMsg(result.message);
        } else {
          setUserData({ fullName: "", email: "", password: "" });
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        setErrorMsg(
          error.message || "Authentication failed. Please Signup again."
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
      <h1 className="text-2xl my-5 font-bold">Create a new account</h1>
      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-8"
      >
        <input
          className="border h-10 w-80 pl-4"
          onChange={handleInput}
          value={userData.fullName}
          name="fullName"
          type="text"
          placeholder="Enter your full name..."
        />
        <input
          className="border h-10 w-80 pl-4"
          onChange={handleInput}
          value={userData.email}
          name="email"
          type="email"
          placeholder="Enter your email..."
        />
        <input
          className="border h-10 w-80 pl-4"
          onChange={handleInput}
          value={userData.password}
          name="password"
          type="password"
          placeholder="Enter your password..."
        />
        <button
          className="px-4 py-2 text-xl font-semibold rounded-xl cursor-pointer bg-orange-300"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
