import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    sid: "L78v5Mv8vMdY620Vo0rP",
    selectedUser: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
