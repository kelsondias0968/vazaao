import preview1 from "@/assets/preview-1.jpg";
import preview2 from "@/assets/preview-2.jpg";
import preview3 from "@/assets/preview-3.jpg";
import preview4 from "@/assets/preview-4.jpg";
import preview5 from "@/assets/preview-5.jpg";
import preview6 from "@/assets/preview-6.jpg";

export type ChatStep = {
  type: "bot-text" | "bot-images" | "bot-video" | "user-options" | "pricing";
  text?: string;
  images?: string[];
  video?: string;
  options?: string[];
  typingDelay?: number; // ms to show typing before message
};

export const chatFlow: ChatStep[] = [
  {
    type: "bot-text",
    text: "Você está em um lugar confortável para ver as anônimas mais gostosas de Angola? 🔥",
    typingDelay: 3000,
  },
  {
    type: "user-options",
    options: ["Sim ✅"],
  },
  {
    type: "bot-text",
    text: "Ok, vou te mandar um pouco do que você vai ver nesse grupo secreto.",
    typingDelay: 3000,
  },
  {
    type: "bot-text",
    text: "Aqui elas se soltam, podem ser as mais safadas e ainda têm uma vida normal 🔥🔥 Sem que ninguém saiba.\n\nA tua prima pode ser uma das safadas desse grupo e ninguém da sua família saber.\n\nAqui em baixo vou te mandar algumas fotos das gostosas anônimas. 👇",
    typingDelay: 5000,
  },
  {
    type: "bot-images",
    images: [preview1, preview2, preview3, preview4, preview5],
    typingDelay: 3000,
  },
  {
    type: "bot-text",
    text: "Gostou? 😏",
    typingDelay: 3000,
  },
  {
    type: "user-options",
    options: ["Sim 🔥"],
  },
  {
    type: "bot-text",
    text: "Isso ainda é pouco, você verá vídeos amadores de mulheres apaixonadas por sexo 🔥\n\nElas gravam-se a foder com seus amantes e mandam para nós sem medo. Nesse grupo elas podem ser quem são sem nenhum filtro.",
    typingDelay: 5000,
  },
  {
    type: "bot-text",
    text: "Você realmente quer fazer parte? 🤔",
    typingDelay: 3000,
  },
  {
    type: "user-options",
    options: ["Claro, vamos continuar 💯"],
  },
  {
    type: "bot-text",
    text: "Claro que se você quiser pode marcar encontros com essas gostosas sedentas por sexo e não é sexo pago 💰\n\nSão duas pessoas que desejam algo em comum.",
    typingDelay: 5000,
  },
  {
    type: "bot-video",
    video: "/kilamba.mp4",
    typingDelay: 7000,
  },
  {
    type: "bot-text",
    text: "Eles se conheceram no grupo anónimo e tiveram uma tarde de sexo no Kilamba. 🏠🔥",
    typingDelay: 5000,
  },
  {
    type: "bot-text",
    text: "Mas você precisa ser sigiloso 🤫\nNão comente sobre o que nós fazemos aqui.",
    typingDelay: 3000,
  },
  {
    type: "user-options",
    options: ["Claro, vou ter cuidado 🤐"],
  },
  {
    type: "bot-text",
    text: "Qual é o seu tipo de mulher? 👀",
    typingDelay: 3000,
  },
  {
    type: "user-options",
    options: ["Magra e gostosa 🍑", "Grossa e gostosa 🍑", "Tanto faz 😈"],
  },
  {
    type: "bot-text",
    text: "Ok, aqui temos tudo que você deseja 🔥\n\nNão importa em qual parte de Angola você esteja, tem sempre uma tesuda para ti. 😈",
    typingDelay: 5000,
  },
  {
    type: "bot-video",
    video: "/video1.mp4",
    typingDelay: 7000,
  },
  {
    type: "bot-video",
    video: "/video2.mp4",
    typingDelay: 7000,
  },
  {
    type: "bot-video",
    video: "/video3.mp4",
    typingDelay: 7000,
  },
  {
    type: "bot-text",
    text: "Esse grupo é 100% privado 🔒\nPara entrar você precisa passar por um filtro.",
    typingDelay: 5000,
  },
  {
    type: "bot-text",
    text: "Você poderá acessar por 3 planos: 👇",
    typingDelay: 3000,
  },
  {
    type: "pricing",
  },
];
