
	// Flag support provided by https://flagcdn.com/h40/{code}.png
	// Example: https://flagcdn.com/h40/us.png

var savedPrefs = {
		locale : '',
		apiKey : '',
		payoutPercentage : 0,
		roundingFactor : 0,
	};
	
var calcData = {
		'cached' : {
			'factionID' : 0,
			'rankedWarID' : 0,
			'preCalcBalances' : [],
			'postCalcBalances' : []
		},
	
		'grossProfit' : 0,
		'factionA' : '',
		'factionB' : '',
		'totalAttacks' : 0,
	};
	
var reportHTML = '';

// ================================================================================================

function savePreferences() {
	localeStorage.setItem('savedPrefs', JSON.stringify(savedPrefs));
}
		
// ================================================================================================
		
$(document).ready(function() {	
	$('#nojs').hide(); 		// hide the no javascript notice
	
	// load supported locales
	$.ajax({
		url: 'locale/locales.json',
		async: false,
		dataType: 'json',
		beforeSend: (xhr) => xhr.overrideMimeType("application/json"),
		error: (xhr, status, message) => ajaxError(xhr, status, message, 'locales.json'),
		success: (json) => jsonLocales(json)
	});	
	
	// load saved prefs from local storage, if able
	let json = localStorage.getItem('savedPrefs');
	if(!!json) {
		savedPrefs = JSON.parse(json);
		setLocale(savedPrefs.locale, false);
	}
	
	
	
});

// ================================================================================================

function ajaxError(xhr, status, message, clue) {
	let msg = `ERROR: Failed to fetch JSON ${clue}\n`
		+ status + ': ' + message
		
	console.log(msg);
	alert(msg);	
}

// ================================================================================================

function jsonLocales(json) {
	json.supported.forEach((lang) => {
		
		let locale = `locale-${lang}`;
		
		$("#LocaleDropdown").append(
			'<div class="nested-dropdown">' +
				`<a href="#">${lang}</a>` +
				`<div id="${locale}" class="nested-dropdown-content">`
		);
				
		lang.forEach( ([key, value]) => {
			let flag = key.substr(3,2).toLowerCase();
			
			$(locale).append(
				`<a href="#" onClick="setLocale('${key}');">` +
				`<img src="http://flagcdn.com/h40/${flag}.png" alt="${value}" />` +
				`${value}</a>`
			);
		}); // lang.forEach
		
	});	// json.supported.forEach
}

// ================================================================================================

function setLocale(locale, save = true) {
	if(save) {
		savedPrefs.locale = locale;
		savePreferences();
	}
	
	$('#LocaleDropdown').hide();
	setTimeout(function(){ $('#LocaleDropdown').show(); }, 100);
	
	$.ajax({
		url: `locale/${locale}.json`,
		async: true,
		dataType: 'json',
		beforeSend: (xhr) => xhr.overrideMimeType("application/json"),
		error: (xhr, status, message) => ajaxError(xhr, status, message, `{$locale}.json`),
		success: (json) => localeTranslate(json)
	});	
}

// ================================================================================================

function localeTranslate(json) {
	json.html.forEach( ([key, value]) => {
		$(key).html(value);
	});
	
	json.text.forEach( ([key, value]) => {
		$(key).text(value);
	});
	
	json.val.forEach( ([key, value]) => {
		$(key).val(value);
	});
}

// ================================================================================================

