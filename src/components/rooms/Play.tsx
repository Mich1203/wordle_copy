import { Button } from "@rneui/themed";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CreateNewRoom } from "./CreateNewRoom";
import { JoinNewRoom } from "./JoinNewRoom";

export const Play: FC = () => {
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState(false);

  const handleToggleCreate = (value: boolean) => () => {
    setCreatingRoom(value);
  };

  const handleToggleJoin = (value: boolean) => () => {
    setJoiningRoom(value);
  };
  return (
    <View style={styles.container}>
      <Button
        title="CREATE ROOM"
        buttonStyle={styles.button}
        onPress={handleToggleCreate(true)}
      />
      <Button
        title="JOIN ROOM"
        buttonStyle={styles.button}
        onPress={handleToggleJoin(true)}
      />
      <CreateNewRoom isOpen={creatingRoom} close={handleToggleCreate(false)} />
      <JoinNewRoom isOpen={joiningRoom} close={handleToggleJoin(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    height: 100,
    width: 200,
  },
});
