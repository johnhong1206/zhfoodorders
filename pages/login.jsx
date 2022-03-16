import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import dbConnect from "../util/mongo";

//icons
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

//redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice";
import { selectmenuIsOpen } from "../features/menuSlice";

//components
const Menu = dynamic(() => import("../components/Menu"));

const Login = ({ users }) => {
  const MenuNav = useSelector(selectmenuIsOpen);

  const [signinAsAdmin, setSigninAsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [cookies, setCookies] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const isAdminInvalid = password === "" || username === "";
  const isInvalid = password === "" || email === "";
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? "http://localhost:3000"
      : "https://zhpizzarestaurant.netlify.app/";

  console.log(url);

  const router = useRouter();

  const navSIgnUp = () => {
    router.push(`/signup`);
  };

  const adminSignIn = async () => {
    if (signinAsAdmin) {
      try {
        const res = await axios.post(`${url}/api/login`, {
          username,
          password,
        });
        console.log(res);
        router.push("/");
      } catch (err) {
        setError(true);
      }
    }
  };

  const signIn = async () => {
    const data = {
      email: email,
      password: password,
    };
    const existingUser = users.find(
      (user) => user?.email === email?.toLowerCase()
    );

    const checkPassword = users.find((user) => user?.password === password);

    if (existingUser && checkPassword) {
      try {
        const res = await axios.post(`${url}/api/authenticate`, data);
        setCookies(res.data.token);
        dispatch(
          login({
            email: res.data.email,
            token: res.data.token,
          })
        );
        router.push(`/`);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    }
    if (!existingUser) {
      setErrorMessage("User not exist");
    }
    if (!checkPassword) {
      setErrorMessage("Wrong Password");
    }
  };

  return (
    <div className="h-screen p-4">
      <Head>
        <title>Login</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto grid place-items-center h-1/2">
        <h1 className="text-4xl">Sign In</h1>
        <div className={`mt-10`}>
          {signinAsAdmin ? (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              arial-label="Enter your username"
              placeholder={emailError === null ? "Username" : emailError}
              className={`text-sm text-gray-500 w-full pr-3 py-5 px-4 border border-gray-primary rounded mb-2 focus-within:shadow-lg outline-none
            ${emailError !== null && "border-2 border-red-500"}`}
            />
          ) : (
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              arial-label="Enter your email"
              placeholder={emailError === null ? "Email" : emailError}
              className={`text-sm text-gray-500 w-full pr-3 py-5 px-4 border border-gray-primary rounded mb-2 focus-within:shadow-lg outline-none
          ${emailError !== null && "border-2 border-red-500"}`}
            />
          )}

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            arial-label="Enter your password"
            placeholder={passwordError === null ? "Password" : passwordError}
            className={`text-sm text-gray-500 w-full pr-3 py-5 px-4 border border-gray-primary rounded mb-2 focus-within:shadow-lg outline-none
        ${passwordError !== null && "border-2 border-red-500"}`}
          />
          {signinAsAdmin ? (
            <button
              onClick={adminSignIn}
              disabled={isAdminInvalid}
              type="submit"
              className={`bg-[#008080] text-white w-full rounded h-10 lg:h-8 font-bold hover:shadow-xl ${
                isAdminInvalid && "opacity-50 "
              }`}
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={signIn}
              disabled={isInvalid}
              type="submit"
              className={`bg-[#008080] bg-gradient-to-r from-[#06202A]  text-white w-full rounded h-10 lg:h-8 font-bold hover:shadow-xl ${
                isInvalid && "opacity-50 "
              }`}
            >
              Sign in
            </button>
          )}

          {errorMessage && (
            <p className={`text-sm text-red-500 w-full text-center my-6`}>
              {errorMessage}
            </p>
          )}
        </div>
        <p className="text-sm font-medium">
          Dont Have Account ? Please{" "}
          <span onClick={navSIgnUp} className="hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
        <div className="flex items-center space-x-2">
          <p className="text-sm">sign in as admin</p>
          {!signinAsAdmin ? (
            <MdCheckBoxOutlineBlank
              onClick={() => setSigninAsAdmin(true)}
              className="w-4 h-4"
            />
          ) : (
            <MdOutlineCheckBox
              onClick={() => setSigninAsAdmin(false)}
              className="w-4 h-4 text-green-500"
            />
          )}
        </div>
        {signinAsAdmin && (
          <p className="mt-4 text-sm">
            If want to view demo admin page, please contact owner{" "}
          </p>
        )}
      </main>
      {MenuNav && <Menu />}
    </div>
  );
};

export default Login;
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
