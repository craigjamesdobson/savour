const removeProtocolFromUrl = (url) => {
  // Remove "http://" or "https://" from the beginning of the URL
  return url.replace(/^(https?:\/\/)?/, "");
};

export { removeProtocolFromUrl } 