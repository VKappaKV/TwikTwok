import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import { getProfile, setProfile } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";

const Profile = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const sid = user.sid;
  const [name, onNameChange] = useState();
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="SET YOUR NAME"
        onChangeText={onNameChange}
      />
      <Text>{name}</Text>
      <Button
        title="Set Profile Name"
        onPress={() =>
          setProfile(sid, name).then(() =>
            getProfile(sid).then((response) => console.log(response))
          )
        }
      />
      <Button
        title="Followed"
        onPress={() => navigation.navigate("FollowedUsers")}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
