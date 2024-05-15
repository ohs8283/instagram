import CloseIcon from "./ui/icons/CloseInIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};
export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 sm:p-8 pt-4 pr-2 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className="bg-white sm:w-4/5 sm:h-3/5 w-10/12 max-w-7xl">
        {children}
      </div>
    </section>
  );
}
