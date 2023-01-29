import { useContext } from "react";
import { getTwok, register } from "../ComunicationHandler";
import UserContext from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleTestTwok = async () => {
  const twokToFetch = [1, 2, 3];
  let twoksTested = [];

  let testing_sid = await getSid();

  if (testing_sid === "" || testing_sid === null) {
    testing_sid = await logInUser();
  }

  /*   async function extractTwoks() {
    twokToFetch
      .forEach(async (tid) => {
        const response = await getTwok(testing_sid, null, tid);
        console.log("risposta: ", response);
        twoksTested.push(response);
      })
      .catch((e) => console.log("lanciato un errore: ", e));
  }
 */
  for await (const tid of twokToFetch) {
    const response = await getTwok(testing_sid, null, tid);
    console.log("risposta: ", response);
    twoksTested.push(response);
  }

  console.log("[tested twoks to send: ]", twoksTested);
  return twoksTested;
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

const checkTwokParameteres = (twok) => {
  const dummyTwok = {
    bgcol: "FFFFFF",
    fontcol: "000000",
    fontsize: 1,
    fonttype: 1,
    halign: 1,
    lat: "",
    lon: "",
    text: "DUMMY TEXT",
    name: "DUMMY TWOKER",
    pversion: 1,
    tid: 1,
    uid: 23,
    valign: 1,
  };
  const regex = /[0-9A-Fa-f]{6}/g;

  if (!twok) return dummyTwok;

  twok.bgcol = twok.bgcol.match(regex) ? twok.bgcol : dummyTwok.bgcol;
  twok.fontcol = twok.fontcol.match(regex) ? twok.fontcol : dummyTwok.fontcol;
  twok.fontsize =
    twok.fontsize >= 0 && twok.fontsize <= 2
      ? twok.fontsize
      : dummyTwok.fontsize;
  twok.fonttype =
    twok.fonttype >= 0 && twok.fonttype <= 2
      ? twok.fonttype
      : dummyTwok.fonttype;
  twok.haling =
    twok.halign >= 0 && twok.halign <= 2 ? twok.halign : dummyTwok.halign;
  twok.valign =
    twok.valign >= 0 && twok.valign <= 2 ? twok.valign : dummyTwok.valign;

  console.log("twok checked...result: ", twok);
  return twok;
};

export { handleTestTwok, checkTwokParameteres };
