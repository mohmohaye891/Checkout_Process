import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Register, RegisterSchema } from "../../types/auth/register-schema";
import CustomInput from "../../components/custom-input";
import { useUser } from "../../hooks/useUser";
import CustomAlert from "../../components/custom-alert";
import CustomButton from "../../components/custom-button";

const RegisterScreen = () => {
  const { registerInfo, setRegisterInfo, register, logout } = useUser();
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    type: "info" as "success" | "danger" | "info",
  });
  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
  });

  const onNext: SubmitHandler<Register> = async (data) => {
    setRegisterInfo(data);
    console.log("Register DATA : ", data);
    try {
      await register(data.email, data.password);
      setAlertConfig({
        visible: true,
        title: "Success",
        message: "Registration successfully!",
        type: "success",
      });
    } catch (error: any) {
      console.log(error.message);
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
          Create Account
        </Text>
        <CustomInput label="Email" name="email" />
        <CustomInput label="Password" name="password" />
        <CustomButton title="Sign Up" onPress={form.handleSubmit(onNext)} />
        <TouchableOpacity onPress={() => router.push("auth/register")}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 32,
              marginBottom: 24,
              alignSelf: "center",
            }}
          >
            Don't have an account?{" "}
            <Text style={{ color: "blue", fontWeight: "bold" }}>Sign in</Text>
          </Text>
        </TouchableOpacity>

        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          onClose={() => {
            logout;
            setAlertConfig({ ...alertConfig, visible: false });
            if (alertConfig.type === "success") router.push("auth/login");
          }}
        />
      </FormProvider>
    </View>
  );
};

export default RegisterScreen;

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
