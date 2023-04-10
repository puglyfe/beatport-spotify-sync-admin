const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> => {
  const response = await fetch(input, init);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result);
  }

  return result;
};

export default fetcher;
