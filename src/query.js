var fs, querystring, request;

querystring = require('querystring');

request = require('request');

fs = require('fs');

(function() {
  var api_auth, api_key, callback, options, query_string, raw_query, service;
  api_key = process.env.BING_ACCOUNT_KEY;
  if (api_key == null) {
    console.log("Error, BING_ACCOUNT_KEY is not set!");
  }
  api_auth = new Buffer(api_key + ":" + api_key).toString('base64');
  service = process.argv[2];
  raw_query = process.argv[3].replace("%20", " ");
  query_string = querystring.escape("" + raw_query);
  options = {
    url: "https://api.datamarket.azure.com/Bing/Search/" + service + "?$format=json&Query=%27" + query_string + "%27",
    method: 'POST',
    headers: {
      Authorization: "Basic " + api_auth
    },
    postData: {
      mimeType: 'application/x-www-form-urlencoded',
      request_fulluri: true,
      ignore_errors: true
    }
  };
  callback = function(error, response, body) {
    var i, len, ref, result, results, search;
    if (error) {
      return console.log(error);
    } else if (response.statusCode === 200) {
      search = JSON.parse(body);
      ref = search.d.results;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        result = ref[i];
        results.push(process.stdout.write("[" + result.Title + "](" + result.DisplayUrl + ")  \n" + result.Description + "\n\n"));
      }
      return results;
    } else {
      console.log(error);
      return console.log(body);
    }
  };
  if (api_key) {
    return request(options, callback).on('response', function(response) {
      return fs.writeFile('bing-headers.json', JSON.stringify(response.headers, null, 2));
    }).pipe(fs.createWriteStream('bing-response.json'));
  }
})();
