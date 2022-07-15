import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import React, { FC, useEffect } from "react";
import { RootStackParams } from "../../../App";
import { useAppSelector } from "../../hooks/store";
import { selectToken } from "../../store/auth";
import { Profile } from "./Profile";

export type MainProps = NativeStackScreenProps<RootStackParams, "Main">;

const Tab = createBottomTabNavigator();

export const Main: FC<MainProps> = ({ navigation }) => {
  const token = useAppSelector(selectToken);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      token && e.preventDefault();
    });

    return unsubscribe;
  }, [navigation, token]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user"
              type="font-awesome"
              color={focused ? "#00a7f7" : ""}
            />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};
