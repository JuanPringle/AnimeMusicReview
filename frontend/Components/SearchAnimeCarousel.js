import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AnimeCard from './AnimeCard'

const SearchAnimeCarousel = () => {
  const [animes, setAnimes] = useState([])
  const query = useSelector(state => state.searches)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query.search}`)
      const json = await response.json()
      console.log(json.data)
      setAnimes(json.data)
    }
    fetchData()
  }, [query]);

  const renderAnime = ({item: anime}) => (
    <AnimeCard anime={anime} />
  )
  return (
    <View>
    {query ? (<>
      <Text style={{fontSize: 20, fontWeight: 'bold',color: 'white', paddingBottom: 10}}>Search Results</Text>
      <FlatList
       horizontal
       data={animes}
       renderItem={renderAnime}
       ItemSeparatorComponent={() => <View style={{width: 10}} />}
      />
    </>) : 
    <>
      <Text style={{fontSize: 20, fontWeight: 'bold',color: 'white', paddingBottom: 10}}>Search for an Anime</Text>
    </>  
    }
    </View>
  )
}

export default SearchAnimeCarousel