import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useAppSelector } from "../../hooks/store";
import { selectCurrentRoom } from "../../store/rooms";
import { Play } from "./Play";
import { Room } from "./Room";

const Stack = createNativeStackNavigator();

export const Rooms: FC = () => {
  const currentRoom = useAppSelector(selectCurrentRoom);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Play" component={Play} options={{ title: "Play" }} />
      <Stack.Screen
        name="Room"
        component={Room}
        options={{ title: `Room #${currentRoom?.code}` }}
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
