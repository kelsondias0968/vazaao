import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import botAvatar from "@/assets/bot-avatar.jpg";
import telegramPattern from "@/assets/telegram-pattern.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center p-4"
      style={{ backgroundImage: `url(${telegramPattern})`, backgroundSize: "cover" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 rounded-2xl bg-card/90 backdrop-blur-md p-8 shadow-2xl max-w-sm w-full border border-border/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/40 shadow-lg">
            <img src={botAvatar} alt="Bot Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-telegram-green border-2 border-card" />
        </motion.div>

        <div className="text-center">
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-foreground"
          >
            Vazados Angola 🔥
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-sm mt-1"
          >
            @vazados_angola_bot
          </motion.p>
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/chat")}
          className="bg-primary text-primary-foreground font-bold py-3 px-10 rounded-full text-lg shadow-lg animate-pulse-glow uppercase tracking-wide"
        >
          START BOT
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Index;
