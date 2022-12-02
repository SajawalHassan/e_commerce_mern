import { SyntheticEvent, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/global/Header";
import TextField from "../components/global/TextField";
import AuthLayout from "../layouts/AuthLayout";

const Signin = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const handleOnClick = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      return setError("Invalid email or password");
    }

    try {
      await axios.post("/auth/login", {
        email,
        password,
      });

      navigate("/");
    } catch (error: any) {
      setError("Invalid email or password");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AuthLayout
        isLoading={isLoading}
        heading="Sign in"
        subHeading="Sign in to buy amazing items!"
        handleOnClick={(e: SyntheticEvent) => handleOnClick(e)}
        className="mb-3"
      >
        <TextField
          type="text"
          error={error ? error : ""}
          setError={setError}
          label="Email"
          placeholder="johndoe@gmail.com"
          value={email}
          setValue={setEmail}
        />
        <TextField
          type="password"
          error={error ? error : ""}
          setError={setError}
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
      </AuthLayout>
    </>
  );
};

export default Signin;
