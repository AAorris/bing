uerystring = require 'querystring'
request = require 'request'
fs = require 'fs'


get_promise = (url)->
  new Promise (fulfill, reject)->
    request.get url, (error, response, body)->
        if error then reject(error) else fulfill(body)


module.exports=

  # variables
  # ------------------------------------------------------------------
  root: "http://www.image-net.org"
  is_a: "http://www.image-net.org/archive/wordnet.is_a.txt"
  structure: "http://www.image-net.org/api/xml/structure_released.xml"
  release: "http://www.image-net.org/api/xml/ReleaseStatus.xml"
  # ------------------------------------------------------------------
  # routes

  # Get a list of all synsets
  synsets:->
    get_promise "#{root}/api/text/imagenet.synset\
                 .obtain_synset_list"

  # Get a synset
  synset:(wnid)->
    get_promise "#{root}/synset?wnid=#{wnid}"

  # Get the hyponym(children synset) of a synset by wnid.
  hyponym:(wnid, options)->
    url = "#{root}/api/text/wordnet.structure.hyponym\
           wnid=#{wnid}"
    if options.full
      url += "&full=1"
    get_promise url

  # Get words of a synset by wnid
  words:(wnid)->
    get_promise "#{root}/api/text/wordnet.synset\
                 .getwords?wnid=#{wnid}"
