module.exports = `
    function setupGeoriot() {
        setTimeout(function() {
            if (typeof Georiot != 'undefined') {
                Georiot.amazon.convertToGeoRiotLinks(` + process.env.GEORIOT_TSID + `, ` + process.env.GEORIOT_PRESERVE_TRACKING + `)
            } else {
                setupGeoriot()
            }
        }, 0)
        
    }
    setupGeoriot()
`