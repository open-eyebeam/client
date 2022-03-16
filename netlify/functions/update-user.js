const sanity = require("@sanity/client")
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid');

const sanityClient = sanity({
    projectId: process.env.SANITY_ID,
    dataset: "production",
    token: process.env.SANITY_TOKEN,
    useCdn: false,
})

// const loadData = async (query, params) => {
//     try {
//         const res = await client.fetch(query, params)
//         if (res === null) {
//             return Promise.reject('No posts');
//         }
//         return res
//     } catch (err) {
//         return Promise.reject(new Error(404));
//     }
// }

const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

exports.handler = async (event, context) => {
    console.log(event)
    const authObject = JSON.parse(event.body)
    console.log('authObject', authObject)
    const currentDoc = await sanityClient.fetch("*[_type == 'user' && _id == $userId][0]", { userId: authObject.id })
    console.log('currentDoc', currentDoc)
    const doc = {
        _type: 'user',
        _id: authObject.id,
        name: authObject.username,
        // avatarURL: event.user.picture,
        // roles: roles,
        email: authObject.email,
        slug: {
            _type: 'slug',
            current: slug(authObject.username)
        }
    }
    const newDoc = await sanityClient.createOrReplace(doc)
    return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(newDoc)
    };
}