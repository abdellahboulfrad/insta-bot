function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesAny(normalizedText, candidates) {
  return candidates.some((candidate) => normalizedText.includes(normalizeText(candidate)));
}

module.exports = {
  normalizeText,
  includesAny
};
