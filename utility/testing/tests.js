import { useContext } from "react";
import { getTwok, register } from "../ComunicationHandler";
import UserContext from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleTestTwok = async () => {
  const twokToFetch = [1, 2, 3];

  let testing_sid = await getSid();

  if (testing_sid === "" || testing_sid === null) {
    testing_sid = await logInUser();
  }

  twokToFetch.forEach((tid) =>
    getTwok(testing_sid, null, tid)
      .then((response) => console.log("risposta: ", response))
      .catch((e) => console.log("lanciato un errore: ", e))
  );
};

const getSid = async () => {
  return await AsyncStorage.getItem("sid");
};

const logInUser = async () => {
  const response = await register();
  console.log(response);
  setUser((user) => ({ ...user, sid: response.sid }));
  console.log("questo è il sid: ", response.sid, user);
  return response.sid;
};

export { handleTestTwok };
