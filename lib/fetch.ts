const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> => fetch(input, init).then((res) => res.json());

export default fetcher;
