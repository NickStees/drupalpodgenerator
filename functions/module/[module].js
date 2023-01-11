import { convertXML } from 'simple-xml-to-json';
export async function onRequest(context) {
  // context.params.module is the module name
  const module = context.params.module;

  // fetch() module details from https://updates.drupal.org/release-history/${module}/current
  var url = `https://updates.drupal.org/release-history/${module}/current`

  // fetch XML content
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
    },
  })

  // check if the response is ok
  if (!res.ok) {
    return new Response(res.statusText, { status: res.status })
  }
  const txt = await res.text();

  const details = convertXML(txt);

  return new Response(JSON.stringify(details))




}