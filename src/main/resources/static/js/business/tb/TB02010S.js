const TB02010Sjs = (function(){

	$(document).ready(function() {
		//console.log(JSON.stringify(colM_TB02010S));
		setPqGrid_TB02010S();
	});
	
	function setPqGrid_TB02010S(){

		let colM_TB02010S = [
			{ 	
				title    : "요청일시", 
				dataType : "string",
				dataIndx : "",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "요청부서", 
				dataType : "string",
				dataIndx : "",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "요청자", 
				dataType : "string",
				dataIndx : "",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "업무구분", 
				dataType : "string",
				dataIndx : "",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "내역", 
				dataType : "string",
				dataIndx : "",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
		]

		let pqGridObjs_TB02010S = [
			{
				height: 500
				, maxHeight: 500
				, id: 'wfGrid_TB02010S'
				, numberCell: { show: false }
				, colModel: colM_TB02010S 		
			},
		]

		setPqGrid(pqGridObjs_TB02010S);

		selInfo();

	}

	// 오늘의할일 조회
	function selInfo() {
		

		var wfAuthId = $('#userDprtCd').val();
		console.log("wfAuthId: " + wfAuthId);

		var param = {
			wfAuthId
		}

		$.ajax({
			type: "GET",
			url: "/TB02010S/selInfo",
			data: param,
			dataType: "json",
			beforeSend: function () {
				$("#wfGrid_TB02010S").pqGrid("setData", []);
				$("#wfGrid_TB02010S").pqGrid("option", "strNoRows", "조회 중입니다...");
				$("#wfGrid_TB02010S").pqGrid("refreshDataAndView");
				// settlementObj.option("strNoRows", "조회 중입니다...");
				// settlementObj.refreshDataAndView();
			},
			success: function(data) {
				console.log(JSON.stringify(data));

				$("#wfGrid_TB02010S").pqGrid("option", "strNoRows", "조회된 데이터가 없습니다.");

				if(data.length > 0){
					$("#wfGrid_TB02010S").pqGrid("setData", data);
				}
			}
			
		});
		
	}
	
	/**
	 * 페이지 이동
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

	return {

		//	함수
		sendPage : sendPage
	}
})();
