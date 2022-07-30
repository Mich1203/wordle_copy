import React, { FC, useContext } from "react";
import { StyleSheet, View, Text, StyleSheetProperties } from "react-native";
import { GameContext } from "./Game";

export interface ILetterProps {
  letterPosition: number;
  attempt: number;
  tryNum: number;
}

export const Letter: FC<ILetterProps> = ({
  attempt,
  letterPosition,
  tryNum,
}) => {
  const { board, checks, word } = useContext(GameContext);
  const letter = board[attempt][letterPosition];
  const classes: object[] = [styles.container];
  if (checks[tryNum]) {
    if (word.includes(letter) && word[letterPosition] === letter)
      classes.push(styles.correct);
    else if (word.includes(letter)) classes.push(styles.almost);
  }
  return (
    <View style={classes}>
      <Text style={styles.letter}>{letter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 30,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "bold",
    color: "white",
  },
  correct: {
    backgroundColor: "#528d4e",
  },
  almost: {
    backgroundColor: "#b49f39",
  },
});
