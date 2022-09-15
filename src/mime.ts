import { CustomError } from "./decorators";
import { nextTick } from "./promise";

export interface Mime {
  getType(path: string): string | null;
  getExtension(mime: string): string | null;
}

interface LoadState {
  loaded: boolean;
  loadStarted: boolean;
  loadPrevented: boolean;
}

@CustomError()
export class MimeIsNotLoadedError extends Error {
  constructor() {
    super("Mime is not loaded");
  }
}

let current: Mime;
let loadState: LoadState = { loaded: false, loadStarted: false, loadPrevented: false };

export const getLoaded = () => loadState.loaded;
export const getLoadPrevented = () => loadState.loadPrevented;
export const getLoadStarted = () => loadState.loadStarted;

export async function setMime(mime: Promise<Mime> | Mime) {
  if (loadState.loadStarted) {
    loadState.loadPrevented = true;
  }
  const currentLoadState: LoadState = loadState = { loaded: false, loadStarted: true, loadPrevented: false };
  const r = await mime;
  if (currentLoadState.loadPrevented) {
    current = r;
  }
  currentLoadState.loaded = true;
}

nextTick().then(
  async () => {
    try {
      await setMime(import("mime").then(m => m.default));
    } catch {
      await setMime(import("./small-mime"));
    }
  }
);

export function getType(path: string) {
  if (!loadState.loaded) {
    throw new MimeIsNotLoadedError();
  }
  return current.getType(path);
}

export function getExtension(mime: string) {
  if (!loadState.loaded) {
    throw new MimeIsNotLoadedError();
  }
  return current.getExtension(mime);
}

export default {
  getType,
  getExtension,
};
