import React, { useRef, useState, useEffect } from "react";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const ChristianMusicSection = () => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());
  const audioRefs = useRef<Map<number, HTMLAudioElement>>(new Map());
  const [durations, setDurations] = useState<Record<number, number>>({});
  const [currentTime, setCurrentTime] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState<Set<number>>(new Set());

  const songs = [
    {
      id: 1,
      title: "Jangan Lelah",
      artist: "Franky Sihombing",
      album: "Blessing Of Praise & Worship",
      genre: "Gospel/Contemporary",
      mood: "Encouraging",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      duration: 272, // 4:32 dalam detik
      plays: "3.3M",
      description:
        "Lagu penyemangat untuk tetap bekerja di ladang Tuhan dengan kekuatan dari Roh Kudus",
      audio: "/music/jangan-lelah.mp3",
    },
    {
      id: 2,
      title: "Sebab Dia Hidup",
      artist: "Various Artists (Herlin Pirena, Ourel)",
      album: "Lagu Rohani Kristen",
      genre: "Gospel/Contemporary Christian",
      mood: "Hopeful/Encouraging",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      duration: 346,
      plays: "Popular",
      description:
        "Lagu rohani yang memberikan pengharapan dan kekuatan, mengingatkan bahwa karena Yesus hidup, ada harapan untuk hari esok",
      audio: "/music/sebab-dia-hidup.mp3",
    },
  ];

  useEffect(() => {
    // Initialize durations from song data
    const initialDurations: Record<number, number> = {};
    songs.forEach((song) => {
      initialDurations[song.id] = song.duration;
    });
    setDurations(initialDurations);
  }, []);

  useEffect(() => {
    // Update current time for playing audio
    const interval = setInterval(() => {
      if (currentPlaying) {
        const audio = audioRefs.current.get(currentPlaying);
        if (audio && !audio.paused) {
          setCurrentTime((prev) => ({
            ...prev,
            [currentPlaying]: audio.currentTime,
          }));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlaying]);

  const handleLoadedMetadata = (songId: number, audio: HTMLAudioElement) => {
    setDurations((prev) => ({
      ...prev,
      [songId]: audio.duration,
    }));
    setIsLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(songId);
      return newSet;
    });
  };

  const handleLoadStart = (songId: number) => {
    setIsLoading((prev) => new Set(prev).add(songId));
  };

  const handleError = (songId: number) => {
    setIsLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(songId);
      return newSet;
    });
    console.error(`Failed to load audio for song ${songId}`);
  };

  const togglePlay = (songId: number) => {
    const audio = audioRefs.current.get(songId);
    if (!audio) return;

    // Stop other playing audio
    if (currentPlaying && currentPlaying !== songId) {
      const prevAudio = audioRefs.current.get(currentPlaying);
      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }
    }

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setCurrentPlaying(songId);
    } else {
      audio.pause();
      setCurrentPlaying(null);
    }
  };

  const toggleLike = (songId: number) => {
    const updated = new Set(likedSongs);
    if (updated.has(songId)) {
      updated.delete(songId);
    } else {
      updated.add(songId);
    }
    setLikedSongs(updated);
  };

  const handleShare = async (song: (typeof songs)[0]) => {
    const shareText = `🎵 Lagi dengerin "${song.title}" by ${song.artist}\n\n${song.description}\n\nDengar lagu rohani keren lainnya di SelaVibes! ✨`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${song.title} - ${song.artist}`,
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("Link berhasil disalin ke clipboard! 📋");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("songs-container");
    const scrollAmount = 320;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getProgressPercentage = (songId: number) => {
    const current = currentTime[songId] || 0;
    const total = durations[songId] || 1;
    return (current / total) * 100;
  };

  return (
    <section id='music' className="min-h-screen bg-gradient-to-br bg-white py-16 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          {/* <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
            <span className="text-2xl animate-bounce">🎵</span>
            <span className="text-indigo-700 font-semibold text-md">
              Playlist Keren
            </span>
          </div> */}
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-indigo-700 bg-white/80 rounded-full shadow-sm">
            🎵 Playlist Keren
          </span>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Lagu Rohani yang
              <br />
              <span className="">Lagi Hits</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Dari contemporary worship sampai gospel kekinian - semua yang
              bikin
              <br />
              <span className="text-indigo-600 font-medium">
                hati adem dan jiwa tenang ✨
              </span>
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-3 mb-8">
          <button
            onClick={() => scrollContainer("left")}
            className="group p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-white/50 transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollContainer("right")}
            className="group p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-white/50 transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Songs Container */}
        <div
          id="songs-container"
          className="flex gap-8 p-2 overflow-x-auto scrollbar-hide scroll-smooth pb-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="flex-shrink-0 w-80 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                {/* Glow Effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div> */}

                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
                  {/* Album Art */}
                  <div className="relative overflow-hidden">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => togglePlay(song.id)}
                        disabled={isLoading.has(song.id)}
                        className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border-4 border-white/50"
                      >
                        {isLoading.has(song.id) ? (
                          <div className="w-8 h-8 border-3 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
                        ) : currentPlaying === song.id ? (
                          <svg
                            className="w-8 h-8 text-indigo-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 19h4V5H6v14zM14 5v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-8 h-8 text-indigo-600 ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Mood Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-700 rounded-full shadow-lg">
                        {song.mood}
                      </span>
                    </div>

                    {/* Genre Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-indigo-500/90 to-purple-500/90 backdrop-blur-sm text-sm font-semibold text-white rounded-full shadow-lg">
                        {song.genre.split("/")[0]}
                      </span>
                    </div>

                    {/* Audio Element */}
                    <audio
                      ref={(el) => {
                        if (el) {
                          audioRefs.current.set(song.id, el);
                        }
                      }}
                      src={song.audio}
                      onLoadStart={() => handleLoadStart(song.id)}
                      onLoadedMetadata={(e) =>
                        handleLoadedMetadata(song.id, e.currentTarget)
                      }
                      onEnded={() => setCurrentPlaying(null)}
                      onError={() => handleError(song.id)}
                      preload="metadata"
                    />
                  </div>

                  {/* Song Info */}
                  <div className="p-6 space-y-4">
                    {/* Title and Artist */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl text-gray-900 leading-tight">
                        {song.title}
                      </h3>
                      <p className="text-indigo-600 font-semibold text-lg">
                        {song.artist}
                      </p>
                      <p className="text-gray-500 text-sm">{song.album}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {song.description}
                    </p>

                    {/* Progress Bar */}
                    {currentPlaying === song.id && (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${getProgressPercentage(song.id)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{formatTime(currentTime[song.id] || 0)}</span>
                          <span>{formatTime(durations[song.id] || 0)}</span>
                        </div>
                      </div>
                    )}

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <span>⏱️</span>
                          {formatTime(durations[song.id] || 0)}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <span>🎧</span>
                          {song.plays}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleLike(song.id)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            likedSongs.has(song.id)
                              ? "bg-red-100 text-red-600 scale-110"
                              : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 hover:scale-110"
                          }`}
                        >
                          <svg
                            className={`w-5 h-5 ${
                              likedSongs.has(song.id)
                                ? "fill-current animate-pulse"
                                : ""
                            }`}
                            fill={
                              likedSongs.has(song.id) ? "currentColor" : "none"
                            }
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleShare(song)}
                          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 hover:scale-110 transition-all duration-300"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg inline-block">
            <p className="text-gray-600 text-lg font-medium">
              🎵 <span className="text-indigo-600 font-bold">100+</span> lagu
              rohani kekinian lainnya di SelaVibes
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ChristianMusicSection;
