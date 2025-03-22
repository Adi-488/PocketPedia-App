import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAuth = () => {
    if (!isLogin) {
      if (!email || !password || !confirmPassword) {
        Alert.alert("Error", "All fields are required!");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match!");
        return;
      }
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => setIsLogin(true) },
      ]);
    } else {
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password!");
        return;
      }
      setIsAuthenticated(true);
    }
  };

  // ✅ Show Home Screen if user is authenticated
  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        {/* 🔹 App Logo in the Top-Left Corner */}
        <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />

        {/* 🔹 Search Bar in the Top-Right Corner */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            placeholderTextColor="#bbb"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.title}>Welcome to Home Page! 🎉</Text>

        <TouchableOpacity style={styles.button} onPress={() => setIsAuthenticated(false)}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ✅ Show Login/Signup screen
  return (
    <View style={styles.container}>
      {/* 🔹 App Logo in the Top-Left Corner */}
      <Image source={require("../../assets/images/Logo.png")} style={styles.logo} />

      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",  //Home page bg color
    padding: 20,
  },
  logo: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 100,  // Adjust width as needed
    height: 40,  // Adjust height as needed
    resizeMode: "contain",
  },
  searchContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  searchBar: {
    width: 220,
    height: 40,
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 15,
    color: "#bbb",
  },
});