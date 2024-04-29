/**
 * Transforms a query string with city name to a properly formatted city name.
 * It extracts the city name from the query string, replaces underscores with spaces,
 * and capitalizes the first letter of each word.
 *
 * @param {string} query - The query string from which to extract and format the city name.
 * @returns {string} The formatted city name with spaces and capitalized words.
 *
 * @example
 * // Returns "Bayou La Batre"
 * formatCityName("bayou_la_batre");
 */
export function formatCityName(unformattedCityName: string): string {

  const cityName = unformattedCityName.replace(/_/g, ' ')
                     .split(' ') 
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
                     .join(' '); 

  return cityName;
}
