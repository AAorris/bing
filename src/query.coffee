querystring = require 'querystring'
request = require 'request'

do->
  api_key = process.env.BING_ACCOUNT_KEY
  api_auth = new Buffer("#{api_key}:#{api_key}").toString 'base64'
  console.log api_auth

  service = process.argv[2]
  raw_query = process.argv[3].replace("%20", " ")
  query_string = querystring.escape "#{raw_query}"

  options=
    url: "https://api.datamarket.azure.com/Bing/Search/#{service}?$format=json&Query=%27#{query_string}%27"
    method: 'POST'
    headers:
      Authorization: "Basic #{api_auth}"
    postData:
      mimeType: 'application/x-www-form-urlencoded'
      request_fulluri: true
      ignore_errors: true

  callback = (error, response, body)->
    if error
      console.log error
    else if response.statusCode is 200
      console.log body
      console.log JSON.parse(body)
    else
      console.log error
      console.log body

  # console.log options
  # console.log process.argv
  request options, callback
