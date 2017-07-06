// main.js -------------------------------------

// Projections for proj4.js
var WGS84projection = "+proj=longlat +datum=WGS84 +no_defs";
var WebMercatorprojection = "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";

//copy to clipboard action (clipboard.js)
var clipboard = new Clipboard('#copyBtn');

// Height of results
var resultsHeight = "120px";

// function to transform from WGS84 to Web Mercator
function fromWGS () {
  // get Input
  var WGSinputNumber = document.getElementById("wgsInput").value;
  // remove spaces
  var inputNoSpaces = WGSinputNumber.replace(/\s/g, '');
  // split at comma and put parts in array
  var coordinates = inputNoSpaces.split(",");

  // project coordinates
  var WMoutputNumber = proj4(WGS84projection, WebMercatorprojection, coordinates);

  // invalid characters
  var invalidCharacters = /[^0-9,. ]/g;

  // check for invalid characters, check if only one number was entered (no comma)
  if (invalidCharacters.test(WGSinputNumber) === true) {
    console.log("wrong character");
    alert("You entered a wrong character. Only numbers, spaces, dots and commas are allowed.");
  } else if (WGSinputNumber.indexOf(',') == -1) {
    console.log("only one number");
    $("#outputDiv").animate({height: '0px', opacity: 0}, 80);
    $("#outputDiv").animate({height: resultsHeight, opacity: 1}, 700);
    document.getElementById("outputDiv").innerHTML = "<hr>Result:<div id='resultDiv'> " + WMoutputNumber[0] + "</div>" + "<button id='copyBtn' data-clipboard-target='#resultDiv'>Copy to clipboard</button>";
  } else {
    $("#outputDiv").animate({height: '0px', opacity: 0}, 80);
    $("#outputDiv").animate({height: resultsHeight, opacity: 1}, 700);
    document.getElementById("outputDiv").innerHTML = "<hr>Result:<div id='resultDiv'> " + WMoutputNumber[0] + ", " + WMoutputNumber[1] + "</div>" + "<button id='copyBtn' data-clipboard-target='#resultDiv'>Copy to clipboard</button>";
  }

}

// function to transform from Web Mercator to WGS84
function fromWM () {
  //get Input
  var WMinputNumber = document.getElementById("wmInput").value;
  // remove spaces
  var inputNoSpaces = WMinputNumber.replace(/\s/g, '');
  // split at comma and put parts in array
  var coordinates = inputNoSpaces.split(",");

  // project coordinates
  var WGSoutputNumber = proj4(WebMercatorprojection, WGS84projection, coordinates);

  // invalid characters
  var invalidCharacters = /[^0-9,. ]/g;

  // check for invalid characters, check if only one number was entered (no comma)
  if (invalidCharacters.test(WMinputNumber) === true) {
    console.log("wrong character");
    alert("You entered a wrong character. Only numbers, spaces, dots and commas are allowed.");
  } else if (WMinputNumber.indexOf(',') == -1) {
    console.log("only one number");
    $("#outputDiv").animate({height: '0px', opacity: 0}, 80);
    $("#outputDiv").animate({height: resultsHeight, opacity: 1}, 700);
    document.getElementById("outputDiv").innerHTML = "<hr>Result:<div id='resultDiv'> " + WGSoutputNumber[0] + "</div>" + "<button id='copyBtn' data-clipboard-target='#resultDiv'>Copy to clipboard</button>";
  } else {
    $("#outputDiv").animate({height: '0px', opacity: 0}, 80);
    $("#outputDiv").animate({height: resultsHeight, opacity: 1}, 700);
    document.getElementById("outputDiv").innerHTML = "<hr>Result:<div id='resultDiv'> " + WGSoutputNumber[0] + ", " + WGSoutputNumber[1] + "</div>" + "<button id='copyBtn' data-clipboard-target='#resultDiv'>Copy to clipboard</button>";
  }

}
