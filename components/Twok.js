import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getPicture } from "../utility/ComunicationHandler";
import { TouchableOpacity } from "react-native-gesture-handler";

const Twok = ({ item, sid, auts, onLoadPicture, navigation }) => {
  const [loader, SetLoader] = useState(false);

  useEffect(() => {
    getPicture(sid, item.uid)
      .then((response) => {
        auts.has(item.uid)
          ? console.log("Immagine già salvata")
          : onLoadPicture(auts.set(item.uid, response.picture));
        SetLoader(false);
      })
      .catch((e) => console.log("[ERRORE FETCH PICTURE", e));
  }, []);

  return (
    <View style={styles.twokStyle}>
      {loader ? (
        <Text>Loading...</Text>
      ) : (
        <Image
          source={{ uri: "data:image/png;base64," + auts.get(item.uid) }}
          style={{ width: 50, height: 50 }}
        />
      )}
      <TouchableOpacity onPress={() => navigation.navigate("UserBoard")}>
        <Text style={styles.textStyle}>{item.text}</Text>
        <Text>TID : {item.tid}</Text>
        <Text>NAME: {item.name}</Text>
        <Text>UID : {item.uid}</Text>
      </TouchableOpacity>
    </View>
  );
};

export { Twok };

const styles = StyleSheet.create({
  twokStyle: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "rgb(135, 206, 250)",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 40,
    fontWeight: "700",
  },
});
