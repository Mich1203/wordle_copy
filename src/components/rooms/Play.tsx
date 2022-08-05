import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useAppNavigation } from "../../hooks/navigation";

export const Play: FC = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="CREATE ROOM"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("Game", { screen: "CreateRoom" })}
      />
      <Button
        title="JOIN ROOM"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("Game", { screen: "JoinRoom" })}
      />
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
