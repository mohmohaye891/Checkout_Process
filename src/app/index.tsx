import React from "react";
import { Redirect } from "expo-router";

const IndexPage = () => {
  return <Redirect href={"/auth"} />;
};

export default IndexPage;
