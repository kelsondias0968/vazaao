import { useRef, useEffect, memo } from "react";
import botAvatar from "@/assets/bot-avatar.jpg";

interface ChatBubbleProps {
  text?: string;
  images?: string[];
  video?: string;
  isUser?: boolean;
  time?: string;
}

const ChatBubble = memo(({ text, images, video, isUser = false, time }: ChatBubbleProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video && videoRef.current) {
      const videoEl = videoRef.current;

      // Tentativa de reprodução automática com tratamento de erro
      const playVideo = async () => {
        try {
          videoEl.muted = true; // Obrigatório para autoplay em browsers móveis
          await videoEl.play();
        } catch (err) {
          console.log("Autoplay bloqueado pelo browser, aguardando interação.");
          // Adiciona listener para tocar quando o usuário clicar em qualquer lugar da tela
          const playOnInteraction = () => {
            videoEl.play();
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
          };
          document.addEventListener('click', playOnInteraction);
          document.addEventListener('touchstart', playOnInteraction);
        }
      };

      playVideo();
    }
  }, [video]);

  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="bg-telegram-bubble-user rounded-2xl rounded-br-sm px-4 py-2 max-w-[85%] sm:max-w-[80%]">
          <p className="text-foreground text-sm whitespace-pre-line">{text}</p>
          <p className="text-[10px] text-foreground/50 text-right mt-1 font-mono">{time} ✓✓</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 animate-slide-up will-change-transform">
      <img
        src={botAvatar}
        alt=""
        className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-white/10"
        loading="lazy"
      />
      <div className="max-w-[85%] sm:max-w-[80%]">
        {text && (
          <div className="bg-telegram-bubble-bot rounded-2xl rounded-bl-none px-4 py-2 shadow-sm border border-white/5">
            <p className="text-foreground text-sm whitespace-pre-line leading-relaxed">{text}</p>
            <p className="text-[10px] text-muted-foreground text-right mt-1 font-mono">{time}</p>
          </div>
        )}
        {video && (
          <div className="rounded-2xl rounded-bl-none overflow-hidden mt-1 max-w-[280px] bg-black shadow-lg border border-white/5">
            <video
              ref={videoRef}
              src={video}
              controls
              autoPlay
              muted
              playsInline
              webkit-playsinline="true"
              preload="metadata"
              className="w-full h-auto max-h-[350px] object-contain"
            />
            <p className="text-[10px] text-muted-foreground text-right px-2 py-1 font-mono bg-black/40">{time}</p>
          </div>
        )}
        {images && images.length > 0 && (
          <div className={`grid gap-1 mt-1 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"} max-w-[280px]`}>
            {images.map((img, i) => (
              <div key={i} className="rounded-lg overflow-hidden bg-telegram-bubble-bot shadow-sm border border-white/5">
                <img
                  src={img}
                  alt=""
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
