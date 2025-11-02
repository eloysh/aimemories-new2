// серверный компонент, без "use client"
export default function BackgroundFX() {
  return (
    <div aria-hidden="true" className="bgfx fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="layer base" />
      <div className="layer scrim" />
      <div className="layer grid" />
      <div className="layer aurora aurora-a" />
      <div className="layer aurora aurora-b" />
      <div className="layer blob blob-1" />
      <div className="layer blob blob-2" />
      <div className="layer blob blob-3" />
      <div className="layer stars" />
      <div className="layer stars stars-2" />

      <style jsx>{`
        :global(:root){
          --mx: 0px; --my: 0px;   /* сюда пишет BGPointer */
        }
        .bgfx { background:#070b16; }
        .layer { position:absolute; inset:0; }

        .base{
          background: radial-gradient(55% 60% at 50% 55%, #0e1b36 0%, #0b1329 45%, #070d1e 70%, #050913 100%);
        }
        .scrim{
          background: linear-gradient(to bottom, rgba(5,9,20,.85) 0%, rgba(7,13,30,.55) 40%, rgba(5,9,20,.78) 100%);
        }
        .grid{
          background:
            repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 24px),
            repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0 1px, transparent 1px 24px);
          mask-image: radial-gradient(60% 60% at 50% 50%, #000 0%, transparent 100%);
          opacity:.35;
        }

        .aurora{
          filter: blur(32px);
          opacity:.35;
          mix-blend-mode: screen;
          animation: drift 22s ease-in-out infinite;
          transform: translate3d(calc(var(--mx)*.02), calc(var(--my)*.02), 0);
        }
        .aurora-a{
          background: conic-gradient(
            from 210deg at 30% 60%,
            rgba(56,189,248,0) 0deg, rgba(56,189,248,.45) 50deg, rgba(56,189,248,0) 95deg,
            rgba(124,58,237,.5) 140deg, rgba(124,58,237,0) 190deg,
            rgba(56,189,248,.4) 250deg, rgba(56,189,248,0) 360deg
          );
        }
        .aurora-b{
          background: conic-gradient(
            from 120deg at 70% 40%,
            rgba(99,102,241,0) 0deg, rgba(99,102,241,.45) 60deg, rgba(99,102,241,0) 120deg,
            rgba(14,165,233,.5) 200deg, rgba(14,165,233,0) 260deg
          );
          animation-duration:28s;
        }

        .blob{ filter: blur(60px); }
        .blob-1{
          width:26rem; height:26rem; border-radius:9999px;
          background: radial-gradient(closest-side, rgba(56,189,248,.28), rgba(56,189,248,0));
          transform: translate3d(calc(-18% + var(--mx)*.01), calc(6% + var(--my)*.01), 0);
          animation: float1 16s ease-in-out infinite; opacity:.45;
        }
        .blob-2{
          width:30rem; height:30rem; border-radius:9999px;
          background: radial-gradient(closest-side, rgba(99,102,241,.28), rgba(99,102,241,0));
          transform: translate3d(calc(30% + var(--mx)*.012), calc(-2% + var(--my)*.012), 0);
          animation: float2 18s ease-in-out infinite; opacity:.4;
        }
        .blob-3{
          width:32rem; height:32rem; border-radius:9999px;
          background: radial-gradient(closest-side, rgba(14,165,233,.24), rgba(14,165,233,0));
          transform: translate3d(calc(5% + var(--mx)*.008), calc(28% + var(--my)*.008), 0);
          animation: float3 20s ease-in-out infinite; opacity:.36;
        }

        /* звёзды — два слоя разной плотности + мерцание */
        .stars{
          opacity:.25;
          background:
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.9) 60%, transparent 61%),
            radial-gradient(1.5px 1.5px at 70% 22%, rgba(255,255,255,.9) 60%, transparent 61%),
            radial-gradient(1.5px 1.5px at 42% 68%, rgba(255,255,255,.9) 60%, transparent 61%),
            radial-gradient(2px 2px at 82% 58%, rgba(255,255,255,.9) 60%, transparent 61%),
            radial-gradient(1.5px 1.5px at 12% 72%, rgba(255,255,255,.9) 60%, transparent 61%),
            radial-gradient(1.5px 1.5px at 90% 78%, rgba(255,255,255,.9) 60%, transparent 61%);
          animation: twinkle 7s ease-in-out infinite;
          mask-image: radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%);
          transform: translate3d(calc(var(--mx)*.005), calc(var(--my)*.005), 0);
        }
        .stars-2{
          opacity:.18; filter: blur(0.5px);
          animation-duration: 11s;
          transform: translate3d(calc(var(--mx)*.01), calc(var(--my)*.01), 0);
        }

        @keyframes drift { 0%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-2%,0)} 100%{transform:translate3d(0,0,0)} }
        @keyframes float1 { 0%{transform:translate3d(-18%,6%,0)} 50%{transform:translate3d(-16%,8%,0)} 100%{transform:translate3d(-18%,6%,0)} }
        @keyframes float2 { 0%{transform:translate3d(30%,-2%,0)} 50%{transform:translate3d(28%,0,0)} 100%{transform:translate3d(30%,-2%,0)} }
        @keyframes float3 { 0%{transform:translate3d(5%,28%,0) scale(1)} 50%{transform:translate3d(6%,26%,0) scale(1.04)} 100%{transform:translate3d(5%,28%,0) scale(1)} }
        @keyframes twinkle { 0%,100%{opacity:.22} 50%{opacity:.42} }

        @media (prefers-reduced-motion: reduce){
          .aurora,.blob,.stars{ animation:none !important; }
        }
        @media (max-width:768px){
          .grid{opacity:.25} .aurora{opacity:.30; filter:blur(26px)} .blob{filter:blur(52px)}
        }
      `}</style>
    </div>
  );
}
