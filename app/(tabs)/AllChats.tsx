import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

type User = {
    _id: string;
    username: string;
};

export default function AllChatsScreen() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<User[]>([]); // Specify type User[] for users

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search users..."
                value={search}
                onChangeText={setSearch}
                style={styles.input}
            />
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Text style={styles.user}>{item.username}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
    user: { padding: 10, borderBottomWidth: 1, fontSize: 16 },
});
