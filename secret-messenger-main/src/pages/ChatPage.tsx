import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical } from "lucide-react";
import botAvatar from "@/assets/bot-avatar.jpg";
import telegramPattern from "@/assets/telegram-pattern.jpg";
import ChatBubble from "@/components/chat/ChatBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import PricingCards from "@/components/chat/PricingCards";
import { chatFlow, type ChatStep } from "@/lib/chatFlow";
import { playMessageSound, playSendSound } from "@/lib/sounds";

type RenderedItem =
  | { kind: "bot-text"; text: string; time: string }
  | { kind: "bot-images"; images: string[]; time: string }
  | { kind: "bot-video"; video: string; time: string }
  | { kind: "user-text"; text: string; time: string }
  | { kind: "pricing" };

const getTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<RenderedItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userOptions, setUserOptions] = useState<string[] | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const processing = useRef(false);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  const processStep = useCallback(
    async (stepIdx: number) => {
      if (stepIdx >= chatFlow.length) return;
      const step = chatFlow[stepIdx];

      if (step.type === "user-options") {
        setUserOptions(step.options || []);
        return;
      }

      if (step.type === "pricing") {
        // show typing briefly
        setIsTyping(true);
        scrollToBottom();
        await delay(1500);
        setIsTyping(false);
        setMessages((prev) => [...prev, { kind: "pricing" }]);
        playMessageSound();
        scrollToBottom();
        return;
      }

      // bot message
      setIsTyping(true);
      scrollToBottom();
      await delay(step.typingDelay || 2000);
      setIsTyping(false);

      if (step.type === "bot-text") {
        setMessages((prev) => [...prev, { kind: "bot-text", text: step.text!, time: getTime() }]);
        playMessageSound();
      } else if (step.type === "bot-images") {
        setMessages((prev) => [...prev, { kind: "bot-images", images: step.images!, time: getTime() }]);
        playMessageSound();
      } else if (step.type === "bot-video") {
        setMessages((prev) => [...prev, { kind: "bot-video", video: step.video!, time: getTime() }]);
        playMessageSound();
      }

      scrollToBottom();
      // auto-advance to next step
      const next = stepIdx + 1;
      setCurrentStep(next);
      // pause between consecutive bot messages so user can read
      await delay(2500);
      processStep(next);
    },
    [scrollToBottom]
  );

  useEffect(() => {
    if (!processing.current) {
      processing.current = true;
      processStep(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserChoice = async (choice: string) => {
    setUserOptions(null);
    playSendSound();
    setMessages((prev) => [...prev, { kind: "user-text", text: choice, time: getTime() }]);
    scrollToBottom();
    await delay(600);
    const next = currentStep + 1;
    setCurrentStep(next);
    processStep(next);
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-telegram-chat-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-telegram-header border-b border-border/20 flex-shrink-0">
        <button onClick={() => navigate("/")} className="text-primary">
          <ArrowLeft size={24} />
        </button>
        <img src={botAvatar} alt="" className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <h2 className="text-foreground font-medium text-sm truncate">Vazados Angola 🔥</h2>
          <p className="text-primary text-xs">
            {isTyping ? "digitando..." : "online"}
          </p>
        </div>
        <button className="text-muted-foreground">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-3 py-4 space-y-3"
        style={{ backgroundImage: `url(${telegramPattern})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {messages.map((msg, i) => {
          if (msg.kind === "bot-text") {
            return <ChatBubble key={i} text={msg.text} time={msg.time} />;
          }
          if (msg.kind === "bot-images") {
            return <ChatBubble key={i} images={msg.images} time={msg.time} />;
          }
          if (msg.kind === "bot-video") {
            return <ChatBubble key={i} video={msg.video} time={msg.time} />;
          }
          if (msg.kind === "user-text") {
            return <ChatBubble key={i} text={msg.text} isUser time={msg.time} />;
          }
          if (msg.kind === "pricing") {
            return <PricingCards key={i} />;
          }
          return null;
        })}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* User Options / Input */}
      <div className="flex-shrink-0 bg-telegram-header border-t border-border/20 px-3 py-3">
        {userOptions ? (
          <div className="flex flex-wrap gap-2 justify-center">
            {userOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleUserChoice(opt)}
                className="bg-primary text-primary-foreground text-sm font-medium py-2 px-5 rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm text-muted-foreground">
              Mensagem
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default ChatPage;
