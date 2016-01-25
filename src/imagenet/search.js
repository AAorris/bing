var fs, get_promise, request, uerystring;

uerystring = require('querystring');

request = require('request');

fs = require('fs');

get_promise = function(url) {
  return new Promise(function(fulfill, reject) {
    return request.get(url, function(error, response, body) {
      if (error) {
        return reject(error);
      } else {
        return fulfill(body);
      }
    });
  });
};

module.exports = {
  root: "http://www.image-net.org",
  is_a: "http://www.image-net.org/archive/wordnet.is_a.txt",
  structure: "http://www.image-net.org/api/xml/structure_released.xml",
  release: "http://www.image-net.org/api/xml/ReleaseStatus.xml",
  synsets: function() {
    return get_promise(root + "/api/text/imagenet.synset.obtain_synset_list");
  },
  synset: function(wnid) {
    return get_promise(root + "/synset?wnid=" + wnid);
  },
  hyponym: function(wnid, options) {
    var url;
    url = root + "/api/text/wordnet.structure.hyponymwnid=" + wnid;
    if (options.full) {
      url += "&full=1";
    }
    return get_promise(url);
  },
  words: function(wnid) {
    return get_promise(root + "/api/text/wordnet.synset.getwords?wnid=" + wnid);
  }
};
