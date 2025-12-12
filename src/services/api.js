// wrapper for dictionary API
export async function fetchDictionary(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Word not found');
    throw new Error(`Dictionary API error: ${res.status}`);
  }
  const json = await res.json();
  return json; // array of entries
}
