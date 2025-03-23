import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from "react-native";
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
      {
        text: "Delete",
        style: "destructive",
        onPress: () => Alert.alert("Account deleted!"),
      },
    ]);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
    
      

      {/* User Info */}
      <Text style={[styles.text, isDarkMode && styles.darkText]}>John Doe</Text>
      <Text style={[styles.email, isDarkMode && styles.darkText]}>
        johndoe@example.com
      </Text>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Feather name="edit" size={20} color="#fff" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? "#1DB954" : "#ddd"}
        />
      </View>

      {/* Settings Button */}
      <TouchableOpacity
        style={[styles.button, styles.settingsButton]}
        onPress={() => navigation.navigate("Settings")}
      >
        <AntDesign name="setting" size={20} color="#fff" />
        <Text style={styles.buttonText}>Settings & Privacy</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
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
  button: {
    flexDirection: "row",
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 15,
  },
  buttonText: {
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
    color: "#333",
  },
  settingsButton: {
    backgroundColor: "#555",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
  },
  deleteButton: {
    backgroundColor: "#8B0000",
  },
});