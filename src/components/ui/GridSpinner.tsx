import dynamic from "next/dynamic";
import { LoaderSizeMarginProps } from "react-spinners/helpers/props";

const DotLoader = dynamic<LoaderSizeMarginProps>(
  () => import("react-spinners").then((lib) => lib.GridLoader),
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
