import { Button } from "react-native";

const ProfileButton = ({ navigation }) => {
  return (
    <Button
      onPress={() => navigation.navigate("Profile")}
      title="Profilo"
      color="rgb(135,206,250)"
    />
  );
};

const AddTwokButton = ({ navigation }) => {
  return (
    <Button
      onPress={() => navigation.navigate("AddTwok")}
      title="Aggiungi Twok"
      color="rgb(135,206,250)"
    />
  );
};

export { ProfileButton, AddTwokButton };
