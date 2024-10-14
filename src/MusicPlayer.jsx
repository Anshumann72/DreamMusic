import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SearchIcon,
} from "lucide-react";
import logo from "./assets/logo.png";
import homeIcon from "./assets/home.png";
import trendsIcon from "./assets/trends.png";
import libraryIcon from "./assets/library.png";
import discoverIcon from "./assets/discover.png";
import Mike from "./assets/Artist.png";
import Cover from "./assets/Pic.png";
import Log from "./assets/Log Out.png";
import Setting from "./assets/Settings.png";

const initialSongs = [
  {
    id: "1",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller 25 Sup...",
    duration: "4:53",
    plays: "1B+",
  },
  {
    id: "2",
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller 25 Sup...",
    duration: "4:18",
    plays: "800M+",
  },
  {
    id: "3",
    title: "Smooth Criminal - 2012 Rema...",
    artist: "Michael Jackson",
    album: "Thriller 25 Sup...",
    duration: "4:17",
    plays: "400M+",
  },
  {
    id: "4",
    title: "Don't Stop 'Til You Get Enough",
    artist: "Michael Jackson",
    album: "Bad 25th Anni...",
    duration: "6:05",
    plays: "300M+",
  },
  {
    id: "5",
    title: "Rock With You - Single Version",
    artist: "Michael Jackson",
    album: "Off The Wall",
    duration: "3:40",
    plays: "200M+",
  },
];

const MusicPlayer = () => {
  const [songs, setSongs] = useState(initialSongs);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    if (currentSong) {
      console.log(`Attempting to load song: ${currentSong.id}`);
      const newSound = new Howl({
        src: [`/path/${currentSong.id}.mp3`],
        html5: true,
        volume: 1.0,
        onload: () => {
          console.log(`Song ${currentSong.id} loaded successfully`);
        },
        onloaderror: (id, error) => {
          console.error(`Error loading song ${currentSong.id}:`, error);
        },
        onplay: () => {
          console.log(`Song ${currentSong.id} started playing`);
        },
        onend: () => {
          console.log(`Song ${currentSong.id} ended`);
          playNext();
        },
      });
      setSound(newSound);
    }
    return () => {
      if (sound) {
        console.log("Unloading previous sound");
        sound.unload();
      }
    };
  }, [currentSong]);

  const togglePlay = () => {
    if (sound) {
      if (isPlaying) {
        console.log("Pausing song");
        sound.pause();
      } else {
        console.log("Playing song");
        sound.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("No sound loaded to play/pause");
    }
  };

  const playSong = (song) => {
    console.log(`Attempting to play song: ${song.id}`);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    playSong(nextSong);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousSong =
      songs[(currentIndex - 1 + songs.length) % songs.length];
    playSong(previousSong);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSongs(items);
  };

  return (
    <div className="flex bg-gray-900 text-white h-100vh">
      <aside className="w-64 bg-black p-4">
        <div className="flex items-center mb-16">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2 ml-2" />
          <h1 className="text-red-500 text-2xl font-bold">
            Dream<span className="text-white">Music</span>
          </h1>
        </div>
        <span className="text-sm mb-8 text-gray-400">Menu</span>
        <nav className="space-y-20">
          <ul className="space-y-2 ml-4">
            <li className="flex items-center">
              <img src={homeIcon} alt="Home Icon" className="w-4 h-4 mr-2" />
              Home
            </li>
            <li className="flex items-center">
              <img
                src={trendsIcon}
                alt="Trends Icon"
                className="w-4 h-4 mr-2"
              />
              Trends
            </li>
            <li className="flex items-center">
              <img
                src={libraryIcon}
                alt="Library Icon"
                className="w-4 h-4 mr-2"
              />
              Library
            </li>
            <li className="flex items-center">
              <img
                src={discoverIcon}
                alt="Discover Icon"
                className="w-4 h-4 mr-2"
              />
              Discover
            </li>
          </ul>
        </nav>

        <nav className="mt-96 ">
          <span className="text-sm mb-8 text-gray-400">General</span>
          <ul className="space-y-2 ml-4">
            <li className="flex items-center">
              <img src={Setting} alt="Home Icon" className="w-4 h-4 mr-2" />
              Setting
            </li>
            <li className="flex items-center">
              <img src={Log} alt="Trends Icon" className="w-4 h-4 mr-2" />
              Log Out
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-grow p-8 bg-gradient-to-b from-red-800 to-black">
        <header className=" p-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-10">
                <li className="hover:text-gray-300 cursor-pointer ">Music</li>
                <li className="hover:text-gray-300 cursor-pointer">Podcast</li>
                <li className="hover:text-gray-300 cursor-pointer">Live</li>
                <li className="hover:text-gray-300 cursor-pointer">Radio</li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Michael Jackson"
              className="bg-black text-white px-3 py-1 rounded-full w-96"
            />
            <button className="text-white ">
              <SearchIcon size={20} />
            </button>
          </div>
        </header>
        <header className="mb-8">
          <img
            src={Mike}
            alt="Michael Jackson"
            className="w-full h-96 object-contain rounded-lg mt-4 mb-4"
          />
          <h2 className="text-3xl font-bold mt-4">Michael Jackson</h2>
          <p className="text-gray-400">27,832,501 monthly listeners</p>
        </header>

        <section>
          <h3 className="text-xl font-semibold mb-4">Popular</h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="songList">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {songs.map((song, index) => (
                    <Draggable
                      key={song.id}
                      draggableId={song.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center p-2 rounded ${
                            currentSong && currentSong.id === song.id
                              ? "bg-red-900"
                              : "hover:bg-gray-800"
                          }`}
                          onClick={() => playSong(song)}
                        >
                          <span className="w-8">{index + 1}</span>
                          <span className="flex-grow">{song.title}</span>
                          <span className="w-24">{song.plays}</span>
                          <span className="w-16">{song.duration}</span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      </main>

      <aside className="w-64 bg-gradient-to-b from-red-950 to-black  p-4 flex flex-col justify-between ">
        <div className="bg-red-700 rounded-lg p-4 mt-auto mb-20">
          <span className="flex justify-center items-center text-center">
            Now Playing
          </span>
          <img
            src={Cover}
            alt="Album cover"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h4 className="font-semibold">
            {currentSong ? currentSong.title : "Select a song"}
          </h4>
          <p className="text-sm text-gray-400">
            {currentSong ? currentSong.artist : ""}
          </p>
          <div className="flex justify-between items-center mt-4">
            <button onClick={playPrevious}>
              <SkipBackIcon />
            </button>
            <button
              onClick={togglePlay}
              className="bg-red-500 rounded-full p-2"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={playNext}>
              <SkipForwardIcon />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MusicPlayer;
