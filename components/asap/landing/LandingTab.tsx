"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Shield, 
  Zap, 
  Play, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Layers, 
  Cpu,
  LogIn,
  UserPlus,
  Image as ImageIcon,
  Video as VideoIcon,
  Loader2,
  Lock,
  Calendar,
  DollarSign,
  AlertCircle
} from "lucide-react";

interface LandingTabProps {
  onLogin: (username: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userProfileName: string;
  lang: "es" | "en";
  onChangeLang: (lang: "es" | "en") => void;
}

export default function LandingTab({ onLogin, isLoggedIn, onLogout, userProfileName, lang, onChangeLang }: LandingTabProps) {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activeUseStep, setActiveUseStep] = useState(0);

  // Pricing Plan State
  const [chosenPlan, setChosenPlan] = useState<"trial" | "pro" | "enterprise">("trial");

  // Quick Demo States
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoType, setDemoType] = useState<"image" | "video">("image");
  const [demoPrompt, setDemoPrompt] = useState("");
  const [isDemoGenerating, setIsDemoGenerating] = useState(false);
  const [demoGeneratedAsset, setDemoGeneratedAsset] = useState<string | null>(null);
  const [showDemoRegisterPrompt, setShowDemoRegisterPrompt] = useState(false);
  const [demoPlatforms, setDemoPlatforms] = useState<string[]>(["tiktok"]);

  const t = {
    es: {
      tagline: "ASAP AI - Suite Creativa de Próxima Generación",
      headline: "Todo tu equipo creativo en un solo lugar",
      subtitle: "Diseña, edita, programa y analiza tu contenido audiovisual. Nuestra inteligencia artificial procesa tus videos para extraer clips de alto impacto, generar subtítulos estéticos y responder comentarios en segundos.",
      sessionAs: "Sesión iniciada como",
      logout: "Cerrar Sesión",
      access: "Acceder / Registrarse",
      demo: "Iniciar Demo Rápido",
      benefitsTitle: "Beneficios del Motor AI de ASAP AI",
      benefitsSubtitle: "Por qué creadores y agencias utilizan nuestra suite para optimizar su flujo diario",
      workflow: "Flujo de Trabajo",
      howItWorks: "¿Cómo se usa la plataforma?",
      howItWorksDesc: "Hemos condensado el flujo de producción tradicional que toma horas en un proceso asistido por IA que completas en pocos pasos sencillos.",
      nextStep: "Siguiente",
      stepOf: (current: number, total: number) => `Paso ${current} de ${total}`,
      levelUp: "Lleva tu contenido al siguiente nivel hoy mismo",
      levelUpDesc: "Crea tu cuenta gratuita de ASAP AI para comenzar a extraer momentos virales de tus videos largos, gestionar tu calendario editorial y multiplicar tu alcance orgánico en redes sociales.",
      levelUpBenefits: [
        "Sin tarjeta de crédito requerida para iniciar",
        "10 horas de procesamiento de video gratis al mes",
        "Integración oficial con TikTok, Reels y Shorts API",
        "Generador de guiones y respuestas ilimitadas con Gemini"
      ],
      login: "Iniciar Sesión",
      register: "Registrarse",
      usernameLabel: "Nombre de Usuario / Creador",
      emailLabel: "Correo Electrónico",
      passwordLabel: "Contraseña",
      enterEditor: "Entrar al Editor",
      createFreeAccount: "Crear Mi Cuenta Gratis",
      orTryNow: "o prueba de inmediato",
      guestDemo: "Entrar como Invitado (Demo de un clic)",
      footerLove: "© 2026 ASAP AI Inc. Hecho con amor para creadores de contenido.",
      requiredEmailPass: "Por favor ingresa tu correo y contraseña.",
      requiredAllFields: "Por favor completa todos los campos del registro.",
      welcomeBack: (name: string) => `¡Bienvenido de vuelta, ${name}!`,
      registerSuccess: (name: string) => `¡Registro exitoso! Iniciando sesión como ${name}.`
    },
    en: {
      tagline: "ASAP AI - Next-Generation Creative Suite",
      headline: "Your entire creative team in one place",
      subtitle: "Design, edit, schedule, and analyze your audiovisual content. Our artificial intelligence processes your videos to extract high-impact clips, generate beautiful captions, and reply to comments in seconds.",
      sessionAs: "Logged in as",
      logout: "Log Out",
      access: "Log In / Register",
      demo: "Start Quick Demo",
      benefitsTitle: "Benefits of ASAP AI's Engine",
      benefitsSubtitle: "Why creators and agencies rely on our suite to optimize their daily workflow",
      workflow: "Workflow",
      howItWorks: "How to use the platform?",
      howItWorksDesc: "We have condensed the hours-long traditional production workflow into an AI-assisted process that you complete in just a few simple steps.",
      nextStep: "Next",
      stepOf: (current: number, total: number) => `Step ${current} of ${total}`,
      levelUp: "Take your content to the next level today",
      levelUpDesc: "Create your free ASAP AI account to start extracting viral clips from your long-form videos, manage your content calendar, and multiply your organic reach on social media.",
      levelUpBenefits: [
        "No credit card required to start",
        "10 hours of free video processing monthly",
        "Official integration with TikTok, Reels, and Shorts API",
        "Unlimited script generation and replies with Gemini"
      ],
      login: "Log In",
      register: "Register",
      usernameLabel: "Username / Creator Name",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      enterEditor: "Enter Editor",
      createFreeAccount: "Create My Free Account",
      orTryNow: "or try instantly",
      guestDemo: "Enter as Guest (One-click Demo)",
      footerLove: "© 2026 ASAP AI Inc. Crafted with love for content creators.",
      requiredEmailPass: "Please enter your email and password.",
      requiredAllFields: "Please complete all registration fields.",
      welcomeBack: (name: string) => `Welcome back, ${name}!`,
      registerSuccess: (name: string) => `Registration successful! Logging in as ${name}.`
    }
  };

  const activeTrans = t[lang];

  const benefits = [
    {
      id: "ben-1",
      icon: Cpu,
      title: lang === "es" ? "Extracción Viral Automatizada" : "Automated Viral Extraction",
      desc: lang === "es" 
        ? "Nuestra IA analiza automáticamente las curvas de retención emocional y de ritmo de tus videos largos, aislando los 15-30 segundos con mayor potencial de viralización para TikTok, Shorts y Reels."
        : "Our AI automatically analyzes retention and pacing curves of your long videos, isolating the 15-30 second highlights with highest viral potential for TikTok, Reels, and Shorts.",
      color: "from-[#a078ff]/10 to-[#a078ff]/5 border-[#a078ff]/30 text-[#d0bcff]"
    },
    {
      id: "ben-2",
      icon: Zap,
      title: lang === "es" ? "Subtítulos Dinámicos Autogenerados" : "Dynamic Auto-Captions",
      desc: lang === "es"
        ? "Genera transcripciones precisas en español e inglés instantáneamente con un solo botón. Diseña tarjetas de subtítulos dinámicas y de alto contraste ideales para reproducción en silencio."
        : "Generate accurate speech-to-text transcripts instantly with one click. Build style-heavy high-contrast caption cards ideal for muted scrolling feeds.",
      color: "from-[#4cd7f6]/10 to-[#4cd7f6]/5 border-[#4cd7f6]/30 text-[#4cd7f6]"
    },
    {
      id: "ben-3",
      icon: MessageSquare,
      title: lang === "es" ? "Respuestas Inteligentes Integradas" : "Smart Integrated Replies",
      desc: lang === "es"
        ? "Interactúa con tus espectadores al instante. Gemini analiza el tono de los comentarios de tu comunidad y redacta respuestas ingeniosas y empáticas listas para ser copiadas y publicadas."
        : "Interact with fans instantly. Gemini parses the semantic tone of viewer feedback and drafts witty, context-aware smart replies ready to paste and publish.",
      color: "from-[#d0bcff]/10 to-[#d0bcff]/5 border-[#d0bcff]/30 text-[#d0bcff]"
    },
    {
      id: "ben-4",
      icon: TrendingUp,
      title: lang === "es" ? "Monitoreo de Tendencias al Instante" : "Real-time Trend Tracking",
      desc: lang === "es"
        ? "Explora los temas calientes del día en redes sociales. Nuestra IA te sugiere ideas de contenido en tendencia que coincidan exactamente con la temática y estilo de tu canal de video."
        : "Explore today's viral triggers. Our AI suggests content ideas that align with your channel's specific aesthetic, editing voice, and theme presets.",
      color: "from-[#f43f5e]/10 to-[#f43f5e]/5 border-[#f43f5e]/30 text-[#f43f5e]"
    }
  ];

  const steps = [
    {
      title: lang === "es" ? "1. Sube tu Metraje" : "1. Upload Your Footage",
      subtitle: lang === "es" ? "Importa tu video largo" : "Import long videos",
      desc: lang === "es"
        ? "Arrastra y suelta tu archivo en formato MP4 o selecciona uno de nuestros presets de prueba directamente en el Dashboard interactivo."
        : "Drag and drop your MP4 files or choose from our pre-loaded test sequences directly inside the interactive Dashboard workspace.",
      detail: lang === "es"
        ? "Soporte completo para formatos horizontal (16:9), vertical (9:16) y cuadrado (1:1) en calidad hasta 4K UHD."
        : "Complete native support for landscape (16:9), portrait (9:16), and square (1:1) presets in high-fidelity 4K UHD."
    },
    {
      title: lang === "es" ? "2. Escaneo Inteligente" : "2. Intelligent Scan",
      subtitle: lang === "es" ? "La IA procesa el contenido" : "AI analyzes footage",
      desc: lang === "es"
        ? "Haz clic en 'Analizar Clips'. Nuestro modelo Gemini evalúa picos de audio, ritmo visual y contrastes lumínicos para puntuar el nivel de engagement (0 a 100)."
        : "Click 'Analyze Clips'. Our Gemini models parse high-energy audio peaks, aesthetic keyframes, and pacing to score virality potentials.",
      detail: lang === "es"
        ? "Identifica transiciones espectaculares, chistes clave o momentos de alta intensidad visual sin que tengas que editar manualmente."
        : "Spot perfect cuts, emotional shifts, or comedic timing instantly without tedious manual editing hours."
    },
    {
      title: lang === "es" ? "3. Edición en un Clic" : "3. One-Click Assembly",
      subtitle: lang === "es" ? "Personalización en la Línea de Tiempo" : "Track personalization",
      desc: lang === "es"
        ? "Agrega las mejores sugerencias a la línea de tiempo multipista. Añade subtítulos con estilo con nuestro generador inteligente."
        : "Send high-scoring segments straight onto the multitrack timeline. Inject styled title overlays with our dynamic generator.",
      detail: lang === "es"
        ? "La barra de reproducción se sincroniza automáticamente con el visor cinematográfico 4K para una previsualización impecable."
        : "The master timeline syncs seamlessly with the 4K cinematic canvas for high-precision real-time playback."
    },
    {
      title: lang === "es" ? "4. Programación y Publicación" : "4. Automation & Publish",
      subtitle: lang === "es" ? "Automatiza tu calendario editorial" : "Schedule content calendar",
      desc: lang === "es"
        ? "Exporta tu proyecto pulido y agenda su publicación en TikTok, Reels de Instagram o YouTube Shorts desde el calendario integrado."
        : "Export fully assembled clips and schedule them across TikTok, Instagram, and YouTube using our visual editorial scheduler.",
      detail: lang === "es"
        ? "Monitorea estadísticas clave de rendimiento y responde comentarios usando plantillas autogeneradas por IA."
        : "Monitor cross-platform analytics and engage viewers via Gemini-curated feedback templates."
    }
  ];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (authMode === "login") {
      if (!email || !password) {
        setLoginError(activeTrans.requiredEmailPass);
        return;
      }
      const defaultName = email.split("@")[0];
      const capitalizedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
      
      setSuccessMsg(activeTrans.welcomeBack(capitalizedName));
      setTimeout(() => {
        onLogin(capitalizedName);
        setSuccessMsg("");
      }, 1000);
    } else {
      if (!username || !email || !password) {
        setLoginError(activeTrans.requiredAllFields);
        return;
      }
      setSuccessMsg(activeTrans.registerSuccess(username));
      setTimeout(() => {
        onLogin(username);
        setSuccessMsg("");
      }, 1000);
    }
  };

  const handleDemoBypass = () => {
    onLogin("Alex Rivera");
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0b1326] text-[#dae2fd] relative">
      
      {/* Floating Language Selector Toggle */}
      <div className="absolute top-4 right-6 flex items-center gap-1 bg-[#171f33]/80 backdrop-blur-md border border-white/5 p-1 rounded-xl z-30">
        <button
          type="button"
          onClick={() => onChangeLang("es")}
          className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
            lang === "es" ? "bg-[#d0bcff]/20 text-[#d0bcff]" : "text-[#cbc3d7] hover:text-white"
          }`}
        >
          ESP
        </button>
        <button
          type="button"
          onClick={() => onChangeLang("en")}
          className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg transition-all cursor-pointer ${
            lang === "en" ? "bg-[#d0bcff]/20 text-[#d0bcff]" : "text-[#cbc3d7] hover:text-white"
          }`}
        >
          ENG
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 sm:px-12 md:px-16 text-center max-w-6xl mx-auto space-y-8">
        {/* Glow effect background blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-r from-[#a078ff]/15 to-[#4cd7f6]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Decorative badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a078ff]/10 border border-[#a078ff]/25 text-xs text-[#d0bcff] font-extrabold tracking-wider uppercase mx-auto animate-pulse">
          <Sparkles size={14} className="text-[#4cd7f6]" />
          <span>{activeTrans.tagline}</span>
        </div>

        {/* Headline requested by user */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] sm:leading-[1.05]">
          {lang === "es" ? (
            <>
              Todo tu equipo creativo <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d0bcff] via-[#a078ff] to-[#4cd7f6]">
                en un solo lugar
              </span>
            </>
          ) : (
            <>
              Your entire creative team <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d0bcff] via-[#a078ff] to-[#4cd7f6]">
                in one single place
              </span>
            </>
          )}
        </h1>

        {/* Secondary subtitle */}
        <p className="text-base sm:text-lg text-[#cbc3d7]/80 max-w-2xl mx-auto leading-relaxed">
          {activeTrans.subtitle}
        </p>

        {/* Auth status or Call To Action */}
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          {isLoggedIn ? (
            <div className="bg-[#171f33]/60 border border-white/5 p-4 rounded-2xl flex items-center gap-4 max-w-md w-full justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#a078ff]/10 border border-[#a078ff]/25 flex items-center justify-center font-bold text-white uppercase text-sm">
                  {userProfileName.substring(0, 2)}
                </div>
                <div className="text-left">
                  <p className="text-xs text-[#cbc3d7]">{activeTrans.sessionAs}</p>
                  <p className="text-sm font-extrabold text-white">{userProfileName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={onLogout}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-[#cbc3d7] text-xs hover:bg-white/5 hover:text-white transition-all cursor-pointer font-bold"
                >
                  {activeTrans.logout}
                </button>
              </div>
            </div>
          ) : (
            <a 
              href="#seccion-registro" 
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#a078ff]/15 flex items-center gap-2"
            >
              <span>{activeTrans.access}</span>
              <ArrowRight size={16} />
            </a>
          )}
          <button 
            onClick={() => {
              setDemoPrompt(lang === "es" ? "Un astronauta cyberpunk en un bosque bioluminiscente con tonos morados" : "A cyberpunk astronaut in a bioluminescent forest with purple tones");
              setDemoGeneratedAsset(null);
              setShowDemoRegisterPrompt(false);
              setShowDemoModal(true);
            }}
            className="px-6 py-3.5 rounded-xl bg-[#a078ff]/10 border border-[#a078ff]/30 text-white text-sm font-bold hover:bg-[#a078ff]/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>{activeTrans.demo}</span>
            <Play size={14} className="fill-current text-[#4cd7f6]" />
          </button>
        </div>
      </section>

      {/* Grid of Benefits (Beneficios de la herramienta) */}
      <section className="py-16 px-6 sm:px-12 md:px-16 max-w-6xl mx-auto space-y-12 border-t border-white/5">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {activeTrans.benefitsTitle}
          </h2>
          <p className="text-sm text-[#cbc3d7]/70 max-w-xl mx-auto">
            {activeTrans.benefitsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={benefit.id}
                className={`p-6 rounded-2xl border bg-gradient-to-b ${benefit.color} hover:translate-y-[-2px] transition-all duration-300 space-y-4`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <IconComponent size={20} />
                </div>
                <h3 className="text-base font-bold text-white">{benefit.title}</h3>
                <p className="text-xs text-[#cbc3d7]/80 leading-relaxed">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section (Cómo se usa) */}
      <section className="py-16 px-6 sm:px-12 md:px-16 bg-[#131b2e]/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/20 text-[10px] text-[#4cd7f6] font-bold uppercase tracking-wider">
              <span>{activeTrans.workflow}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeTrans.howItWorks}
            </h2>
            
            <p className="text-sm text-[#cbc3d7]/80 leading-relaxed">
              {activeTrans.howItWorksDesc}
            </p>

            <div className="space-y-2">
              {steps.map((s, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setActiveUseStep(idx)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 border text-left transition-all cursor-pointer ${
                    activeUseStep === idx 
                      ? "bg-[#a078ff]/10 border-[#a078ff]/30 text-white font-bold" 
                      : "bg-[#0b1326]/40 border-white/5 text-[#cbc3d7] hover:bg-white/5"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    activeUseStep === idx ? "bg-[#a078ff] text-[#0b1326]" : "bg-white/10"
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0b1326] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden min-h-[300px] flex flex-col justify-between shadow-xl shadow-[#000]/20">
            {/* Visual ambient shine */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#4cd7f6]/10 rounded-full blur-[60px]" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] uppercase font-bold text-[#4cd7f6] tracking-wider font-mono">
                {steps[activeUseStep].subtitle}
              </span>
              <h3 className="text-lg font-extrabold text-white">
                {steps[activeUseStep].title}
              </h3>
              <p className="text-xs text-[#cbc3d7] leading-relaxed">
                {steps[activeUseStep].desc}
              </p>
              <div className="p-4 rounded-xl bg-[#131b2e]/60 border border-white/5 text-[11px] text-[#cbc3d7]/90 leading-relaxed font-mono">
                💡 <span className="font-bold text-white">Tip Pro:</span> {steps[activeUseStep].detail}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-[#cbc3d7]/60">
              <span>{activeTrans.stepOf(activeUseStep + 1, 4)}</span>
              <button 
                type="button"
                onClick={() => setActiveUseStep((prev) => (prev + 1) % 4)}
                className="text-[#d0bcff] hover:text-white font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{activeTrans.nextStep}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Subscription Pricing Plans Section */}
      <section id="planes-suscripcion" className="py-16 px-6 sm:px-12 md:px-16 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/25 text-[11px] text-[#4cd7f6] font-bold tracking-wider uppercase">
            <DollarSign size={12} />
            <span>{lang === "es" ? "Planes de Inscripción" : "Subscription Plans"}</span>
          </div>
          <h2 className="text-3xl font-black text-white leading-tight">
            {lang === "es" ? "Elige el plan perfecto para ti" : "Choose the perfect plan for you"}
          </h2>
          <p className="text-xs sm:text-sm text-[#cbc3d7]/70 max-w-2xl mx-auto">
            {lang === "es" 
              ? "Prueba gratis nuestra suite creativa o desbloquea el flujo de trabajo profesional para potenciar tu marca."
              : "Try our creative suite for free or unlock the professional workflow to power up your personal brand."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: 15-day Free Trial */}
          <div className={`p-6 sm:p-8 rounded-2xl bg-[#171f33]/65 border relative flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] shadow-lg ${
            chosenPlan === "trial" ? "border-[#a078ff] shadow-[#a078ff]/10 bg-[#171f33]" : "border-white/5"
          }`}>
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold text-[#d0bcff] tracking-widest font-mono bg-[#d0bcff]/10 px-2.5 py-1 rounded-md inline-block">
                {lang === "es" ? "Prueba de 15 Días" : "15-Day Free Trial"}
              </span>
              <div>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-3xl font-black">$0</span>
                  <span className="text-xs text-[#cbc3d7]/60 font-medium">/{lang === "es" ? "15 días" : "15 days"}</span>
                </div>
                <p className="text-[11px] text-[#cbc3d7]/70 mt-1">
                  {lang === "es" ? "Luego Pro por $20 al mes" : "Then Pro for $20 per month"}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-3 text-xs text-[#cbc3d7]/90">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check size={14} />
                  <span>{lang === "es" ? "Solo 30 publicaciones al mes" : "Limit 30 posts per month"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "Acceso al Calendario Editorial" : "Access Editorial Calendar"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "Subtítulos Estéticos Inteligentes" : "Smart Aesthetic Captions"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "Análisis de Clips Básico" : "Basic Highlights Scanner"}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setChosenPlan("trial");
                setAuthMode("register");
                setTimeout(() => {
                  const el = document.getElementById("seccion-registro");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className={`w-full py-2.5 mt-6 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                chosenPlan === "trial" 
                  ? "bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26]" 
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              }`}
            >
              {lang === "es" ? "Iniciar Prueba Gratis" : "Start Free Trial"}
            </button>
          </div>

          {/* Card 2: Annual Pro Plan (17% Savings) */}
          <div className={`p-6 sm:p-8 rounded-2xl bg-[#171f33]/65 border relative flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] shadow-lg ${
            chosenPlan === "pro" ? "border-[#a078ff] shadow-[#a078ff]/15 bg-[#171f33]" : "border-white/5"
          }`}>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-md">
              {lang === "es" ? "MÁS POPULAR - AHORRA 17%" : "MOST POPULAR - SAVE 17%"}
            </div>

            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold text-[#4cd7f6] tracking-widest font-mono bg-[#4cd7f6]/10 px-2.5 py-1 rounded-md inline-block">
                {lang === "es" ? "Pro Anual" : "Annual Pro"}
              </span>
              <div>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-3xl font-black">$16.60</span>
                  <span className="text-xs text-[#cbc3d7]/60 font-medium">/mes</span>
                </div>
                <p className="text-[11px] text-[#4cd7f6] mt-1 font-bold">
                  {lang === "es" ? "$199 facturado anualmente (Ahorro 17%)" : "$199 billed annually (17% discount)"}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-3 text-xs text-[#cbc3d7]/90">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check size={14} />
                  <span>{lang === "es" ? "Solo 30 publicaciones al mes" : "Limit 30 posts per month"}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-bold">
                  <Check size={14} className="text-[#a078ff]" />
                  <span>{lang === "es" ? "Procesamiento con Gemini Pro" : "Full Gemini Pro Engine"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "Editor Multipista Avanzado" : "Advanced Multitrack Editor"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "Asistente de comentarios ilimitado" : "Unlimited Replies Assistant"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "Soporte Prioritario" : "Priority Support"}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setChosenPlan("pro");
                setAuthMode("register");
                setTimeout(() => {
                  const el = document.getElementById("seccion-registro");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className={`w-full py-2.5 mt-6 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                chosenPlan === "pro" 
                  ? "bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26]" 
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              }`}
            >
              {lang === "es" ? "Adquirir Plan Pro" : "Select Annual Pro"}
            </button>
          </div>

          {/* Card 3: Enterprise Plan */}
          <div className={`p-6 sm:p-8 rounded-2xl bg-[#171f33]/65 border relative flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] shadow-lg ${
            chosenPlan === "enterprise" ? "border-[#a078ff] shadow-[#a078ff]/10 bg-[#171f33]" : "border-white/5"
          }`}>
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold text-[#cbc3d7]/60 tracking-widest font-mono bg-white/5 px-2.5 py-1 rounded-md inline-block">
                {lang === "es" ? "Empresas" : "Enterprise"}
              </span>
              <div>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-3xl font-black">{lang === "es" ? "A Medida" : "Custom"}</span>
                </div>
                <p className="text-[11px] text-[#cbc3d7]/70 mt-1">
                  {lang === "es" ? "Para agencias y equipos corporativos" : "For agencies and large scale teams"}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-3 text-xs text-[#cbc3d7]/90">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check size={14} />
                  <span>{lang === "es" ? "Publicaciones ilimitadas" : "Unlimited posts per month"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "Multi-cuenta de marca oficial" : "Multi-brand accounts linked"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "API de Integración y webhooks" : "Dedicated developer API"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#4cd7f6]" />
                  <span>{lang === "es" ? "SLA y Gerente de Cuenta de Éxito" : "SLA & Personal Success Manager"}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setChosenPlan("enterprise");
                alert(lang === "es" 
                  ? "✓ Solicitud de Enterprise registrada. Nuestro equipo corporativo se pondrá en contacto contigo en tu correo en unos minutos."
                  : "✓ Enterprise request registered. Our corporate sales team will contact you at your email address shortly."
                );
              }}
              className="w-full py-2.5 mt-6 text-xs font-bold rounded-xl transition-all cursor-pointer bg-[#0b1326] text-[#cbc3d7] border border-white/10 hover:bg-white/5"
            >
              {lang === "es" ? "Contactar Ventas" : "Contact Sales"}
            </button>
          </div>

        </div>
      </section>

      {/* Login & Registration Section */}
      <section id="seccion-registro" className="py-20 px-6 sm:px-12 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-black text-white leading-tight">
              {activeTrans.levelUp}
            </h2>
            <p className="text-sm text-[#cbc3d7]/80 leading-relaxed">
              {activeTrans.levelUpDesc}
            </p>

            <div className="space-y-4">
              {activeTrans.levelUpBenefits.map((benefitText, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 flex items-center justify-center">
                    <Check size={12} className="text-[#4cd7f6]" />
                  </div>
                  <span className="text-xs text-[#cbc3d7] font-semibold">{benefitText}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#171f33] border border-white/5 p-6 sm:p-8 rounded-2xl shadow-2xl relative">
              
              {/* Form header switcher */}
              <div className="grid grid-cols-2 gap-2 bg-[#0b1326] p-1.5 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setLoginError("");
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authMode === "login"
                      ? "bg-[#a078ff]/20 text-[#d0bcff] border border-[#a078ff]/30 shadow"
                      : "text-[#cbc3d7] hover:text-white"
                  }`}
                >
                  <LogIn size={14} />
                  <span>{activeTrans.login}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("register");
                    setLoginError("");
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    authMode === "register"
                      ? "bg-[#a078ff]/20 text-[#d0bcff] border border-[#a078ff]/30 shadow"
                      : "text-[#cbc3d7] hover:text-white"
                  }`}
                >
                  <UserPlus size={14} />
                  <span>{activeTrans.register}</span>
                </button>
              </div>

              {loginError && (
                <div className="p-3 mb-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-semibold">
                  ⚠️ {loginError}
                </div>
              )}

              {successMsg && (
                <div className="p-3 mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
                  ✓ {successMsg}
                </div>
              )}

              {/* Interactive Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "register" && (
                  <>
                    {/* Visual Plan Selector Badge inside form */}
                    <div className="p-3.5 rounded-xl bg-[#0b1326] border border-white/5 space-y-1.5 mb-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#cbc3d7]/60 block font-mono">
                        {lang === "es" ? "Plan de Inscripción Seleccionado" : "Selected Subscription Plan"}
                      </span>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-black text-white">
                            {chosenPlan === "trial" 
                              ? (lang === "es" ? "Prueba Gratis 15 días (Pro $20/m)" : "15-Day Free Trial (Pro $20/m)")
                              : chosenPlan === "pro" 
                                ? (lang === "es" ? "Plan Pro Anual ($16.60/mes)" : "Annual Pro Plan ($16.60/mo)")
                                : (lang === "es" ? "Plan Enterprise" : "Enterprise Plan")}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#4cd7f6] font-mono font-bold bg-[#4cd7f6]/5 border border-[#4cd7f6]/20 px-1.5 py-0.5 rounded">
                          {chosenPlan === "enterprise" ? "Custom" : "30 posts/mes"}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#cbc3d7]/60 leading-tight">
                        {chosenPlan === "trial" 
                          ? (lang === "es" ? "Prueba todas las funciones. Cancela en cualquier momento sin costo." : "Try all features. Cancel anytime at no cost.")
                          : chosenPlan === "pro"
                            ? (lang === "es" ? "Disfruta de un 17% de ahorro facturado anualmente ($199/año)." : "Enjoy 17% savings billed annually ($199/yr).")
                            : (lang === "es" ? "Soporte corporativo y límites ilimitados." : "Enterprise support and unlimited posts.")}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">
                        {activeTrans.usernameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none transition-colors"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">
                    {activeTrans.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@asap.ai"
                    className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">
                    {activeTrans.passwordLabel}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] font-bold text-xs rounded-xl hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-[#a078ff]/15 flex items-center justify-center gap-2 mt-2"
                >
                  <span>{authMode === "login" ? activeTrans.enterEditor : activeTrans.createFreeAccount}</span>
                  <ArrowRight size={14} />
                </button>
              </form>

              <div className="relative my-6 text-center">
                <hr className="border-white/5" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 bg-[#171f33] text-[9px] uppercase tracking-widest text-[#cbc3d7]/50 font-bold font-mono">
                  {activeTrans.orTryNow}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDemoPrompt(lang === "es" ? "Un astronauta cyberpunk en un bosque bioluminiscente con tonos morados" : "A cyberpunk astronaut in a bioluminescent forest with purple tones");
                  setDemoGeneratedAsset(null);
                  setShowDemoRegisterPrompt(false);
                  setShowDemoModal(true);
                }}
                className="w-full py-2.5 bg-[#0b1326] hover:bg-[#0b1326]/80 text-[#d0bcff] border border-[#d0bcff]/20 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {lang === "es" ? "Probar Demo Interactiva Rápida" : "Try Interactive Quick Demo"}
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* Elegant Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-xs text-[#cbc3d7]/40 max-w-6xl mx-auto">
        <p>{activeTrans.footerLove}</p>
      </footer>

      {/* Interactive Quick Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#171f33] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto">
            
            {/* Close button */}
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-[#cbc3d7] hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all cursor-pointer"
            >
              <LogIn size={16} className="rotate-180" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#a078ff]/10 border border-[#a078ff]/20 text-[10px] text-[#d0bcff] font-extrabold tracking-wider uppercase font-mono">
                <Sparkles size={12} className="text-[#4cd7f6]" />
                <span>Demo Interactiva</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {lang === "es" ? "Crea y Programa con IA" : "Create & Schedule with AI"}
              </h3>
              <p className="text-xs text-[#cbc3d7]/70">
                {lang === "es" 
                  ? "Experimenta el flujo en tiempo real de ASAP AI generando contenido y programándolo."
                  : "Experience the real-time workflow of ASAP AI generating content and scheduling it."}
              </p>
            </div>

            {/* Step Content */}
            {!showDemoRegisterPrompt ? (
              <div className="space-y-6">
                
                {/* Mode Selector (Image or Video) */}
                <div className="grid grid-cols-2 gap-2 bg-[#0b1326] p-1.5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setDemoType("image");
                      setDemoGeneratedAsset(null);
                      setDemoPrompt(lang === "es" ? "Un astronauta cyberpunk en un bosque bioluminiscente con tonos morados" : "A cyberpunk astronaut in a bioluminescent forest with purple tones");
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      demoType === "image"
                        ? "bg-[#a078ff]/20 text-[#d0bcff] border border-[#a078ff]/30 shadow"
                        : "text-[#cbc3d7] hover:text-white"
                    }`}
                  >
                    <ImageIcon size={14} />
                    <span>{lang === "es" ? "Generar Imagen" : "Generate Image"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDemoType("video");
                      setDemoGeneratedAsset(null);
                      setDemoPrompt(lang === "es" ? "Increíble toma de dron de una ciudad futurista con rascacielos llenos de neón" : "Amazing drone shot of a futuristic city with neon-filled skyscrapers");
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      demoType === "video"
                        ? "bg-[#a078ff]/20 text-[#d0bcff] border border-[#a078ff]/30 shadow"
                        : "text-[#cbc3d7] hover:text-white"
                    }`}
                  >
                    <VideoIcon size={14} />
                    <span>{lang === "es" ? "Generar Video" : "Generate Video"}</span>
                  </button>
                </div>

                {/* Prompt input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono block">
                    {lang === "es" ? "Instrucción para la IA (Prompt)" : "AI Instruction (Prompt)"}
                  </label>
                  <textarea
                    rows={2}
                    value={demoPrompt}
                    onChange={(e) => setDemoPrompt(e.target.value)}
                    placeholder={lang === "es" ? "Describe lo que quieras crear..." : "Describe what you want to create..."}
                    className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-3 border border-white/10 focus:border-[#d0bcff] outline-none transition-colors resize-none"
                  />
                  
                  {/* Preset prompts buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setDemoPrompt(lang === "es" ? "Un gato de caricatura en 3D tocando los teclados" : "A 3D cartoon cat playing keyboards")}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-[#cbc3d7] hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    >
                      🐱 {lang === "es" ? "Gato 3D" : "3D Cat"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoPrompt(lang === "es" ? "Catarata futurista mística en un cañón de cristal azul" : "Mystical futuristic waterfall in a blue glass canyon")}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-[#cbc3d7] hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    >
                      ⛰️ {lang === "es" ? "Catarata de Cristal" : "Glass Waterfall"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoPrompt(lang === "es" ? "Un auto deportivo de los 80s conduciendo hacia un atardecer de onda sintética" : "An 80s sports car driving into a synthwave sunset")}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-[#cbc3d7] hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    >
                      🏎️ {lang === "es" ? "Atardecer Retro" : "Retro Sunset"}
                    </button>
                  </div>
                </div>

                {/* Generate CTA Button */}
                <button
                  type="button"
                  disabled={isDemoGenerating || !demoPrompt.trim()}
                  onClick={() => {
                    setIsDemoGenerating(true);
                    setDemoGeneratedAsset(null);
                    setTimeout(() => {
                      setIsDemoGenerating(false);
                      if (demoType === "image") {
                        setDemoGeneratedAsset("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80");
                      } else {
                        setDemoGeneratedAsset("https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-city-timelapse-44431-large.mp4");
                      }
                    }, 2500);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] font-bold text-xs rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isDemoGenerating ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>{lang === "es" ? "Procesando con ASAP AI..." : "Processing with ASAP AI..."}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>{lang === "es" ? "Generar con IA Gratis" : "Generate with AI Free"}</span>
                    </>
                  )}
                </button>

                {/* Generation Result Display */}
                {isDemoGenerating && (
                  <div className="p-8 rounded-xl bg-[#0b1326] border border-white/5 flex flex-col items-center justify-center space-y-3">
                    <Loader2 size={24} className="animate-spin text-[#4cd7f6]" />
                    <p className="text-xs text-[#cbc3d7] animate-pulse">
                      {lang === "es" ? "Pensando prompt, aplicando algoritmos de difusión..." : "Thinking prompt, applying diffusion algorithms..."}
                    </p>
                  </div>
                )}

                {demoGeneratedAsset && !isDemoGenerating && (
                  <div className="space-y-4 p-4 rounded-xl bg-[#0b1326] border border-white/5">
                    <span className="text-[9px] font-mono text-[#4cd7f6] uppercase tracking-widest font-extrabold bg-[#4cd7f6]/10 px-2 py-0.5 rounded">
                      {lang === "es" ? "✓ Borrador Generado Exitosamente" : "✓ Draft Generated Successfully"}
                    </span>
                    
                    {/* Rendered Asset Preview */}
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                      {demoType === "image" ? (
                        <img 
                          src={demoGeneratedAsset} 
                          alt="AI Generated" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full relative">
                          <video 
                            src={demoGeneratedAsset} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-[11px] font-mono text-white bg-black/60 px-2.5 py-1 rounded-full flex items-center gap-2 border border-white/10">
                              <Play size={10} className="fill-current text-[#4cd7f6]" />
                              {lang === "es" ? "Vista previa de Video IA" : "AI Video Preview"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 2: Schedule & Connect Social Media */}
                    <div className="pt-2 space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono block">
                          {lang === "es" ? "Seleccionar Canales para Programar" : "Select Channels to Schedule"}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (demoPlatforms.includes("tiktok")) {
                                setDemoPlatforms(demoPlatforms.filter(p => p !== "tiktok"));
                              } else {
                                setDemoPlatforms([...demoPlatforms, "tiktok"]);
                              }
                            }}
                            className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              demoPlatforms.includes("tiktok")
                                ? "bg-black text-white border-white/30"
                                : "bg-white/5 text-[#cbc3d7] border-white/5 hover:bg-white/10"
                            }`}
                          >
                            <span className="font-extrabold">TikTok</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (demoPlatforms.includes("instagram")) {
                                setDemoPlatforms(demoPlatforms.filter(p => p !== "instagram"));
                              } else {
                                setDemoPlatforms([...demoPlatforms, "instagram"]);
                              }
                            }}
                            className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              demoPlatforms.includes("instagram")
                                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white border-transparent"
                                : "bg-white/5 text-[#cbc3d7] border-white/5 hover:bg-white/10"
                            }`}
                          >
                            <span className="text-[10px] font-bold">IG</span>
                            <span>Instagram</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (demoPlatforms.includes("youtube")) {
                                setDemoPlatforms(demoPlatforms.filter(p => p !== "youtube"));
                              } else {
                                setDemoPlatforms([...demoPlatforms, "youtube"]);
                              }
                            }}
                            className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              demoPlatforms.includes("youtube")
                                ? "bg-red-600 text-white border-transparent"
                                : "bg-white/5 text-[#cbc3d7] border-white/5 hover:bg-white/10"
                            }`}
                          >
                            <span className="text-[10px] font-bold">YT</span>
                            <span>YouTube</span>
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowDemoRegisterPrompt(true)}
                        className="w-full py-3 bg-[#4cd7f6] text-[#001f26] font-bold text-xs rounded-xl hover:bg-[#3bc8e6] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Calendar size={14} />
                        <span>{lang === "es" ? "Programar en Calendario ASAP" : "Schedule in ASAP Calendar"}</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            ) : (
              /* Beautiful Warning screen that prompts register/login as requested */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                  <Lock size={32} />
                </div>
                
                <div className="space-y-2 max-w-md mx-auto">
                  <h4 className="text-lg font-extrabold text-white">
                    {lang === "es" ? "🔒 Cuenta Requerida para Programar" : "🔒 Account Required to Schedule"}
                  </h4>
                  <p className="text-xs text-[#cbc3d7]/80 leading-relaxed">
                    {lang === "es" 
                      ? "¡Felicidades! Has completado el paso de demostración y generado tu clip. Para conectar de forma segura tus redes sociales y programar esta publicación en tu calendario real, por favor crea tu cuenta gratis en 10 segundos."
                      : "Congratulations! You have completed the demo phase and generated your clip. To securely connect your social channels and program this post to your real calendar, please create your free account in 10 seconds."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1326] border border-white/5 text-left space-y-2 max-w-md mx-auto font-mono text-[10px] text-[#cbc3d7]/70">
                  <p className="font-bold text-white">
                    {lang === "es" ? "Beneficios de Registrarse Hoy:" : "Benefits of Joining Today:"}
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-emerald-400">
                      <Check size={10} />
                      <span>{lang === "es" ? "15 Días de Prueba de Editor Gratuito" : "15-day Free Trial of the Pro Editor"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={10} className="text-[#4cd7f6]" />
                      <span>{lang === "es" ? "Conectores Oficiales con TikTok, IG y YouTube" : "Official Connectors with TikTok, IG & YouTube"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={10} className="text-[#4cd7f6]" />
                      <span>{lang === "es" ? "30 Publicaciones Programadas Mensuales" : "30 Scheduled Posts Monthly"}</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDemoModal(false);
                      setAuthMode("register");
                      setTimeout(() => {
                        const el = document.getElementById("seccion-registro");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 150);
                    }}
                    className="py-3 bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] text-xs font-bold rounded-xl hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    {lang === "es" ? "Crear Cuenta Gratis" : "Sign Up Free"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDemoModal(false);
                      setAuthMode("login");
                      setTimeout(() => {
                        const el = document.getElementById("seccion-registro");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 150);
                    }}
                    className="py-3 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                  >
                    {lang === "es" ? "Iniciar Sesión" : "Log In"}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
