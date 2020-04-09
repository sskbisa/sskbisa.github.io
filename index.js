new WOW().init();
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
	
	// show cups
	var totalCups = 0;
	for(cups of result.cups) {
		totalCups += cups.cups;
		$('#cup-table-body').append(
			'<tr class="cup-table-row">'
			+	'<td class="cups-rs">' + cups.rs + '</td>'
			+	'<td class="cups-cups">' + cups.cups + '</td>'
			+ '</tr>'
		);
	}
	$('#cup-table-body').append(
		'<tr class="cup-table-highlighted-row">'
		+	'<th>Total</th>'
		+	'<th id="total-donasi">' + totalCups.toString() + '</th>'
		+ '</tr>'
	);

	// show donasi
	// count categories
	var table = $('#donasi-table-body')
	// first show money summary
	for(donasi of result.donasi) {
		if(donasi.kategori.toLowerCase() == 'summary') {
			console.log('found');
			table.append(
				'<tr class="cup-table-row">'
				+	'<td class="cups-rs">' + donasi.item + '</td>'
				+	'<td class="cups-cups">' + donasi.jumlah + '</td>'
				+ '</tr>'
			);
		}
	}
	// show the rest
	var prevKategori = "";
	for(donasi of result.donasi) {
		// dont show summaries
		if(donasi.kategori.toLowerCase() == 'summary') continue;
		// show category first if not yet
		if(donasi.kategori.toLowerCase() != prevKategori) {
			prevKategori = donasi.kategori.toLowerCase();
			table.append(
				'<tr class="cup-table-highlighted-row">'
				+	'<th colspan="2">' + donasi.kategori + '</th>'
				+ '</tr>'
			);
		}
		table.append(
			'<tr class="cup-table-row">'
			+	'<td class="cups-rs">' + donasi.item + '</td>'
			+	'<td class="cups-cups">' + donasi.jumlah + '</td>'
			+ '</tr>'
		);
	}
}