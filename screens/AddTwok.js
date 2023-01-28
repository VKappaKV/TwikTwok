import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { addTwok } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ColorList from "../components/ColorList";
import * as Location from "expo-location";

const AddTwok = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [chooseColor, SetChooseColor] = useState(0);
  const alignRow = ["left", "center", "right"];
  const alignCol = ["top", "center", "bottom"];
  const size = [10, 20, 35];
  const fonttype = ["normal", "monospace", "serif"];
  const iconAlingRow = [
    "format-align-left",
    "format-align-center",
    "format-align-right",
  ];
  const iconAlignCol = [
    "format-align-top",
    "format-align-middle",
    "format-align-bottom",
  ];
  const [twok, setTwok] = useState({
    sid: `${user.sid}`,
    text: ``,
    bgcol: "FFFFFF",
    fontcol: "000000",
    fontsize: 1,
    fonttype: 1,
    halign: 1,
    valign: 1,
    lat: "",
    lon: "",
  });

  const SetTextColor = (newColor) => {
    setTwok((c) => ({ ...c, fontcol: `${newColor}` }));
  };
  const SetBgColor = (newColor) => {
    console.log("IMPOSTO IL NUOVO BACKGROUND: ", newColor),
      setTwok((c) => ({ ...c, bgcol: `${newColor}` }));
    console.log(twok);
  };

  const getPositionAsync = async () => {
    let canUseLocation = false;
    const grantedPermission = await Location.getForegroundPermissionsAsync();
    if (grantedPermission.status === "granted") {
      canUseLocation = true;
      console.log("entrato qui GRANTED");
    } else {
      console.log("entrato qui NOT GRANTED");
      const permissionResponse =
        await Location.requestForegroundPermissionsAsync();
      if (permissionResponse.status === "granted") {
        canUseLocation = true;
        console.log("entrato qui GRANTED DA QUALCHE PARTE");
      }
    }
    console.log("posso usare la posizione? ", canUseLocation);
    if (canUseLocation) {
      const location = await Location.getCurrentPositionAsync().catch((e) =>
        console.log("errore qui: ", e)
      );
      console.log("received location:", location);
      setTwok((c) => ({ ...c, lat: location.coords.latitude }));
      setTwok((c) => ({ ...c, lon: location.coords.longitude }));
    }
  };

  return (
    <View style={{ backgroundColor: "rgb(135,206,250)", height: "100%" }}>
      <TextInput
        style={[
          styles.input,
          {
            textAlign: alignRow[twok.halign],
            textAlignVertical: alignCol[twok.valign],
            fontSize: size[twok.fontsize],
            fontFamily: fonttype[twok.fonttype],
            color: `#${twok.fontcol}`,
            backgroundColor: `#${twok.bgcol}`,
          },
        ]}
        value={twok.text} //TextTwok
        placeholder="What's Twiking?"
        placeholderTextColor={`#${twok.fontcol}`}
        onChangeText={(text) => setTwok((obj) => ({ ...obj, text: text }))} //onTwokChange
        multiline={true}
        maxLength={100}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            SetChooseColor(1);
            console.log("cambia colore");
          }}
        >
          <MaterialCommunityIcons
            name="format-color-text"
            size={50}
            color={`#${twok.fontcol}`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(
              "sposta allineamento orizzontale",
              alignRow[twok.halign]
            );
            let r = twok.halign + 1;
            if (r > 2) r = 0;
            setTwok((t) => ({ ...t, halign: r }));
            console.log(twok.halign);
          }}
        >
          <MaterialCommunityIcons
            name={iconAlingRow[twok.halign]}
            size={50}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("sposta allineamento verticale", alignCol[twok.valign]);
            let r = twok.valign + 1;
            if (r > 2) r = 0;
            setTwok((t) => ({ ...t, valign: r }));
            console.log(twok.valign);
          }}
        >
          <MaterialCommunityIcons
            name={iconAlignCol[twok.valign]}
            size={50}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("cambia grandezza font", size[twok.fontsize]);
            let r = twok.fontsize + 1;
            if (r > 2) r = 0;
            setTwok((t) => ({ ...t, fontsize: r }));
            console.log(twok.fontsize);
          }}
        >
          <MaterialCommunityIcons
            name="format-size"
            size={50}
            color={"white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("cambia font", fonttype[twok.fonttype]);
            let r = twok.fonttype + 1;
            if (r > 2) r = 0;
            setTwok((t) => ({ ...t, fonttype: r }));
            console.log(twok.fonttype);
          }}
        >
          <MaterialCommunityIcons name="format-font" size={50} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            SetChooseColor(2);
            console.log("cambia colore sfondo");
          }}
        >
          <MaterialCommunityIcons
            name="format-color-fill"
            size={50}
            color={`#${twok.bgcol}`}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={getPositionAsync}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={50}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {chooseColor == 1 ? (
        <ColorList setColor={SetTextColor} close={SetChooseColor} />
      ) : chooseColor == 2 ? (
        <ColorList setColor={SetBgColor} close={SetChooseColor} />
      ) : null}
      <Button
        color={"#4169E1"}
        title="INVIA"
        onPress={() => {
          console.log("testo: ", twok.text);
          addTwok(
            twok.sid,
            twok.text,
            twok.bgcol,
            twok.fontcol,
            twok.fontsize,
            twok.fonttype,
            twok.halign,
            twok.valign
          )
            .then((response) => {
              console.log("{Aggiunta Twok}: ", twok, "[RISPOSTA]: ", response);
              alert("Twok inviato");
              navigation.navigate("Home");
            })
            .catch((e) => {
              console.log(e, "il twok è: ", twok);
              alert("twok errato");
            });
        }}
      />
    </View>
  );
};

export default AddTwok;

const styles = StyleSheet.create({
  input: {
    height: "70%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

/* "bgcol": "000000", "fontcol": "FFFFFF", "fontsize": 1, "fonttype": 1, "halign": 2, "lat": null, "lon": null,
 "name": "unnamed", "pversion": 0, "text": "Prova234", "tid": 48, "uid": 10506, "valign": 1} */
