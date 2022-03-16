import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import dynamic from "next/dynamic";
import dbConnect from "../util/mongo";

//redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice";
import { selectmenuIsOpen } from "../features/menuSlice";

//components
const Menu = dynamic(() => import("../components/Menu"));

function Signup({ users }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const isInvalid = password === "" || email === "";

  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useState(null);
  const generatedUserId = uuidv4();
  const router = useRouter();
  const dispatch = useDispatch();
  const MenuNav = useSelector(selectmenuIsOpen);
  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? "http://localhost:3000"
      : "https://zhpizzarestaurant.netlify.app/";

  console.log(url);

  const navSignIn = () => {
    router.push(`/login`);
  };

  const signUp = async () => {
    const data = {
      user_id: generatedUserId,
      email: email.toLowerCase(),
      password: password,
    };
    const existingUser = users.find((user) => user?.email === email);

    if (existingUser) {
      setEmailError("User exist");
      setErrorMessage("User exist");
    }
    if (password === "") {
      setPasswordError("Password must be included");
      setErrorMessage("Password must be included");
    }
    if (!existingUser) {
      try {
        const res = await axios.post(`${url}/api/signup`, data);
        console.log(res);
        setCookies(res.data.token);
        dispatch(
          login({
            email: res.data.email,
            token: res.data.token,
          })
        );
        router.push("/");
      } catch (err) {
        setError(true);
        console.log(err);
      }
    }
  };

  return (
    <div className="h-screen p-4">
      <Head>
        <title>Signup</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto grid place-items-center h-1/2">
        <h1 className="text-4xl">Sign Up</h1>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            arial-label="Enter your email"
            placeholder={emailError === null ? "Email" : emailError}
            className={`text-sm text-gray-500 w-full pr-3 py-5 px-4 border border-gray-primary rounded mb-2 focus-within:shadow-lg outline-none
            ${emailError !== null && "border-2 border-red-500"}`}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            arial-label="Enter your password"
            placeholder={passwordError === null ? "Password" : passwordError}
            className={`text-sm text-gray-500 w-full pr-3 py-5 px-4 border border-gray-primary rounded mb-2 focus-within:shadow-lg outline-none
        ${passwordError !== null && "border-2 border-red-500"}`}
          />
          <button
            onClick={signUp}
            disabled={isInvalid}
            type="submit"
            className={`bg-[#008080] bg-gradient-to-r from-[#06202A]  text-white w-full rounded h-10 lg:h-8 font-bold hover:shadow-xl ${
              isInvalid && "opacity-50 "
            }`}
          >
            Sign Up
          </button>
          {errorMessage && (
            <p className={`text-sm text-red-500 w-full test-center`}>
              {errorMessage}
            </p>
          )}
        </div>

        <p className="text-sm font-medium">
          Have Account ? Please{" "}
          <span onClick={navSignIn} className="hover:underline cursor-pointer">
            Sign In
          </span>
        </p>
      </main>
      {MenuNav && <Menu />}
    </div>
  );
}

export default Signup;
export const getServerSideProps = async () => {
  await dbConnect();
  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? process.env.DEV_URL
      : process.env.PRODUCTION_URL;

  const userRes = await axios.get(`${url}/api/getuser`);
  return {
    props: {
      users: userRes.data,
    },
  };
};
