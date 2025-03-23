import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function ProfileScreen({ setIsAuthenticated }) {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          setIsAuthenticated(false);
          navigation.navigate("Auth"); // Navigates to Auth screen
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "This action is irreversible. Proceed?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => Alert.alert("Account deleted!") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* User Info */}
      <Text style={styles.text}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfile")}>
        <Feather name="edit" size={20} color="#000" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Settings")}>
        <AntDesign name="setting" size={20} color="#000" />
        <Text style={styles.buttonText}>Settings & Privacy</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAccount}>
        <Text style={[styles.buttonText, styles.deleteText]}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: "#EAEAEA",
  },
  logoutText: {
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#EAEAEA",
  },
  deleteText: {
    color: "#D32F2F",
  },
});