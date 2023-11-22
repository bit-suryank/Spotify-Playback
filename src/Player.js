import './player.css'
import { PauseCircleFilledOutlined, PlayCircleFilledOutlined, SkipNext, SkipPrevious, PictureInPicture } from '@material-ui/icons'
import { ThemeProvider, Typography } from '@material-ui/core'
import { useState,useEffect } from 'react'
import {play} from './Theme'
import {ResizablePIP} from "resizable-pip";


export default function Player(props){

    const track = {
        name: "",
        album: {
            images: [
                { url: "" }
            ]
        },
        artists: [
            { name: "" }
        ]
    }

    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);
    const [pipEnable, setPipEnable] = useState(false)

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Suryank Widget',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            })

            setPlayer(player);

            player.addListener('ready', ({device_id}) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({device_id}) => {
                console.log('Device ID has gone offline', device_id);
            })

            player.addListener('player_state_changed', (state => {
                if(!state) {
                    return;
                }
    
                setTrack(state.track_window.current_track)
                setPaused(state.paused);
    
                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });
            }));
            player.connect();

        }

    
    }, []);

    function togglePictureInPicture() {
        const video = document.getElementById("circ");
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
            video.requestPictureInPicture();
        }
    }

    if(!is_active){
        return(
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>
        )
    } else {
        if (pipEnable){
            return(
                <>
                    <ResizablePIP
                        width={500}
                        heigt={500}
                        minConstraints={[300, 300]}
                        maxConstraints={[800, 800]}
                    >
                        <ThemeProvider theme={play}>
                            <Typography variant='h5' color='secondary' className='text song'>{current_track.name}</Typography>
                            <Typography variant='subtitle1' color='secondary' className='text artist'>{current_track.artists[0].name}</Typography>
                            <svg id='circ'>
                                <circle 
                                    cx={200}
                                    cy={200}
                                    r= {200}
                                    fill='#191414'
                                    />
                            </svg>
                            <div className='seek'></div>
                            <SkipNext onClick={() => { player.nextTrack() }} color='secondary' className='button next' />
                            <div onClick={() => {player.togglePlay()}}>
                                {is_paused ? <PlayCircleFilledOutlined color='secondary' className='button pause' /> : <PauseCircleFilledOutlined color='secondary' className='button pause'/>}
                            </div>
                            <SkipPrevious onClick={() => { player.previousTrack() }} color='secondary' className='button previous' />
                            <PictureInPicture color='secondary' className='button pip' onClick={togglePictureInPicture}/>
                        </ThemeProvider>
                    </ResizablePIP>
                </>
            )
        } else {
            return(
                <>
                    <ThemeProvider theme={play}>
                        <Typography variant='h5' color='secondary' className='text song'>{current_track.name}</Typography>
                        <Typography variant='subtitle1' color='secondary' className='text artist'>{current_track.artists[0].name}</Typography>
                        <svg id='circ'>
                            <circle 
                                cx={200}
                                cy={200}
                                r= {200}
                                fill='#191414'
                                />
                        </svg>
                        <div className='seek'></div>
                        <SkipNext onClick={() => { player.nextTrack() }} color='secondary' className='button next' />
                        <div onClick={() => {player.togglePlay()}}>
                            {is_paused ? <PlayCircleFilledOutlined color='secondary' className='button pause' /> : <PauseCircleFilledOutlined color='secondary' className='button pause'/>}
                        </div>
                        <SkipPrevious onClick={() => { player.previousTrack() }} color='secondary' className='button previous' />
                        <PictureInPicture color='secondary' className='button pip' onClick={togglePictureInPicture}/>
                    </ThemeProvider>
                </>
            )
        }
    }
} 