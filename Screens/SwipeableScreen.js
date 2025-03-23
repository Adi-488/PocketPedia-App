import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const { width, height } = Dimensions.get("window");

// Function to generate a new card with a random Wikipedia summary
const generateCard = async (index, usedTopics) => {
  try {
    const response = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary");
    const topic = response.data.title;

    // Avoid repeating topics
    if (usedTopics.includes(topic)) {
      console.log("Duplicate topic found, fetching another...");
      return generateCard(index + 1, usedTopics); // Fetch another topic
    }

    return {
      id: index.toString(),
      color: hsl(${Math.random() * 360}, 80%, 60%), // ✅ Fixed template string
      text: response.data.extract || "No summary available.", // Wikipedia summary
      topic: topic, // Store topic to prevent duplicates
    };
  } catch (error) {
    console.error("Error fetching Wikipedia summary:", error);
    return {
      id: index.toString(),
      color: hsl(${Math.random() * 360}, 80%, 60%), // ✅ Fixed template string
      text: "Failed to load summary. Please try again.", // Fallback text
      topic: "Error", // Fallback topic
    };
  }
};

export default function SwipeableScreen() {
  const [cards, setCards] = useState([]);
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(false);
  const [usedTopics, setUsedTopics] = useState([]); // Track used topics

  // Fetch initial cards
  useEffect(() => {
    const fetchInitialCards = async () => {
      setLoading(true); // Start loading
      const initialCards = await Promise.all(
        Array.from({ length: 10 }, (_, i) => generateCard(i, usedTopics))
      );
      setCards(initialCards);
      setUsedTopics(initialCards.map((card) => card.topic)); // Update used topics
      setLoading(false); // Stop loading
    };
    fetchInitialCards();
  }, []);

  // Function to add more cards dynamically when user reaches the end
  const loadMoreCards = async () => {
    if (loading) return; // Prevent multiple calls
    setLoading(true); // Start loading
    const newCards = await Promise.all(
      Array.from({ length: 10 }, (_, i) => generateCard(cards.length + i, usedTopics))
    );
    setCards((prevCards) => [...prevCards, ...newCards]);
    setUsedTopics((prevTopics) => [...prevTopics, ...newCards.map((card) => card.topic)]); // Update used topics
    setLoading(false); // Stop loading
  };

  // Toggle like button
  const toggleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id], // Toggle like state
    }));
  };

  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.id}
      vertical
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onEndReached={loadMoreCards} // Load more when reaching bottom
      onEndReachedThreshold={0.7} // ✅ Adjusted threshold for better triggering
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: item.color }]}>
          <Text style={styles.title}>{item.topic}</Text>
          <Text style={styles.text}>{item.text}</Text>

          {/* Buttons on Right Side */}
          <View style={styles.buttonsContainer}>
            {/* Like Button */}
            <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.iconButton}>
              <AntDesign
                name={likes[item.id] ? "heart" : "hearto"}
                size={32}
                color={likes[item.id] ? "red" : "white"}
              />
              <Text style={styles.iconText}>{likes[item.id] ? "Liked" : "Like"}</Text>
            </TouchableOpacity>

            {/* Share Button */}
            <TouchableOpacity style={styles.iconButton}>
              <AntDesign name="sharealt" size={32} color="white" />
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#fff" /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  buttonsContainer: {
    position: "absolute",
    right: 20,
    bottom: 120,
    alignItems: "center",
  },
  iconButton: {
    marginBottom: 20,
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
});