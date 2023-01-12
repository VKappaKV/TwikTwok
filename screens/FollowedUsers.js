import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getFollowed, getPicture } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FollowedUsers = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState();
  useEffect(() => {
    handleGetFollowed().then(() =>
      console.log("VISUALIZZIAMO LA LISTA ", data, "OKOKOKOKOK")
    );
  }, []);

  const handleGetFollowed = async () => {
    const response = await getFollowed(user.sid);
    console.log("LA RISPOSTA: ", response);
    setData(response);
    return response;
  };

  const RenderItem = ({ item }) => (
    <Follower
      style={styles.profile}
      item={item}
      nav={navigation}
      setID={setUser}
    />
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
        }}
        style={styles.list}
        data={data}
        renderItem={RenderItem}
        ListEmptyComponent={<Text>NON HAI SEGUITO NESSUNO</Text>}
      />
    </View>
  );
};

const Follower = ({ item, nav, setID }) => {
  const { user } = useContext(UserContext);
  const [pfp, onPictureLoad] = useState();
  useEffect(() => {
    getPicture(user.sid, item.uid)
      .then((response) => onPictureLoad(response.picture))
      .catch((e) => console.log("the picture is", e))
      .finally((sm) => console.log("finally", sm));
  }, []);
  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        backgroundColor: "#6495ED",
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => {
          setID((p) => ({ ...p, selectedUser: item.uid }));
          nav.navigate("UserBoard");
        }}
      >
        {pfp ? (
          <Image
            source={{ uri: "data:image/png;base64," + pfp }}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <MaterialCommunityIcons
            name="account-circle"
            color={`white`}
            size={50}
          />
        )}
        <Text style={{ textTransform: "uppercase" }}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowedUsers;

const styles = StyleSheet.create({
  profile: {
    borderColor: "black",
    borderWidth: 4,
    marginBottom: 20,
  },
});
