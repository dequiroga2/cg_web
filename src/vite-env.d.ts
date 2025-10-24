/// <reference types="vite/client" />

// Vapi SDK Type Declarations
interface VapiInstance {
  start: () => Promise<void>;
  stop: () => void;
  isMuted: () => boolean;
  setMuted: (muted: boolean) => void;
  send: (message: any) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
}

interface VapiConfig {
  apiKey: string;
  assistant: string;
  config?: {
    position?: string;
    offset?: string;
    width?: string;
    height?: string;
    idle?: string;
    loading?: string;
    active?: string;
  };
}

interface VapiSDK {
  run: (config: VapiConfig) => VapiInstance;
}

interface Window {
  vapiSDK?: VapiSDK;
  vapiInstance?: VapiInstance;
}
