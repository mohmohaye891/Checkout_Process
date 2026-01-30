import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";

const UserAuth = ({ children }: any) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/auth/login");
    }
  }, [user, authChecked]);

  if (!authChecked || !user) {
    return (
      <ActivityIndicator
        size="large"
        color="black"
        style={{ flex: 1, padding: 16, justifyContent: "center" }}
      />
    );
  }

  return children;
};

export default UserAuth;
