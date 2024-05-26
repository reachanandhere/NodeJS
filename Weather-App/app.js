const request = require("request");

const url =
  "https://api.ambeedata.com/latest/by-lat-lng?lat=12&lng=78&x-api-key=72bff522ebfbb2abdb8b1c3b21ffd0acd40947dc16f940b15ff3c4bd7eb2bfbe";

request({ url: url, json: true}, (error, response)=>{
    const data = response.body
    console.log(data)
});
