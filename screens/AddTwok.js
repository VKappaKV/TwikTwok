import {
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

const AddTwok = () => {
  const { user } = useContext(UserContext);
  const [textTwok, onTwokChange] = useState();
  const alignRow = ["left", "center", "right"];
  const alignCol = ["top", "center", "bottom"];
  const size = [20, 30, 50];
  const fonttype = ["normal", "monospace", "serif"];
  const iconAlingRow = [
    "format-align-left",
    "format-align-center",
    "format-align-right",
  ];
  const [color, SetColor] = useState();
  const [bgColor, SetBgColor] = useState();
  const [twok, setTwok] = useState({
    sid: `${user.sid}`,
    text: textTwok,
    bgcol: "000000",
    fontcol: "FFFFFF",
    fontsize: "1",
    fonttype: "1",
    halign: "1",
    valign: "1",
    lat: "null",
    lon: "null",
  });
  return (
    <View>
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
        placeholder="What's Twiking?"
        onChangeText={onTwokChange}
        multiline={true}
        maxLength={100}
      />
      <Text>AddTwok: {textTwok}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity onPress={() => console.log("cambia colore")}>
          <MaterialCommunityIcons name="format-color-text" size={50} />
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
          }}
        >
          <MaterialCommunityIcons name={iconAlingRow[twok.halign]} size={50} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("sposta allineamento verticale", alignCol[twok.valign]);
            let r = twok.valign + 1;
            if (r > 2) r = 0;
            setTwok((t) => ({ ...t, valign: r }));
          }}
        >
          <MaterialCommunityIcons name="format-align-middle" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("cambia grandezza font", size[twok.fontsize]);
            let r = twok.fontsize + 1;
            if (r > 2) r = 0;
            setTwok((t) => ({ ...t, fontsize: r }));
          }}
        >
          <MaterialCommunityIcons name="format-size" size={50} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("cambia font", fonttype[twok.fonttype]);
            let r = twok.fonttype + 1;
            if (r > 2) r = 0;
            setTwok((t) => ({ ...t, fonttype: r }));
          }}
        >
          <MaterialCommunityIcons name="format-font" size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("cambia colore")}>
          <MaterialCommunityIcons name="format-color-fill" size={50} />
        </TouchableOpacity>
      </View>
      <Button
        title="INVIA"
        onPress={() => addTwok(twok).catch((e) => console.log(e))}
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
