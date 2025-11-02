"use client";
import React, { useState } from "react";

const tracks = [
  {
    title: "Вика, с Днём Рождения!",
    src: "/audio/vika-birthday.mp3",
    cover: "/covers/vika-birthday.png",
    note: "Персональная поздравительная песня, короткая заставка.",
    // embed: "https://music.yandex.ru/iframe/#track/XXXX/XXXX", // можно включить iframe
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

  return (
    <section id="songs" className="reveal">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3">
        Песни и демо
      </h2>
      <p className="text-center text-slate-300 mb-8">
        Послушайте короткие фрагменты. Если плеер не запускается — нажмите «Скачать MP3».
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tracks.map((t) => {
          const key = t.src;
          const slug = t.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
          const useIframe = fallback[key] && t.embed;

          return (
            <div
              id={`track-${slug}`}
              key={key}
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/5"
            >
              {/* обложка */}
              <div className="w-full aspect-square relative">
                <img
                  src={t.cover}
                  alt={t.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* заголовок + примечание */}
              <div className="p-4">
                <div className="font-semibold">{t.title}</div>
                {t.note && <div className="text-slate-400 text-sm">{t.note}</div>}

                <div className="mt-3">
                  {!useIframe ? (
                    <audio
                      controls
                      preload="none"
                      className="w-full"
                      onError={() => setFallback((s) => ({ ...s, [key]: true }))}
                    >
                      <source src={t.src} type="audio/mpeg" />
                      Ваш браузер не поддерживает аудио. Скачайте файл по ссылке ниже.
                    </audio>
                  ) : (
                    <iframe
                      className="w-full"
                      style={{ height: 212 }}
                      src={t.embed}
                      loading="lazy"
                      allow="autoplay *; encrypted-media *;"
                    />
                  )}
                </div>

                <div className="text-slate-400 text-xs mt-2">
                  Ссылка:{" "}
                  <a className="text-sky-300 underline" href={t.src} target="_blank" rel="noreferrer">
                    Скачать MP3
                  </a>
                  .
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
      `}</style>
    </section>
  );
}
