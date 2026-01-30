import React from "react";
import { Stack } from "expo-router";
import { SummaryProvider } from "../../contexts/summaryProvider";
import { UserProvider } from "../../contexts/userProvider";

const PaymentLayout = () => {
  return (
    <UserProvider>
      <SummaryProvider>
        {/* <StepIndicator /> */}
        <Stack>
          <Stack.Screen name="personal" options={{ title: "Personal Info" }} />
          <Stack.Screen name="payout" options={{ title: "Payment Info" }} />
          <Stack.Screen name="summary" options={{ title: "Summary" }} />
          <Stack.Screen name="success" options={{ title: "Success" }} />
        </Stack>
      </SummaryProvider>
    </UserProvider>
  );
};

export default PaymentLayout;
