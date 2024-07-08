import fs from 'fs';

const excepts = ['./node_modules', './dist', './public', './assets', './src'];

export const mapHTMLFiles = (
	{ depth, folder, htmlFiles } = { folder: '.', depth: 4, htmlFiles: {} }
) => {
	const files = fs.readdirSync(folder);

	for (const fileFound of files) {
		const file = `${folder}/${fileFound}`;

		const fileStats = fs.lstatSync(file);

		if (fileStats.isFile() && file.endsWith('html') && depth >= 0) {
			htmlFiles = {
				...htmlFiles,
				[file.split('./')[1].split('.html')[0]]: file,
			};
			continue;
		}

		if (fileStats.isDirectory() && !excepts.includes(file) && depth >= 0) {
			htmlFiles = mapHTMLFiles({ folder: file, depth: depth - 1, htmlFiles });
		}
	}

	return htmlFiles;
};
