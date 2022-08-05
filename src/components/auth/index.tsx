import React, { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Login } from "./Login";
import Constants from "expo-constants";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Register } from "./Register";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selectToken, setCredentials } from "../../store/auth";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../../App";
import { useLazyGetProfileQuery } from "../../services/auth";
import { MMKVLoader } from "react-native-mmkv-storage";
import { VerifyPhone } from "./VerifyPhone";

const storage = new MMKVLoader().initialize();

const getToken = async () => {
  try {
    const token = await storage.getStringAsync("@token");
    return token;
  } catch (error) {
    console.error("FETCH TOKEN LOCALLY:", error);
  }
};

const Stack = createNativeStackNavigator();

export const Auth: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const [getProfile] = useLazyGetProfileQuery();

  const storeToken = async (token: string) => {
    try {
      await storage.setStringAsync("@token", token);
    } catch (error) {
      console.error("STORE TOKEN LOCALLY:", error);
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        dispatch(setCredentials({ user: null, token }));
        getProfile();
      }
    });
  }, []);

  useEffect(() => {
    if (token) {
      storeToken(token);
      getProfile()
        .unwrap()
        .then(({ body: user }) => {
          if (user.isVerified)
            navigation.navigate("Main", { screen: "Profile" });
          else {
            navigation.navigate("Auth", { screen: "Verify" });
          }
        });
    }
  }, [navigation, token, getProfile]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
      <Stack.Screen
        name="Verify"
        component={VerifyPhone}
        options={{ title: "Verify Phone" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: Constants.statusBarHeight + 10,
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#cccf",
  },
  container: {},
});
