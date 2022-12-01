import { ReactNode, SyntheticEvent } from "react";
import ThirdPartyAuthBtn from "../components/auth/ThirdPartyAuthBtn";
import googleLogo from "../assets/google_logo.png";
import githubLogo from "../assets/github_logo.png";
import { Link } from "react-router-dom";
import Loader from "../components/global/Loader";

interface Types {
  heading: string;
  subHeading: string;
  className?: string;
  isLoading: boolean;
  children: ReactNode;
  handleOnClick: (e: SyntheticEvent) => void;
}

const AuthLayout = ({
  heading,
  subHeading,
  children,
  handleOnClick,
  isLoading,
  className,
}: Types): JSX.Element => {
  return (
    <div className="text-center rounded-sm shadow-[0_0_6px_2px_rgba(0,0,0,0.25)] pb-[17px] pt-[22px] flex flex-col justify-center px-6 mx-10 fixed inset-0 m-auto h-max">
      <h1 className="text-large font-bold italic">{heading}</h1>
      <p className="text-small text-gray">{subHeading}</p>
      <form onSubmit={handleOnClick}>
        <div className={className}>{children}</div>

        <button
          type="submit"
          className="w-full rounded-sm bg-blue min-h-[29px] grid place-content-center max-h-[29px] py-0.5 transition-all duration-200 hover:shadow-md hover:bg-opacity-90 active:bg-opacity-100 active:transition-none text-white font-bold text-small"
          onClick={handleOnClick}
        >
          {isLoading ? <Loader /> : heading}
        </button>
        <div className="flex items-center gap-x-1 mt-1">
          <div className="border-b mt-0.5 border-dgray w-1/2" />
          <p className="text-[6px]">OR</p>
          <div className="border-b mt-0.5 border-dgray w-1/2" />
        </div>
        <div className="flex flex-col gap-y-[8px] mt-[14px]">
          <ThirdPartyAuthBtn img={googleLogo} label="Continue with Google" />
          <ThirdPartyAuthBtn img={githubLogo} label="Continue with Github" />
        </div>
        {heading.toLowerCase() === "sign up" ? (
          <p className="auth-navigate-text">
            Already have an account?{" "}
            <Link className="auth-navigate-link" to="/auth/signin">
              Click here
            </Link>
          </p>
        ) : (
          <p className="auth-navigate-text">
            Don't have an account?{" "}
            <Link className="auth-navigate-link" to="/auth/signup">
              Click here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthLayout;
