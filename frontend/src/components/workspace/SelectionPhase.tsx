import { motion } from "motion/react";
import { KeyboardLayout, BaseStyle, SwitchHeight } from "../../core/models";
import { useKeyboardStore } from "../../core/store";
import { Button } from "../ui/button";
import { Check, Sparkles } from "lucide-react";

interface SelectionPhaseProps {
  layout: KeyboardLayout;
  baseStyle: BaseStyle;
  switchHeight: SwitchHeight;
  onLayoutChange: (layout: KeyboardLayout) => void;
  onBaseStyleChange: (style: BaseStyle) => void;
  onSwitchHeightChange: (height: SwitchHeight) => void;
  onStart: () => void;
}

export function SelectionPhase({
  layout,
  baseStyle,
  switchHeight,
  onLayoutChange,
  onBaseStyleChange,
  onSwitchHeightChange,
  onStart,
}: SelectionPhaseProps) {
  const layouts: { value: KeyboardLayout; label: string }[] = [
    { value: "61-key", label: "61 Keys" },
    { value: "87-key", label: "87 Keys" },
    { value: "104-key", label: "104 Keys" },
  ];
  
  const switchHeights: { value: SwitchHeight; label: string; description: string }[] = [
    { value: "low-profile", label: "Low Profile", description: "Slim, portable design" },
    { value: "high-profile", label: "High Profile", description: "Mechanical switches, deeper travel" },
  ];
  
  const baseStyles: { value: BaseStyle; label: string; gradient: string }[] = [
    { value: "matte-black", label: "Matte Black", gradient: "from-gray-900 to-gray-800" },
    { value: "metal-gray", label: "Metal Gray", gradient: "from-gray-600 to-gray-500" },
    { value: "acrylic-white", label: "Acrylic White", gradient: "from-gray-100 to-white" },
    { value: "brushed-silver", label: "Brushed Silver", gradient: "from-gray-400 to-gray-300" },
    { value: "transparent-acrylic", label: "Clear Acrylic", gradient: "from-gray-200/50 to-white/30" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Radial glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 40px rgba(6, 182, 212, 0.3)",
            }}
          >
            CustomKeys
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-cyan-300/70 tracking-wide"
          >
            ⌨️ Precision keycap design workspace
          </motion.p>
        </div>

        {/* Selection Sections */}
        <div className="space-y-12">
          {/* Layout Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Keyboard Layout</h3>
            <div className="grid grid-cols-3 gap-4">
              {layouts.map((l) => (
                <motion.button
                  key={l.value}
                  onClick={() => onLayoutChange(l.value)}
                  className={`relative py-8 px-6 rounded-xl border-2 transition-all ${
                    layout === l.value
                      ? "border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg shadow-cyan-500/30"
                      : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {layout === l.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50"
                    >
                      <Check className="w-3 h-3 text-gray-900" />
                    </motion.div>
                  )}
                  <div className="text-xl">{l.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Switch Height Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Switch Height</h3>
            <div className="grid grid-cols-2 gap-4">
              {switchHeights.map((height) => (
                <motion.button
                  key={height.value}
                  onClick={() => onSwitchHeightChange(height.value)}
                  className={`relative py-6 px-6 rounded-xl border-2 transition-all text-left ${
                    switchHeight === height.value
                      ? "border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg shadow-cyan-500/30"
                      : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {switchHeight === height.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50"
                    >
                      <Check className="w-3 h-3 text-gray-900" />
                    </motion.div>
                  )}
                  <div className="text-lg mb-1">{height.label}</div>
                  <div className="text-xs text-gray-500">{height.description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Base Style Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Base Style (Wireless)</h3>
            <div className="grid grid-cols-2 gap-3">
              {baseStyles.map((style) => (
                <motion.button
                  key={style.value}
                  onClick={() => onBaseStyleChange(style.value)}
                  className={`relative py-6 px-4 rounded-xl border-2 transition-all overflow-hidden ${
                    baseStyle === style.value
                      ? "border-cyan-400 shadow-lg shadow-cyan-500/30"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} ${style.value === 'transparent-acrylic' ? 'opacity-50 backdrop-blur-sm' : 'opacity-30'}`} />
                  {baseStyle === style.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50"
                    >
                      <Check className="w-3 h-3 text-gray-900" />
                    </motion.div>
                  )}
                  <div className="relative text-base">{style.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button
            onClick={onStart}
            className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 rounded-xl shadow-2xl shadow-cyan-500/40 border border-cyan-300/30"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Designing
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
