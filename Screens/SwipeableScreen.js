import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons"; // Added Feather for Bookmark icon
import axios from "axios";

const { width, height } = Dimensions.get("window");

// Function to generate a new card with a random Wikipedia summary
const generateCard = async (index, usedTopics) => {
  try {
    const response = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary");
    const topic = response.data.title;

    // Avoid repeating topics
    if (usedTopics.includes(topic)) {
      return generateCard(index, usedTopics);
    }

    return {
      id: index.toString(),
      title: topic,
      text: response.data.extract || "No summary available.",
    };
  } catch (error) {
    console.error("Error fetching Wikipedia summary:", error);
    return {
      id: index.toString(),
      title: "Error Loading Data",
      text: "Failed to load summary. Please try again.",
    };
  }
};

export default function SwipeableScreen() {
  const [cards, setCards] = useState([]);
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [usedTopics, setUsedTopics] = useState([]);

  // Fetch initial cards
  useEffect(() => {
    const fetchInitialCards = async () => {
      setLoading(true);
      const initialCards = await Promise.all(
        Array.from({ length: 10 }, (_, i) => generateCard(i, usedTopics))
      );
      setCards(initialCards);
      setUsedTopics(initialCards.map((card) => card.title));
      setLoading(false);
    };
    fetchInitialCards();
  }, []);

  // Load more cards dynamically
  const loadMoreCards = async () => {
    if (loading) return;
    setLoading(true);
    const newCards = await Promise.all(
      Array.from({ length: 10 }, (_, i) => generateCard(cards.length + i, usedTopics))
    );
    setCards((prevCards) => [...prevCards, ...newCards]);
    setUsedTopics((prevTopics) => [...prevTopics, ...newCards.map((card) => card.title)]);
    setLoading(false);
  };

  // Toggle like
  const toggleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id],
    }));
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarks((prevBookmarks) => ({
      ...prevBookmarks,
      [id]: !prevBookmarks[id],
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        vertical
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreCards}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Card Title */}
            <Text style={styles.title}>{item.title}</Text>

            {/* Summary Text */}
            <Text style={styles.text}>{item.text}</Text>

            {/* Buttons Container */}
            <View style={styles.buttonsContainer}>
              {/* Like Button */}
              <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.iconButton}>
                <AntDesign
                  name={likes[item.id] ? "heart" : "hearto"}
                  size={28}
                  color={likes[item.id] ? "#e74c3c" : "#333"}
                />
                <Text style={[styles.iconText, likes[item.id] && { color: "#e74c3c" }]}>
                  {likes[item.id] ? "Liked" : "Like"}
                </Text>
              </TouchableOpacity>

              {/* Bookmark Button */}
              <TouchableOpacity onPress={() => toggleBookmark(item.id)} style={styles.iconButton}>
                <Feather
                  name={bookmarks[item.id] ? "bookmark" : "bookmark"}
                  size={28}
                  color={bookmarks[item.id] ? "#3498db" : "#333"}
                />
                <Text style={[styles.iconText, bookmarks[item.id] && { color: "#3498db" }]}>
                  {bookmarks[item.id] ? "Saved" : "Bookmark"}
                </Text>
              </TouchableOpacity>

              {/* Share Button */}
              <TouchableOpacity style={styles.iconButton}>
                <AntDesign name="sharealt" size={28} color="#333" />
                <Text style={styles.iconText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#555" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 20,
  },
  card: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: width * 0.05,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
});