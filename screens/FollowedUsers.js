import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getFollowed } from "../utility/ComunicationHandler";
import UserContext from "../utility/Context";
import { FlatList } from "react-native-gesture-handler";

const FollowedUsers = () => {
  const { user } = useContext(UserContext);
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
    <Follower style={styles.profile} item={item} />
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

const Follower = ({ item }) => {
  return (
    <View style={{ width: 300, backgroundColor: "green" }}>
      <TouchableOpacity onPress={() => console.log(item)}>
        <Text>name: {item.name}</Text>
        <Text>pversion: {item.pversion}</Text>
        <Text>uid: {item.uid}</Text>
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
