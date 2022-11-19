import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getPicture } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";

const Twok = ({ item, sid, auts, onLoadPicture, navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [loader, SetLoader] = useState(false);
  const size = [20, 40, 60];

  useEffect(() => {
    /*  console.log(
      "il colore del twok: ",
      item.text,
      " è: ",
      item.bgcol,
      ". Colore font: ",
      item.fontcol
    ); */
    getPicture(sid, item.uid)
      .then((response) => {
        auts.has(item.uid)
          ? //console.log("Immagine già salvata")
            null
          : onLoadPicture(auts.set(item.uid, response.picture));
        SetLoader(false);
      })
      .catch((e) => console.log("[ERRORE FETCH PICTURE]", e));
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: Dimensions.get("window").height,
        backgroundColor: `#${item.bgcol}`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setUser((user) => ({ ...user, selectedUser: item.uid }));
          navigation.navigate("UserBoard");
        }}
      >
        {loader ? (
          <Text>Loading...</Text>
        ) : (
          <Image
            source={{ uri: "data:image/png;base64," + auts.get(item.uid) }}
            style={{ width: 50, height: 50 }}
          />
        )}
        <Text
          style={{
            fontSize: size[item.fontsize],
            color: `#${item.fontcol}`,
            fontWeight: "700",
          }}
        >
          {item.text}
        </Text>
        <Text style={{ color: `#${item.fontcol}` }}>NAME: {item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export { Twok };
/* 
const styles = StyleSheet.create({});

<Button
title={`Go to ${item.name} profile`}
onPress={() => navigation.navigate("UserBoard")}
/> */
