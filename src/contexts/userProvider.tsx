import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Login } from "../types/auth/login-schema";
import { Register } from "../types/auth/register-schema";
import { account } from "../lib/appwrite";
import { ID, Models } from "react-native-appwrite";

type UserContext = {
  loginInfo: Login | undefined;
  setLoginInfo: (data: Login) => void;
  registerInfo: Register | undefined;
  setRegisterInfo: (data: Register) => void;
  user: Models.User<Models.Preferences> | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  authChecked: boolean;
  logout: () => Promise<void>;
};

/* export const UserContext = createContext<UserContext>({
  loginInfo: undefined,
  setLoginInfo: () => {},
  registerInfo: undefined,
  setRegisterInfo: () => {},
  user: null,
}); */
export const UserContext = createContext<UserContext | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [loginInfo, setLoginInfo] = useState<Login>();
  const [registerInfo, setRegisterInfo] = useState<Register>();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      console.log("Login Successful", response);
      setUser(response);
    } catch (error: any) {
      console.error("Login Error", error);
      throw Error(error.message);
    }
  }

  async function register(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      try {
        await account.deleteSession("current");
        setUser(null);
        console.log("Current session cleared after registration");
      } catch (e) {}
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function logout() {
    await account.deleteSession("current");
    console.log("Logout Successfully", user);
    setUser(null);
  }

  async function getUserValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginInfo,
        setLoginInfo,
        registerInfo,
        setRegisterInfo,
        login,
        register,
        user,
        authChecked,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//export const useUser = () => useContext(UserContext);
