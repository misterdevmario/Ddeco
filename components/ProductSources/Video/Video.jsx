/**
Componente del paquete `react-youtube` que muestra un video de YouTube con opciones especificadas y estilo especificado en `opts`.
Este componente toma el ID de la url dada por YouTube en el atributo `videoId`  
 */
import YouTube from "react-youtube";
import styles from './Video.module.css'

const Video = () => {

  const opts = {
    height: "500",
    width: "900",
    playerVars: {
        controls:1,
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <YouTube className={styles.video}
      videoId="5ohLrELHgCY"
      opts={opts}
    />
  );
};

export default Video;
