import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../App";

export const useAppNavigation: () => NativeStackNavigationProp<RootStackParams> =
  () => useNavigation<NativeStackNavigationProp<RootStackParams>>();
