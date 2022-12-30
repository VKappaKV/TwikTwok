import { openDatabase } from "expo-sqlite";

// Create a new SQLite database
const db = openDatabase("users.db");

// Create a table for managing users
const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists users (
        uid integer primary key,
        picture text,
        pversion integer
      );`,
      [],
      () => {
        console.log("Users table created successfully");
      },
      (error) => {
        console.error("Error creating users table", error);
      }
    );
  });
};

// Insert a new user into the database
const insertUser = (uid, picture, pversion) => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert or ignore into users (uid, picture, pversion) values (?, ?, ?)",
      [uid, picture, pversion],
      () => {
        console.log("User inserted successfully");
      },
      (error) => {
        console.error("Error inserting user", error);
      }
    );
  });
};

// Get a user by their uid
const getUser = (uid) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from users where uid = ?",
        [uid],
        (_, { rows }) => {
          resolve(rows._array[0] || null);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

// Delete a user by their uid
const deleteUser = (uid) => {
  db.transaction((tx) => {
    tx.executeSql(
      "delete from users where uid = ?",
      [uid],
      () => {
        console.log("User deleted successfully");
      },
      (error) => {
        console.error("Error deleting user", error);
      }
    );
  });
};

// Get all users in the database
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from users",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

// Update an existing user
const updateUser = (uid, picture, pversion) => {
  db.transaction((tx) => {
    tx.executeSql(
      "update users set picture = ?, pversion = ? where uid = ?",
      [picture, pversion, uid],
      () => {
        console.log("User updated successfully");
      },
      (error) => {
        console.error("Error updating user", error);
      }
    );
  });
};

// Update the picture of a user if the pversion is lower
const updatePicture = async (uid, pversion, picture) => {
  try {
    // Get the user from the database
    const user = await getUser(uid);
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided pversion to the user's current pversion
    if (pversion <= user.pversion) {
      console.log("User picture is up to date");
      return;
    }

    // Update the user's picture and pversion in the database
    db.transaction((tx) => {
      tx.executeSql(
        "update users set picture = ?, pversion = ? where uid = ?",
        [picture, pversion, uid],
        (_, result) => {
          console.log("User picture and pversion updated successfully", result);
        },
        (error) => {
          throw error;
        }
      );
    });
  } catch (error) {
    console.error("Error updating user picture", error);
  }
};

export {
  createTable,
  insertUser,
  updatePicture,
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
};
