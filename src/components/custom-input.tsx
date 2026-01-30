import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { useController } from "react-hook-form";

type CustomInputProps = {
  label: string;
  style?: StyleProp<ViewStyle>;
  name: string;
  hintText?: string;
  isRequire?: Boolean;
} & TextInputProps;

const CustomInput = ({
  label,
  style,
  name,
  hintText,
  isRequire,
  ...textInputProps
}: CustomInputProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name });
  return (
    <View style={style}>
      {label && (
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>{label}</Text>
          {isRequire && <Text style={{ color: "red" }}> *</Text>}
        </View>
      )}
      <TextInput
        style={[styles.input, error?.message && styles.errorInput]}
        {...textInputProps}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={hintText}
      />
      <Text style={styles.error}>{error?.message}</Text>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "slategrey",
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
    marginBottom: 2,
  },
  errorInput: {
    borderColor: "red",
  },
  label: {
    fontWeight: 600,
    color: "gray",
  },
  error: {
    color: "red",
    height: 18,
  },
});
