import { FlatList, TouchableOpacity, View } from "react-native";

const colors = [
  "FF0000",
  "FFFFFF",
  "00FFFF",
  "C0C0C0",
  "0000FF",
  "808080",
  "00008B",
  "000000",
  "ADD8E6",
  "FFA500",
  "800080",
  "A52A2A",
  "FFFF00",
  "800000",
  "00FF00",
  "008000",
  "FF00FF",
  "808000",
  "FFC0CB",
  "7FFFD4",
];

const ColorItem = ({ item, onSelection, close }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("ho selezionato: ", item);
        onSelection(item);
        close(false);
      }}
    >
      <View
        style={{ backgroundColor: `#${item}`, width: 70, height: 60 }}
      ></View>
    </TouchableOpacity>
  );
};

const ColorList = ({ setColor, close }) => {
  const listOfColors = colors;
  return (
    <FlatList
      horizontal={true}
      data={listOfColors}
      keyExtractor={listOfColors.id}
      renderItem={({ item }) => (
        <ColorItem item={item} onSelection={setColor} close={close} />
      )}
    />
  );
};

export default ColorList;
