function convertPathToUrl(basePath, baseUrl, path) {
    const regExp = new RegExp('^' + basePath.replace('/', '\\/'));
    return path.replace(regExp, baseUrl);
}
module.exports = convertPathToUrl;
