import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section with Overlay */}
      <ImageBackground source={{ uri: "https://source.unsplash.com/1600x900/?education,books" }} style={styles.header}>
        <View style={styles.overlay} />
        <Text style={styles.welcomeText}>Welcome Back 👋</Text>
        <Text style={styles.subText}>Continue learning and achieve your goals.</Text>
      </ImageBackground>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={20} color="#777" />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search courses, topics..." 
          placeholderTextColor="#777" 
        />
      </View>

      {/* Quick Access Section */}
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer} horizontal showsHorizontalScrollIndicator={false}>
        {quickAccessItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            {item.icon}
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView contentContainerStyle={styles.categoryContainer} horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Quick Access Items
const quickAccessItems = [
  { label: "Bookmarks", icon: <FontAwesome5 name="bookmark" size={28} color="#007AFF" /> },
  { label: "Progress", icon: <AntDesign name="linechart" size={28} color="#E67E22" /> },
  { label: "Community", icon: <FontAwesome5 name="users" size={28} color="#27AE60" /> },
  { label: "Support", icon: <MaterialIcons name="support-agent" size={28} color="#C0392B" /> },
];

// Course Categories
const categories = ["Technology", "Business", "Science", "Arts & Design"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    width: "100%",
    height: 200,
    justifyContent: "center", // Center the text
    alignItems: "center",
    paddingHorizontal: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay to enhance text contrast
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subText: {
    fontSize: 15,
    color: "#ECECEC",
    marginTop: 5,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: -25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginTop: 20,
    marginLeft: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    width: 130,
    height: 130,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    color: "#333",
  },
  
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  
  },
  categoryCard: {
    backgroundColor: "#1E88E5",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 22,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  categoryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});