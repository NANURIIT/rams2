var codeId = '';

let colModel_groupCdListTb = [

	//체크박스
	{ 
		dataIndx: "grpCdLstState",  
		align: "center",
		halign: "center",
        title: "삭제",
        menuIcon:false,
		width: "5%",
        type: 'checkBoxSelection',
		editor: false,
        dataType: 'bool',
        editable: 'true',
        cb: {
            all: false, 
            header: false
        }
    },
	{
		title: "그룹코드",
		dataType: "string",
		dataIndx: "cmnsCdGrp",
		width: "7%",
		editable: true, 
		align: "left",
		halign: "center",
		width: "",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "그룹명",
		dataType: "string",
		dataIndx: "cmnsCdNm",
		width: "10%",
		editable: true,
		align: "left",
		halign: "center",
		width: "",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "설명",
		dataType: "string",
		dataIndx: "cmnsCdGrpExpl",
		width: "15%",
		editable: true, 
		align: "left",
		halign: "center",
		width: "",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "코드성격",
		dataType: "string",
		dataIndx: "cmnsCdClsf",
		width: "7%",
		editable: true, 
		align: "center",
		halign: "center",
		width: "",
		editor: {
			type: "select",
			valueIndx: "value",
        	labelIndx: "label",
			options: [
				{ label: "일반코드", value: 1 },
				{ label: "변환코드", value: 2 }
			]
		},
		render: function (ui) {
			var options = [
				{ label: "일반코드", value: "1" },
				{ label: "변환코드", value: "2" }
			];
			var option = options.find(opt => opt.value == ui.cellData);
			return option ? option.label : ui.cellData;
		},
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "코드길이",
		dataType: "string",
		dataIndx: "cdLngth",
		width: "7%",
		editable: true, 
		align: "center",
		halign: "center",
		width: "",
		filter: { crules: [{ condition: "range" }] },
	},
	{ 
		dataIndx: "useYn",  
		align: "center",
		halign: "center",
        title: "사용여부",
		width: "7%",
        menuIcon:false,
        type: 'checkBoxSelection', 
		editor: false,
        dataType: 'bool',
        editable: 'true',
        cb: {
            all: false, 
            header: false
        }
    },
	{
	    title: "코드관리",
		align: "center",
		halign: "center",
	    dataType: "string",
		dataIndx: "cdListDltBtn",
	    width: "7%",
	    render: function (ui) {
	        return "<button class='ui-button ui-corner-all ui-widget' name='detail_btn' data-row-indx='" + ui.rowIndx + "'><i class='fa fa-arrow-down'></i>&nbsp;상세</button>";

			//return '<td style="text-align:center;"><button class="groupCodeDetail btn btn-warning btn-xs" name = "detail_btn" data-row-indx="' + ui.rowIndx + '"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>'
	    }
	},
	{
		title: "등록일",
		dataType: "string",
		dataIndx: "rgstDt",
		editable: false, 
		align: "center",
		halign: "center",
		width: "7%",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "처리일시",
		dataType: "string",
		dataIndx: "hndDetlDtm",
		editable: false, 
		align: "center",
		halign: "center",
		width: "10%",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "처리자",
		dataType: "string",
		dataIndx: "hndEmpnm",
		editable: false, 
		align: "center",
		halign: "center",
		width: "7%",
		filter: { crules: [{ condition: "range" }] },
	},
]

