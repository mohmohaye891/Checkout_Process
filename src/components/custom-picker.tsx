import { StyleSheet, Text, View } from "react-native";
import React, { ComponentProps } from "react";
import RNPickerSelect from "react-native-picker-select";
import { useController } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

type CustomerPickerProps = {
  label: string;
  name: string;
} & Omit<ComponentProps<typeof RNPickerSelect>, "onValueChange">;

const CustomerPicker = ({
  label,
  name,
  ...pickerProps
}: CustomerPickerProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name });
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNPickerSelect
        {...pickerProps}
        onValueChange={onChange}
        value={value}
        onClose={onBlur}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: "Select your country", value: null }}
        Icon={() => {
          return <Ionicons name="chevron-down" size={20} color="gray" />;
        }}
        style={{
          inputAndroid: {
            width: "100%",
            borderWidth: 1,
            borderColor: error ? "red" : "slategrey",
            borderRadius: 10,
            padding: 10,
            marginTop: 4,
            marginBottom: 2,
          },
          inputIOS: {
            width: "100%",
            borderWidth: 1,
            borderColor: error ? "red" : "slategrey",
            borderRadius: 5,
            padding: 10,
            marginTop: 4,
            marginBottom: 2,
          },
          iconContainer: {
            top: 15,
            right: 12,
          },
        }}
      />
      <Text style={styles.error}>{error?.message}</Text>
    </View>
  );
};

export default CustomerPicker;

const styles = StyleSheet.create({
  label: {
    fontWeight: 600,
    color: "gray",
  },
  error: {
    color: "red",
    height: 18,
  },
});
