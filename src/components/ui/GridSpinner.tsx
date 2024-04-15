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

export default function GridSpinner({ color = "#46c2e3" }: Props) {
  return <DotLoader color={color} />;
}
