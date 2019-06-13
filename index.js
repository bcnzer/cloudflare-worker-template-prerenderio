const MY_PRERENDER_TOKEN = '' // Enter your token here

addEventListener('fetch', event => {
  event.passThroughOnException()
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a given request object
 * @param {Request} request
 */
async function handleRequest(request) {
  var url = request.url

  if (shouldShowPrerenderedPage(request)) {
    if (isNotFileUrl(url)) {
      let newUrl = new URL('https://service.prerender.io/'+encodeURIComponent(url))
      let newHdrs = new Headers()
      newHdrs.set('User-Agent', request.headers.get('user-agent'))
      newHdrs.set('X-Prerender-Token', MY_PRERENDER_TOKEN)
      let newRequest = new Request(newUrl, {
          method: request.method,
          headers: newHdrs
      })
      return fetch(newRequest)
    }
  }

  const response = await fetch(request)
  return response
}

function shouldShowPrerenderedPage(req){
    var userAgent = req.headers.get('user-agent'),
        bufferAgent = req.headers.get('x-bufferbot'),
        searchBots = /Daum|baiduspider|hubspot|googlebot|googlebot-mobile|SkypeUriPreview|UCCAPI|LinkedInBot|Embedly|Yahoo|YahooSeeker|DoCoMo|twitterbot|TweetmemeBot|Twikle|Netseer|Daumoa|SeznamBot|Ezooms|MSNBot|Exabot|MJ12bot|sogou\sspider|YandexBot|bitlybot|ia_archiver|proximic|spbot|ChangeDetection|NaverBot|MetaJobBot|magpie-crawler|Genieo\sWeb\sfilter|Qualidator.com\sBot|Woko|Vagabondo|360Spider|ExB\sLanguage\sCrawler|AddThis.com|aiHitBot|Spinn3r|BingPreview|GrapeshotCrawler|CareerBot|ZumBot|ShopWiki|bixocrawler|uMBot|sistrix|linkdexbot|AhrefsBot|archive.org_bot|SeoCheckBot|TurnitinBot|VoilaBot|SearchmetricsBot|Butterfly|Yahoo!|Plukkie|yacybot|trendictionbot|UASlinkChecker|Blekkobot|Wotbox|YioopBot|meanpathbot|TinEye|LuminateBot|FyberSpider|Infohelfer|linkdex.com|Curious\sGeorge|Fetch-Guess|ichiro|MojeekBot|SBSearch|WebThumbnail|socialbm_bot|SemrushBot|Vedma|alexa\ssite\saudit|SEOkicks-Robot|Browsershots|BLEXBot|woriobot|AMZNKAssocBot|Speedy|oBot|HostTracker|OpenWebSpider|WBSearchBot|facebookexternalhit|rogerbotpinterest|slackbot|Iframely|Ruby|WhatsApp|Mixmax-LinkPreview|bingbot|CloudFlare-AlwaysOnline|YandexMobileBot/i

    if (!userAgent) {
        return false
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        return false
    }
    if (req.headers && req.headers.get('x-prerender')) {
        return false
    }

    // if it contains _escaped_fragment_, show prerendered page
    let parsedUrl = new URL(req.url)
    if (parsedUrl.searchParams.get('_escaped_fragment_') !== null) {
        return true
    }

    // if it is a bot...show prerendered page
    if (searchBots.test(userAgent)){
        return true
    }

    // if it is BufferBot...show prerendered page
    if (bufferAgent) {
        return true
    }

    return false
}

function isNotFileUrl(url) {
  return !getExtentionsToIgnore().some(function(extension) {
      return url.toLowerCase().indexOf(extension) !== -1
  })
}

function getExtentionsToIgnore(){
  return [
  '.js',
  '.css',
  '.xml',
  '.less',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.pdf',
  '.doc',
  '.txt',
  '.ico',
  '.rss',
  '.zip',
  '.mp3',
  '.rar',
  '.exe',
  '.wmv',
  '.doc',
  '.avi',
  '.ppt',
  '.mpg',
  '.mpeg',
  '.tif',
  '.wav',
  '.mov',
  '.psd',
  '.ai',
  '.xls',
  '.mp4',
  '.m4a',
  '.swf',
  '.dat',
  '.dmg',
  '.iso',
  '.flv',
  '.m4v',
  '.torrent',
  '.woff',
  '.ttf',
  '.svg'
  ]
}