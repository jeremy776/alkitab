import React, { useState } from "react";
import {
  Play,
  Pause,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ChristianMusicSection = () => {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set());

  const songs = [
    {
      id: 1,
      title: "Datang Roh Kudus",
      artist: "Sidney Mohede",
      album: "CROSS",
      genre: "Gospel/Contemporary",
      mood: "Worshipful",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      duration: "4:12",
      plays: "1.8M",
      description:
        "Lagu penyembahan yang mengekspresikan kerinduan akan kehadiran dan kuasa Roh Kudus dalam hidup",
    },
    {
      id: 2,
      title: "Sejuta Rasa",
      artist: "Army of God Worship",
      album: "Single",
      genre: "Gospel/Contemporary",
      mood: "Intimate",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop",
      duration: "4:23",
      plays: "850K",
      description:
        "Lagu penyembahan yang mengekspresikan kerinduan jiwa akan pelukan dan kasih Bapa yang hangat, diciptakan oleh Yoel Christian Budiyono",
    },
    {
      id: 3,
      title: "Jujur",
      artist: "Sidney Mohede",
      album: "Single",
      genre: "Gospel/Contemporary",
      mood: "Honest",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      duration: "3:58",
      plays: "1.5M",
      description:
        "Sebuah pengakuan jujur tentang kelemahan dan ketergantungan kepada Tuhan",
    },
    {
      id: 4,
      title: "Bapa Surgawi",
      artist: "True Worshippers",
      album: "All The Best",
      genre: "Gospel/Contemporary",
      mood: "Intimate",
      image:
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=300&fit=crop",
      duration: "4:25",
      plays: "2.4M",
      description:
        "Lagu yang mengekspresikan kerinduan untuk dekat dengan Bapa di surga",
    },

    {
      id: 5,
      title: "Kau Sungguh Baik",
      artist: "JPCC Worship",
      album: "Kau Sungguh Baik",
      genre: "Gospel/Contemporary",
      mood: "Thankful",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      duration: "4:08",
      plays: "1.6M",
      description:
        "Pengakuan iman tentang kebaikan Tuhan yang tidak pernah berubah",
    },
    {
      id: 6,
      title: "Sungguh Indah",
      artist: "True Worshippers",
      album: "All The Best",
      genre: "Gospel/Contemporary",
      mood: "Serene",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      duration: "4:12",
      plays: "1.6M",
      description:
        "Meditasi tentang keindahan ciptaan dan kasih Tuhan yang sempurna",
    },
    {
      id: 7,
      title: "Jangan Lelah",
      artist: "Franky Sihombing",
      album: "Best Of Praise And Worship, Vol. 1",
      genre: "Gospel/Contemporary",
      mood: "Encouraging",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      duration: "4:33",
      plays: "3.5M",
      description:
        "Lagu penyemangat untuk tetap bekerja di ladang Tuhan dengan kekuatan dari Roh Kudus",
    },
  ];

  const togglePlay = (songId: any) => {
    // setCurrentPlaying(currentPlaying === songId ? null : songId);
  };

  const toggleLike = (songId: any) => {
    // const newLiked = new Set(likedSongs);
    // if (newLiked.has(songId)) {
    //   newLiked.delete(songId);
    // } else {
    //   newLiked.add(songId);
    // }
    // setLikedSongs(newLiked);
  };

  const scrollContainer = (direction: any) => {
    const container = document.getElementById("songs-container");
    const scrollAmount = 320; // Width of one card plus gap
    container?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            🎵 Playlist Keren
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Lagu Rohani yang Lagi Hits
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dari contemporary worship sampai gospel kekinian - semua yang bikin
            hati adem dan jiwa tenang ✨
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => scrollContainer("left")}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scrollContainer("right")}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Songs Container */}
        <div
          id="songs-container"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {songs
            .map((song) => ({ ...song, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ sort, ...song }) => song)
            .map((song) => (
              <div
                key={song.id}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Album Art */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => togglePlay(song.id)}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      {currentPlaying === song.id ? (
                        <Pause className="w-6 h-6 text-indigo-600" />
                      ) : (
                        <Play className="w-6 h-6 text-indigo-600 ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Genre Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                      {song.mood}
                    </span>
                  </div>
                </div>

                {/* Song Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">
                        {song.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {song.artist}
                      </p>
                      <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
                        {song.genre}
                      </span>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleLike(song.id)}
                        className={`p-2 rounded-full transition-colors ${
                          likedSongs.has(song.id)
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedSongs.has(song.id) ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {song.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{song.duration}</span>
                    <span>{song.plays} plays</span>
                  </div>

                  {/* Progress Bar (if playing) */}
                  {currentPlaying === song.id && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-indigo-600 h-1 rounded-full animate-pulse"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
            🎧 Dengerin Playlist Lengkap
          </button> */}
          <p className="text-gray-600 text-sm mt-3">
            100+ lagu rohani kekinian lainnya di SelaVibes
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ChristianMusicSection;
