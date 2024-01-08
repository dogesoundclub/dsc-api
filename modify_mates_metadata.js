const fs = require('fs');
const path = require('path');

const directoryPath = './docs/mate/';

fs.readdir(directoryPath, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);

        // Check if the path is a file
        if (fs.statSync(filePath).isFile()) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) throw err;

                // Check if data is not empty
                if (data.trim()) {
                    try {
                        let json = JSON.parse(data);
                        json.image = json.image.replace('https://storage.googleapis.com/dsc-mate/336/', 'https://api.dogesound.club/mate/images/');

                        fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', err => {
                            if (err) throw err;
                            console.log(`Updated ${file}`);
                        });
                    } catch (err) {
                        console.error(`Failed to parse JSON in ${file}: ${err}`);
                    }
                }
            });
        }
    });
});