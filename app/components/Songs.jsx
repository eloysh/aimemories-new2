"use client";
import React, { useState, useCallback } from "react";

const tracks = [
  {
    title: "Вика, с Днём Рождения!",
    src: "/audio/vika-birthday.mp3",
    cover: "/covers/vika-birthday.png",
    note: "Персональная поздравительная песня, короткая заставка.",
  },
  {
    title: "Ромашковая любовь", 
    src: "/audio/romashkovaya-lyubov.mp3",
    cover: "/covers/romashkovaya-lyubov.png",
    note: "Лирика: нежная, светлая.",
  },
  {
    title: "Креповая свадьба",
    src: "/audio/krepovaya-svadba.mp3", 
    cover: "/covers/krepovaya-svadba.png",
    note: "Драйвовая свадебная тема.",
  },
];

export default function Songs() {
  const [fallback, setFallback] = useState({});
  const [isPlaying, setIsPlaying] = useState({});

  // Обработчик ошибок воспроизведения
  const handleAudioError = useCallback((key) => {
    setFallback(prev => ({ ...prev, [key]: true }));
  }, []);

  // Обработчик начала/остановки воспроизведения
  const handlePlayStateChange = useCallback((key, playing) => {
    setIsPlaying(prev => ({ ...prev, [key]: playing }));
  }, []);

  return (
    <section id="songs" className="reveal py-12">
    
      <p className="text-center text-slate-300 mb-8">
        Послушайте короткие фрагменты. Если плеер не запускается — нажмите «Скачать MP3».
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => {
          const key = track.src;
          const slug = track.title.toLowerCase().replace(/[^\w-]+/g, "-");

          return (
            <div
              id={`track-${slug}`}
              key={key}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-full aspect-square relative">
                <img
                  src={track.cover}
                  alt={track.title}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isPlaying[key] ? 'scale-105' : ''
                  }`}
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{track.title}</h3>
                {track.note && (
                  <p className="text-slate-400 text-sm mt-1">{track.note}</p>
                )}

                <div className="mt-3">
                  <audio
                    controls
                    preload="metadata"
                    className="w-full"
                    onError={() => handleAudioError(key)}
                    onPlay={() => handlePlayStateChange(key, true)}
                    onPause={() => handlePlayStateChange(key, false)}
                  >
                    <source src={track.src} type="audio/mpeg" />
                    Ваш браузер не поддерживает аудио.
                  </audio>
                </div>

                <div className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                  <a 
                    className="text-sky-300 hover:text-sky-400 transition-colors underline"
                    href={track.src}
                    download
                    rel="noreferrer"
                  >
                    Скачать MP3
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .aspect-square {
          aspect-ratio: 1 / 1;
        }
        audio::-webkit-media-controls-panel {
          background-color: rgba(255, 255, 255, 0.05);
        }
        audio::-webkit-media-controls-current-time-display,
        audio::-webkit-media-controls-time-remaining-display {
          color: white;
        }
      `}</style>
    </section>
  );
}