let colModel_cdListTable = [
	//체크박스
	{ 
		dataIndx: "cdLstState",  
		align: "center",
		halign: "center",
        title: "삭제",
        menuIcon:false,
		width: "5%",
        type: 'checkBoxSelection',
		editor: false,
        dataType: 'bool',
        editable: 'true',
        cb: {
            all: false, 
            header: false
        }
    },
	{
		title: "코드",
		dataType: "string",
		dataIndx: "cdVlId",
		editable: true, 
		align: "center",
		halign: "center",
		width: "10%",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "코드명",
		dataType: "string",
		dataIndx: "cdVlNm",
		editable: true, 
		align: "left",
		halign: "center",
		width: "26%",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "변환후코드",
		dataType: "string",
		dataIndx: "rsltCdVl",
		editable: true, 
		align: "center",
		halign: "center",
		width: "10%",
		editor: {
			type: "select",
			valueIndx: "value",
        	labelIndx: "label",
			options: [
				{ label: "일반코드", value: 1 },
				{ label: "변환코드", value: 2 }
			]
		},
		render: function (ui) {
			var options = [
				{ label: "일반코드", value: "1" },
				{ label: "변환코드", value: "2" }
			];
			var option = options.find(opt => opt.value == ui.cellData);
			return option ? option.label : ui.cellData;
		},
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "순서",
		dataType: "string",
		dataIndx: "cdSq",
		align: "center",
		halign: "center",
		width: "7%",
		filter: { crules: [{ condition: "range" }] },
	},
	{ 
		dataIndx: "useYn",  
		align: "center",
		halign: "center",
        title: "사용여부",
		width: "7%",
        menuIcon:false,
        type: 'checkBoxSelection', 
		editor: false,
        dataType: 'bool',
        editable: 'true',
        cb: {
            all: false, 
            header: false
        }
    },
	{
		title: "등록일",
		dataType: "string",
		dataIndx: "rgstDt",
		align: "center",
		halign: "center",
		editable : false ,
		width: "10%",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "등록자",
		dataType: "string",
		dataIndx: "rgstEmpnm",
		align: "center",
		editable : false ,
		halign: "center",
		width: "7%",
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "처리일시",
		dataType: "string",
		dataIndx: "hndDetlDtm",
		align: "center",
		halign: "center",
		width: "10%",
		editable : false ,
		filter: { crules: [{ condition: "range" }] },
	},
	{
		title: "처리자",
		dataType: "string",
		dataIndx: "hndEmpnm",
		align: "center",
		halign: "center",
		width: "7%",
		editable : false,
		filter: { crules: [{ condition: "range" }] },
	},
]

$(function() {
	//select박스 코드 그룹 호출 함수
	getCommonCodeInfo();
	//코드구분 select박스 선택
	selectCommonCode();
	//그룹코드의 코드관리 상세버튼 클릭
	clickDetailButton();
	//변경 가능한 컬럼 더블클릭 했을시 input박스 생성
	//doubleClickColumn();

	//그리드 세팅
	setGrid_TB10010S();
});

/*******************************************************************
 *** 공통 event
 *******************************************************************/
/**
 * 변경 가능한 컬럼 더블클릭 했을시 input박스 생성
 */
// function doubleClickColumn() {
// 	$(document).on('dblclick', '.update_column', function() {
// 		let trClass = $(this).attr('class').split(' ')[1]

// 		tdInputHTML = '<input class="' + trClass + '_input" style="width: 100%;" type="text" value="' + $(this).text() + '">'
// 		if (trClass == "cmnsCdClsf") {
// 			tdInputHTML = '<select class="' + trClass + '_select" style="width: 100%;">';
// 			tdInputHTML += '<option value = "1">일반코드</option>';
// 			tdInputHTML += '<option value = "2">변환코드</option>';
// 			tdInputHTML += '</select>';
// 		}

// 		$(this).html(tdInputHTML);
// 	});
// }

function setGrid_TB10010S(){

	//그룹코드
	var obj_groupCdListTb = {
		height: 240,
		maxHeight: 240,
		showTitle: false,
		showToolbar: false,
		collapsible: false,
		wrap: false,
		hwrap: false,
		numberCell: { show: false },
		scrollModel: { autoFit: true },
		//toolbar: cdDtlToolBar,
		colModel: colModel_groupCdListTb,
		strNoRows : '조회된 데이터가 없습니다.',
		//pageModel: pageMdCdDtl
	}

	$('#groupCodeListTable').pqGrid(obj_groupCdListTb);
	groupCdListTbObj = $("#groupCodeListTable").pqGrid('instance');

	//상세코드
	var obj_cdListTb = {
		height: 240,
		maxHeight: 240,
		showTitle: false,
		showToolbar: false,
		collapsible: false,
		wrap: false,
		hwrap: false,
		numberCell: { show: false },
		scrollModel: { autoFit: true },
		colModel: colModel_cdListTable,
		strNoRows : '조회된 데이터가 없습니다.',
	}

	$('#codeListTable').pqGrid(obj_cdListTb);
	cdListTbObj = $("#codeListTable").pqGrid('instance');

}

/*******************************************************************
 *** 조회 영역 event
 *******************************************************************/
/**
 * select박스 코드 그룹 호출 함수
 */
var getCommonCodeInfo = function() {
	$.ajax({
		url: '/TB10010S/commonCodeInfo',
		method: 'GET',
		dataType: 'json'
	}).done(function(commonCodeInfo) {
		let commonCodeOption = '<option value="">전체</option>';
		for (let i = 0; i < commonCodeInfo.length; i++) {
			let commonCode = commonCodeInfo[i];
			commonCodeOption += '<option value="' + commonCode.cmnsCdGrp + '">' + commonCode.cmnsCdGrpExpl + ' (' + commonCode.cmnsCdGrp + ')</option>';
		}
		$('#commonCodeInfo').html(commonCodeOption);
	});
}

