import React from "react";
import { Redirect } from "expo-router";

const PaymentScreen = () => {
  return <Redirect href={"/payment/personal"} />;
};

export default PaymentScreen;
