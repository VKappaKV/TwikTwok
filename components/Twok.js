import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getPicture } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUser, insertUser, updatePicture } from "../utility/StorageHandler";
import FollowedUsers from "../screens/FollowedUsers";

const Twok = ({ item, sid, auts, onLoadPicture, navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [picture, SetPicture] = useState();
  const [loader, SetLoader] = useState(false);
  const [mapOnDisplay, SetMapOnDisplay] = useState(false);
  const size = [10, 20, 35];
  const align = ["flex-start", "center", "flex-end"];
  const fonttype = ["normal", "monospace", "serif"];

  useEffect(() => {
    console.log("[TWOK]: MOUNTING");
    if (item.pversion == 0) return;

    getUser(item.uid).then((response) => {
      if (response == null) {
        console.log("NON ho questo utente nel db: ", item.uid, item.name);
        getPicture(sid, item.uid)
          .then((response) => {
            insertUser(item.uid, response.picture, response.pversion);
            SetPicture(response.picture);
            SetLoader(false);
          })
          .catch((e) => console.log(e));
      } else {
        getUser(item.uid).then((user) => {
          console.log(
            "ho questo utente nel db: ",
            user.pversion,
            "la pversion è: ",
            item.pversion,
            " ",
            user.uid,
            item.name
          );
          if (user.pversion != item.pversion) {
            getPicture(sid, item.uid)
              .then((response) => {
                updatePicture(item.uid, response.picture, response.pversion);
                SetPicture(response.picture);
                SetLoader(false);
                console.log(picture);
              })
              .catch((e) => console.log(e));
          } else {
            getUser(item.uid).then((response) => {
              SetPicture(response.picture);
            });
          }
        });
      }
    });
    SetLoader(false);
  }, []);

  const handleRegionChanged = (region) => {
    console.log(region);
  };
  BackHandler.addEventListener("hardwareBackPress", () => {
    SetMapOnDisplay(false);
    return true;
  });
  const OpenMap = () => {
    console.log("Apriti sesamo: [lat: ", item.lat, " | lon: ", item.lon, "]");
    SetMapOnDisplay(true);
  };

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
                source={{ uri: "data:image/png;base64," + picture }}
                style={{ width: 80, height: 80 }}
              />
            )}
            <Text style={{ color: `#${item.fontcol}` }}>{item.name}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={OpenMap}>
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
      {mapOnDisplay ? (
        <MapView
          style={styles.map}
          onRegionChange={handleRegionChanged}
          initialRegion={{
            latitude: item.lat,
            longitude: item.lon,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          <Marker
            coordinate={{ latitude: item.lat, longitude: item.lon }}
            title="prova"
            description="descrizione"
          />
        </MapView>
      ) : null}
    </SafeAreaView>
  );
};

export { Twok };

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
