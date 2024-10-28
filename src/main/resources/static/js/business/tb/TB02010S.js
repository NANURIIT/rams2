$(document).ready(function() {
	selInfo();
});

// 오늘의할일 조회
function selInfo() {
	
	businessFunction();
	
	function businessFunction() {

		$.ajax({
			type: "GET",
			url: "/TB02010S/selInfo",
			dataType: "json",
			success: function(data) {
				var html = '';
				var infoList = data;
				
				var aprvWaitCnt = 0;
				var aprvPrgrsCnt = 0;
				var metCnt = 0;
				
				$('#TB02010S_selInfo').html(html);

				if (infoList.length > 0) {
					$.each(infoList, function(key, value) {
						
						html += `<tr ondblclick="sendPage('${value.menuId}','${value.workCtns}');" style="cursor: pointer;">`;
						html += '<td>' + Number(key+1) + '</td>';							// 일련번호
						html += '<td style="display:none;">' + value.workDcd + '</td>';		// 작업구분코드
						html += '<td>' + value.workDcdNm + '</td>';							// 작업구분코드명
						html += '<td>' + formatDate(value.prcsDt) + '</td>';				// 작업일자
						html += '<td>' + value.workCtns + '</td>';							// 작업설명
						html += '<td>' + formatDate(value.rqstDt) + '</td>';				// 요청일자
						html += '<td>' + handleNullData(value.dprtNm) + '</td>';			// 요청부서
						html += '<td>' + handleNullData(value.regEnoNm) + '</td>';			// 요청자
						html += '<td>' + value.mtrNm + '</td>';								// 사업명
						html += '<td>' + value.dealNo + '</td>';							// 딜관리번호
						html += '<td style="display:none;">' + value.menuId + '</td>';		// menuId
						html += '</tr>';
						
						if (isEmpty(value.prcsDt)) {
					        aprvWaitCnt ++;
					    } else {
					        aprvPrgrsCnt ++;
					    }
					
					    if (value.workDcd == '02') { 
					        metCnt ++;
					    }
					})
				} else {
					html += '<tr>';
					html += '<td colspan="9" style="text-align: center">데이터가 없습니다.</td>';
					html += '</tr>';
				}
				
				$('#TB02010S_selInfo tr').each(function() {
				    var tr = $(this);
				    var td = tr.children();
				});
				
				$('#TB02010S_appvWaitCnt').text(aprvWaitCnt + '건');
				$('#TB02010S_appvPrgrsCnt').text(aprvPrgrsCnt + '건');
				$('#TB02010S_rmCnt').text(metCnt);
					
				
				$('#TB02010S_selInfo').html(html);
			}
			
		});
	}
}

/**
 * 탭생성
 * @param {String} menuId 
 * @param {String} pageName 
 */
function sendPage(menuId, pageName) {

	const getMenuId = menuId.split('/');
	const getPageName = pageName.split(') ');
	console.log(getMenuId[1]);
	console.log(getPageName[1]);
	
	callPage(getMenuId[1], getPageName[1]);
	
}