/**
 * 코드구분 select박스 선택
 */
function selectCommonCode() {
	$(document).on('click', '#commonCodeSearch', function() {
		let cmnsCdGrp = $('#commonCodeInfo option:selected').val()
		getGroupCodeInfoList(cmnsCdGrp);
	});
}

/*******************************************************************
 *** 상단 그리드 event
 *******************************************************************/
/**
 * 그룹코드의 코드관리 상세버튼 클릭
 */
function clickDetailButton() {

	$(document).on("click", "button[name='detail_btn']", function () {
		var rowIndex = $(this).data("row-indx");

		var rowData = groupCdListTbObj.getRowData({ rowIndx: rowIndex });

		codeId = rowData.cmnsCdGrp;
		getGroupCodeInfo(codeId);
    
	});
}

/**
 * 그룹코드 행추가 버튼 클릭
 */
function addGroupCodeRow() {

	var rowData = {
		grpCdLstState		: false
	  , cmnsCdGrp			: ""
	  , cmnsCdNm			: ""
	  , cmnsCdGrpExpl		: ""
	  , cmnsCdClsf			: "1"
	  , cdLngth 			: ""
	  , useYn				: false
	  , rgstDt				: ""
	  , hndDetlDtm			: ""
	  , hndEmpnm    		: ""

  };

  $("#groupCodeListTable").pqGrid("addRow", {rowData: rowData, checkEditable: false });
}

/**
 * 그룹코드 행삭제 버튼 클릭
 */
function deleteGroupCodeRow() {
	var groupCodeList = new Array();
	//var tr = $('#groupCodeListTable').children();
	var gridData = $('#groupCodeListTable').pqGrid("option", "dataModel.data");
	
	//var checkedRowsData = [];
	for (var i = 0; i < gridData.length; i++) {
		var rowData = gridData[i];

		var deleteCheckBox = rowData.grpCdLstState;

		var groupcdId = rowData.cmnsCdGrp;

		if(deleteCheckBox == true && isEmpty(groupcdId)){
			$("#groupCodeListTable").pqGrid("deleteRow", {rowIndx: i});
		}

		if(deleteCheckBox == true && isNotEmpty(groupcdId)){
			groupCodeList.push(rowData);
		}
	}

	if (groupCodeList.length != 0) {
		//alert(JSON.stringify(groupCodeList));
		deleteGroupCode(groupCodeList);
	}
}

/**
 * 그룹코드 저장 버튼 클릭
 * validation check
 */
