var fetchUrl = require("fetch").fetchUrl;
fetchUrl("http://netlab.sogang.ac.kr", function(error, meta, body){
        console.log(body.toString());
});
