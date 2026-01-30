import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Payout, PayoutSchema } from "../../types/payout-schema";
import CustomCheckbox from "../../components/custom-checkbox";
import { useSummary } from "../../hooks/useSummary";

const PayoutScreen = () => {
  const { setPayoutInfo, payoutInfo } = useSummary();
  const form = useForm({
    resolver: zodResolver(PayoutSchema),
    defaultValues: payoutInfo,
  });
  const onNext: SubmitHandler<Payout> = (data) => {
    setPayoutInfo(data);
    router.push("/payment/summary");
  };

  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <CustomInput
          name="cardHolderName"
          label="Card Holder Name"
          hintText="Enter Card Holder Name"
          isRequire={true}
        />
        <CustomInput
          name="cardNumber"
          label="Card Number"
          inputMode="numeric"
          hintText="Enter Card Number"
          isRequire={true}
        />
        <View style={{ flexDirection: "row", gap: 5 }}>
          <CustomInput
            name="expiry"
            label="Expiry Date"
            style={{ flex: 1 }}
            hintText="Enter Card Expiry Date"
            isRequire={true}
          />
          <CustomInput
            name="cvv"
            label="CVV"
            style={{ flex: 1 }}
            inputMode="numeric"
            hintText="Enter CVV"
            isRequire={true}
          />
        </View>
        <CustomCheckbox name="saveCard" label="Save this payment information" />
        <CustomButton
          title="Confirm"
          onPress={form.handleSubmit(onNext)}
          style={styles.button}
        />
      </FormProvider>
    </View>
  );
};

export default PayoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "slategrey",
    borderRadius: 10,
    padding: 10,
    margin: 16,
    gap: 4,
    backgroundColor: "#0269BD",
  },
  button: {
    marginTop: "auto",
    marginBottom: 50,
  },
});
