import { useContext } from "react";
import { UserContext } from "../contexts/userProvider";

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("must be inside the UserProvider");
  }
  return context;
}
