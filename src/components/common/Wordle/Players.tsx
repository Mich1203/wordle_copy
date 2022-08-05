import { Modal, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { useAppSelector } from "../../../hooks/store";
import { selectCurrentRoom } from "../../../store/rooms";
import { FAB } from "@rneui/themed";

export interface IPlayers {
  isOpen: boolean;
  onClose: () => void;
}

const Players: FC<IPlayers> = ({ isOpen, onClose }) => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  return (
    <Modal visible={isOpen} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.playerContainer}>
          <Text style={styles.text}>Player name</Text>
          <Text style={styles.text}>Score</Text>
        </View>
        {currentRoom?.players.map((player) => (
          <View style={styles.playerContainer} key={player.user._id}>
            <Text>{player.user.name}</Text>
            <Text>{player.score}</Text>
          </View>
        ))}
        <FAB placement="right" title="X" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default Players;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  playerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
});
