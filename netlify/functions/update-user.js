const sanity = require("@sanity/client")
const _ = require('lodash')
const { v4: uuidv4 } = require('uuid');

const client = sanity({
    projectId: process.env.SANITY_ID,
    dataset: "production",
    token: process.env.SANITY_TOKEN,
    useCdn: false,
})

const loadData = async (query, params) => {
    try {
        const res = await client.fetch(query, params)
        if (res === null) {
            return Promise.reject('No posts');
        }
        return res
    } catch (err) {
        return Promise.reject(new Error(404));
    }
}

const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
}

exports.handler = async (event, context) => {
    if (true) {
        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify(event)
        };
    }
    return {
        statusCode: 500,
        headers: HEADERS,
        body: "ERROR"
    };
}