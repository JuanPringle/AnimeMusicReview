import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define card dimensions based on screen size
const CARD_WIDTH = width * 0.45;
const CARD_HEIGHT = height * 0.35;

const AnimeCard = ({ anime }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const navigation = useNavigation();
  const handlePress = async () => {
    navigation.navigate('Songs', { anime: anime.mal_id });
  };

  return (
    <View
      style={[
        styles.cardContainer,
        { width: CARD_WIDTH, height: CARD_HEIGHT }, // Responsive dimensions
        isHovered ? styles.hover : null,
        isPressed ? styles.pressed : null,
      ]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Pressable
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        key={anime.mal_id}
        onPress={handlePress}
        style={styles.button}
      >
        <ImageBackground source={{ uri: anime.images.jpg.image_url }} style={styles.imageBackground}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.gradient}
          >
            <Text style={styles.title}>{anime.title}</Text>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  button: {
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  hover: {
    borderColor: '#fff',
  },
  pressed: {
    borderColor: '#00f',
  },
});

export default AnimeCard;