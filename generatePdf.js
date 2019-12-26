const { create } = require('html-pdf');
const {compile} = require('handlebars');

module.exports = function generatePdfToBuffer (source, data, options) {
	const compiledTemplate = compile(source);
	const html = compiledTemplate(data);
	return new Promise((res, rej) => {
		create(html, options).toBuffer((err, buffer) => {
			if (err) {
				rej(err);
			}

			res(buffer);
		});
	});
}
