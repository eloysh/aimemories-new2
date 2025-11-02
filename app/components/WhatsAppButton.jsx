"use client";
export default function WhatsAppButton({ className = "", text }) {
  const base = process.env.NEXT_PUBLIC_WHATSAPP_LINK ?? "https://wa.me/79841933792";
  const href = text
    ? `${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(text)}`
    : base;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-whatsapp ${className}`}
    >
      Написать в WhatsApp
    </a>
  );
}
