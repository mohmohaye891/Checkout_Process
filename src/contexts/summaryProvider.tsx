import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Personal } from "../types/personal-schema";
import { Payout } from "../types/payout-schema";
import { database, client } from "../lib/appwrite";
import { ID, Permission, Role, Query } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "6979b8a70022e79717b7";
const TABLE_ID = "checkoutprocess";

type SummaryContext = {
  personalInfo: Personal | undefined;
  setPersonalInfo: (data: Personal) => void;
  payoutInfo: Payout | undefined;
  setPayoutInfo: (data: Payout) => void;
  saveSummary: (data: any) => Promise<void>;
  fetchPayment: () => Promise<any>;
};

export const SummaryContext = createContext<SummaryContext>({
  personalInfo: undefined,
  setPersonalInfo: () => {},
  payoutInfo: undefined,
  setPayoutInfo: () => {},
  saveSummary: async () => {},
  fetchPayment: async () => {},
});

export const SummaryProvider = ({ children }: PropsWithChildren) => {
  const [personalInfo, setPersonalInfo] = useState<Personal>();
  const [payoutInfo, setPayoutInfo] = useState<Payout>();
  const { user } = useUser();

  //save Payment
  async function saveSummary(data: any) {
    if (!user) return;
    try {
      console.log("Create SAVE PAYMENT");
      const response = await database.createRow(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
      console.log("Data saved successfully:", response);
    } catch (error: any) {
      console.error("Failed to save data:", error.message);
    }
  }

  // fetch Payment Data
  async function fetchPayment() {
    if (!user) return;
    try {
      const response = await database.listRows(DATABASE_ID, TABLE_ID, [
        Query.equal("userId", user.$id),
      ]);
      console.log("FetchPayment ::: ", response);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <SummaryContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        payoutInfo,
        setPayoutInfo,
        saveSummary,
        fetchPayment,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};

// custom hook
export const useSummary = () => useContext(SummaryContext);
