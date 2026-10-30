import fs from 'fs';
import path from 'path';

export function getTestData(fileName) {
    const filePath = path.resolve(`./testData/${fileName}`);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}




