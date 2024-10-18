$(document).ready(function () {
	keyDownEnter_AS01120P();
	modalShowFunction();
});

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callAC01120P(prefix) {
	reset_AC01120P();
	$('#prefix').val(prefix);
	$('#modal-AC01120P').modal('show');
}

// 영업부서원 조회 (사이트마다 영업부서 코드가 다를 수 있으므로 추후 수정 요망)
function callAC01120PByDprtCd(prefix, dprtCd) {
	reset_AC01120P();

	$('#prefix').val(prefix);
	//$('#AC01120P_dprtCd').attr("disabled", true);
	//$('#AC01120P_dprtCd').val(dprtCd);
	$('#modal-AC01120P').modal('show');
}

/**
 * 모달 초기화
 */
function reset_AC01120P() {
	$('#AC01120P_tbodyEmpList').html("");
	$('#prefix').val("");
	$('#AC01120P_empNm').val("");
	$('#AC01120P_eno').val("");
	$('#AC01120P_dprtCd').val("");
	$('#AC01120P_dprtNm').val("");
}

function modalShowFunction() {
	//모달 오픈 애니메이션 후 포커스 주도록 설정
	$('#modal-AC01120P').on('shown.bs.modal', function(){
		$('#modal-AC01120P input[id=AC01120P_empNm]').focus();	
	});
}

/**
 * Enter key Event
 */
function keyDownEnter_AS01120P() {

	$("input[id=AC01120P_empNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01120P_eno]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01120P_dprtCd]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});

	$("input[id=AC01120P_dprtNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEmpList();
		}
	});
}

/**
 * ajax 통신(조회)
 */
function getEmpList() {

	var empNm = $("#AC01120P_empNm").val();
	var eno = $("#AC01120P_eno").val();
	var dprtCd = $("#AC01120P_dprtCd").val();
	var dprtNm = $("#AC01120P_dprtNm").val();
	var dtoParam = {
		"empNm": empNm
		, "eno": eno
		, "dprtCd": dprtCd
		, "dprtNm": dprtNm
		, "hdqtCd": ""
		, "hdqtNm": ""
	}


	$.ajax({
		type: "GET",
		url: "/findEmpList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			var a = '';
			$('#AC01120P_tbodyEmpList').html(a);
			rebuildEmpTable(data);
		}
	});

}

/**
 * 결과값 table 생성
 */
function rebuildEmpTable(data) {
	var html = '';
	var empList = data;

	if (empList.length <= 0) {
		html += '<tr>';
		html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
		html += '</tr>';
	} else if (empList.length > 0) {
		$.each(empList, function (key, value) {
			html += '<tr ondblclick="setEmpNm(this);">';
			html += '<td>' + value.ENO + '</td>';
			html += '<td>' + value.EMP_NM + '</td>';
			html += '<td>' + value.DPRT_CD + '</td>';
			html += '<td>' + value.DPRT_NM + '</td>';
			html += '<td>' + value.HDQT_CD + '</td>';
			html += '<td>' + value.HDQT_NM + '</td>';
			html += '</tr>';
		})
	}
	$('#AC01120P_tbodyEmpList').html(html);

};

/**
 * modal hide
 */
function modalClose_AC01120P() {
	$('#modal-AC01120P').modal('hide');
}

/**
 * 부모창에 결과값 전달
 */
function setEmpNm(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();

	var eno = td.eq(0).text();		// 직원번호
	var empNm = td.eq(1).text();	// 직원명
	var dprtCd = td.eq(2).text();	// 부점코드
	var dprtNm = td.eq(3).text();	// 부점명
	var hdqtCd = td.eq(4).text();	// 본부코드
	var hdqtNm = td.eq(5).text();	// 본부명

	var prefix = $("#prefix").val();		// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
	var pageEmpNm = '#' + prefix + '_empNm';
	var pageEno = '#' + prefix + '_eno';
	var pageDprtCd = '#' + prefix + '_dprtCd';
	var pageDprtNm = '#' + prefix + '_dprtNm';
	var pageHdqtCd = '#' + prefix + '_hdqtCd';
	var pageHdqtNm = '#' + prefix + '_hdqtNm';

	$(pageEmpNm).val(empNm);
	$(pageEno).val(eno);
	$(pageDprtCd).val(dprtCd);
	$(pageDprtNm).val(dprtNm);
	$(pageHdqtCd).val(hdqtCd);
	$(pageHdqtNm).val(hdqtNm);

	reset_AC01120P();
	modalClose_AC01120P();
}