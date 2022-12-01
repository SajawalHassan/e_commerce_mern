import useLocation from "../../hooks/useLocation";

const Header = (): JSX.Element => {
  const [location] = useLocation();

  return (
    <div className="py-[13px] px-[11px]">
      <p className="italic font-bold text-medium">E-commerce</p>
      <p className={`text-xs italic -mt-1.5 ${location && `underline`}`}>
        {location ? location : `Getting location...`}
      </p>
    </div>
  );
};

export default Header;
