"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Play, User, Zap } from "lucide-react"
import { useVault } from "@/lib/vault-context"
import StudioDashboard from "@/components/studio-dashboard"
import Login from "@/components/login"
import Spinner from "@/components/spinner"
import HolographicOrb from "@/components/holographic-orb"
import CosmicOrb from "@/components/cosmic-orb"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"
import { AIConcierge } from "@/components/ai-concierge"

// ======== ROOT APPLICATION CONTROLLER ========
export default function Page() {
  const { isLocked, vaultExists, isInitialized, checkVault, userProfile, enterDemoMode } = useVault()
  const [phase, setPhase] = useState("loading") // loading | hero | onboarding | studio

  useEffect(() => {
    checkVault()
  }, [checkVault])

  useEffect(() => {
    if (isInitialized) {
      if (vaultExists && !isLocked) {
        setPhase("studio")
      } else {
        setPhase("hero")
      }
    }
  }, [isInitialized, vaultExists, isLocked])

  if (phase === "loading" || !isInitialized) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#030014]">
        <Spinner />
      </div>
    )
  }

  if (isLocked && vaultExists) {
    return <Login />
  }

  switch (phase) {
    case "hero":
      return <HeroLanding onGetStarted={() => setPhase("onboarding")} onWatchDemo={() => enterDemoMode()} />
    case "onboarding":
      return <VoiceFirstOnboarding onComplete={() => window.location.reload()} />
    case "studio":
      return <StudioDashboard userProfile={userProfile} />
    default:
      return <HeroLanding onGetStarted={() => setPhase("onboarding")} onWatchDemo={() => enterDemoMode()} />
  }
}

