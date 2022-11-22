import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { addTwok } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";

const AddTwok = () => {
  const { user } = useContext(UserContext);
  const [textTwok, onTwokChange] = useState();
  const [twok, setTwok] = useState({
    sid: user.sid,
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
        style={styles.input}
        placeholder="What's Twiking?"
        onChangeText={onTwokChange}
      />
      <Text>AddTwok: {textTwok}</Text>
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

/* "bgcol": "000000", "fontcol": "FFFFFF", "fontsize": 1, "fonttype": 1, "halign": 2, "lat": null, "lon": null,
 "name": "unnamed", "pversion": 0, "text": "Prova234", "tid": 48, "uid": 10506, "valign": 1} */
