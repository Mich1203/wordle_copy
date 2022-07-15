import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import { FC, useEffect, useState } from "react";
import { Text, ToastAndroid, View } from "react-native";
import { RootStackParams } from "../../../App";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { IUser } from "../../interfaces/auth";
import { useUpdateProfileMutation } from "../../services/auth";
import { selectUser, setCredentials } from "../../store/auth";
import { PhoneInput } from "../common/PhoneInput";

const defaultFormValue: IUser = {
  _id: "",
  email: "",
  name: "",
  phoneNumber: "",
  profileImg: "",
  country: "",
  username: "",
  isVerified: false,
};

export const Profile: FC = () => {
  const user = useAppSelector(selectUser);
  const [formValue, setFormValue] = useState<IUser>(user ?? defaultFormValue);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading: isProfileLoading }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      setFormValue(user);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(setCredentials({ user: null, token: null }));
    setTimeout(() => navigation.navigate("Auth", { screen: "Login" }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile(formValue);
      ToastAndroid.show("Changes saved successfully!", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Error: " + error, ToastAndroid.LONG);
    }
  };

  const handleFormChange = (name: keyof IUser) => (value: string) => {
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <View style={{ padding: 10 }}>
      <Input
        value={formValue.email}
        onChangeText={handleFormChange("email")}
        placeholder="E-mail *"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
      />
      <Input
        value={formValue.name}
        onChangeText={handleFormChange("name")}
        placeholder="Full Name *"
        leftIcon={{ type: "font-awesome", name: "id-card" }}
      />
      <PhoneInput
        phoneValue={formValue.phoneNumber}
        onPhoneChange={handleFormChange("phoneNumber")}
        countryValue={formValue.country}
        onCountryChange={handleFormChange("country")}
      />
      <Input
        value={formValue.username}
        onChangeText={handleFormChange("username")}
        placeholder="Username *"
        leftIcon={{ type: "font-awesome", name: "user" }}
      />
      <Button
        title="Save Profile Changes"
        loading={isProfileLoading}
        onPress={handleSaveChanges}
      />
      <Text />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};
