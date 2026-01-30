import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSummary } from "../../hooks/useSummary";
import { useUser } from "../../hooks/useUser";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomButton from "../../components/custom-button";
import { router } from "expo-router";

export type summaryData = {
  userId: string;
  fullname: string;
  phoneNumber?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  dateOfBirth: Date;
  cardHolderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  email: string;
};

const SuccessScreen = () => {
  const { fetchPayment } = useSummary();
  const { user } = useUser();
  const [dataSummary, setDataSummary] = useState<summaryData | null>(null);

  useEffect(() => {
    async function getSummaryData() {
      if (user?.$id) {
        const data = await fetchPayment();
        console.log("Fetch Summary Data", data);
        if (data && data.rows && data.rows.length > 0) {
          setDataSummary(data.rows[0]);
        }
      }
    }
    getSummaryData();
  }, [user]);

  const handleSubmit = async () => {
    router.dismissAll();
    router.push("/auth");
  };

  if (!dataSummary) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <AntDesign name="check-circle" size={32} color="green" />
        <Text
          style={{
            color: "green",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 32,
          }}
        >
          success
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 22,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
          Card Holder Name :{" "}
        </Text>
        <Text
          style={{
            marginTop: 2,
          }}
        >
          {" "}
          {dataSummary.userId}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 22,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Card Number : </Text>
        <Text
          style={{
            marginTop: 2,
          }}
        >
          {" "}
          {dataSummary.cardNumber}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 22,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Email : </Text>
        <Text
          style={{
            marginTop: 2,
          }}
        >
          {" "}
          {dataSummary.email}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 22,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
          Phone Number :{" "}
        </Text>
        <Text
          style={{
            marginTop: 2,
          }}
        >
          {" "}
          {dataSummary.phoneNumber}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 22,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Address : </Text>
        <Text
          style={{
            marginTop: 2,
          }}
        >
          {" "}
          {dataSummary.address}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 22,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Country : </Text>
        <Text
          style={{
            marginTop: 2,
          }}
        >
          {" "}
          {dataSummary.country}
        </Text>
      </View>

      <CustomButton
        title="Go Back"
        style={styles.button}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  button: {
    marginTop: "auto",
    marginBottom: 50,
  },
});
