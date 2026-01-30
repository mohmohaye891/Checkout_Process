import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../components/custom-button";
import { useSummary } from "../../contexts/summaryProvider";
import { useUser } from "../../hooks/useUser";

const SummaryScreen = () => {
  const { personalInfo, payoutInfo, saveSummary } = useSummary();
  const { user } = useUser();

  console.log("User Data ::::::", user);
  const onNext = async () => {
    if (!personalInfo || !payoutInfo) {
      console.error("Missing information");
      return;
    }
    try {
      const combinedData = {
        ...personalInfo,
        ...payoutInfo,
      };
      await saveSummary(combinedData);
      console.log("SAVE SUCCESSFULLY", combinedData);
    } catch (error) {
      console.error("Failed to save payment:", error);
    }

    //router.dismissAll();
    //router.back();
    router.push("/payment/success");
  };
  return (
    <View style={styles.container}>
      {personalInfo && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Personal Info</Text>
            <Link href="/payment/personal" style={styles.link}>
              Edit
            </Link>
          </View>
          {Object.entries(personalInfo).map(([key, value]) => (
            <View
              key={key}
              style={{
                flexDirection: "row",
                padding: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {key}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                :
              </Text>
              {/* <Text style={{ marginLeft: 16 }}>{value?.toString()}</Text> */}
              <Text style={{ marginLeft: 16 }}>
                {key.toLowerCase() === "dateofbirth" && value
                  ? new Date(value).toLocaleDateString("en-GB")
                  : value?.toString()}
              </Text>
            </View>
          ))}
        </View>
      )}
      {payoutInfo && (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Payment Info</Text>
            <Link href="/payment/payout" style={styles.link}>
              Edit
            </Link>
          </View>
          {Object.entries(payoutInfo).map(([key, value]) => (
            <View
              key={key}
              style={{ flexDirection: "row", gap: 5, padding: 4 }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {key === "saveCard" ? "save payment" : key}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                :
              </Text>
              <Text style={{ marginLeft: 16 }}>{value?.toString()}</Text>
            </View>
          ))}
        </View>
      )}
      <CustomButton title="Confirm" onPress={onNext} style={styles.button} />
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 15,
  },
  button: {
    marginTop: "auto",
    marginBottom: 50,
  },
  card: {
    borderWidth: 1,
    borderColor: "slategrey",
    borderRadius: 10,
    padding: 10,
    gap: 4,
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  link: {
    fontWeight: 600,
    color: "dodgerblue",
    textDecorationLine: "underline",
  },
});
