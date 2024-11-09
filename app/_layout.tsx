import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { useAppContext, AppProvider } from './AppContext';

function AuthOrTabsLayout() {
    const { isAuthenticated, loading } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        // Only attempt to navigate once loading is complete
        if (!loading && !isAuthenticated) {
            router.replace('/(auth)/Login');
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        // Display a loading spinner while checking authentication status
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Render the main layout if authenticated
    return <Slot />;
}

export default function RootLayout() {
    return (
        <AppProvider>
            <AuthOrTabsLayout />
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
