/**
 * @param {string} url
 * @returns string
 */
const sanitizeProtocol = (url) => {
  if (/^(https|http)/.test(url)) {
    return url.replace("https://", "").replace("http://");
  }

  return url;
};

/**
 * @param {string} url
 * @returns boolean
 */
export const isTwitterURL = (url) => {
  const clean = sanitizeProtocol(url);
  const hosts = ["www.x.com", "www.twitter.com", "x.com", "twitter.com"];

  return hosts.some((host) => {
    return clean.startsWith(host);
  });
};

/**
 * @param {string} url
 * @returns boolean
 */
export const isYoutubeURL = (url) => {
  const clean = sanitizeProtocol(url);
  const hosts = [
    "www.youtube.com",
    "www.youtube.com",
    "youtube.com",
    "youtube.com",
  ];
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
