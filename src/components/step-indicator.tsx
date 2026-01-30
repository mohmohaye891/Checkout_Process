import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSegments } from "expo-router";

const steps = [
  {
    key: "personal",
    label: "Personal",
  },
  {
    key: "payout",
    label: "Payout",
  },
  {
    key: "summary",
    label: "Orders",
  },
];

const StepIndicator = () => {
  const segements = useSegments();
  const currentScreen = segements[segements.length - 1];
  const currentStepIndex = steps.findIndex(
    (step) => step.key === currentScreen
  );
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        height: 90,
        gap: 15,
      }}
    >
      {steps.map((step, index) => (
        <View
          key={step.key}
          style={{
            borderBottomWidth: 5,
            flex: 1,
            borderColor: currentStepIndex >= index ? "#000" : "#ccc",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              color: currentStepIndex >= index ? "#000" : "gray",
            }}
          >
            {step.label}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default StepIndicator;
