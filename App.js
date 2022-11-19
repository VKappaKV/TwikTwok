import { StyleSheet, Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import HomeBoard from "./screens/HomeBoard";
import AddTwok from "./screens/AddTwok";
import Profile from "./screens/Profile";
import FollowedUsers from "./screens/FollowedUsers";
import { UserContextProvider } from "./utility/Context";
import { AddTwokButton, ProfileButton } from "./components/HeaderButtons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeBoard}
            options={({ navigation }) => ({
              title: "Bacheca",
              headerStyle: {
                backgroundColor: "rgb(30,144,255)",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <ProfileButton navigation={navigation} />
                    <AddTwokButton navigation={navigation} />
                  </View>
                );
              },
            })}
          />
          <Stack.Screen
            name="AddTwok"
            component={AddTwok}
            options={{ title: "Aggiungi Twok" }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: "Profilo di: ??" }}
          />
          <Stack.Screen
            name="FollowedUsers"
            component={FollowedUsers}
            options={{ title: "Utenti Seguiti" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
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
