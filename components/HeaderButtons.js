import { Button, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => navigation.navigate("Profile")}
    >
      <MaterialCommunityIcons name="account" color="white" size={30} />
    </TouchableOpacity>
  );
};

const AddTwokButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        width: 70,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => navigation.navigate("AddTwok")}
    >
      <MaterialCommunityIcons name="text-box-plus" color="white" size={30} />
    </TouchableOpacity>
  );
};

export { ProfileButton, AddTwokButton };
