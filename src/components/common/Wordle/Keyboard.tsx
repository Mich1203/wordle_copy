import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Key } from "./Key";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export const Keyboard = () => {
  return (
    <View>
      {keys.map((keyRow, index) => (
        <View key={index} style={styles.keyboardLine}>
          {index === 2 && <Key keyVal="ENTER" bigKey />}
          {keyRow.map((key) => (
            <Key key={key} keyVal={key} />
          ))}
          {index === 2 && <Key keyVal="DELETE" bigKey />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    width: "100%",
    height: 300,
    marginTop: 60,
  },
  keyboardLine: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  key: {
    width: 23,
    height: 30,
    margin: 4,
    borderRadius: 4,
    fontSize: 20,
    backgroundColor: "grey",
    display: "flex",
    color: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "center",
    justifyContent: "center",
  },
});