function clickSaveGroupCode() {
	let groupCodeList = [];
	
	let tr = $('#groupCodeListTable').children();

	for (let i = 0; i < tr.length; i++) {
		let groupCode = new Object();

		let groupCodeInput = $(tr[i]).find("td:eq(1)").find("input");
		let groupCodeNameInput = $(tr[i]).find("td:eq(2)").find("input");
		let groupCodeExplainInput = $(tr[i]).find("td:eq(3)").find("input");
		let groupCodeCmnsClsf = $(tr[i]).find("td:eq(4)").find("select").find("option:selected");
		let groupCodeLengthInput = $(tr[i]).find("td:eq(5)").find("input");
		let groupCodeUseYn = $(tr[i]).find("td:eq(6)").find(".group_code_use_yn").prop("checked");
		let groupCodeUseYnCheck = $(tr[i]).find("td:eq(6)").find(".hidden_yn").val();


		if (groupCodeInput.length == 1) {
			if (groupCodeInput.val().length != 4) {
				openPopup({
					title: '실패', text: '그룹코드는 4자리 여야 합니다.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeInput.focus();
						});
					}
				});
				return;
			} else if (!groupCodeInput.val()) {
				openPopup({
					title: '실패', text: '그룹코드를 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdGrp = groupCodeInput.val();
		}

		if (groupCodeNameInput.length == 1) {
			if (!groupCodeNameInput.val()) {
				openPopup({
					title: '실패', text: '그룹명을 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeNameInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdNm = groupCodeNameInput.val();
		}
		if (groupCodeCmnsClsf.length == 1) {
			if (!groupCodeCmnsClsf.val()) {
				openPopup({
					title: '실패', text: '코드성격을 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeCmnsClsf.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdClsf = groupCodeCmnsClsf.val();
		}
		if (groupCodeLengthInput.length == 1) {
			if (!groupCodeLengthInput.val()) {
				openPopup({
					title: '실패', text: '코드 길이를 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeLengthInput.focus();
						});
					}
				});
				return;
			} else if (isNaN(groupCodeLengthInput.val())) {
				openPopup({
					title: '실패', text: '코드 길이를 숫자로 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeLengthInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cdLngth = groupCodeLengthInput.val();
		} else {
			if (groupCodeInput.length == 1 || groupCodeNameInput.length == 1 || groupCodeExplainInput.length == 1 || groupCodeCmnsClsf.length == 1) {
				groupCode.cdLngth = $(tr[i]).find("td:eq(5)").html();
			}
			
			if (!groupCodeUseYnCheck || (groupCodeUseYn && groupCodeUseYnCheck === 'n') || (!groupCodeUseYn && groupCodeUseYnCheck === 'y')) {
				if(groupCodeLengthInput.length == 0) {
					groupCode.cdLngth = $(tr[i]).find("td:eq(5)").html();
				}
			}
		}

		if (groupCodeExplainInput.length == 1) {
			if (!groupCodeExplainInput.val()) {
				openPopup({
					title: '실패', text: '코드 설명을 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							groupCodeExplainInput.focus();
						});
					}
				});
				return;
			}
			groupCode.cmnsCdGrpExpl = groupCodeExplainInput.val();
		}

		if (!groupCodeUseYnCheck || (groupCodeUseYn && groupCodeUseYnCheck === 'n') || (!groupCodeUseYn && groupCodeUseYnCheck === 'y')) {
			groupCode.useYn = groupCodeUseYn ? '1' : '0';
		}

		if (!(Object.keys(groupCode).length === 0)) {
			groupCode.oldCmnsCdGrp = $(tr[i]).find("td:eq(0)").find("input").attr("id");

			groupCodeList.push(groupCode);
		}
	}

	if (groupCodeList.length != 0) {
		saveGroupCode(groupCodeList);
	}
}

/**
 * 그룹코드 리스트 호출
 * @param {string} cmnsCdGrp 그룹코드
 */
var getGroupCodeInfoList = function(cmnsCdGrp) {
	let _url = '/TB10010S/groupCodeInfoList';

	if (cmnsCdGrp) {
		_url += '?cmnsCdGrp=' + cmnsCdGrp;
	}

	$.ajax({
		url: _url,
		method: 'GET',
		dataType: 'json'
	}).done(function(groupCodeInfoList) {
		let groupCodeInfoHTML = '';

		var rowList = [];

		if (groupCodeInfoList.length > 0) {
			for (let i = 0; i < groupCodeInfoList.length; i++) {
				let groupCodeInfo = groupCodeInfoList[i];

				var useYn = true;
				if (groupCodeInfo.useYn === '1') {
					useYn = true;
				} else {
					useYn = false;
				}

				var rgstDt = handleNullData(formatDate(groupCodeInfo.rgstDt));
				var hndDetlDtm = handleNullData(groupCodeInfo.hndDetlDtm);
				var hndEmpnm = handleNullData(groupCodeInfo.hndEmpnm);

				var newRow = {
					grpCdLstState		: false
				  , cmnsCdGrp			: groupCodeInfo.cmnsCdGrp
				  , cmnsCdNm			: groupCodeInfo.cmnsCdNm
				  , cmnsCdGrpExpl		: groupCodeInfo.cmnsCdGrpExpl
				  , cmnsCdClsf			: groupCodeInfo.cmnsCdClsf
				  , cdLngth 			: groupCodeInfo.cdLngth
				  , useYn				: useYn
				  , rgstDt				: rgstDt
				  , hndDetlDtm			: hndDetlDtm
				  , hndEmpnm    		: hndEmpnm
			
				};
				
				rowList.push(newRow);
				//$("#groupCodeListTable").pqGrid("addRow", {rowData: newRow, checkEditable: false });
			}
			groupCdListTbObj.option("dataModel.data", rowList);
			groupCdListTbObj.refreshDataAndView();
		}else{
			groupCdListTbObj.option("dataModel.data", []);
			groupCdListTbObj.option("strNoRows", "조회된 데이터가 없습니다.");
			groupCdListTbObj.refreshDataAndView();
		}

	});
}

/**
 * 그룹코드 저장 처리
 * @param {list} groupCodeList 그룹코드 리스트
 */
var saveGroupCode = function(groupCodeList) {
	$.ajax({
		method: 'POST',
		url: '/TB10010S/registGroupCodeInfo',
		data: JSON.stringify(groupCodeList),
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		success: function(data) {
			getGroupCodeInfoList();
			getCommonCodeInfo();
			Swal.fire({
				icon: 'success'
				, title: "그룹코드 등록이 완료되었습니다."
				, text: ""
				, confirmButtonText: "확인"
			});
		},
		error: function(response) {
			let message = response.responseJSON.message;
			openPopup({
				title: '실패',
				text: message
			});
		}
	});
}

/**
 * 그룹코드 행 삭제 처리
 * @param {list} groupCodeList 그룹코드 리스트
 */
var deleteGroupCode = function(groupCodeList) {
	$.ajax({
		method: 'PATCH',
		url: '/TB10010S/deleteGroupCodeInfo',
		data: JSON.stringify(groupCodeList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function() {
			Swal.fire({
				icon: 'success'
				, title: "그룹코드 삭제가 완료되었습니다."
				, text: ""
				, confirmButtonText: "확인"
			});
			getGroupCodeInfoList();
			getCommonCodeInfo();
		},
		error: function(response) {
			Swal.fire({
				icon: 'error'
				, title: "문제가 발생했습니다."
				, text: "관리자에게 문의하세요."
				, confirmButtonText: "확인"
			});
		}
	});
}

/*******************************************************************
 *** 하단 그리드 event
 *******************************************************************/
/**
 * 그룹코드 상세보기 데이터 호출
 * @param {string} cmnsCdGrp 그룹코드
 */
var getGroupCodeInfo = function(cmnsCdGrp) {
	$.ajax({
		url: '/TB10010S/groupCodeInfo?cmnsCdGrp=' + cmnsCdGrp,
		method: 'GET',
		dataType: 'json'
	}).done(function(codeInfoList) {

		var rowList = [];

		if (codeInfoList.length > 0) {

			for (let i = 0; i < codeInfoList.length; i++) {
				let codeInfo = codeInfoList[i];

				var useYn = true;
				if (codeInfo.useYn === '1') {
					useYn == true;
				} else {
					useYn == false;
				}

				var newRow = {
					cdLstState			: false,
					cdVlId				: codeInfo.cdVlId,
					cdVlNm				: codeInfo.cdVlNm,
					rsltCdVl			: codeInfo.rsltCdVl,
					cdSq				: codeInfo.cdSq,
					useYn				: useYn,
					rgstDt				: handleNullData(formatDate(codeInfo.rgstDt)),
					rgstEmpnm			: handleNullData(codeInfo.rgstEmpnm),
					hndDetlDtm			: handleNullData(codeInfo.hndDetlDtm),
					hndEmpnm			: handleNullData(codeInfo.hndEmpnm)
				}

				rowList.push(newRow);

				//$("#codeListTable").pqGrid("addRow", {rowData: newRow, checkEditable: false });
			}
			cdListTbObj.option("dataModel.data", rowList);
			cdListTbObj.refreshDataAndView();
		}else{
			cdListTbObj.option("dataModel.data", []);
			cdListTbObj.option("strNoRows", "조회된 데이터가 없습니다.");
			cdListTbObj.refreshDataAndView();
		}
	});
}

/**
 * 코드 행추가 버튼 클릭
 */
function addCodeRow() {

	var newRow = {
		cdLstState			: false,
		cdVlId				: "",
		cdVlNm				: "",
		rsltCdVl			: "1",
		cdSq				: "",
		useYn				: false,
		rgstDt				: "",
		rgstEmpnm			: "",
		hndDetlDtm			: "",
		hndEmpnm			: ""
	}

	$("#codeListTable").pqGrid("addRow", {rowData: newRow, checkEditable: false });
}

/**
 * 코드 행삭제 버튼 클릭
 */
function deleteCodeRow() {
	var request = new Object();
	var codeList = new Array();
	//var tr = $('#codeListTable').children();
	var gridData = $('#codeListTable').pqGrid("option", "dataModel.data");

	for (let i = 0; i < gridData.length; i++) {
		var rowData = gridData[i];

		var deleteCheckBox = rowData.cdLstState;
		var groupCdId = rowData.cdVlId;
		
		if (deleteCheckBox == true && isEmpty(groupCdId)) {
			$("#codeListTable").pqGrid("deleteRow", {rowIndx: i});
		}

		if (deleteCheckBox == true && isNotEmpty(groupCdId)) {
			codeList.push(rowData.cdVlId);
		}
	}

	if (codeList.length > 0) {
		request.cmnsCdGrp = $(tr[0]).attr('id')
		request.cdVlIds = codeList;
	}

	if (Object.keys(request).length > 0) {
		deleteCode(request);
	}
}

/**
 * 코드 저장 버튼 클릭
 */
function clickSaveCode() {
	let codeList = new Array();
	let tr = $('#codeListTable').children();
	for (let i = 0; i < tr.length; i++) {
		let code = new Object();

		// TODO => 변수 할당 확인
		let groupCodeId = codeId;

		let oldCodeId		= $(tr[i]).find("td:eq(0)").find("input").attr('id');
		let codeInput		= $(tr[i]).find("td:eq(1)").find("input");
		let codeNameInput	= $(tr[i]).find("td:eq(2)").find("input");
		let codeRsltCdVl	= $(tr[i]).find("td:eq(3)").find("select").find("option:selected");
		let codeSqInput		= $(tr[i]).find("td:eq(4)").find("input");
		let codeUseYn		= $(tr[i]).find("td:eq(5)").find(".code_use_yn").prop("checked");
		let codeUseYnCheck	= $(tr[i]).find("td:eq(5)").find(".hidden_yn").val();

		if (codeInput.length == 1) {
			if (!codeInput.val()) {
				openPopup({
					title: '실패', text: '코드를 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							codeInput.focus();
						});
					}
				});
				return;
			} else if (codeInput.val().length > 20) {
				openPopup({
					title: '실패', text: '코드는 20자리 이하로 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							codeInput.focus();
						});
					}
				});
				return;
			}
			code.cdVlId = codeInput.val();
		}

		if (codeNameInput.length == 1) {
			if (!codeNameInput.val()) {
				openPopup({
					title: '실패', text: '코드명을 입력해주세요.', type: 'error',
					callback: function() {
						$(document).on('click', '.confirm', function() {
							codeNameInput.focus();
						});
					}
				});
				return;
			}
			code.cdVlNm = codeNameInput.val();
		}

		if (codeRsltCdVl.length == 1) {
			code.rsltCdVl = codeRsltCdVl.val();
		}

		if (isEmpty(codeSqInput)) {
			openPopup({
				title: '실패', text: '순서를 입력해주세요.', type: 'error',
				callback: function() {
					$(document).on('click', '.confirm', function() {
						codeSqInput.focus();
					});
				}
			});
			return;
		} else {
			code.cdSq = codeSqInput.val();
		}

		if (!codeUseYnCheck || (codeUseYn && codeUseYnCheck === 'n') || (!codeUseYn && codeUseYnCheck === 'y')) {
			code.useYn = codeUseYn ? '1' : '0';
		}

		if (!(Object.keys(code).length === 0)) {
			code.oldCdVlId = oldCodeId;
			code.cmnsCdGrp = groupCodeId;
			codeList.push(code);
		}
	}

	if (codeList.length > 0) {
		saveCode(codeList);
	}
}


