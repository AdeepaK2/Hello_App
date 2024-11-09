import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const storedUsername = await AsyncStorage.getItem('username');
            const storedImage = await AsyncStorage.getItem('profileImage');
            if (storedUsername) setUsername(storedUsername);
            if (storedImage) setProfileImage(storedImage);
        };
        loadProfile();
    }, []);

    return (
        <View style={styles.container}>
            {profileImage && <Image source={{ uri: profileImage }} style={styles.image} />}
            <Text style={styles.username}>@{username}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    image: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
    username: { fontSize: 20 },
});
