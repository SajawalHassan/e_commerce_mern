import { SyntheticEvent, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/global/Header";
import TextField from "../components/global/TextField";
import AuthLayout from "../layouts/AuthLayout";

const Signup = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const handleOnClick = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) return setError("Passwords must match!");

    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/auth/signin");
    } catch (error: any) {
      setError(error?.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AuthLayout
        isLoading={isLoading}
        heading="Sign up"
        subHeading="Sign up to buy amazing items!"
        handleOnClick={(e: SyntheticEvent) => handleOnClick(e)}
        className="mb-3"
      >
        {error && (
          <p className="py-[11px] w-full bg-red bg-opacity-20 border border-red text-small mt-4">
            {error}
          </p>
        )}
        <TextField
          type="text"
          error={error?.toLowerCase().includes("username") ? error : ""}
          setError={setError}
          label="Username"
          placeholder="John Doe"
          value={username}
          setValue={setUsername}
        />
        <TextField
          type="text"
          error={error?.toLowerCase().includes("email") ? error : ""}
          setError={setError}
          label="Email"
          placeholder="johndoe@gmail.com"
          value={email}
          setValue={setEmail}
        />
        <TextField
          type="password"
          error={
            error?.toLowerCase().includes("password" || "passwords")
              ? error
              : ""
          }
          setError={setError}
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <TextField
          type="password"
          error={error?.toLowerCase().includes("passwords") ? error : ""}
          setError={setError}
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
      </AuthLayout>
    </>
  );
};

export default Signup;
