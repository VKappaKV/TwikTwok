import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getPicture } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Twok = ({ item, sid, auts, onLoadPicture, navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [picture, SetPicture] = useState();
  const [loader, SetLoader] = useState(false);
  const size = [10, 20, 35];
  const align = ["flex-start", "center", "flex-end"];
  const fonttype = ["normal", "monospace", "serif"];

  useEffect(() => {
    getPicture(sid, item.uid)
      .then((response) => {
        auts.has(item.uid)
          ? null
          : onLoadPicture(auts.set(item.uid, response.picture));
        SetLoader(false);
      })
      .then(() => SetPicture(auts.get(item.uid)))
      .catch((e) => console.log("[ERRORE FETCH PICTURE]", e));
  }, []);

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: Dimensions.get("window").height,
        backgroundColor: `#${item.bgcol}`,
        alignItems: align[item.halign],
        justifyContent: align[item.valign],
      }}
    >
      <View style={{ marginBottom: 100 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              setUser((user) => ({ ...user, selectedUser: item.uid }));
              navigation.navigate("UserBoard");
            }}
          >
            {loader ? (
              <Text>Loading...</Text>
            ) : picture == null ? (
              <MaterialCommunityIcons
                name="account-circle"
                color={`#${item.fontcol}`}
                size={80}
              />
            ) : (
              <Image
                source={{ uri: "data:image/png;base64," + auts.get(item.uid) }}
                style={{ width: 80, height: 80 }}
              />
            )}
            <Text style={{ color: `#${item.fontcol}` }}>{item.name}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            console.log(
              "Apriti sesamo: [lat: ",
              item.lat,
              " | lon: ",
              item.lon,
              "]"
            )
          }
        >
          <Text
            style={{
              fontSize: size[item.fontsize],
              color: `#${item.fontcol}`,
              fontWeight: "700",
              fontFamily: fonttype[item.fonttype],
            }}
          >
            {item.text}
          </Text>
          {item.lat && (
            <MaterialCommunityIcons
              name="map-marker-radius"
              color={`#${item.fontcol}`}
              size={size[item.fontsize]}
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { Twok };
/* 
const styles = StyleSheet.create({});

<Button
title={`Go to ${item.name} profile`}
onPress={() => navigation.navigate("UserBoard")}
/> */
