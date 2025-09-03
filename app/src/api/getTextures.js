import textureData from "../data/textureMetaData.json";

let cachedData = null;

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  // Return cached version if available
  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  // Otherwise, cache and return
  cachedData = textureData;
  res.status(200).json(textureData);
}
