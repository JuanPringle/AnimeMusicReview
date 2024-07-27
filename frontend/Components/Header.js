import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useDispatch } from 'react-redux';
import { setSearchSlice } from '../Store/Reducer/searchSlice';
import { useState } from 'react';

const Header = ({ title = 'OtakuTracks', onSearch }) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    'Jersey10-Regular': require('../assets/fonts/Jersey10-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleSearch = () => {
    dispatch(setSearchSlice(search));
    setSearch('');
    if (onSearch) onSearch(search); // Optional callback for search
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.titleButton}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          placeholderTextColor="white"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Pressable onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Enter</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#27272e',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  titleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Jersey10-Regular',
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: 15,
    color: 'white',
    marginRight: -1, // To avoid border overlapping with the button
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#1f1f1f', // Optional: add background color for the button
  },
  searchButtonText: {
    color: 'white',
  },
});

export default Header;