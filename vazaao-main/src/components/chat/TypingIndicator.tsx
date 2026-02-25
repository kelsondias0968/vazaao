import botAvatar from "@/assets/bot-avatar.jpg";

const TypingIndicator = () => (
  <div className="flex items-end gap-2 animate-slide-up">
    <img src={botAvatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
    <div className="bg-telegram-bubble-bot rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
      <span className="typing-dot w-2 h-2 bg-muted-foreground rounded-full inline-block" />
      <span className="typing-dot w-2 h-2 bg-muted-foreground rounded-full inline-block" />
      <span className="typing-dot w-2 h-2 bg-muted-foreground rounded-full inline-block" />
    </div>
  </div>
);

export default TypingIndicator;
