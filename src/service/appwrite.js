import { Client, Account, ID } from "appwrite";
import { appwriteVar } from "./config";

const client = new Client();

client
  .setEndpoint(appwriteVar.APPWRITE_ENDPOINT)
  .setProject(appwriteVar.APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const appwriteSignUp = async ({ fullName, email, password }) => {
  try {
    const promise = await account.create({
      userId: ID.unique(),
      email,
      password,
      name: fullName,
    });
    return promise;
  } catch (error) {
    console.error("SignUp Error ::", error);
    return {
      error: true,
      message: error?.message || "Something went wrong. Please try again.",
      code: error?.code || null,
    };
  }
};

export const appwriteLogIn = async ({ email, password }) => {
  try {
    const promise = await account.createEmailPasswordSession({
      email,
      password,
    });
    // console.log("Login promise", promise);
    const userData = await account.get();
    // console.log("User data", userData);
    return { session: promise, user: userData };
  } catch (error) {
    console.error("Login Error ::", error);
    return {
      error: true,
      message: error?.message || "Something went wrong. Please try again.",
      code: error?.code || null,
    };
  }
};

export const appwriteLogOut = async () => {
  try {
    const result = await account.getSession({
      sessionId: "current",
    });
    // console.log("Current session", result);
    // console.log("Current session ID", result.$id);

    await account.deleteSession({ sessionId: result.$id });
  } catch (error) {
    console.error("Logout Error ::", error);
    return {
      error: true,
      message: error?.message || "Something went wrong. Please try again.",
      code: error?.code || null,
    };
  }
};

export const appwriteVerifyEmail = async () => {
  try {
    await account.createVerification({
      url: appwriteVar.VERIFY_REDIRECT_URL,
    });
    // console.log("Verify Email Send Link");
  } catch (error) {
    console.error("Verify Email ::", error);
    return {
      error: true,
      message: error?.message || "Something went wrong. Please try again.",
      code: error?.code || null,
    };
  }
};

export const appwriteUpdateVerification = async ({ userId, secret }) => {
  try {
    const promise = await account.updateVerification({
      userId,
      secret,
    });
    // console.log("Email Verification SuccessFully...!");
    return promise;
  } catch (error) {
    console.error("Update Verification Error ::", error);
    return {
      error: true,
      message: error?.message || "Something went wrong. Please try again.",
      code: error?.code || null,
    };
  }
};

export const appwriteGetUserData = async () => {
  try {
    const promise = await account.get();
    return promise;
  } catch (error) {
    console.error("Get User Data ::", error);
    return {
      error: true,
      message: error?.message || "Something went wrong. Please try again.",
      code: error?.code || null,
    };
  }
};
