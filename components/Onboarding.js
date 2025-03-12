import { Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';


const Onboarding = ({ navigation }) => {
   // Animation when the user enter the app 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Image 
  source={require("../assets/o2.jpg")}
  style={styles.image}
  onError={(error) => console.log('Image loading error:', error.nativeEvent)}
/>
        <Text style={styles.heading}>Welcome to My App!</Text>
        <Text style={styles.subtitle}>
          Discover amazing features and start your journey with us today.
        </Text>
      </Animated.View>

      <View style={styles.bottom}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('UserInfo')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 20,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});