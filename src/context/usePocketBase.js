import { useContext } from "react";
import { PbContext } from "./Pocketbase";

export const usePocketBase = () => useContext(PbContext);