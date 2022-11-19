import { Button, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <MaterialCommunityIcons name="account" color="white" size={50} />
    </TouchableOpacity>
  );
};

const AddTwokButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("AddTwok")}>
      <MaterialCommunityIcons name="plus" color="white" size={50} />
    </TouchableOpacity>
  );
};

export { ProfileButton, AddTwokButton };
