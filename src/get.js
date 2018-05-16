export default async function(url) {
  let response = await fetch(url);
  return await response.json();
}
