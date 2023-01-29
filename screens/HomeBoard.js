import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utility/Context";
import { getTwok, register } from "../utility/ComunicationHandler";
import { Twok } from "../components/Twok";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createTable } from "../utility/StorageHandler";
import { checkTwokParameteres } from "../utility/testing/tests";

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
        setUser((user) => ({ ...user, sid: sid }));

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
        // Retrieve the twoks list for the tested tids
        /*    const testing_twoks = await handleTestTwok().catch((f) =>
          console.log("chiudo qui per ", f)
        );
        console.log("[TESTING TWOKS] :", testing_twoks);
        setData((existingData) => [...existingData, testing_twoks]); */
      }

      // Call the getData function to start the async operations
      getData().then(() => Setloading(false));
    } catch (e) {
      console.log("c'è stato un errore, oppure siamo al primo avvio", user.sid);
    }
  }, []);

  const handleGetTwok = async () => {
    //preparo la variabile response
    let response;
    /*     console.log("faccio la richiesta con questo sid: ", user.sid); */
    const sid = await getSid();
    setUser((user) => ({ ...user, sid }));
    /*  console.log("check sid: ", sid, "il sid nel Context è: ", user.sid); */
    if (user.tidSequence === -1) {
      response = await getTwok(sid);
      const fetchedTwok = checkTwokParameteres(response);
      setData((existingData) => [...existingData, fetchedTwok]);
    } else {
      response = await getTwok(sid, null, user.tidSequence).catch((e) => {
        console.log("errore", e);
        console.log(data);
        alert("ERROR DURING TWOK FETCHING...DEPLOYING DUMMY TWOK");
        setUser((user) => ({ ...user, tidSequence: user.tidSequence + 1 }));
      });
      const fetchedTwok = checkTwokParameteres(response);
      setUser((user) => ({ ...user, tidSequence: user.tidSequence + 1 }));
      setData((existingData) => [...existingData, fetchedTwok]);
    }
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
