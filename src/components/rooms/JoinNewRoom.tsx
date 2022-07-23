import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Input } from "@rneui/themed";
import { FC, useState } from "react";
import { Modal, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { RootStackParams } from "../../../App";
import { useJoinRoomMutation } from "../../services/rooms";

export interface IJoinNewRoomProps {
  isOpen: boolean;
  close: () => void;
}

export const JoinNewRoom: FC<IJoinNewRoomProps> = ({ isOpen, close }) => {
  const [code, setCode] = useState("");
  const [joinRoom, { isLoading }] = useJoinRoomMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleClose = () => {
    setCode("");
    close();
  };

  const handleSubmit = async () => {
    try {
      await joinRoom(code);
      navigation.navigate("Room", { screen: "Room" });
    } catch (error) {
      ToastAndroid.show(
        "An error has ocurred while creating the room.",
        ToastAndroid.LONG
      );
    }
  };

  return (
    <Modal animationType="slide" visible={isOpen} onRequestClose={handleClose}>
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
    </Modal>
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
