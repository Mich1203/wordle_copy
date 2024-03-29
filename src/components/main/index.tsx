import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import React, { FC, useEffect } from "react";
import { RootStackParams } from "../../../App";
import { useAppSelector } from "../../hooks/store";
import { selectToken } from "../../store/auth";
import { GameStack } from "../rooms";
import { Invite } from "./Invite";
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
        name="Game"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              type="font-awesome"
              color={focused ? "#00a7f7" : ""}
            />
          ),
          headerShown: false,
          tabBarLabel: "Play",
        }}
        component={GameStack}
      />
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
      <Tab.Screen
        name="Invite"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              style={{ marginRight: 5 }}
              size={30}
              name="person-add"
              type="ionicons"
              color={focused ? "#00a7f7" : ""}
            />
          ),
        }}
        component={Invite}
      />
    </Tab.Navigator>
  );
};
