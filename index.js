var credentials = {
	username: '',
	password: '',
    domainName: ''
};

var cname = {
    'host': '',
    'pointsto': '',
    'ttl': 600 // 10 mins
};


var Nightmare = require("nightmare");
var nightmare = new Nightmare({ cookiesFile: "./cookie.txt"});
nightmare
    .viewport(1200, 1200)
    .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
    .goto("https://sso.godaddy.com?path=sso%2Freturn&app=www")
    .type('#loginname', credentials.username)
    .type('#password', credentials.password)
    .click("#submitBtn")
    .wait()
    .goto("https://dns.godaddy.com/ZoneFile.aspx?zone=" + credentials.domainName + "&zoneType=0&isc=&prog_id=GoDaddy&refer=dcc&regionsite=GB")
    .wait()


    ////////////////////////////////////////////////
    // 1) A new cname row
    ////////////////////////////////////////////////
    .evaluate(function () {
        jQuery('#ctl00_cphMain_divCNAMEGrid + div.sprite-link-buttons a').trigger("click");
        return 1;
    }, function (step) {
        console.dir('Step ' + parseInt(step) + ' is complete');
    })
    .screenshot("./1.jpg")


    /////////////////////////////////////////////////
    // 2) Populate the cname host
    /////////////////////////////////////////////////
    .wait(1500)
    .evaluate(function (cname) {
        jQuery('#tblCNAMERecords tbody:first > tr:last input[type="text"]:first').val(cname.host);
        jQuery('#tblCNAMERecords tbody:first > tr:last input[type="text"]:first').trigger("blur");
        return 2;
    }, function (step) {
        console.dir('Step ' + parseInt(step) + ' is complete');
    }, cname)
    .screenshot("./2.jpg")


    /////////////////////////////////////////////////
    // 3) Populate the points to
    /////////////////////////////////////////////////
    .wait(3000)
    .evaluate(function (cname) {
        jQuery('#tblCNAMERecords tbody:first > tr:last input[type="text"]:last').val(cname.pointsto);
        jQuery('#tblCNAMERecords tbody:first > tr:last input[type="text"]:last').trigger("blur");
        return 3;
    }, function (step) {
        console.dir('Step ' + parseInt(step) + ' is complete');
    }, cname)
    .screenshot("./3.jpg")


    /////////////////////////////////////////////////
    // 4) Selecting the ttl
    /////////////////////////////////////////////////
    .wait(4500)
    .evaluate(function (cname) {
        jQuery('#tblCNAMERecords tbody:first > tr:last select:last').val(cname.ttl);
        jQuery('#tblCNAMERecords tbody:first > tr:last select:last').trigger("blur");
        return 4;
    }, function (step) {
        console.dir('Step ' + parseInt(step) + ' is complete');
    }, cname)
    .screenshot("./4.jpg")


    /////////////////////////////////////////////////
    // 5) Save step 1
    /////////////////////////////////////////////////
    .wait(6000)
    .evaluate(function () {
        jQuery('#ctl00_cphMain_divSaveTwo a').trigger("click");
       return 5
    }, function (step) {
        console.dir('Step ' + parseInt(step) + ' is complete');
    })
    .screenshot("./5.jpg")


    /////////////////////////////////////////////////
    // 6) Save step 2
    /////////////////////////////////////////////////
    .wait(10000)
    .evaluate(function () {
        jQuery("#modalOkTwo").trigger("click");
        return 6
    }, function (step) {
        console.dir('Step ' + parseInt(step) + ' is complete');
    })
    .screenshot("./6.jpg")


    /////////////////////////////////////////////////
    // 7) Save step 3
    /////////////////////////////////////////////////
    .wait(12000)
    .evaluate(function () {
        jQuery("#modalOkTwo").trigger("click");
        return 7
    }, function (step) {
        console.dir('Step ' + parseInt(step) + ' is complete');
    })
    .screenshot("./7.jpg")

    .run(function(err, nightmare){
        if(err) throw new Error(err);
        console.log("All completed");
    }
);
