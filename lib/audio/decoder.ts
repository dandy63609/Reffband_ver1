/**
 * Reffband Web Audio API Waveform Decoder
 * Architectural Decision: AD-4 (Native client-side audio decoding & waveform peak extraction)
 */

export interface WaveformAnalysis {
  duration: number;
  peaks: number[];
  sampleRate: number;
}

/**
 * Extracts normalized peak amplitudes [0.0 - 1.0] from an AudioBuffer
 * without external libraries or FFmpeg serverless overhead.
 */
export function extractPeaksFromAudioBuffer(
  audioBuffer: AudioBuffer,
  numPeaks = 64
): number[] {
  const channelData = audioBuffer.getChannelData(0); // Primary channel (L or Mono)
  const totalSamples = channelData.length;
  const blockSize = Math.floor(totalSamples / numPeaks);
  const peaks: number[] = [];

  for (let i = 0; i < numPeaks; i++) {
    const start = i * blockSize;
    let max = 0;
    for (let j = 0; j < blockSize; j++) {
      const sample = Math.abs(channelData[start + j] || 0);
      if (sample > max) {
        max = sample;
      }
    }
    // Clamped and normalized between 0.08 (min height bar) and 1.0
    peaks.push(Math.max(0.08, Math.min(1.0, parseFloat(max.toFixed(3)))));
  }

  return peaks;
}

/**
 * Decodes an audio File/Blob client-side via native AudioContext
 */
export async function decodeAudioFile(
  file: File,
  numPeaks = 64
): Promise<WaveformAnalysis> {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioCtx = new AudioCtx();
  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const peaks = extractPeaksFromAudioBuffer(audioBuffer, numPeaks);
    return {
      duration: audioBuffer.duration,
      peaks,
      sampleRate: audioBuffer.sampleRate,
    };
  } finally {
    if (audioCtx.state !== "closed") {
      await audioCtx.close();
    }
  }
}

/**
 * Generates rhythmic, natural indie-rock cassette peaks for instant preview
 */
export function generateDefaultPeaks(numPeaks = 64): number[] {
  const basePattern = [
    0.2, 0.45, 0.7, 0.9, 0.65, 0.4, 0.85, 0.95, 0.8, 0.6, 0.35, 0.75, 0.9, 0.8, 0.5, 0.3,
    0.5, 0.8, 0.95, 0.85, 0.7, 0.4, 0.9, 1.0, 0.85, 0.6, 0.4, 0.8, 0.9, 0.75, 0.5, 0.3,
  ];
  const peaks: number[] = [];
  for (let i = 0; i < numPeaks; i++) {
    peaks.push(basePattern[i % basePattern.length]);
  }
  return peaks;
}

/**
 * Validates audio file size and MIME type
 */
export function validateAudioFile(file: File): { valid: boolean; error?: string } {
  const maxBytes = 15 * 1024 * 1024; // 15MB limit
  const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav"];

  if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav)$/i)) {
    return {
      valid: false,
      error: "Format file harus berupa MP3 atau WAV.",
    };
  }

  if (file.size > maxBytes) {
    return {
      valid: false,
      error: "Ukuran audio melebihi batas 15MB.",
    };
  }

  return { valid: true };
}
