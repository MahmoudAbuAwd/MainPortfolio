/**
 * Soft, warm sound kit for the TV, synthesised with WebAudio (nothing is
 * downloaded). Everything runs through one gentle chain (low-pass to remove
 * harshness, light compression, a slow fade at the edges) so no sound is
 * sharp or piercing. Nothing plays until the visitor touches a control.
 */

let ctx: AudioContext | null = null
let out: AudioNode | null = null
let master = 0.5

export function setMasterVolume(v: number) {
  master = Math.min(1, Math.max(0, v))
}

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!ctx) {
    const C =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!C) return null
    ctx = new C()

    // master chain: warm low-pass -> gentle compressor -> speakers
    const lp = ctx.createBiquadFilter()
    lp.type = "lowpass"
    lp.frequency.value = 4200
    lp.Q.value = 0.5
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -22
    comp.ratio.value = 3
    comp.attack.value = 0.005
    comp.release.value = 0.2
    const trim = ctx.createGain()
    trim.gain.value = 0.7
    lp.connect(comp).connect(trim).connect(ctx.destination)
    out = lp
  }
  if (ctx.state === "suspended") void ctx.resume()
  return ctx
}

/** Brown-ish noise: far softer than white noise, like distant rain / a tube hiss. */
function softNoise(c: AudioContext, seconds: number) {
  const len = Math.max(1, Math.floor(c.sampleRate * seconds))
  const buf = c.createBuffer(1, len, c.sampleRate)
  const d = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.04 * white) / 1.04
    d[i] = last * 3.2
  }
  return buf
}

/** A sine blip with a smooth attack and a long exponential tail. */
function blip(c: AudioContext, t: number, f0: number, f1: number, dur: number, peak: number) {
  const o = c.createOscillator()
  o.type = "sine"
  o.frequency.setValueAtTime(f0, t)
  o.frequency.exponentialRampToValueAtTime(f1, t + dur)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(peak, t + 0.006)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(g).connect(out!)
  o.start(t)
  o.stop(t + dur + 0.02)
}

/** A soft wooden "tock" for each detent. */
export function tick() {
  const c = ac()
  if (!c || !out || master <= 0) return
  const t = c.currentTime
  blip(c, t, 520, 210, 0.07, 0.22 * master)
  blip(c, t, 1040, 420, 0.035, 0.07 * master)
}

/** A short, soft whoosh of static when the channel changes. */
export function staticBurst(seconds = 0.3) {
  const c = ac()
  if (!c || !out || master <= 0) return
  const t = c.currentTime
  const n = c.createBufferSource()
  n.buffer = softNoise(c, seconds + 0.1)
  const bp = c.createBiquadFilter()
  bp.type = "bandpass"
  bp.frequency.setValueAtTime(900, t)
  bp.frequency.linearRampToValueAtTime(1800, t + seconds)
  bp.Q.value = 0.35
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(0.2 * master, t + seconds * 0.35)
  g.gain.exponentialRampToValueAtTime(0.0001, t + seconds)
  n.connect(bp).connect(g).connect(out)
  n.start(t)
}

/** A low, round thump with a faint rising hum as the tube warms up. */
export function powerOn() {
  const c = ac()
  if (!c || !out || master <= 0) return
  const t = c.currentTime
  blip(c, t, 55, 85, 0.55, 0.5 * master)
  blip(c, t + 0.05, 180, 330, 0.9, 0.05 * master)
  staticBurst(0.5)
}

/** A gentle falling tone as the picture collapses. */
export function powerOff() {
  const c = ac()
  if (!c || !out || master <= 0) return
  const t = c.currentTime
  blip(c, t, 420, 55, 0.45, 0.22 * master)
  blip(c, t + 0.28, 70, 45, 0.25, 0.3 * master)
}
