"use client";
import React, { useState, useMemo } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function BriefWizard() {
  // шаги
  const [step, setStep] = useState(0);

  // поля брифа
  const [eventType, setEventType] = useState("Юбилей / День рождения");
  const [purpose, setPurpose] = useState("Память / семейное видео");
  const [mood, setMood] = useState("лирическая, нежная");
  const [style, setStyle] = useState("поп / акустика");
  const [length, setLength] = useState("до 1 минуты (Shorts/Reels)");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("до 10 000 ₽");
  const [refs, setRefs] = useState(""); // ссылки на примеры/рефы
  const [names, setNames] = useState(""); // имена/даты/важные фразы
  const [voice, setVoice] = useState("женский голос / мягкий тембр");

  // контакты заказчика (не обязательно, но полезно)
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // простой валидатор для ключевых шагов
  const canNext = useMemo(() => {
    if (step === 0) return Boolean(eventType && purpose);
    if (step === 1) return Boolean(mood && style && length);
    if (step === 2) return true; // опциональные поля
    if (step === 3) return true; // контакты не обязательны
    return true;
  }, [step, eventType, purpose, mood, style, length]);

  const next = () => canNext && setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  // ✓ СБОРКА СООБЩЕНИЯ ДЛЯ WHATSAPP
  const buildSummary = () => {
    const lines = [];
    lines.push("Здравствуйте! Хочу заказать песню/ролик 👍");
    lines.push("");
    lines.push("— Задача:");
    lines.push(`• Событие: ${eventType}`);
    lines.push(`• Цель: ${purpose}`);
    lines.push("");
    lines.push("— Музыка:");
    lines.push(`• Настроение: ${mood}`);
    lines.push(`• Стиль: ${style}`);
    lines.push(`• Длительность: ${length}`);
    if (voice) lines.push(`• Голос/тембр: ${voice}`);
    lines.push("");
    lines.push("— Пожелания и сроки:");
    if (deadline) lines.push(`• Дедлайн: ${deadline}`);
    if (budget) lines.push(`• Бюджет: ${budget}`);
    if (refs)   lines.push(`• Референсы: ${refs}`);
    if (names)  lines.push(`• Имена/даты/фразы: ${names}`);
    lines.push("");
    if (clientName || clientPhone) {
      lines.push("— Контакты:");
      if (clientName)  lines.push(`• Имя: ${clientName}`);
      if (clientPhone) lines.push(`• Телефон: ${clientPhone}`);
      lines.push("");
    }
    lines.push("Готов обсудить(а) детали!");
    return lines.join("\n");
  };

  // UI шагов
  const StepControls = () => (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={back}
        disabled={step === 0}
        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 disabled:opacity-50"
      >
        Назад
      </button>
      {step < 4 ? (
        <button
          onClick={next}
          disabled={!canNext}
          className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 transition disabled:opacity-50"
        >
          Далее
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="card-glass rounded-2xl p-6 max-w-2xl mx-auto">
      <div className="text-center mb-4 text-sm text-slate-400">
        Шаг {step + 1} из 5
      </div>

      {step === 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">О событии</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Событие</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <option>Юбилей / День рождения</option>
                <option>Свадьба / годовщина</option>
                <option>Реклама / промо-ролик</option>
                <option>Подарок / признание</option>
                <option>Другое</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Цель</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <option>Память / семейное видео</option>
                <option>Коммерческий ролик</option>
                <option>Сторис / Reels / Shorts</option>
                <option>Песня-подарок</option>
                <option>Другое</option>
              </select>
            </div>
          </div>
          <StepControls />
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Музыкальные предпочтения</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Настроение</label>
              <input
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="лирическая, нежная / драйвовая / киношная…"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Стиль</label>
              <input
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="поп / акустика / кино / рэп / EDM…"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Длительность</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <option>до 1 минуты (Shorts/Reels)</option>
                <option>1–2 минуты</option>
                <option>2–3 минуты</option>
                <option>полноценный трек (3+ мин)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Голос/тембр</label>
              <input
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                placeholder="женский / мужской / детский; мягкий / яркий…"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
          </div>
          <StepControls />
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Пожелания и вводные</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Дедлайн</label>
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="например: до 15 ноября"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Ориентир по бюджету</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <option>до 10 000 ₽</option>
                <option>10 000–20 000 ₽</option>
                <option>20 000–40 000 ₽</option>
                <option>40 000+ ₽</option>
                <option>обсудим</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Ссылки на референсы</label>
              <textarea
                value={refs}
                onChange={(e) => setRefs(e.target.value)}
                placeholder="YouTube/Spotify/VK/Drive ссылки, примеры, референсы…"
                rows={3}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Имена/даты/важные фразы</label>
              <textarea
                value={names}
                onChange={(e) => setNames(e.target.value)}
                placeholder="Кого упомянуть? Даты? Ключевые слова? Сюжет?"
                rows={3}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
          </div>
          <StepControls />
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Как с вами связаться</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-1 text-slate-300">Имя</label>
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-300">Телефон (WhatsApp)</label>
              <input
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+7 ..."
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
          </div>
          <StepControls />
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Готово!</h3>
          <p className="text-slate-300 mb-4">
            Нажмите, чтобы отправить бриф в WhatsApp. Я отвечу в ближайшее время.
          </p>

          {/* ✓ Теперь функция buildSummary подставляет текст */}
          <WhatsAppButton text={buildSummary()} className="w-full justify-center" />

          {/* альтернативный вариант (если вдруг WhatsAppButton ещё не обновляли):
          <a
            href={`https://wa.me/79841933792?text=${encodeURIComponent(buildSummary())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full justify-center inline-flex mt-3"
          >
            Написать в WhatsApp
          </a>
          */}
        </div>
      )}
    </div>
  );
}
