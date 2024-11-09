import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from '../AppContext';

export default function Register() {
    const { onRegister } = useAppContext();
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleRegister = () => {
        onRegister(); // Set registration and authentication status
    };

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <Button title="Pick a Profile Image" onPress={handlePickImage} />
            {profileImage && <Image source={{ uri: profileImage }} style={styles.image} />}
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    input: { borderWidth: 1, padding: 10, marginVertical: 10, width: '80%' },
    image: { width: 100, height: 100, borderRadius: 50, marginVertical: 10 },
});
