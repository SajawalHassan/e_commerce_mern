import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

interface Types {
  label: string;
  placeholder: string;
  value: string;
  error: string;
  setValue: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  type: string;
}

const TextField = ({
  label,
  placeholder,
  value,
  setValue,
  setError,
  error,
  type,
}: Types): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError("");
  };

  return (
    <div
      className={`flex flex-col space-y-0.5 mt-[16px] ${
        error ? `text-red` : `text-black`
      }`}
    >
      <p className="text-xs text-left">{label}</p>
      <input
        type={type.toLowerCase()}
        placeholder={placeholder}
        className={`text-xs w-full outline-none border-b ${
          error
            ? `placeholder:text-red border-red`
            : `placeholder:text-gray border-gray`
        }`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
