import React, { useState } from "react";
import { useController } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type CustomDateTimePickerProps = {
  name: string;
  label?: string;
};
const CustomDateTimePicker = ({ name, label }: CustomDateTimePickerProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Text
        onPress={showDatePicker}
        style={[styles.input, error?.message && styles.errorInput]}
      >
        {value?.toLocaleDateString() || "Select a date"}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.error}>{error?.message}</Text>
    </View>
  );
};

export default CustomDateTimePicker;

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
    color: "red",
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
