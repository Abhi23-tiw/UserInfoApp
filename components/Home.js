import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { fetchUsers } from '../api/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'; // For animations

const Home = () => {
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUsers();
            setUsers(data);
        };
        getUsers();
    }, []);

    if (users.length === 0) {
        return (
            <View style={styles.Lcontainer}>
                <ActivityIndicator size="large" color="#6B48FF" style={{ marginTop: 50 }} />
                <Text style={styles.loadingText}>Loading users...</Text>
            </View>
        );
    }

    // Handle cases where first_name or last_name might be undefined
    const user = users[index];
    const displayName = user?.first_name || user?.last_name
        ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
        : 'Unknown User';

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#6B48FF', '#00C4FF']}
                style={styles.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Animated Avatar - Use key to re-trigger animation */}
            <Animated.View
                key={`avatar-${index}`} // Key changes when index changes, triggering re-animation
                entering={FadeInDown.duration(600)}
            >
                <Image
                    source={{ uri: user?.avatar }}
                    style={styles.avatar}
                    resizeMode="cover"
                    defaultSource={require('../assets/o1.jpg')} // Added a default image
                />
            </Animated.View>

            {/* Animated Name and Email */}
            <Animated.View
                key={`name-email-${index}`} // Key changes when index changes, triggering re-animation
                entering={FadeInUp.duration(600).delay(200)}
            >
                <Text style={styles.name}>{displayName}</Text>
                <Text style={styles.detailTextEmail}>{user?.email || 'No email available'}</Text>
            </Animated.View>

            {/* User Info Cards */}
            <View style={styles.userContainer}>
                {['ID', 'UID', 'Password', 'Username'].map((label, i) => (
                    <Animated.View
                        key={`card-${label}-${index}`} // Key includes index to re-trigger animation
                        entering={FadeInDown.duration(400).delay(i * 100)}
                        style={styles.card}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.cardTextContainer}>
                                <Text style={styles.cardLabel}>{label}</Text>
                                <Text style={styles.cardValue}>
                                    {label.toLowerCase() === 'password'
                                        ? showPassword
                                            ? user?.password || 'N/A'
                                            : '••••••••'
                                        : user?.[label.toLowerCase()] || 'N/A'}
                                </Text>
                            </View>
                            {label.toLowerCase() === 'password' && (
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.toggleButton}
                                >
                                    <Ionicons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </Animated.View>
                ))}
            </View>

            {/* Navigation Buttons with Labels */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, index === 0 && styles.disabledButton]}
                    onPress={() => setIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={index === 0}
                >
                    <Ionicons name="chevron-back" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, index === users.length - 1 && styles.disabledButton]}
                    onPress={() => setIndex((prev) => Math.min(prev + 1, users.length - 1))}
                    disabled={index === users.length - 1}
                >
                    <Text style={styles.buttonText}>Next</Text>
                    <Ionicons name="chevron-forward" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    Lcontainer: {
        flex: 1,
        backgroundColor: 'aqua',
        alignItems: 'center',
        justifyContent: 'center', // Center the loading content vertically
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: -12,
        height: 280,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 4,
        borderColor: '#FFF',
        marginTop: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
    },
    userContainer: {
        marginTop: 1,
        width: '90%',
    },
    card: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1.2,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTextContainer: {
        flex: 1,
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
        fontFamily: 'System',
    },
    cardValue: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1F2937',
        marginTop: 5,
        fontFamily: 'System',
    },
    toggleButton: {
        padding: 10,
    },
    name: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 20,
        color: '#1F2937',
        fontFamily: 'System',
        textTransform: 'capitalize', // Capitalize the name for better presentation
    },
    detailTextEmail: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'System',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '80%', // Wider for better spacing
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#6B48FF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 5,
        fontFamily: 'System',
    },
    disabledButton: {
        backgroundColor: '#D1D5DB',
    },
    loadingText: {
        fontSize: 18,
        color: '#6B7280',
        fontWeight: '500',
        fontFamily: 'System',
        marginTop: 10,
    },
});