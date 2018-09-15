const axios = require('axios')
const moment = require('moment')

module.exports = (req, res, builder) => {
    const obj = {
        'rss': {
            $: {
                'version': '2.0',
                'xmlns:media': 'http://search.yahoo.com/mrss/',
                'xmlns:atom': 'http://www.w3.org/2005/Atom'
            }, 
            'channel': {
                'title': 'Featured post',
                'atom:link': {
                    $: {
                        'href': process.env.CLIENT_URL + '/deals-rss',
                        'rel': 'self',
                        'type': 'application/rss+xml'
                    }
                },
                'link': process.env.CLIENT_URL,
                'description': 'Featured blog post.',
                'lastBuildDate': moment().format(),
                'language': 'en-US',
                'managingEditor': 'emily@reaction.ca (Emily)',
                'item': []
            }
        }
    }
    axios.get(process.env.API_URL + '/v1/feed/deals', {query: req.query}).then(function(response) {
        for (let i = 0; i < response.data.data.length; i++) {
            let post = response.data.data[i]
            obj.rss.channel.item.push({
                'title': post.title,
                'link': process.env.CLIENT_URL + '/' + post.permalink,
                'pubDate': moment(post.date).format(),
                'description': post.excerpt,
                'media:content': {
                    $: {
                        'url': post.featured.source_url,
                        'width': '100%',
                        'height': '100%',
                        'type': post.featured.media_type
                    }
                }
            })
        }
        var xml = builder.buildObject(obj)
        res.end(xml)
    })
}