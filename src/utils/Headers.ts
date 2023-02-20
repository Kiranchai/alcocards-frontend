const fetchHeaders: HeadersInit = new Headers({
  "x-access-token": localStorage.getItem("token") as string,
  "Content-type": "application/json"
});

export default fetchHeaders;
