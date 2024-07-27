import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, Button, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { LinearGradient } from 'expo-linear-gradient';
import CreateReview from '../Components/CreateReview';
import DisplayReviews from '../Components/DisplayReviews';

const Details = ({ route }) => {
  // Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define card dimensions based on screen size
const VIDEO_WIDTH = width * 1;
const VDIEO_HEIGHT = height * 0.4;
  const { anime, videoId } = route.params;

  useEffect(() => {
    async function fetchAnimeInfo() {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const json = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    fetchAnimeInfo();
  }, [anime]);

  return (
    <ScrollView>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        style={styles.gradient}
      />
      <YoutubePlayer
        height={VDIEO_HEIGHT}
        width={VIDEO_WIDTH}
        play={true}
        videoId={videoId}
        useLocalHTML={true}
      />
      <CreateReview/>
      <DisplayReviews/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%', // Adjust the height as needed
    justifyContent: 'flex-end',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: '50%', // Adjust the height to cover the desired area
  },
  textContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: to make text more readable
  },
});

export default Details;
