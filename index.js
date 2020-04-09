window.onload = loadDoc;

function loadDoc() {
	$.ajax({
		url: 'https://crayonugm.com/adminsskb/fetch_data',
	    type: 'GET',
	    crossDomain: true,
	    dataType: 'jsonp',
	    success: successLoad,
	    error: function() { alert('Failed!'); },
	});
}

function successLoad(result) {
	console.log(result)
	// show pjrs
	for(pair of result.pjrs) {
		console.log(pair)
		$('#second-section-img').append(
		'<div class="pjrs-pair">'
		+ 	'<div class="pjrs-rs">'
		+		'<div class="pjrs-text">' + pair.rs + '</div>'
		+	'</div>'
		+	'<div class="pjrs-shop">'
		+		'<div class="pjrs-text">' + pair.shop + '</div>'
		+	'</div>'
		+ '</div>'
		);
	}
	

}