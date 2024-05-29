import { useContext } from "react";
import { toastContext } from "./toastContext";

export const useToast = () => useContext(toastContext);
