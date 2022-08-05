import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { RootStackParams } from "../../../App";
import { useJoinRoomMutation } from "../../services/rooms";

export const JoinNewRoom: FC = () => {
  const [code, setCode] = useState("");
  const [joinRoom, { isLoading }] = useJoinRoomMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      setCode("");
    });

    return unsubscribe;
  }, [navigation]);

  const handleSubmit = async () => {
    try {
      const room = await joinRoom(code).unwrap();
      if (room) navigation.navigate("Game", { screen: "Room" });
      else throw new Error("No room found.");
    } catch (error) {
      console.error("JOIN ROOM ERROR: ", error);
      ToastAndroid.show(
        "An error has ocurred while joining the room.",
        ToastAndroid.LONG
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.inputLabel}>Room Code (6 digits)</Text>
        <Input
          value={code}
          onChangeText={setCode}
          placeholder="Enter room code."
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>
      <Text />
      <Button
        title="Join Room"
        disabled={isLoading || code.length !== 6}
        loading={isLoading}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  inputLabel: {
    fontSize: 20,
  },
});
