// express/routes/index.js sample
const { Router } = require('express')
const router = Router()
const axios = require('axios')
const xml2js = require('xml2js')

const parser = new xml2js.Parser()
const builder = new xml2js.Builder({
    cdata: true
})

router.get('/ads.txt', (req, res) => {
    axios.get(process.env.API_URL + '/v1/ads.txt').then(function(response) {
        res.end(response.data)
    })
})

router.get(process.env.GOOGLE_SITEMAP_PATH, (req, res) => {
    axios.get(process.env.SITEMAP_URL + process.env.GOOGLE_SITEMAP_PATH).then(function(response) {
        parser.parseString(response.data, function (err, result) {
            for (let i = 0; i < result.urlset.url.length; i++) {
                for (let ii = 0; ii < result.urlset.url[i].loc.length; ii++) {
                    result.urlset.url[i].loc[ii] = result.urlset.url[i].loc[ii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                }
                if (result.urlset.url[i]['image:image'].length) {
                    for (let ii = 0; ii < result.urlset.url[i]['image:image'].length; ii++) {
                        for (let iii = 0; iii < result.urlset.url[i]['image:image'][ii]['image:loc'].length; iii++) {
                            result.urlset.url[i]['image:image'][ii]['image:loc'][iii] = result.urlset.url[i]['image:image'][ii]['image:loc'][iii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                        }
                    }
                }
            }
            const xml = builder.buildObject(result)
            res.end(xml)
        })
    })
})

router.get('/sitemap_index.xml', (req, res) => {
    axios.get(process.env.SITEMAP_URL + '/sitemap_index.xml').then(function(response) {
        parser.parseString(response.data, function (err, result) {
            for (let i = 0; i < result.sitemapindex.sitemap.length; i++) {
                for (let ii = 0; ii < result.sitemapindex.sitemap[i].loc.length; ii++) {
                    result.sitemapindex.sitemap[i].loc[ii] = result.sitemapindex.sitemap[i].loc[ii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                }
            }
            const xml = builder.buildObject(result)
            res.end(xml)
        })
    })
})

router.get('/post-sitemap*.xml', (req, res) => {
    console.log(process.env.SITEMAP_URL + req.path)
    axios.get(process.env.SITEMAP_URL + req.path).then(function(response) {
        parser.parseString(response.data, function (err, result) {
            for (let i = 0; i < result.urlset.url.length; i++) {
                for (let ii = 0; ii < result.urlset.url[i].loc.length; ii++) {
                    result.urlset.url[i].loc[ii] = result.urlset.url[i].loc[ii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                }
                if (result.urlset.url[i]['image:image'].length) {
                    for (let ii = 0; ii < result.urlset.url[i]['image:image'].length; ii++) {
                        for (let iii = 0; iii < result.urlset.url[i]['image:image'][ii]['image:loc'].length; iii++) {
                            result.urlset.url[i]['image:image'][ii]['image:loc'][iii] = result.urlset.url[i]['image:image'][ii]['image:loc'][iii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                        }
                    }
                }
            }
            const xml = builder.buildObject(result)
            res.end(xml)
        })
    })
})

router.get('/page-sitemap.xml', (req, res) => {
    axios.get(process.env.SITEMAP_URL + '/page-sitemap.xml').then(function(response) {
        parser.parseString(response.data, function (err, result) {
            for (let i = 0; i < result.urlset.url.length; i++) {
                for (let ii = 0; ii < result.urlset.url[i].loc.length; ii++) {
                    result.urlset.url[i].loc[ii] = result.urlset.url[i].loc[ii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                }
                if (result.urlset.url[i]['image:image'].length) {
                    for (let ii = 0; ii < result.urlset.url[i]['image:image'].length; ii++) {
                        for (let iii = 0; iii < result.urlset.url[i]['image:image'][ii]['image:loc'].length; iii++) {
                            result.urlset.url[i]['image:image'][ii]['image:loc'][iii] = result.urlset.url[i]['image:image'][ii]['image:loc'][iii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                        }
                    }
                }
            }
            const xml = builder.buildObject(result)
            res.end(xml)
        })
    })
})

router.get('/category-sitemap.xml', (req, res) => {
    axios.get(process.env.SITEMAP_URL + '/category-sitemap.xml').then(function(response) {
        parser.parseString(response.data, function (err, result) {
            for (let i = 0; i < result.urlset.url.length; i++) {
                for (let ii = 0; ii < result.urlset.url[i].loc.length; ii++) {
                    result.urlset.url[i].loc[ii] = result.urlset.url[i].loc[ii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                }
                if (result.urlset.url[i]['image:image'].length) {
                    for (let ii = 0; ii < result.urlset.url[i]['image:image'].length; ii++) {
                        for (let iii = 0; iii < result.urlset.url[i]['image:image'][ii]['image:loc'].length; iii++) {
                            result.urlset.url[i]['image:image'][ii]['image:loc'][iii] = result.urlset.url[i]['image:image'][ii]['image:loc'][iii].replace(process.env.SITEMAP_URL, process.env.CLIENT_URL)
                        }
                    }
                }
            }
            const xml = builder.buildObject(result)
            res.end(xml)
        })
    })
})


router.get('/feed', (req, res) => {
    require('./feeds/home')(req, res, builder)
})

router.get('/featured-rss', (req, res) => {
    require('./feeds/featured')(req, res, builder)
})

router.get('/deals-rss', (req, res) => {
    require('./feeds/deals')(req, res, builder)
})

router.get('/story-rss', (req, res) => {
    require('./feeds/story')(req, res, builder)
})

module.exports = router