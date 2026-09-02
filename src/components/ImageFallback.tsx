import { useState } from 'react'
import { ImageOff } from 'lucide-react'

export default function ImageFallback({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [errored, setErrored] = useState(!src)

  if (errored || !src) {
    return (
      <div
        className={`flex items-center justify-center ${className ?? ''}`}
        style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}
      >
        <div className="flex flex-col items-center gap-2">
          <ImageOff size={22} />
          <span className="font-mono text-[10px] tracking-widest">IMAGE PENDING</span>
        </div>
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setErrored(true)} />
}
