"use client";
import React from "react";

function Row({ title, text }) {
  return (
    <div className="rounded-2xl card-glass p-5">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-slate-300 mt-1">{text}</div>
    </div>
  );
}

export default function HowToOrder() {
  return (
    <section className="reveal">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Как оформить заказ</h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Row
          title="1) Напишите нам"
          text="Нажмите кнопку WhatsApp. Опишите задачу: формат (мини-ролик/полный), сколько фото, сроки и ваши пожелания."
        />
        <Row
          title="2) Пришлите материалы"
          text="Фото в хорошем качестве, ссылки на музыку (или пожелания по треку), подписи/даты — если нужны."
        />
        <Row
          title="3) Черновой просмотр (24–72 ч)"
          text="Соберём черновую версию и отправим ссылку. Вы вносите правки — мы оперативно учтём."
        />
        <Row
          title="4) Готовый результат"
          text="Финальное видео/фото + файлы в нужных форматах (9:16 / 16:9 / FullHD/4K). Оплата после утверждения."
        />
      </div>

      <div className="text-center mt-6">
        <a
          href="https://wa.me/79841933792?text=%20%20%20%20"
          className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-emerald-500/90 hover:bg-emerald-500 transition text-white font-medium"
        >
          Написать в WhatsApp
        </a>
      </div>
    </section>
  );
}

export { HowToOrder };
