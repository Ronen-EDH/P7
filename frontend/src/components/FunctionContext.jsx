import { useContext } from "react";
import { TokenContext } from "../App";

export function FunctionContext() {
  const token = useContext(TokenContext);
}
