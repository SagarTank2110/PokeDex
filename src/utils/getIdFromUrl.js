function getIdFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

export default getIdFromUrl;
