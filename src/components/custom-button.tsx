import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

type CustomButton = {
  title: string;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

const CustomButton = ({ title, style, ...pressableProps }: CustomButton) => {
  return (
    <View style={style}>
      <Pressable style={styles.button} {...pressableProps}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 20,
    width: "100%",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: 600,
  },
});
