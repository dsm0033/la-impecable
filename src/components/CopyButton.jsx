"use client";

import { useState } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="font-sans text-sm font-semibold px-6 py-3 bg-transparent text-[#C9A84C] rounded-full tracking-wide border border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.1)] transition-colors"
    >
      {copied ? "¡Copiado!" : "Copiar dirección"}
    </button>
  );
}
