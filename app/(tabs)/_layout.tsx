import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllChats from './AllChats';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AllChats" component={AllChats} options={{ title: 'All Chats' }} />
            <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
}
