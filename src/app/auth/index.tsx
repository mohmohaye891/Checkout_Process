import React from "react";
import { Redirect } from "expo-router";

const PaymentScreen = () => {
  return <Redirect href={"/auth/login"} />;
};

export default PaymentScreen;
