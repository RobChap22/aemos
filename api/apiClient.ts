import * as Contentful from 'contentful';



const client = Contentful.createClient({
  space: "a6li7201cqmc",
  accessToken: "0I6Ue9a3zsvFjhDWgXfFuPItepsJwuBwTA3n5NkB-VU"
});


export const armyShow = async (id) => {
  try {
    const response = await client.getEntry({ 'content_type': 'army' });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
