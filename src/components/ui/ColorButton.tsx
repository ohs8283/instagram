type Props = {
  text: string;
  onClick: () => void;
  size?: "small" | "large";
};

export default function ColorButton({ text, onClick, size = "small" }: Props) {
  return (
    <div
      className={` rounded-md bg-gradient-to-bl from-blue-600 via-blue-500 to-teal-300
    ${size === "large" ? "p-[0.3rem]" : "p-[0.15rem]"}`}
    >
      <button
        className={`bg-white rounded-sm text-base hover:opacity-90 transition-opacity
        ${size === "large" ? "p-4 text-2xl" : "p-[0.3rem] text-base"}
        `}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
