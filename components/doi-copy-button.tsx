"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DoiCopyButton({ doi }: { doi: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(doi)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-lg border border-zinc-800/60 text-zinc-300 hover:text-white hover:border-blue-500/40"
      onClick={handleCopy}
      aria-label="Copy DOI"
    >
      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
      {copied ? "Copied" : "Copy DOI"}
    </Button>
  )
}

