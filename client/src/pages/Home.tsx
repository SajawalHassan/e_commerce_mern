import { AxiosError } from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/global/Header";

function Home(): JSX.Element {
  const navigate = useNavigate();

  const getUser = async (): Promise<void> => {
    try {
      await axios.get("/users/me");
    } catch (error: AxiosError | any) {
      if (error.response.status === 401) navigate("/auth/signin");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header />
      <p onClick={getUser}>get user</p>
      <Link className="p-1 bg-blue rounded-sm mx-4 mt-5" to="/auth/signin">
        sign in
      </Link>
      <Link className="p-1 bg-blue rounded-sm mx-4 mt-5" to="/auth/signup">
        sign up
      </Link>
    </div>
  );
}

export default Home;
