import sanity from "@sanity/client"
import _ from 'lodash'
import slugify from 'slugify'

const sanityClient = sanity({
    projectId: import.meta.env.VITE_SANITY_ID,
    apiVersion: '2021-10-05',
    dataset: "production",
    token: import.meta.env.VITE_SANITY_TOKEN,
    useCdn: false,
})

export const post = async (event) => {
    // Parse message body
    const authObject = await event.request.json()
    console.log('authObject', authObject)
    const currentDoc = await sanityClient.fetch("*[_type == 'user' && _id == $userId][0]", { userId: authObject.id })
    console.log('currentDoc', currentDoc)
    const doc = {
        _type: 'user',
        _id: authObject.id,
        name: authObject.username.split('#')[0],
        discordName: authObject.username,
        email: authObject.email,
        slug: {
            _type: 'slug',
            current: slugify(authObject.username, {
                lower: true,
            })
        }
    }
    if (currentDoc.avatar) {
        doc.avatar = currentDoc.avatar
    }
    const newDoc = await sanityClient.createOrReplace(doc)
    return {
        body: JSON.stringify(newDoc)
    };
}