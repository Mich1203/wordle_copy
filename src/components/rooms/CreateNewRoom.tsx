import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Slider } from "@rneui/themed";
import { FC, useState } from "react";
import { Modal, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { RootStackParams } from "../../../App";
import { IRoom } from "../../interfaces/rooms";
import { useCreateRoomMutation } from "../../services/rooms";

export interface ICreateNewRoomProps {
  isOpen: boolean;
  close: () => void;
}

const initialFormValue: Partial<IRoom> = {
  numberOfHits: 10,
  rounds: 3,
  timePerRound: 30,
  wordLength: 3,
};

export const CreateNewRoom: FC<ICreateNewRoomProps> = ({ isOpen, close }) => {
  const [formValue, setFormValue] = useState(initialFormValue);
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const handleClose = () => {
    setFormValue(initialFormValue);
    close();
  };

  const handleFormChange =
    <K extends keyof IRoom>(name: K) =>
    (value: IRoom[K]) => {
      setFormValue((prev) => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async () => {
    try {
      await createRoom(formValue);
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
          <Text style={styles.inputLabel}>
            Word Length - {formValue.wordLength}
          </Text>
          <Slider
            thumbTintColor="black"
            minimumValue={3}
            maximumValue={7}
            step={1}
            value={formValue.wordLength}
            onValueChange={handleFormChange("wordLength")}
          />
        </View>
        <Text />
        <View>
          <Text style={styles.inputLabel}>
            # of rounds - {formValue.rounds}
          </Text>
          <Slider
            thumbTintColor="black"
            minimumValue={2}
            maximumValue={10}
            step={1}
            value={formValue.rounds}
            onValueChange={handleFormChange("rounds")}
          />
        </View>
        <Text />
        <View>
          <Text style={styles.inputLabel}>
            Seconds per round - {formValue.timePerRound}
          </Text>
          <Slider
            thumbTintColor="black"
            minimumValue={10}
            maximumValue={120}
            step={1}
            value={formValue.timePerRound}
            onValueChange={handleFormChange("timePerRound")}
          />
        </View>
        <Text />
        <View>
          <Text style={styles.inputLabel}>
            Number of guesses to win - {formValue.numberOfHits}
          </Text>
          <Slider
            thumbTintColor="black"
            minimumValue={3}
            maximumValue={30}
            step={1}
            value={formValue.numberOfHits}
            onValueChange={handleFormChange("numberOfHits")}
          />
        </View>
        <Text />
        <Button
          title="Create Room"
          disabled={isLoading}
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
