import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utility/Context";
import { getTwok, register } from "../utility/ComunicationHandler";
import { Twok } from "../components/Twok";
import { FlatList } from "react-native-gesture-handler";

const HomeBoard = () => {
  //hardcoded sid (da sostituire con il context quando aggiungo la memoria locale)
  //const { user, setUser } = useContext(UserContext);
  const user = "L78v5Mv8vMdY620Vo0rP";
  //Mappa Autori Twok con le loro PFP
  const [mapAut, SetmapAut] = useState(new Map());
  //array dei twok
  const [data, setData] = useState([]);
  //oggetto di risposta usato per aggiornare data (in qualche modo confuso ma funziona [DA FIXARE E RIMUOVERE])
  const [response, setResponse] = useState();
  //flag per gestire l'inizio dell'azione di scroll per visualizzare gli indicatori ai bordi
  const [beginScroll, setBeginScroll] = useState(false);
  //offset e direction utili per gestire l'aggiornamento dei twok solo quando si scrolla in basso
  const [offset, SetOffset] = useState(0);
  const [direction, SetDirection] = useState();
  useEffect(() => {
    if (user == null) {
      register()
        .then((response) => {
          console.log(response);
          setUser(response.sid);
        })
        .catch((e) => console.log(e));
    } else {
      console.log("user già identificato: ", user);
      handleGetTwok();
      console.log(data);
    }
  }, []);

  //funziona al load iniziale, ma non nello scroll o col button
  const handleGetTwok = () => {
    console.log("sono il get twok iniziale");
    getTwok(user).then((response) => {
      setData((existingData) => {
        return [...existingData, data.push(response)];
      });
    });
  };

  //funziona nello scroll e col button, non nello useEffect
  const handleGetWorkingTwok = () => {
    getTwok(user).then((response) => {
      setResponse(response);
      data.push(response);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.twok}>
        {beginScroll ? <Text>go back ^</Text> : null}
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <Twok
              sid={user}
              item={item}
              auts={mapAut}
              onLoadPicture={SetmapAut}
            />
          )}
          keyExtractor={data.tid}
          //effetto di scrolling magnetico
          snapToInterval={Dimensions.get("window").height}
          snapToAlignment="start"
          decelerationRate="fast"
          //gestisco l'inizio dello scroll
          onScrollBeginDrag={() => {
            setBeginScroll(true);
          }}
          //a fine scroll rimuovo il flag dell'evento scroll
          onScrollEndDrag={() => {
            setBeginScroll(false);
          }}
          //lo uso per capire in che direzione avviene lo scroll
          onScroll={(event) => {
            let currentOffset = event.nativeEvent.contentOffset.y;
            let direction = currentOffset > offset ? "down" : "up";
            SetOffset(currentOffset);
            SetDirection(direction);
          }}
          /* Metodo da utilizzare per ottenere un indice per l'oggetto della Flatlist in display, se è l'ultimo e scrollo verso il basso richiedo un nuovo Twok*/
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.y) /
                Math.floor(event.nativeEvent.layoutMeasurement.height)
            );
            if (direction === "down" && index === data.length) {
              console.log("CARICO UN NUOVO TWOK");
              handleGetWorkingTwok();
            }
          }}
        />
      </View>
      {beginScroll ? <Text>load more</Text> : null}
      {data ? (
        <Button title="Dammi un Twok" onPress={() => handleGetWorkingTwok()} />
      ) : null}
    </SafeAreaView>
  );
};

export default HomeBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  twok: {
    backgroundColor: "grey",
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  list: {
    width: "100%",
  },
});
