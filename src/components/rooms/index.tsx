import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { useAppSelector } from "../../hooks/store";
import { selectCurrentRoom, selectTimer } from "../../store/rooms";
import { Play } from "./Play";
import { Room } from "./Room";
import { CreateNewRoom } from "./CreateNewRoom";
import { JoinNewRoom } from "./JoinNewRoom";

const Stack = createNativeStackNavigator();

export const GameStack: FC = () => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const currentTimer = useAppSelector(selectTimer);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Play" component={Play} options={{ title: "Play" }} />
      <Stack.Screen name="CreateRoom" component={CreateNewRoom} />
      <Stack.Screen name="JoinRoom" component={JoinNewRoom} />
      <Stack.Screen
        name="Room"
        component={Room}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitle: () => (
            <View style={styles.topBar}>
              <Text style={styles.title}>{`Room #${currentRoom?.code}`}</Text>
              <Text style={styles.title}>Timer: {currentTimer}</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  topBar: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 0.9,
  },
  title: { color: "white", fontSize: 16 },
});
