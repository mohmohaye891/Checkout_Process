import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../../contexts/userProvider";
import GuestAuth from "../../components/auth/GuestAuth";

const AuthLayout = () => {
  return (
    <UserProvider>
      <GuestAuth>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
        </Stack>
      </GuestAuth>
    </UserProvider>
  );
};

export default AuthLayout;
