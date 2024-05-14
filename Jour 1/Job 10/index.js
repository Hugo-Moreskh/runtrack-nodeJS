const url = require("node:url");

const urlValue = url.parse("https://www.google.com&search=nodejs", true);
const protocol = urlValue.protocol;
const host = urlValue.hostname;
const param = `${urlValue.pathname}/?lang=fr`;

const newUrl = `${protocol}//www.laplateoforme.io${param}`;
console.log(newUrl);
