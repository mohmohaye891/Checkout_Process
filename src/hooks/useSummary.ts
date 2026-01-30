import { useContext } from "react";
import { SummaryContext } from "../contexts/summaryProvider";

export function useSummary() {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error("must be inside the SummaryProvider");
  }
  return context;
}
