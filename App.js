import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "./Screens/AuthScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import SwipeableScreen from "./Screens/SwipeableScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MainTabs({ setIsAuthenticated }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Swipe") iconName = "swap-horizontal";
          else if (route.name === "Profile") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "white" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Swipe" component={SwipeableScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainTabs setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <AuthScreen setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
}