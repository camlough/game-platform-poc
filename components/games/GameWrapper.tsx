import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const GameWrapper = ({ children }: Props) => {
  return { children };
};

export default GameWrapper;
