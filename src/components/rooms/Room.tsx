import { FC } from "react";
import { View } from "react-native";
import { Game } from "../common/Wordle/Game";

export const Room: FC = () => {
  return (
    <View>
      <Game />
    </View>
  );
};
