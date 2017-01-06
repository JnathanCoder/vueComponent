export function setWechatTitle(title) {

	document.title = title
	
	var mobile = navigator.userAgent.toLowerCase()
	if (/iphone|ipad|ipod/.test(mobile)) {
		var iframe = document.createElement('iframe')
		iframe.style.visibility = 'hidden'
		//替换成网站图标或者任意存在的较小的图标即可
		iframe.setAttribute('src','../../img/logo.png')
		var iframeCallback = function () {
			setTimeout(function () {
				iframe.removeEventListener('load',iframeCallback)
				document.body.removeChild(iframe)
			}, 0)
		}

		iframe.addEventListener('load', iframeCallback)
		document.body.appenfChild(iframe)
	}
}