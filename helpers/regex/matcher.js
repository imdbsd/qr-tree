/**
 * @param {string} url
 * @returns string
 */
const sanitizeProtocol = (url) => {
  if (url.startsWith("https://")) {
    return url.replace("https://", "");
  }

  if (url.startsWith("http://")) {
    return url.replace("http://", "");
  }

  return url;
};

/**
 * @param {string} url
 * @returns boolean
 */
export const isTwitterURL = (url) => {
  const clean = sanitizeProtocol(url);
  return clean.startsWith("www.x.com") || clean.startsWith("www.twitter.com");
};

/**
 * @param {string} url
 * @returns boolean
 */
export const isYoutubeURL = (url) => {
  const clean = sanitizeProtocol(url);
  return (
    clean.startsWith("www.youtube.com") || clean.startsWith("www.youtube.com")
  );
};

/**
 * @param {string} url
 * @returns boolean
 */
export const isInstagramURL = (url) => {
  const clean = sanitizeProtocol(url);
  return (
    clean.startsWith("www.instagram.com") ||
    clean.startsWith("www.instagram.com")
  );
};
