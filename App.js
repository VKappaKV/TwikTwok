import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeBoard from "./screens/HomeBoard";
import AddTwok from "./screens/AddTwok";
import Profile from "./screens/Profile";
import FollowedUsers from "./screens/FollowedUsers";
import { UserContextProvider } from "./utility/Context";
import { AddTwokButton, ProfileButton } from "./components/HeaderButtons";
import UserBoard from "./screens/UserBoard";

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
              title: "HOME",
              headerStyle: {
                backgroundColor: "#4169E1",
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
            options={({ navigation }) => ({
              title: "POST TWOK",
              headerStyle: {
                backgroundColor: "#4169E1",
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
            name="UserBoard"
            component={UserBoard}
            options={({ navigation }) => ({
              title: "USER BOARD",
              headerStyle: {
                backgroundColor: "#4169E1",
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
            name="Profile"
            component={Profile}
            options={({ navigation }) => ({
              title: "YOUR PROFILE",
              headerStyle: {
                backgroundColor: "#4169E1",
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
            name="FollowedUsers"
            component={FollowedUsers}
            options={({ navigation }) => ({
              title: "FOLLOWED USERS",
              headerStyle: {
                backgroundColor: "#4169E1",
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

//installazioni: AsyncStorage, ReactNavigation, Expo ImagePicker
// Per mostrare la mappa npx expo install react-native-maps
// Per ottenere la posizione: npx expo install expo-location
