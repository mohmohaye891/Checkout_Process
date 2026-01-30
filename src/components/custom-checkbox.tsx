import { Text, View } from "react-native";
import React from "react";
import { useController } from "react-hook-form";
import Checkbox from "expo-checkbox";

type CustomCheckboxProps = {
  label?: string;
  name: string;
};

const CustomCheckbox = ({ label, name }: CustomCheckboxProps) => {
  const {
    field: { value, onChange },
  } = useController({ name });
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Checkbox
        value={value}
        onValueChange={onChange}
        color={value ? "black" : undefined}
      />
      <Text>{label}</Text>
    </View>
  );
};

export default CustomCheckbox;
