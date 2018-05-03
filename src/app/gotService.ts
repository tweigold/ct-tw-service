import { Handler, Context, Callback } from 'aws-lambda';
const axios = require('axios');

/**
 * Base response HTTP headers
 */
const responseHeaders = {
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin' : '*',        // Required for CORS support to work
  'Access-Control-Allow-Credentials' : true   // Required for cookies, authorization headers with HTTPS 
}

const responses = {
  success: (data={}, code=200) => {
    return {
      'statusCode': code,
      'headers': responseHeaders,
      'body': JSON.stringify(data)
    }
  },
  error: (error) => {
    return {
      'statusCode': error.code || 500,
      'headers': responseHeaders,
      'body': JSON.stringify(error)
    }
  }
}

exports.getHouses = async (event: any, context: Context) => {
    let response;
    let apiResponse;
    try {
       response = await axios.get('https://www.anapioficeandfire.com/api/houses');       

    }catch(err){
      console.log(err);
      return responses.error(err);
    }

    return responses.success(response.data);
}