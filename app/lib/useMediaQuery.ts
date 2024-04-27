import { useEffect, useState } from 'react';

/**
 * Hook para detectar si la consulta de medios CSS proporcionada coincide.
 * @param query String con la consulta de medios CSS, por ejemplo "(min-width: 768px)".
 * @returns Boolean que indica si la consulta coincide.
 */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;

