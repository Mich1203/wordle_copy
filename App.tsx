import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Auth } from "./src/components/auth";
import { Main } from "./src/components/main";
import { rootStore } from "./src/store";

const theme = createTheme({
  Button: {
    raised: true,
  },
});

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
  Verify: undefined;
};

export type MainStackParams = {
  Home: undefined;
  Profile: undefined;
};

export type RootStackParams = {
  Auth: NavigatorScreenParams<AuthStackParams>;
  Main: NavigatorScreenParams<MainStackParams>;
};

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Provider store={rootStore}>
            <RootStack.Navigator>
              <RootStack.Screen
                component={Auth}
                name="Auth"
                options={{ headerShown: false }}
              />
              <RootStack.Screen
                component={Main}
                name="Main"
                options={{ headerShown: false }}
              />
            </RootStack.Navigator>
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
