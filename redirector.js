/**
 * @param {string} url - A string param.
 */
function isGoLink(url) {
	return url.startsWith("http://go/")
}


const TOP_LEVEL_REDIRECTS = {
	"http://c/": "https://calendar.google.com/calendar/u/0/r",
	"http://m/": "https://mail.google.com/mail/u/0/#inbox",
	"http://drive/": "https://drive.google.com",
}

chrome.webNavigation['onBeforeNavigate'].addListener(function(data) {
	if (data.url in TOP_LEVEL_REDIRECTS) {
		chrome.tabs.update(data.tabId, { url: TOP_LEVEL_REDIRECTS[data.url] });
		return
	}
	if (!isGoLink(data.url)) {
		return;
	}
	chrome.identity.getProfileUserInfo({}, function(profile) {
		console.log(profile.email)
	});
});
