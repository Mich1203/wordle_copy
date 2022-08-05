import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { RootStackParams } from "../../../App";
import { useAppSelector } from "../../hooks/store";
import {
  useSendCodeMutation,
  useVerifyCodeMutation,
} from "../../services/auth";
import { selectUser } from "../../store/auth";

const CODE_LENGTH = 5;

export interface IVerifyPhoneProps {}

export const VerifyPhone: FC<IVerifyPhoneProps> = () => {
  const [code, setCode] = useState<string>("");
  const [validating, setValidating] = useState<boolean>(false);
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const user = useAppSelector(selectUser);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [sendCode] = useSendCodeMutation();

  useEffect(() => {
    if (!user?.isVerified) sendCode();
    else navigation.navigate("Main", { screen: "Profile" });
  }, [user?.isVerified]);

  const handleVerify = async () => {
    try {
      setValidating(true);
      const { body: response } = await verifyCode({ otp: code }).unwrap();
      if (response.valid) navigation.navigate("Main", { screen: "Profile" });
    } catch (error) {
      Alert.alert("Error", "An error has ocurred. Please try again later.");
      console.error("VERIFY PHONE ERROR:", error);
    } finally {
      setCode("");
      setValidating(false);
    }
  };

  useEffect(() => {
    if (code?.length === CODE_LENGTH && !validating) handleVerify();
  }, [handleVerify, code]);
  return (
    <View style={styles.container}>
      <Input
        label="Verify Phone Number"
        value={code}
        onChangeText={(text: string) => setCode(text)}
        disabled={isLoading}
      />
      <Text />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
