import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../contexts/userProvider";

const RootLayout = () => {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
};

export default RootLayout;
