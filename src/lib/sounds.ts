let cachedCtx: AudioContext | null = null;

const getAudioCtx = () => {
  if (!cachedCtx) {
    cachedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return cachedCtx;
};

export const playMessageSound = async () => {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error("Erro ao tocar som de mensagem:", e);
  }
};

export const playSendSound = async () => {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.error("Erro ao tocar som de envio:", e);
  }
};
