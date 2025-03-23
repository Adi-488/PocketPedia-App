import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

// Define the type for a card
interface Card {
  id: string;
  color: string;
  text: string;
}

// Define the props for the SwipeableCard component
interface SwipeableCardProps {
  card: Card;
  index: number;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

// Function to generate a card
const generateCard = (index: number): Card => ({
    id: index.toString(),
    color: `hsl(${Math.random() * 360}, 80%, 60%)`, // Corrected string interpolation
    text: `Card ${index}`, // Fixed template literal
});

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [cards, setCards] = useState<Card[]>(Array.from({ length: 100 }, (_, i) => generateCard(i)));

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
      Alert.alert("Success", "Account created successfully!", [{ text: "OK", onPress: () => setIsLogin(true) }]);
    } else {
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password!");
        return;
      }
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
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

  const renderScreen = () => {
    switch (currentScreen) {
      case "profile":
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen("home")}>
              <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        );
      case "swipe":
        return (
          <GestureHandlerRootView style={styles.container}>
            {cards.map((card, index) => (
              <SwipeableCard key={card.id} card={card} index={index} setCards={setCards} />
            ))}
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen("home")}>
              <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
          </GestureHandlerRootView>
        );
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen("profile")}>
              <Text style={styles.buttonText}>Go to Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCurrentScreen("swipe")}>
              <Text style={styles.buttonText}>Go to Swipe Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setIsAuthenticated(false)}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return renderScreen();
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ card, index, setCards }) => {
    const translateY = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }]
    }));
  
    const gesture = Gesture.Pan()
      .onUpdate((event) => {
        translateY.value = event.translationY;
      })
      .onEnd((event) => {
        if (event.translationY < -150) {
          translateY.value = withSpring(-height, {}, () => {
            if (typeof setCards === "function") { // <-- Check before calling
              setCards((prevCards) => {
                const newCards = prevCards.filter((_, i) => i !== index);
                newCards.push(generateCard(prevCards.length));
                return newCards;
              });
            } else {
              console.error("setCards is not a function!", setCards);
            }
          });
        } else {
          translateY.value = withSpring(0);
        }
      });
  
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, { backgroundColor: card.color }, animatedStyle]}>
          <Text style={styles.text}>{card.text}</Text>
        </Animated.View>
      </GestureDetector>
    );
  };
  

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  input: { width: "100%", height: 50, backgroundColor: "#222", borderRadius: 8, paddingHorizontal: 15, color: "#fff", marginBottom: 15 },
  button: { backgroundColor: "#1DB954", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  switchText: { marginTop: 15, color: "#bbb" },
  card: { position: "absolute", width: width * 0.9, height: height * 0.7, justifyContent: "center", alignItems: "center", borderRadius: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5, alignSelf: "center" },
  text: { fontSize: 28, fontWeight: "bold", color: "white" },
});