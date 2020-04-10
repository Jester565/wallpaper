'use strict';
const {promisify} = require('util');
const path = require('path');
const childProcess = require('child_process');

const execFile = promisify(childProcess.execFile);

// Binary source → https://github.com/sindresorhus/win-wallpaper

const getBinary = () => {
	return path.join(path.resolve(), 'node_modules/wallpaper/source/win-wallpaper.exe');
}

exports.get = async () => {
	const binary = getBinary();
	const {stdout} = await execFile(binary);
	return stdout.trim();
};

exports.set = async imagePath => {
	const binary = getBinary();
	if (typeof imagePath !== 'string') {
		throw new TypeError('Expected a string');
	}

	await execFile(binary, [path.resolve(imagePath)]);
};
