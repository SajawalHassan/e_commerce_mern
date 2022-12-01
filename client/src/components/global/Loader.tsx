interface Types {
  className?: string;
}

const Loader = ({ className }: Types): JSX.Element => {
  return (
    <div
      style={{ borderTopColor: "gray" }}
      className={`w-4 h-4 border border-blue-300 animate-spin rounded-full ${className}`}
    />
  );
};

export default Loader;
