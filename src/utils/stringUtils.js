/**
 * Capitalizes the first letter of a string
 * @param {string} word - The word to capitalize
 * @returns {string} - The capitalized word
 */
export const capitalizeFirstLetter = (word) => {
  if (!word || typeof word !== 'string') return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Formats weight from hectograms to kilograms
 * @param {number} weight - Weight in hectograms
 * @returns {string} - Formatted weight string
 */
export const formatWeight = (weight) => {
  if (!weight || typeof weight !== 'number') return 'Unknown';
  return `${(weight / 10).toFixed(1)} kg`;
};

/**
 * Formats height from decimeters to meters
 * @param {number} height - Height in decimeters
 * @returns {string} - Formatted height string
 */
export const formatHeight = (height) => {
  if (!height || typeof height !== 'number') return 'Unknown';
  return `${(height / 10).toFixed(1)} m`;
};

/**
 * Formats Pokemon name for display
 * @param {string} name - Raw Pokemon name
 * @returns {string} - Formatted name
 */
export const formatPokemonName = (name) => {
  if (!name) return '';
  return name.split('-').map(capitalizeFirstLetter).join(' ');
};