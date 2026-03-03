export const MOBILE_BREAKPOINT = 768;
export const RANDOM_STRING_LENGTH = 1500;
export const VIEW_CHECK_INTERVAL = 100;
export const PATTERN_VISIBILITY_THRESHOLD = 0.2;
export const ICON_VISIBILITY_THRESHOLD = 0.4;
export const THROTTLE_DELAY = 16;
export const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const CHARACTERS_LENGTH = CHARACTERS.length;

export const generateRandomString = (length: number): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARACTERS[Math.floor(Math.random() * CHARACTERS_LENGTH)];
  }
  return result;
};
