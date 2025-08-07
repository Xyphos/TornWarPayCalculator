
	// Flag support provided by https://flagcdn.com/h40/{code}.png
	// Example: https://flagcdn.com/h40/us.png

var savedPrefs = {
		'locale' : 'en-US', // default
		'apiKey' : '',
		'payoutPercentage' : 80,
		'roundingFactor' : 5,
	};
	
var calcData = {
		'cached' : {
			'preCalcId' : 0,
			'preCalcBalances' : [],
			'postCalcBalances' : []
		},
	
		'grossProfit' : 0,
		'factionID' : 0,
		'rankedWarID' : 0,
		'factionA' : '',
		'factionB' : '',
		'totalAttacks' : 0,
	};
	
var localeData = {};
	
var reportHTML = '';
		
// ================================================================================================
		
$(document).ready(function() {	
	$('#nojs').hide(); 		// hide the no javascript notice
	
	// load supported locales
	$.ajax({
		url: 'locale/locales.json',
		async: false,
		dataType: 'json',
		/*
		.forEach(([key, value]) => {
            console.log(`${key} ${value}`);
		*/
		success: function(json) {
			json.supported.forEach(( [key, value] ) => {
				let code = key.substr(3,2);
				
				$("#LocaleSelector").html().append(
					'<span class="localeSelection" onClick="setLocale("' + key + '"); >' +
					'<img src="http://flagcdn.com/h40/' + code.toLowerCase() + '.png" alt="' + value + '" />' +
					value + '</span>'
				);
			});
		},
		
		error: function(jqXHR, status, message) {
			alert('ERROR: Failed to fetch locales\n' 
				+ status + ': ' + message);
		},
		});	
	
	// load saved prefs from local storage, if able
	let json = localStorage.getItem('savedPrefs');
	if(!!json) {
		savedPrefs = JSON.parse(json);
		
		// set chosen locale
	} else {
		// no saved prefs - default to locale selection
		$("#LocaleSelector").show();
	}
	
	
	$('#UserInput').show(); // show the user input	
});

// ================================================================================================

function localeChanged() {
	let locale = $('#localeSelector').find(":selected").val();
	
	$.getJSON('/locale/' + locale + '.json', (data) => {
		
	});
}