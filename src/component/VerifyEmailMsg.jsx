import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  appwriteGetUserData,
  appwriteUpdateVerification,
  appwriteVerifyEmail,
} from "../service/appwrite";

const VerifyEmailMsg = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [wantVerify, setWantVerify] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      await appwriteVerifyEmail();
      const confirmResult = window.confirm(
        "Kindly verify your email within 5 minutes. For your security, the link will expire automatically after that."
      );
      if (confirmResult) setWantVerify("Please check your email...");
    } catch (error) {
      console.error("Email verification request failed:", error);
      setErrorMsg(error?.message || "Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");
  const secret = params.get("secret");

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        if (userId && secret) {
          const userData = await appwriteGetUserData();
          console.log(userData);
          const email = userData?.email;
          const password = userData?.password;
          console.log(email);
          const verifyResult = await appwriteUpdateVerification({
            userId,
            secret,
            email,
            password,
          });

          if (verifyResult?.userId) {
            navigate("/");
          } else {
            setErrorMsg("Verification failed. Invalid or expired link.");
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        setErrorMsg(
          error?.message || "Something went wrong during verification."
        );
      } finally {
        setLoading(false);
      }
    };
    func();
  }, [userId, secret]);

  if (loading) {
    return <h1 className="text-3xl text-center font-bold">Loading...</h1>;
  }

  return (
    <div className="h-screen relative flex items-center justify-center bg-amber-100 text-2xl">
      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      {wantVerify ? (
        <p>{wantVerify}</p>
      ) : (
        <p>
          <span onClick={handleClick} className="text-blue-800 cursor-pointer">
            Verify Your Email
          </span>{" "}
          or{" "}
          <span
            onClick={() => setShowModal(true)}
            className="text-blue-800 cursor-pointer"
          >
            Go to Shopping
          </span>
        </p>
      )}
      <div
        className={`absolute top-[30%] max-w-[600px] text-center p-4 w-full bg-amber-200 transition-all duration-800 ease-in-out
    ${
      showModal
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-0 pointer-events-none"
    }`}
      >
        <p>Are you Sure ?</p>
        <p className="mt-4 mb-6">
          If you verify your email, you'll receive a special discount on our
          products!
        </p>
        <div className="flex items-center justify-evenly mb-2">
          <button
            onClick={() => setShowModal(false)}
            className="bg-orange-400 px-4 py-2 rounded-xl cursor-pointer"
          >
            Back
          </button>
          <Link
            to={"/"}
            className="bg-orange-400 px-4 py-2 rounded-xl cursor-pointer"
          >
            Go to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailMsg;
