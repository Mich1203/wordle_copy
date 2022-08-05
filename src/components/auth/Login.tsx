import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import React, { FC, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RootStackParams } from "../../../App";
import { useLoginMutation, useSendCodeMutation } from "../../services/auth";

const initialFormValue = {
  email: "",
  password: "",
};

export const Login: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [hidePassword, setHidePassword] = useState(true);
  const [formValue, setFormValue] = useState(initialFormValue);
  const [login, { isLoading }] = useLoginMutation();

  const handleEyePress = () => {
    setHidePassword((prev) => !prev);
  };

  const isValid = () => {
    const { email, password } = formValue;
    return email && password && password.length > 6;
  };

  const handleFormChange = (name: string) => (value: string) => {
    setFormValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const {
        body: { user },
      } = await login(formValue).unwrap();
      if (user.isVerified) navigation.navigate("Main", { screen: "Profile" });
      else {
        navigation.navigate("Auth", { screen: "Verify" });
      }
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message);
      console.error("LOGIN ERROR:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Input
        value={formValue.email}
        onChangeText={handleFormChange("email")}
        placeholder="E-mail"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
      />
      <Input
        value={formValue.password}
        onChangeText={handleFormChange("password")}
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        rightIcon={{
          type: "font-awesome",
          name: "eye",
          onPress: handleEyePress,
        }}
        secureTextEntry={hidePassword}
        errorMessage={
          formValue.password !== "" && formValue.password.length < 6
            ? "Password must be at least 6 characters long!"
            : undefined
        }
      />
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Auth", { screen: "Register" })}
      >
        <Text style={styles.link}>Don't have an account yet ?</Text>
      </TouchableWithoutFeedback>
      <Button
        title="Login"
        onPress={handleLogin}
        disabled={!isValid()}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    textAlign: "center",
    fontSize: 40,
    margin: 20,
  },
  link: {
    color: "#0000FF",
    paddingVertical: 10,
  },
});
