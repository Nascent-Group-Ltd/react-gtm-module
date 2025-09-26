import warn from './utils/warn'

// https://developers.google.com/tag-manager/quickstart

const Snippets = {
	tags: function ({
		id,
		events,
		dataLayer,
		dataLayerName,
		preview = undefined,
		auth = undefined,
		nonce = undefined,
		source,
	}) {
		if (!id) warn('GTM ID is required')

		const url = new URL(source)
		const environment =
			auth && preview
				? `&gtm_auth=${auth}&gtm_preview=${preview}&gtm_cookies_win=x`
				: ''

		const iframe = `
			<iframe src="${url.origin}/ns.html?id=${id}${environment}"
				height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`

		const script = `
			window.dataLayer = window.dataLayer || [];
			function gtag(){
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', '${id}');`

		const dataLayerVar = this.dataLayer(dataLayer, dataLayerName)

		return {
			iframe,
			script,
			dataLayerVar,
		}
	},
	dataLayer: function (dataLayer, dataLayerName) {
		return `
			window.${dataLayerName} = window.${dataLayerName} || [];
			window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`
	},
}

module.exports = Snippets
