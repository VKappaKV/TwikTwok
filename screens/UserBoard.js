import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utility/Context";
import { Twok } from "../components/Twok";
import {
  follow,
  getTwok,
  isFollowed,
  unfollow,
} from "../utility/ComunicationHandler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UserBoard = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const sid = user.sid;
  const [mapAut, SetmapAut] = useState(new Map());
  const [data, setData] = useState([]);
  const [userIsFollowed, onFollowChange] = useState();

  useEffect(() => {
    handleGetTwok()
      .then((twok) => console.log(twok))
      .catch((e) => console.log("ERRORE IN [HandleGetTwok]: ", e));
    isFollowed(user.sid, user.selectedUser)
      .then((response) => {
        console.log(response);
        onFollowChange(response.followed);
      })
      .catch((e) => console.log("ERRORE: ", e));
  }, []);

  const handleFollowChange = () => {
    isFollowed(user.sid, user.selectedUser)
      .then((response) => {
        console.log(response);
        onFollowChange(response.followed);
      })
      .catch((e) => console.log("ERRORE: ", e));
  };

  const handleGetTwok = async () => {
    const response = await getTwok(sid, user.selectedUser /* "25308" */);
    setData((existingData) => [...existingData, response]);
    return response;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.twok}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <Twok
              sid={sid}
              item={item}
              auts={mapAut}
              onLoadPicture={SetmapAut}
              navigation={navigation}
            />
          )}
          keyExtractor={data.tid}
          //effetto di scrolling magnetico
          snapToInterval={Dimensions.get("window").height}
          snapToAlignment="start"
          decelerationRate="fast"
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            // console.log("chiamo un nuovo Twok");
            handleGetTwok();
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-end",
          height: 100,
        }}
      >
        {!userIsFollowed ? (
          <TouchableOpacity
            onPress={() => {
              follow(user.sid, user.selectedUser).then(() =>
                handleFollowChange()
              );
            }}
          >
            <MaterialCommunityIcons name="account-plus" size={50} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              unfollow(user.sid, user.selectedUser).then(() =>
                handleFollowChange()
              );
            }}
          >
            <MaterialCommunityIcons name="account-minus" size={50} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserBoard;

const styles = StyleSheet.create({});
