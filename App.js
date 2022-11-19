import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeBoard from "./screens/HomeBoard";
import AddTwok from "./screens/AddTwok";
import Profile from "./screens/Profile";
import FollowedUsers from "./screens/FollowedUsers";
import UserContext, { UserContextProvider } from "./utility/Context";
import { AddTwokButton, ProfileButton } from "./components/HeaderButtons";
import UserBoard from "./screens/UserBoard";
import { useContext, useEffect } from "react";
//aggiungere Icone
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { register } from "./utility/ComunicationHandler";

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
                backgroundColor: "rgb(135,206,250)",
              },
              headerTintColor: "white",
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
                    <AddTwokButton navigation={navigation} />
                    <ProfileButton navigation={navigation} />
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
            name="UserBoard"
            component={UserBoard}
            options={{ title: "Bacheca di un Utente " }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: "Tuo Profilo" }}
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
