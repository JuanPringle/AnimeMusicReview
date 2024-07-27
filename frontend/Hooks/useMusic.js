import { useState, useEffect, useMemo } from 'react';

const useMusic = (animeTitle) => {
  const [music, setMusic] = useState([]);
  const [videoId, setVideoId] = useState("");

  useMemo(() => {
    const getMusic = async () => {
      try {
        if (animeTitle) {
          const response = await fetch(`http://localhost:3000/searchAnimeMusic?query=${animeTitle}`);
          const json = await response.json();
          console.log(json.results);
          if (json.results === undefined) {
            setMusic(null); // Setting to null if no results found
          } else {
            setMusic(json.results);
            setVideoId(json.results[0]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    getMusic();
  }, [animeTitle]);

  return { music, videoId, setVideoId };
};

export default useMusic;