import dynamic from "next/dynamic";

const DotLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.DotLoader),
  {
    ssr: false,
  }
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = "red" }: Props) {
  return <DotLoader color={color} />;
}
