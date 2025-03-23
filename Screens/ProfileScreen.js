import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function ProfileScreen({ setIsAuthenticated }) {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          setIsAuthenticated(false);
          navigation.replace("Auth");
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
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
     

      {/* User Info */}
      <Text style={[styles.text, isDarkMode && styles.darkText]}>John Doe</Text>
      <Text style={[styles.email, isDarkMode && styles.darkText]}>johndoe@example.com</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile")}>
        <Feather name="edit" size={24} color="#fff" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
        <AntDesign name="setting" size={24} color="white" />
        <Text style={styles.settingsText}>Settings & Privacy</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#222",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  darkText: {
    color: "#fff",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    color: "#000",
  },
  settingsButton: {
    flexDirection: "row",
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  settingsText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  deleteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});