const fs = require('fs');
const path = require('path');
const generatePdf = require('./generatePdf');
const utils = require('util');

const html = fs.readFileSync(path.resolve(__dirname, './html.html')).toString();
const writeFilePromisified = utils.promisify(fs.writeFile);

void async function () {
	const pdf = await generatePdf(html, {
		firstName:           'userInfo.firstName',
		lastName:            'userInfo.lastName',
		patronymic:          'userInfo.patronymic',
		registrationAddress: 'userInfo.registrationAddress',
		livingAddress:       'userInfo.livingAddress',
		phone:               'phone',
		email:               'email',
		taxId:               'userInfo.taxId',
		publicKey:           'userInfo.publicKey',
		passportData:        {
			series: 'string',
			number: 'number',
			issuedAt: 'string',
			issuedBy: 'string'
		},
		passportPhotos:      ['qqq'].map((item) => {
			return `data:image/png;base64,${item}`;
		}),
		taxIdPhotos: ['www'].map((item) => {
			return `data:image/png;base64,${item}`;
		}),
	},
	{
		height: '39.7cm',
		width:  '29cm',
	});

	const outputPath = path.resolve(__dirname, './pdf.pdf');

	await writeFilePromisified(outputPath, pdf);
	console.log(`PDF Created. Saved to ${outputPath}`);
	
} ()
