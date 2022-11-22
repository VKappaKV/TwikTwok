import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utility/Context";
import { Twok } from "../components/Twok";
import { getTwok } from "../utility/ComunicationHandler";

const UserBoard = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const sid = user.sid;
  const [mapAut, SetmapAut] = useState(new Map());
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetTwok()
      .then((twok) => console.log(twok))
      .catch((e) => console.log("ERRORE IN [HandleGetTwok]: ", e));
  }, []);

  const handleGetTwok = async () => {
    const response = await getTwok(sid, user.selectedUser);
    setData((existingData) => [...existingData, response]);
    return response;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.twok}>
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
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            // console.log("chiamo un nuovo Twok");
            handleGetTwok();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserBoard;

const styles = StyleSheet.create({});
