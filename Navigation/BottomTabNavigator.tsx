import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }: { color: string; size: number }) => {
                let iconName: string = "";
              
                if (route.name === "Home") {
                  iconName = "home";
                } else if (route.name === "Profile") {
                  iconName = "person";
                } else {
                  iconName = "help-circle"; // Default icon for unknown screens
                }
              
                return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
              },
              
            tabBarActiveTintColor: "#1DB954", // Active tab color
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5 },
          })}
          
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
