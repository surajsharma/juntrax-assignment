function getAllPaths(data, path, paths = []) {
    let datum = path.slice(-1)[0];
    let keys = Object.keys(data).map(Number);
    console.log(datum, path, paths);
    if (keys.includes(datum)) {
        data[datum].forEach((val) => {
            let new_path = path.concat([val]);
            paths = getAllPaths(data, new_path, paths);
        });
    } else {
        paths.push(path);
    }
    return paths;
}

module.exports = { getAllPaths };