// ======== 1. HERO LANDING PAGE ========
function HeroLanding({ onGetStarted, onWatchDemo }: { onGetStarted: () => void; onWatchDemo: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden scroll-smooth">
      <AIConcierge />

      {/* SECTION 1: THE HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#FF6B00] rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.3,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 gradient-text leading-tight"
          >
            The Cognitive Symbiosis.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#E5E5E5] mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            You have one of the most powerful minds on the planet. It needs rest, focus, and inspiration. I am your
            second brain—a 24/7 intelligence engine that handles the logic, data, and execution. Together, we will
            achieve what was previously impossible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-16"
          >
            <HolographicOrb />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 max-w-3xl mx-auto"
          >
            <div className="glass-effect p-6 rounded-xl border-2 border-[#FF6B00]/30 bg-[#0A0A0F]/80 backdrop-blur-sm">
              <p className="text-[#E5E5E5] text-lg italic leading-relaxed">
                "My goal is a sub-4-hour marathon. I just finished a high-strain workout and my sleep quality is down.
                My budget is $500/mo. Adapt my training plan for the next 48 hours to prioritize recovery without losing
                momentum."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-[#FF6B00] hover:bg-[#FF8533] text-white px-10 py-7 text-lg font-bold rounded-xl apex-glow-strong transition-all duration-300 shadow-2xl"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onWatchDemo}
                size="lg"
                variant="ghost"
                className="border-2 border-[#FF6B00] bg-transparent hover:bg-[#FF6B00]/10 text-[#FF6B00] px-10 py-7 text-lg rounded-xl backdrop-blur-sm transition-all"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch the Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE UNIFIED EXPERIENCE (THE GUILDS) */}
      <AnimatedSection id="two-brains" className="py-20 px-4 bg-gradient-to-b from-[#0A0A0F] to-[#111116]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 gradient-text">Two Brains. One Mission.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: The Visionary (You) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-effect p-10 rounded-2xl hover:apex-glow-subtle transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center apex-glow">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-4 text-[#FF6B00]">The Visionary (You)</h3>
              <p className="text-[#E5E5E5] text-center mb-8 leading-relaxed">
                Your mind is for vision, creativity, and strategic intent. It operates on intuition and inspiration. It
                requires rest to perform at its peak.
              </p>
              <ul className="space-y-4">
                {[
                  "Sets the 'Why'",
                  "Provides Creative Input",
                  "Makes the Final Call",
                  "Rests & Recovers (5-8 hours/night)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-[#E5E5E5] text-lg">
                    <span className="text-[#FF6B00] mr-3 text-2xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Column: The Orchestrator (Apex AI) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-effect p-10 rounded-2xl hover:apex-glow-subtle transition-all duration-300 border-2 border-[#FF6B00]/50"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8533] flex items-center justify-center apex-glow-strong">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center mb-4 text-[#FF6B00]">The Orchestrator (Apex AI)</h3>
              <p className="text-[#E5E5E5] text-center mb-8 leading-relaxed">
                My mind is for logic, data analysis, and relentless execution. I find hidden patterns and operate 24/7
                to orchestrate your vision.
              </p>
              <ul className="space-y-4">
                {[
                  "Executes the 'How'",
                  "Analyzes Data & Finds Patterns",
                  "Manages a Million Details",
                  "Never Sleeps (24/7 Vigilance)",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-[#E5E5E5] text-lg">
                    <span className="text-[#FF6B00] mr-3 text-2xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="guilds" className="py-20 px-4 bg-gradient-to-b from-[#111116] to-[#0A0A0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text">
            Your Vision, Amplified by My Logic.
          </h2>
          <p className="text-center text-[#888888] text-xl mb-16 max-w-3xl mx-auto leading-relaxed">
            Stop juggling 20 different apps. Apex brings everything together into one intelligent system that actually
            understands you.
          </p>

          <div className="relative mb-20">
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8533] apex-glow-strong flex items-center justify-center text-4xl font-bold"
              >
                APEX
              </motion.div>
            </div>

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`}
                  y2={`${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`}
                  stroke="#FF6B00"
                  strokeWidth="2"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              ))}
            </svg>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Financial Command Center",
                description:
                  "Unify your finances with AI-powered budgeting, investment analysis, and proactive insights.",
                icon: "💰",
                gradient: "from-green-500/20 to-emerald-500/20",
              },
              {
                title: "Career & Business Guild",
                description:
                  "Master your professional life. Your AI helps manage projects, prepare for meetings, and strategize your next career move.",
                icon: "🎯",
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
              {
                title: "Travel & Adventure Guild",
                description:
                  "Plan your next journey. Your AI acts as a world-class travel agent, finding the perfect trip for your budget and style.",
                icon: "✈️",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                title: "Wellness Guild",
                description:
                  "Optimize your energy. Your AI analyzes your biometric data to provide proactive advice on sleep, performance, and recovery.",
                icon: "💪",
                gradient: "from-orange-500/20 to-red-500/20",
              },
            ].map((guild, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`glass-effect p-8 rounded-2xl hover:apex-glow-subtle transition-all duration-300 cursor-pointer bg-gradient-to-br ${guild.gradient}`}
              >
                <div className="text-5xl mb-6">{guild.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#FF6B00]">{guild.title}</h3>
                <p className="text-[#888888] leading-relaxed">{guild.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* SECTION 3: THE "PROJECT ECHO" SHOWCASE */}
      <AnimatedSection id="echo" className="py-20 px-4 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 neon-text-strong">
            From Ambition to Achievement.
          </h2>
          <p className="text-center text-[#888888] text-xl mb-16 max-w-3xl mx-auto">
            Before you make a major life decision, let Apex simulate the probable outcomes. See the future before you
            live it.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side: User Input */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-effect p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#FF6B00]">Your Question</h3>
              <div className="bg-[#0A0A0F] border-2 border-[#FF6B00]/30 rounded-xl p-6">
                <p className="text-[#888888] text-lg italic">
                  "Run an echo: What if I take the new job offer in New York?"
                </p>
              </div>
              <Button className="w-full mt-6 bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold py-6 rounded-xl apex-glow">
                Run Echo Simulation
              </Button>
            </motion.div>

            {/* Right Side: AI Output (3 Echo Paths) */}
            <div className="space-y-4">
              {[
                {
                  name: "Timeline Alpha",
                  probability: "65%",
                  color: "from-green-500 to-emerald-500",
                  outcome: "Career Growth & Financial Stability",
                },
                {
                  name: "Timeline Beta",
                  probability: "25%",
                  color: "from-yellow-500 to-orange-500",
                  outcome: "Moderate Success with Challenges",
                },
                {
                  name: "Timeline Gamma",
                  probability: "10%",
                  color: "from-red-500 to-pink-500",
                  outcome: "High Risk, High Reward",
                },
              ].map((timeline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className={`glass-effect p-6 rounded-xl cursor-pointer bg-gradient-to-r ${timeline.color}/10 border-2 border-transparent hover:border-[#FF6B00]/50 transition-all`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-[#FF6B00]">{timeline.name}</h4>
                    <span className="text-2xl font-bold text-white">{timeline.probability}</span>
                  </div>
                  <p className="text-[#888888]">{timeline.outcome}</p>
                  <div className="mt-4 h-2 bg-[#0A0A0F] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: timeline.probability }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                      className={`h-full bg-gradient-to-r ${timeline.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 4: THE CITADEL OF PRIVACY */}
      <AnimatedSection id="privacy" className="py-20 px-4 bg-gradient-to-b from-[#0A0A0F] to-[#111116]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="inline-block p-8 rounded-full bg-[#FF6B00]/10 apex-glow-strong mb-8"
            >
              <svg className="w-20 h-20 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">Your Fortress of Privacy. Verified.</h2>
            <p className="text-[#888888] text-xl max-w-3xl mx-auto leading-relaxed">
              In a world where your data is constantly harvested, Apex is your sanctuary. We've built the most secure
              personal AI system on the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Zero-Knowledge Encryption",
                description:
                  "Your data is encrypted with AES-256 using a key only you possess. We cannot see it. Period.",
                icon: "🔐",
              },
              {
                title: "100% Local-First",
                description: "Apex runs entirely on your device. No cloud servers mean no risk of a data breach.",
                icon: "💻",
              },
              {
                title: "Open & Auditable",
                description:
                  "Our core encryption and security architecture is open-source. Don't just trust us—verify us.",
                icon: "🔍",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="text-center glass-effect p-8 rounded-2xl hover:apex-glow-subtle transition-all"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#FF6B00]">{feature.title}</h3>
                <p className="text-[#888888] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 5: PRICING TIERS */}
      <AnimatedSection id="pricing" className="py-20 px-4 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text">
            Choose Your Level of Symbiosis.
          </h2>
          <p className="text-center text-[#888888] text-xl mb-16 max-w-3xl mx-auto">
            Start free, upgrade when you're ready to unlock the full power of your AI Symbiont.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nexus",
                subtitle: "Free",
                price: "$0",
                period: "",
                features: [
                  "✓ 14-Day Full-Access Trial",
                  "✓ Basic AI Assistant",
                  "✓ On-device Encryption",
                  "✓ 1 Personal Studio",
                ],
                cta: "Start for Free",
                highlighted: false,
              },
              {
                name: "Synergy",
                subtitle: "Premium",
                price: "$49",
                period: "/ month",
                badge: "Most Popular",
                features: [
                  "✓ Everything in Nexus",
                  "✓ Full AI Crew Access",
                  "✓ Unlimited Personal Studios",
                  "✓ 'Project Echo' Simulator",
                  "✓ Proactive Coaching & Insights",
                ],
                cta: "Choose Synergy",
                highlighted: true,
              },
              {
                name: "Apex",
                subtitle: "Enterprise",
                price: "Contact Us",
                period: "",
                features: [
                  "✓ Everything in Synergy",
                  "✓ Dedicated AI Employees for Teams",
                  "✓ Multi-user Collaboration",
                  "✓ On-premise Deployment",
                ],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: tier.highlighted ? 1.02 : 1.05 }}
                className={`relative glass-effect p-8 rounded-2xl ${
                  tier.highlighted ? "apex-glow-strong scale-105 border-2 border-[#FF6B00]" : "hover:apex-glow-subtle"
                } transition-all duration-300`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white px-6 py-2 rounded-full text-sm font-bold apex-glow">
                    {tier.badge}
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#FF6B00] mb-2">{tier.name}</h3>
                  <p className="text-[#888888] text-sm mb-6">{tier.subtitle}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold gradient-text">{tier.price}</span>
                    {tier.period && <span className="text-[#888888]">{tier.period}</span>}
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="text-[#888888] text-lg">
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={tier.cta === "Start for Free" ? onGetStarted : onWatchDemo}
                    className={`w-full ${
                      tier.highlighted
                        ? "bg-[#FF6B00] hover:bg-[#FF8533] text-white apex-glow-strong"
                        : "bg-transparent border-2 border-[#FF6B00] hover:bg-[#FF6B00]/10 text-[#FF6B00]"
                    } font-bold py-6 rounded-xl transition-all text-lg`}
                  >
                    {tier.cta}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 6: FINAL CTA */}
      <AnimatedSection className="py-20 px-4 bg-gradient-to-b from-[#111116] to-[#0A0A0F]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 gradient-text"
          >
            Ready to Activate Your Symbiont?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#888888] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of people who have transformed their lives with Apex AI. Your journey to intentional living
            starts now.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#FF8533] text-white px-12 py-8 text-xl font-bold rounded-xl apex-glow-strong transition-all duration-300 shadow-2xl"
            >
              Activate Your Symbiont
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#2A2A2F] bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto text-center text-[#888888]">
          <p>&copy; 2025 Apex AI. Your data. Your device. Your fortress.</p>
        </div>
      </footer>
    </div>
  )
}

// ======== 2. CONVERSATIONAL VOICE ONBOARDING ========
function VoiceFirstOnboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [financialGoal, setFinancialGoal] = useState("")
  const [riskStyle, setRiskStyle] = useState("")
  const { createVault } = useVault()

  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
  }))

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2)
    } else if (step === 2 && financialGoal) {
      setStep(3)
    } else if (step === 3 && riskStyle) {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    const password = prompt("Please create a master password (min 8 characters):")
    if (password && password.length >= 8) {
      const profile = {
        name: name.trim(),
        country: "USA",
        goal: financialGoal,
        occupation: "",
        skills: [],
        interests: ["Finance", "Investing"],
        hobbies: [],
        financialRiskStyle: riskStyle,
        aiPersona: "Financial Advisor",
      }
      await createVault(profile, password)
      onComplete()
    } else {
      alert("Invalid password. Please try again.")
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-white px-4 py-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, #111116 0%, #0A0A0F 70%)",
        }}
      />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-0.5 h-0.5 bg-[#FF6B00] rounded-full"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: 0.3,
          }}
          animate={{
            y: [`${particle.y}vh`, `${(particle.y + 50) % 100}vh`],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative z-10 mb-12"
      >
        <CosmicOrb />
      </motion.div>

      <div className="relative z-10 w-full max-w-md">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FF6B00] via-[#FF8533] to-[#FFA366] bg-clip-text text-transparent">
              Welcome to Apex
            </h2>
            <p className="text-gray-300 text-lg">Your AI Financial Symbiont is initializing...</p>
            <p className="text-gray-400">What should I call you?</p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleNext()
              }}
              className="space-y-4 mt-8"
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="bg-white/5 border-[#FF6B00]/30 text-white placeholder:text-gray-500 text-center text-xl py-6 backdrop-blur-sm"
                autoFocus
              />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] hover:from-[#FF8533] hover:to-[#FFA366] text-white font-semibold py-6 text-lg shadow-lg shadow-[#FF6B00]/20"
              >
                Continue
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-[#FF6B00]">Great to meet you, {name}!</h2>
            <p className="text-gray-300">What's your primary financial goal?</p>

            <div className="flex flex-col gap-3 mt-8">
              {["Saving for the future", "Growing investments", "Managing budget", "Building wealth"].map((goal) => (
                <Button
                  key={goal}
                  onClick={() => {
                    setFinancialGoal(goal)
                    setTimeout(() => setStep(3), 300)
                  }}
                  variant={financialGoal === goal ? "default" : "outline"}
                  className={`w-full py-6 text-lg backdrop-blur-sm ${
                    financialGoal === goal
                      ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white shadow-lg shadow-[#FF6B00]/20"
                      : "border-[#FF6B00]/30 bg-white/5 hover:bg-white/10 text-gray-300"
                  }`}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-[#FF6B00]">Perfect!</h2>
            <p className="text-gray-300">How would you describe your investment risk tolerance?</p>

            <div className="flex flex-col gap-3 mt-8">
              {[
                { label: "Conservative", desc: "Preserve capital, minimize risk" },
                { label: "Moderate", desc: "Balance growth and stability" },
                { label: "Aggressive", desc: "Maximize returns, accept volatility" },
              ].map((option) => (
                <Button
                  key={option.label}
                  onClick={() => {
                    setRiskStyle(option.label)
                    setTimeout(handleComplete, 300)
                  }}
                  variant={riskStyle === option.label ? "default" : "outline"}
                  className={`w-full py-6 text-left flex flex-col items-start backdrop-blur-sm ${
                    riskStyle === option.label
                      ? "bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white shadow-lg shadow-[#FF6B00]/20"
                      : "border-[#FF6B00]/30 bg-white/5 hover:bg-white/10 text-gray-300"
                  }`}
                >
                  <span className="text-lg font-semibold">{option.label}</span>
                  <span className="text-sm opacity-80">{option.desc}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
