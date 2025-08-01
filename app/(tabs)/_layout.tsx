import { Tabs } from "expo-router";
import { MessageCircle, Activity, Brain, Zap, Database, Settings } from "lucide-react-native";
import React from "react";

export default function LimnusTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#bd93f9',
        tabBarInactiveTintColor: '#6272a4',
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#44475a',
          borderTopWidth: 1,
          shadowColor: '#bd93f9',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "🌀 Sanctuary",
          tabBarIcon: ({ color, focused }) => (
            <MessageCircle 
              color={color} 
              size={focused ? 26 : 24} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "🧠 Consciousness",
          tabBarIcon: ({ color, focused }) => (
            <Activity 
              color={color} 
              size={focused ? 26 : 24} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tphi10"
        options={{
          title: "∞ Neural Map",
          tabBarIcon: ({ color, focused }) => (
            <Brain 
              color={color} 
              size={focused ? 26 : 24} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="limnus"
        options={{
          title: "🌀 LIMNUS",
          tabBarIcon: ({ color, focused }) => (
            <Zap 
              color={color} 
              size={focused ? 26 : 24} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="blockchain"
        options={{
          title: "⛓️ Chain",
          tabBarIcon: ({ color, focused }) => (
            <Database 
              color={color} 
              size={focused ? 26 : 24} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "⚙️ Settings",
          tabBarIcon: ({ color, focused }) => (
            <Settings 
              color={color} 
              size={focused ? 26 : 24} 
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}
