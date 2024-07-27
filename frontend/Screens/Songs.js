import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import useAnimeInfo from '../Hooks/useAnimeInfo';
import useMusic from '../Hooks/useMusic';
import { useNavigation } from '@react-navigation/native';

const Songs = ({ route }) => {
  const { anime } = route.params;
  const animeInfo = useAnimeInfo(anime);
  const { music, videoId, setVideoId } = useMusic(animeInfo.title);
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handlePress = async (songTitle) => {
    try {
      const search = `${animeInfo.title} ${songTitle}`;
      const videoResponse = await fetch(`http://localhost:3000/get_video_id?query=${search}&api_key=AIzaSyDDD-oTFVGvJB1cf5zBUEM0S7jKJr110wg`);
      const videoJson = await videoResponse.json();
      setVideoId(videoJson.video_id);
      // Navigate to Details screen with the video ID
      navigation.navigate('Details', { anime: animeInfo.title, videoId: videoJson.video_id });
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handlePress(item)} style={styles.pressable}>
      <Text style={styles.itemText}>{item}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </Pressable>
      <Text style={styles.title}>Songs</Text>
      {music === null ? (
        <Text style={styles.noMusicText}>This anime has no music.</Text>
      ) : music.length > 0 ? (
        <FlatList
          data={music}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatList}
        />
      ) : (
        <Text style={styles.loadingText}>Loading music...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#27272e',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff',
  },
  flatList: {
    maxHeight: 250, // Adjust the height to fit 5 items
  },
  pressable: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    color: '#ffffff', // White color for FlatList items
  },
  noMusicText: {
    color: '#ffffff', // White color for "no music" text
  },
  loadingText: {
    color: '#ffffff', // White color for "loading" text
  },
  videoContainer: {
    marginTop: 20,
  },
  noVideoText: {
    color: '#ffffff', // White color for "no video" text
  },
  homeButton: {
    padding: 10,
    backgroundColor: '#1f1f1f', // Button background color
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  homeButtonText: {
    color: '#ffffff', // Button text color
    fontSize: 16,
  },
});

export default Songs;