/**
 * 코드 저장 처리
 * @param {list} codeList 코드 리스트
 */
var saveCode = function(codeList) {
	var cmnsCdGrp = codeList[0].cmnsCdGrp;

	$.ajax({
		method: 'POST',
		url: '/TB10010S/registCodeInfo',
		data: JSON.stringify(codeList),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function() {
			getGroupCodeInfo(cmnsCdGrp);
			Swal.fire({
				icon: 'success'
				, title: "코드 등록이 완료되었습니다."
				, text: ""
				, confirmButtonText: "확인"
			});
		},
		error: function(response) {
			Swal.fire({
				icon: 'error'
				, title: "error!"
				, text: "코드 등록중 오류가 발생했습니다. 관리자에게 문의하세요."
				, confirmButtonText: "확인"
			});
		}
	});
}

/**
 * 코드 삭제 처리
 * @param {list} request 삭제코드 리스트
 */
var deleteCode = function(request) {
	var cmnsCdGrp = request.cmnsCdGrp;

	$.ajax({
		method: 'PATCH',
		url: '/TB10010S/deleteCodeInfo',
		data: JSON.stringify(request),
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',
		success: function() {
			getGroupCodeInfo(cmnsCdGrp);
			
			Swal.fire({
				icon: 'success'
				, title: "코드 삭제가 완료되었습니다."
				, text: ""
				, confirmButtonText: "확인"
			});
		},
		error: function(response) {
		}
	});
}

