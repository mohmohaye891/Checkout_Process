import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomInput from "../../components/custom-input";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Login, LoginSchema } from "../../types/auth/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useUser } from "../../hooks/useUser";
import CustomButton from "../../components/custom-button";

const LoginScreen = () => {
  const { setLoginInfo, login } = useUser();
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: undefined,
  });

  const onNext: SubmitHandler<Login> = async (data) => {
    setLoginInfo(data);
    console.log("Login Data", data);
    try {
      await login(data.email, data.password);
      router.push("payment");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            alignSelf: "center",
            paddingBottom: 30,
          }}
        >
          Login
        </Text>

        <CustomInput label="Email" name="email" />
        <CustomInput label="Password" name="password" />
        <CustomButton title="Login" onPress={form.handleSubmit(onNext)} />
        <TouchableOpacity
          onPress={() => router.push("auth/register")}
          style={{ alignSelf: "center", marginTop: 32 }}
        >
          <Text style={{ fontSize: 16, marginTop: 24, marginBottom: 24 }}>
            Don't have an account?{" "}
            <Text style={{ color: "blue", fontWeight: "bold" }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </FormProvider>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,
    gap: 5,
  },
  button: {
    width: "40%",
    alignSelf: "flex-end",
    marginTop: 30,
  },
});
