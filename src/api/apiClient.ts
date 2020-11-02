import * as Contentful from 'contentful';



const client = Contentful.createClient({
  space: "a6li7201cqmc",
  accessToken: "0I6Ue9a3zsvFjhDWgXfFuPItepsJwuBwTA3n5NkB-VU"
});


export const armiesShow = async () => {
  try {
    const response = await client.getEntries({ 'content_type': 'army' });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const unitsShow = async () => {
  try {
    const response = await client.getEntries({ 'content_type': 'unit' });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
