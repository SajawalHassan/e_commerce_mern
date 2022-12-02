interface Types {
  img: string;
  label: string;
  handleOnClick: () => void;
}

const ThirdPartyAuthBtn = ({
  img,
  label,
  handleOnClick,
}: Types): JSX.Element => {
  return (
    <button
      className="border border-gray rounded-sm flex items-center h-[23px] relative hover:bg-dgray hover:bg-opacity-30"
      onClick={handleOnClick}
    >
      <img src={img} alt={label} className="h-[16px] left-2 absolute" />
      <p className="text-center text-xs mx-auto">{label}</p>
    </button>
  );
};

export default ThirdPartyAuthBtn;
