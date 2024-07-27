import { useState, useEffect, useMemo } from 'react';

const useAnimeInfo = (animeId) => {
  const [animeInfo, setAnimeInfo] = useState({});
  
  useMemo(() => {
    const getAnimeInfo = async () => {
      try {
        const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
        const animeJson = await animeResponse.json();
        setAnimeInfo(animeJson.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    if (animeId) {
      getAnimeInfo();
    }
  }, [animeId]);

  return animeInfo;
};

export default useAnimeInfo;