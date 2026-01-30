import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Personal, PersonalSchema } from "../../types/personal-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomerPicker from "../../components/custom-picker";
import CustomDateTimePicker from "../../components/custom-datetime-picker";
import { useSummary } from "../../hooks/useSummary";

const PersonalScreen = () => {
  const { setPersonalInfo, personalInfo } = useSummary();
  const form = useForm<Personal>({
    resolver: zodResolver(PersonalSchema),
    defaultValues: personalInfo,
  });
  const onNext: SubmitHandler<Personal> = (data) => {
    setPersonalInfo(data);
    router.push("payment/payout");
  };
  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <CustomInput
          label="Full Name"
          name="fullname"
          hintText="Enter Full Name"
          isRequire={true}
        />
        <CustomInput
          label="Email"
          name="email"
          hintText="hey@gmail.com"
          isRequire={true}
        />
        <CustomInput
          label="Phone number"
          inputMode="tel"
          name="phoneNumber"
          hintText="Enter phone number"
        />
        <CustomInput
          label="Street Address"
          name="address"
          hintText="Enter street address"
          isRequire={true}
        />
        <View style={{ flexDirection: "row", gap: 5 }}>
          <CustomInput
            label="City"
            style={{ flex: 1 }}
            name="city"
            hintText="Enter city"
            isRequire={true}
          />
          <CustomInput
            label="Postal Code"
            style={{ flex: 1 }}
            name="postalCode"
            hintText="Enter postal code"
            isRequire={true}
          />
        </View>
        <CustomerPicker
          label="Country"
          name="country"
          items={[
            { label: "Myanmar", value: "myanmar" },
            { label: "Japan", value: "japan" },
            { label: "Thailand", value: "thailand" },
            { label: "China", value: "China" },
            { label: "India", value: "india" },
            { label: "Indonesia", value: "indonesia" },
          ]}
        />

        <CustomDateTimePicker name="dateOfBirth" label="Date of birth" />
        <CustomButton
          title="Confirm"
          onPress={form.handleSubmit(onNext)}
          style={styles.button}
        />
      </FormProvider>
    </View>
  );
};

export default PersonalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  button: {
    marginTop: "auto",
    marginBottom: 50,
  },
});
