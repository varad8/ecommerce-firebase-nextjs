export function extractImageNameFromUrl(url) {
  const splitArray = url.split("%2F");
  const lastPart = splitArray[splitArray.length - 1];
  const imageNameWithExtension = lastPart.split("?")[0];
  return decodeURIComponent(imageNameWithExtension);
}
