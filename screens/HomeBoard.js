import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utility/Context";
import { getTwok, register } from "../utility/ComunicationHandler";
import { Twok } from "../components/Twok";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createTable } from "../utility/StorageHandler";

const HomeBoard = ({ navigation }) => {
  const [loading, Setloading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  //array dei twok
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("[HOMEBOARD]: MOUNTING");
    try {
      // Use the async keyword to indicate that this is an asynchronous function
      async function getData() {
        // Use the await keyword to wait for the getSid function to resolve
        const sid = await getSid();
        // Set the sid value in the user object
        setUser((user) => ({ ...user, sid }));

        // If the sid is empty, log the user in and store the new sid value
        if (sid === "" || sid === null) {
          const newSid = await logInUser();
          await AsyncStorage.setItem("sid", newSid);
          createTable();
        } else {
          createTable();
        }

        // Retrieve the twok value from the server
        const twok = await handleGetTwok();
        console.log(twok);
      }

      // Call the getData function to start the async operations
      getData().then(() => Setloading(false));
    } catch (e) {
      console.log("c'è stato un errore, oppure siamo al primo avvio", user.sid);
    }
  }, []);

  const handleGetTwok = async () => {
    /*     console.log("faccio la richiesta con questo sid: ", user.sid); */
    const sid = await getSid();
    setUser((user) => ({ ...user, sid }));
    /*  console.log("check sid: ", sid, "il sid nel Context è: ", user.sid); */
    const response = await getTwok(sid);
    setData((existingData) => [...existingData, response]);
    return response;
  };

  const getSid = async () => {
    return await AsyncStorage.getItem("sid");
  };

  const logInUser = async () => {
    const response = await register();
    console.log(response);
    setUser((user) => ({ ...user, sid: response.sid }));
    console.log("questo è il sid: ", response.sid, user);
    return response.sid;
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <MaterialCommunityIcons
          name="loading"
          size={60}
          style={{
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        <View style={styles.twok}>
          <FlatList
            style={styles.list}
            data={data}
            renderItem={({ item }) => (
              <Twok sid={user.sid} item={item} navigation={navigation} />
            )}
            keyExtractor={data.tid}
            snapToInterval={Dimensions.get("window").height}
            snapToAlignment="start"
            decelerationRate="fast"
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              handleGetTwok();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  twok: {
    backgroundColor: "grey",
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  list: {
    width: "100%",
  },
});
