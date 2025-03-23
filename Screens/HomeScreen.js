import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.welcomeText}>🎓 Welcome Back!</Text>
      <Text style={styles.subText}>Continue learning and growing.</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="gray" />
        <TextInput style={styles.searchInput} placeholder="Search topics..." />
      </View>

      {/* Quick Access Section */}
      <ScrollView contentContainerStyle={styles.cardsContainer} horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.card}>
          <FontAwesome5 name="book" size={28} color="#4A90E2" />
          <Text style={styles.cardText}>BookMarks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <AntDesign name="linechart" size={28} color="#E67E22" />
          <Text style={styles.cardText}>Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <FontAwesome5 name="users" size={28} color="#27AE60" />
          <Text style={styles.cardText}>Community</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FD",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  cardsContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    width: 120,
    height: 120,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "#444",
  },
});