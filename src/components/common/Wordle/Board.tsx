import { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useGetWordQuery } from "../../../services/wordle";
import { GameContext } from "./Game";
import { Letter } from "./Letter";

export const Board: FC = () => {
  const { board } = useContext(GameContext);
  //   const { data: words, isLoading } = useGetWordQuery();s
  return (
    <View style={{ ...styles.board, height: 70 * board.length }}>
      {board.map((row, rowIndex) => (
        <View style={styles.row}>
          {row.map((_, letterIndex) => (
            <Letter
              key={letterIndex}
              letterPosition={letterIndex}
              attempt={rowIndex}
              tryNum={rowIndex}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  row: {
    width: "100%",
    flex: 0.33,
    flexDirection: "row",
    margin: 5,
  },
});
