import React, { useLayoutEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import TopAnimeCarousel from '../Components/TopAnimeCarousel';
import SearchAnimeCarousel from '../Components/SearchAnimeCarousel';

const Home = () => {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <SearchAnimeCarousel />
        <TopAnimeCarousel />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27272e',
  },
  scrollViewContent: {
    paddingBottom: 20, // Add some padding at the bottom to avoid content being cut off
  },
});

export default Home;