import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import { getProfile, setProfile } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const sid = user.sid;
  const [name, onNameChange] = useState();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  };

  return (
    <View style={{ backgroundColor: "#4169E1", height: "100%" }}>
      <TextInput
        style={styles.input}
        placeholder="SET YOUR NAME"
        placeholderTextColor={"white"}
        onChangeText={onNameChange}
      />
      <Text style={{ color: "rgb(135,206,250)" }}>{name}</Text>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={pickImage}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            color: "white",
          }}
        >
          Set Picture
        </Text>
        <MaterialCommunityIcons
          name="account-edit"
          size={40}
          color={"rgb(135,206,250)"}
        />
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: "data:image/png;base64," + image }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          title="Save Profile Changes"
          color={"green"}
          onPress={() =>
            setProfile(sid, name, image).then(() =>
              getProfile(sid)
                .then((response) => console.log(response))
                .then(setImage(null))
            )
          }
        />
        <Button
          color={"rgb(135,206,250)"}
          title="Followed"
          onPress={() => navigation.navigate("FollowedUsers")}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderColor: "rgb(135,206,250)",
    borderWidth: 1,
    padding: 10,
    color: "rgb(135,206,250)",
  },
});
