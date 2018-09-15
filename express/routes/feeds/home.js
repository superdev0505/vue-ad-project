const axios = require('axios')
const moment = require('moment')

module.exports = (req, res, builder) => {
    const obj = {
        'rss': {
            $: {
                'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
                'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
                'xmlns:atom': 'http://www.w3.org/2005/Atom',
                'xmlns:sy': 'http://purl.org/rss/1.0/modules/syndication/',
                'xmlns:media': 'http://search.yahoo.com/mrss/'
            }, 
            'channel': {
                'title': 'Android Headlines',
                'atom:link': {
                    $: {
                        'href': process.env.CLIENT_URL + '/feed',
                        'rel': 'self',
                        'type': 'application/rss+xml'
                    }
                },
                'link': process.env.CLIENT_URL,
                'description': 'Android News',
                'lastBuildDate': moment().format(),
                'language': 'en-US',
                'sy:updatePeriod': 'hourly',
	            'sy:updateFrequency': 1,
                'generator': 'Reaction',
                'image': {
                    'url': process.env.CLIENT_URL + '/favicon.ico', //this should use a png image
                    'title': 'Android Headlines',
                    'link': process.env.CLIENT_URL,
                    'width': 32,
                    'height': 32
                },
                'item': []
            }
        }
    }
    axios.get(process.env.API_URL + '/v1/feed/home', {params: req.query}).then(function(response) {
        for (let i = 0; i < response.data.data.length; i++) {
            let post = response.data.data[i]
            obj.rss.channel.item.push({
                'title': post.title,
                'link': process.env.CLIENT_URL + '/' + post.permalink,
                'comments': process.env.CLIENT_URL + '/' + post.permalink + '#respond',
                'pubDate': moment(post.date).format(),
                'description': post.excerpt,
                'content:encoded': post.content,
                'dc:creator': post.author.username,
                'category': post.taxonomies.data.map(function(item) {
                    return item.name
                }),
                'media:content': {
                    $: {
                        'url': post.featured.source_url,
                        'width': post.featured.media_details.width,
                        'height': post.featured.media_details.height,
                        'type': post.featured.media_type
                    }
                }
            })
        }
        var xml = builder.buildObject(obj)
        res.end(xml)
    })
}