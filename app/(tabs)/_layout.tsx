import { Tabs } from "expo-router";
import { MessageCircle, Activity, Brain } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#1F1F1F',
          borderTopColor: '#374151',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Limnus Chat",
          tabBarIcon: ({ color }) => <MessageCircle color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Monitor",
          tabBarIcon: ({ color }) => <Activity color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="tphi10"
        options={{
          title: "T-Phi10",
          tabBarIcon: ({ color }) => <Brain color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
