"use client";

import { motion } from "framer-motion";

export function AmbientField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(223,232,223,0.78),rgba(251,248,241,0)_68%)] blur-2xl" animate={{ scale: [1, 1.08, 1], opacity: [0.58, 0.82, 0.58] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute left-[12%] top-[18%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(183,145,114,0.18),rgba(255,253,248,0)_70%)] blur-xl" animate={{ x: [0, 36, 0], y: [0, 22, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[14%] right-[10%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(232,221,200,0.48),rgba(255,253,248,0)_72%)] blur-xl" animate={{ x: [0, -26, 0], y: [0, -32, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <svg className="absolute inset-x-0 top-24 h-[34rem] w-full opacity-45" viewBox="0 0 1440 520" fill="none">
        <motion.path d="M-80 284C165 184 342 194 514 254C741 333 885 323 1064 222C1211 139 1376 127 1528 177" stroke="url(#wave)" strokeWidth="1.2" animate={{ pathLength: [0.45, 1, 0.45], opacity: [0.18, 0.58, 0.18] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        <motion.path d="M-98 340C139 266 322 269 529 325C743 383 939 367 1138 283C1290 218 1408 213 1535 251" stroke="url(#wave)" strokeWidth="1" animate={{ pathLength: [0.35, 0.88, 0.35], opacity: [0.12, 0.42, 0.12] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
        <defs>
          <linearGradient id="wave" x1="0" x2="1440" y1="260" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b79172" stopOpacity="0" />
            <stop offset="0.5" stopColor="#9fae9f" />
            <stop offset="1" stopColor="#b79172" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,253,248,0)_0,rgba(255,253,248,0.62)_72%,rgba(255,253,248,0.95)_100%)]" />
    </div>
  );
}
