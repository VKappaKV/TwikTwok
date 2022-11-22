import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utility/Context";
import { getTwok, register } from "../utility/ComunicationHandler";
import { Twok } from "../components/Twok";
import { FlatList } from "react-native-gesture-handler";

const HomeBoard = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const sid = user.sid;
  //Mappa Autori Twok con le loro PFP
  const [mapAut, SetmapAut] = useState(new Map());
  //array dei twok
  const [data, setData] = useState([]);
  //flag per gestire l'inizio dell'azione di scroll per visualizzare gli indicatori ai bordi
  // const [beginScroll, setBeginScroll] = useState(false);
  useEffect(() => {
    if (sid === "") {
      register()
        .then((response) => setUser((user) => ({ ...user, sid: response })))
        .catch((e) => console.log("[ERRORE]!! ", e));
    }
    handleGetTwok().then((twok) => console.log(twok));
  }, []);

  const handleGetTwok = async () => {
    const response = await getTwok(sid);
    setData((existingData) => [...existingData, response]);
    return response;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.twok}>
        {/*  {beginScroll ? <Text>go back ^</Text> : null} */}
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <Twok
              sid={sid}
              item={item}
              auts={mapAut}
              onLoadPicture={SetmapAut}
              navigation={navigation}
            />
          )}
          keyExtractor={data.tid}
          //effetto di scrolling magnetico
          snapToInterval={Dimensions.get("window").height}
          snapToAlignment="start"
          decelerationRate="fast"
          //gestisco l'inizio dello scroll
          /* onScrollBeginDrag={() => {
            setBeginScroll(true);
          }}
          onScrollEndDrag={() => {
            setBeginScroll(false);
          }} */
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            // console.log("chiamo un nuovo Twok");
            handleGetTwok();
          }}
        />
      </View>
      {/* {beginScroll ? <Text>load more</Text> : null} */}
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
