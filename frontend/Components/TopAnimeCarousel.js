import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import AnimeCard from './AnimeCard'

const TopAnimeCarousel = () => {
    const [animes, setAnimes] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://api.jikan.moe/v4/top/anime')
            const json = await response.json()
            setAnimes(json.data)
        }
        fetchData()
    },[]);
    const renderAnime = ({item: anime}) => (
        <AnimeCard anime={anime} />
    )

  return (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold',color: 'white', paddingBottom: 10}}>Top Anime</Text>
      <FlatList
       horizontal
       data={animes}
       renderItem={renderAnime}
       ItemSeparatorComponent={() => <View style={{width: 10}} />}
      />

    </View>
  )
}

export default TopAnimeCarousel