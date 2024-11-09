import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../AppContext';

export default function Login() {
    const { onLogin } = useAppContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Authenticate with backend (mocked here)
        onLogin(); // Update auth status after login
    };

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    input: { borderWidth: 1, padding: 10, marginVertical: 10, width: '80%' },
});
