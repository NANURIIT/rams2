const TB03020Sjs = (function(){
	
	var loginUserId = '';
	let pqGridObjEnopList;

	$(document).ready(function() {
		getSelectBoxList('TB03020S', 'C008/B008/I028/C006/B019/I006/C012/C010/I027');
		loadUserAuth();
		loadInvstGdsLdvdCd();
		loadInvstGdsMdvdCd();
		loadInvstGdsSdvdCd();
		setKeyFunction_TB03020S();
		rendorGrid();
		$("#selectedMngDealNo").focus();
		//getDealNo();
	});

	// 그리드 렌더링함수
	function rendorGrid () {
		let arrPqGridObj = [
			{
			height    : 100
			, maxHeight : 100
			, id        : 'gridEnoPList'
			, colModel  : colEnopList
			}
		]
		setPqGrid(arrPqGridObj);
		pqGridObjEnopList = $("#gridEnoPList").pqGrid('instance');
	}

	// 딜정보 상세조회
	function getBscDealDetail() { 

		if( isEmpty($('#selectedMngDealNo').val()) ){
			Swal.fire({
				icon              : 'error'
				, title             : "Error!"
				, text              : "Deal 번호를 입력해주세요."
				, confirmButtonText : "확인"
			}).then(() => {
				$('#selectedMngDealNo').focus();
			});
		}else{
			businessFunction();
		}

		function businessFunction() {

			var dealNo = $('#selectedMngDealNo').val();
			var sn = $('#TB03020S_sq').val();

			var inputParam = {
				"dealNo" : dealNo
				, "sn" : sn
			};


			$.ajax({
				type: "GET",
				url: "/TB03020S/getBscDealDetail",
				data: inputParam,
				dataType: "json",
				success: function(data) {
					/* 기본정보*/
					$('#TB03020S_dealNm').val(data.dealNm);
					//$('#TB03020S_C008').val(data.corptnTypCd);
					//$('#TB03020S_B008').val(data.bookCd);
					$('#TB03020S_invstGdsLdvdCd').val(data.invPrdtLclsCd);
					$('#TB03020S_invstGdsMdvdCd').val(data.invPrdtMdclCd);
					$('#TB03020S_invstGdsSdvdCd').val(data.invPrdtClsfCd);
					$('#TB03020S_I028').val(data.invstGdsDtlsDvdCd);
					$('#TB03020S_dealCntnt').val(data.invDealCntn);
					$('#TB03020S_bnkBd').val(data.bnkBd);
					$('#TB03020S_C006').val(data.ntnCd);
					$('#TB03020S_invstCty').val(data.invstCty);
					
					/* 업체정보 */
					$('#TB03020S_corpRgstNo').val(checkBrnAcno(data.ptxtTrOthrDscmNo));
					$('#TB03020S_entpRnm').val(data.ptxtTrOthrDscmNm);
					$('#TB03020S_B019').val(data.bzsacalCd);
					$('#TB03020S_I006').val(data.indTypDvdCd);
					$('#TB03020S_irls').val(data.irls);
					$('#TB03020S_C012').val(data.crdtGrdCd);
					$('#TB03020S_lstMkt').val(data.lstMkt);

					/* 수익정보 */
					if( data.invAmtDcsnYn == 'Y'){
						$('#TB03020S_dealSclY').attr('checked', true);
					}else{
						$('#TB03020S_dealSclY').attr('checked', false);
					}
					if( data.invAmtDcsnYn == 'N'){
						$('#TB03020S_dealSclN').attr('checked', true);
					}else{
						$('#TB03020S_dealSclN').attr('checked', false);
					}

					$('#TB03020S_dealScl').val(addComma(data.allInvAmt));

					if( data.thcoPtciAmtDcsnYn == 'Y'){
						$('#TB03020S_ptctSclY').attr('checked', true);
					}else{
						$('#TB03020S_ptctSclY').attr('checked', false);
					}
					if( data.thcoPtciAmtDcsnYn == 'N'){
						$('#TB03020S_ptctSclN').attr('checked', true);
					}else{
						$('#TB03020S_ptctSclN').attr('checked', false);
					}

					$('#TB03020S_ptctScl').val(addComma(data.thcoPtciAmt));
					$('#TB03020S_allErn').val(addComma(data.allErnAmt));
					$('#TB03020S_thyrErn').val(addComma(data.theYearErnAmt));
					$('#TB03020S_wrtErn').val(addComma(data.baltErnAmt));
					$('#TB03020S_intrErn').val(addComma(data.intrErnAmt));
					$('#invstCrncyCd').val(data.crncyCd);
					$('#invstCrncyAmt').val(addComma(data.crncyAmt));
					$('#wrtDt').val(formatDate(data.expDt));
					$('#mtrtDt').val(formatDate(data.mtrtDt));
					
					/* 기타정보 */
					$('#TB03020S_c_corpRgstNo').val(checkBrnAcno(data.csucCmpDscmNo));
					$('#TB03020S_c_entpRnm').val(data.csucCmpDscmNm);
					$('#TB03020S_C010').val(data.crdtEhcmntCcd);
					$('#TB03020S_ltv').val(data.ltv);
					$('#TB03020S_ovrsCorpCoprtnCd').val(data.ovrsCorpCoprtnCd);
					$('#TB03020S_etcCntn').val(data.etcCntn);

					/* 직원정보 */
					$('#TB03020S_chrg_empNm').val(data.empNm);
					$('#TB03020S_chrg_eno').val(data.chrrEmpno);
					$('#TB03020S_chrg_dprtNm').val(data.dprtNm);
					$('#TB03020S_chrg_dprtCd').val(data.mngmBdcd);
	
					pqGridObjEnopList.setData(data.enoPList);
					
					/******  딜공통 파일첨부 추가 ******/ 
					$('#key1').val(data.dealNo);
					getFileInfo($('#key1').val(),'*');
					/******  딜공통 파일첨부 추가 ******/ 
				},

			});
		}
	}

	/**
	 * input keydown 이벤트
	 */

	function setKeyFunction_TB03020S() {
		$("input[id=selectedMngDealNo]").keyup(function(key) {
			if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			
				callTB03021P('TB03020S');
			}
			if ($("#selectedMngDealNo").val().length === 0) {
				$("#selectedMngDealNo").val('');
				resetSrchCondition();
			}
		});
	}

	/* 초기화버튼 */
	function resetSrchCondition() {
		$('#selectedMngDealNo').val('');
		$('#selectedDealSq').val('');
		$("#TB03020S_B019 option:eq(0)").attr('selected', true);
		//$("#TB03020S_C008 option:eq(0)").attr('selected', true);
		//$("#TB03020S_B008 option:eq(0)").attr('selected', true);
		$("#TB03020S_invstGdsLdvdCd option:eq(0)").attr('selected', true);
		$("#TB03020S_invstGdsMdvdCd option:eq(0)").attr('selected', true);
		$("#TB03020S_invstGdsSdvdCd option:eq(0)").attr('selected', true);
		$("#TB03020S_I028 option:eq(0)").attr('selected', true);

		$("#TB03020S_C006 option:eq(0)").attr('selected', true);
		$("#TB03020S_C012 option:eq(0)").attr('selected', true);
		$("#TB03020S_I027 option:eq(0)").attr('selected', true);
		$("#TB03020S_C010 option:eq(0)").attr('selected', true);
		$("#TB03020S_ovrsCorpCoprtnCd option:eq(0)").attr('selected', true);
		$("#TB03020S_dealCntnt").val('');
		$("#TB03020S_etcCntn").val('');
		$("#TB03020S_mngPList").html('');
		$("#gridEnoPList").pqGrid("option", "dataModel.data", []);
		$("#gridEnoPList").pqGrid("refreshDataAndView");

		// 로그인 사용자정보 재세팅 추후수정
		loadUserAuth();

		// 딜정보 등록화면 input 초기화
		let fmIputLngth = document.querySelectorAll("input").length;
		for (let i = 0; i < fmIputLngth; i++) {
			document.querySelectorAll("input")[i].value = "";
			
		}
		//componentCtrl();

	}

	/* 공동영업관리자 정보 행삭제 */
	function mngPListDelRow() {
		/* 그리드 체크 갯수 */
		let gridData = $('#gridEnoPList').pqGrid("option", "dataModel.data");
		let checkedRows = [];
		for (let i = 0; i < gridData.length; i++) {
			let rowData = gridData[i];
			if (rowData.delYn == 'Y') {	
				indexDel = i;
				checkedRows.push(rowData);
			}
		}

		if (checkedRows && checkedRows.length > 0) {
			// 체크된 행들을 반복하며 삭제
			checkedRows.forEach(function(row) {
				$('#gridEnoPList').pqGrid('deleteRow', { rowIndx: row.pq_ri});
			});
		}
		if(checkedRows.length <= 0){
			Swal.fire({
				icon                : 'error'
				, title             : "Error!"
				, text              : "삭제할 공동영업관리자 행을 체크해주세요."
				, confirmButtonText : "확인"
			});
			return false;
		}


		// for( var i = 0 ; i < $('#TB03020S_mngPList').children('tr').length ; i ++ ) {
		// 	if( $('#TB03020S_mngPList').children('tr').eq(i).children('td').last().children().is(':checked') ) {
		// 		count ++;
		// 	}
		// }

		// // validation check
		// if( count == 0 ) {
		// 	Swal.fire({
		// 		icon              : 'error'
		// 		, title             : "Error!"
		// 		, text              : "삭제할 공동영업관리자 행을 체크해주세요."
		// 		, confirmButtonText : "확인"
		// 	});
		// 	return false;
		// } else {
		// 	// 체크된 공동영업관리자 삭제
		// 	for( var i = 0 ; i < $('#TB03020S_mngPList').children('tr').length ; i ++ ) {
		// 		if( $('#TB03020S_mngPList').children('tr').eq(i).children('td').last().children().is(':checked') ) {
		// 			$('#TB03020S_mngPList').children('tr').eq(i).remove();
		// 			i --;
		// 		}
		// 	}

		// 	// 순번 재배치
		// 	for( var i = 0 ; i < $('#TB03020S_mngPList').children('tr').length ; i ++ ) {
		// 		$('#TB03020S_mngPList').children('tr').eq(i).children('td').first().text(i+1);
		// 	}
		// }

	}

	// 담당직원정보
	function loadUserAuth() {
		$.ajax({
			type: "GET",
			url: "/getUserAuth",
			dataType: "json",
			success: function(data) {
				loginUserId = data.eno;
				$('#TB03020S_chrg_hdqtNm').val(data.HdqtNm);
				$('#TB03020S_chrg_hdqtCd').val(data.HdqtCd);
				$('#TB03020S_chrg_dprtNm').val(data.dprtNm); 
				$('#TB03020S_chrg_dprtCd').val(data.dprtCd);
				$('#TB03020S_chrg_empNm').val(data.empNm);
				$('#TB03020S_chrg_eno').val(data.eno);
			}
		});
	}

	// 화면진입시 신규등록 딜번호 채번 후 hidden 
	// 첨부파일 키값으로 사용하기 위해 적용
	function getDealNo() {
		$.ajax({
			type: "POST",
			url: "/TB03020S/getDealNo",
			dataType: "text",
			contentType : "application/x-www-urlencoded charset=utf-8",
			success: function(data) {
				$("#key1").val(data);
			}, error : function(e) {
				console.log("getDealNo error ==> ::" + e.status);
			}
		});
	}

	// Deal 일련번호
	/*
	function loadDealSnList(dealNo) {
		let param = {
			"dealNo" : dealNo
		}
		$.ajax({
			type: "GET",
			url: "/getDealSnHis",
			data: param,
			dataType: "json",
			success: function(data) {
				console.log(data);
			}
		});
	}
	*/
	/**
	 * 투자상품 대분류코드 로드
	 */
	function loadInvstGdsLdvdCd() {
		$.ajax({
			type: "GET",
			url: "/getSelectBoxCode/I029",
			dataType: "json",
			success: function(data) {
				ldvdCd = data;

				var html = "";

				if (ldvdCd.length > 0) {
					$.each(ldvdCd, function(key, value) {
						html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
					});
				}
				$('#TB03020S_invstGdsLdvdCd').append(html);

				$('#TB03020S_invstGdsLdvdCd').val('');
				loadInvstGdsMdvdCd();
			}
		});
	}

	/**
	 * 투자상품 중분류코드
	 */
	function loadInvstGdsMdvdCd() {
		$.ajax({
			type: "GET",
			url: "/getSelectBoxCode/I030",
			dataType: "json",
			success: function(data) {
				mdvdCd = data;

				var html = "";

				if (mdvdCd.length > 0) {
					$.each(mdvdCd, function(key, value) {
						html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
					});
				}
				$('#TB03020S_invstGdsMdvdCd').append(html);

				$('#TB03020S_invstGdsMdvdCd').val('');
				loadInvstGdsSdvdCd();
			}
		})
	}

	/**
	 * 투자상품 소분류코드
	 */
	function loadInvstGdsSdvdCd() {
		$.ajax({
			type: "GET",
			url: "/getSelectBoxCode/I031",
			dataType: "json",
			success: function(data) {
				sdvdCd = data;

				var html = "";

				if (sdvdCd.length > 0) {
					$.each(sdvdCd, function(key, value) {
						html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
					});
				}
				$('#TB03020S_invstGdsSdvdCd').append(html);

				$('#TB03020S_invstGdsSdvdCd').val('');

			}
		});
	}


	// Deal 저장
	function saveDeal() {
		if( validateDealInfo() ){

			// 비동기통신 요청
			$.ajax({
				type: "POST",
				url: "/TB03020S/saveDeal",
				contentType: "application/json",
				data: parameterSetting(),
				dataType: "text",
				success: function(data) {

					$('#selectedMngDealNo').val(data);
					Swal.fire({
						icon: 'success'
						, title: "Success!"
						, text: "딜 정보를 저장하는데 성공하였습니다."
						, confirmButtonText: "확인"
					}).then((data) => {

						getBscDealDetail();
					});
				},
				error: function(data) {
					Swal.fire({
						icon: 'error'
						, title: "Error!"
						, text: "딜 정보를 저장하는데 실패하였습니다."
						, confirmButtonText: "확인"
					});
				}
			});

		}


	}

	function parameterSetting() {
		let dealNo;
		if( isNotEmpty($('#selectedMngDealNo').val()) ){
			dealNo = $('#selectedMngDealNo').val();
		} else { 
			dealNo = $("#getNmbrDealNo").val();
		}

		/* 기본정보 */

		var dealNm = $('#TB03020S_dealNm').val();
		//var corptnTypCd = $('#TB03020S_C008').val();
		//var bookCd = $('#TB03020S_B008').val();
		var invPrdtLclsCd = $('#TB03020S_invstGdsLdvdCd').val();
		var invPrdtMdclCd = $('#TB03020S_invstGdsMdvdCd').val();
		var invPrdtClsfCd = $('#TB03020S_invstGdsSdvdCd').val();
		var invstGdsDtlsDvdCd = $('#TB03020S_I028').val();
		var invDealCntn = $('#TB03020S_dealCntnt').val();
		var bnkBd = $('#TB03020S_bnkBd').val();
		var ntnCd = $('#TB03020S_C006').val();
		var invstCty = $('#TB03020S_invstCty').val();

		/* 업체정보 */
		if(!isEmpty($('#TB03020S_corpRgstNo').val())){var ptxtTrOthrDscmNo = $('#TB03020S_corpRgstNo').val().replaceAll('-', '');}else{var ptxtTrOthrDscmNo=''}
		var bzsacalCd = $('#TB03020S_B019').val();
		var indTypDvdCd = $('#TB03020S_I006').val();
		var irls = $('#TB03020S_irls').val();
		var crdtGrdCd = $('#TB03020S_C012').val();
		var lstMkt = $('#TB03020S_lstMkt').val();

		/* 수익정보 */
		var invAmtDcsnYn = '';
		if( $('#TB03020S_dealSclY').is(':checked') ){
			invAmtDcsnYn = 'Y';
		}
		if( $('#TB03020S_dealSclN').is(':checked') ){
			invAmtDcsnYn = 'N';
		}
		var allInvAmt = $('#TB03020S_dealScl').val().replaceAll(',', '');;
		var thcoPtciAmtDcsnYn = '';
		if( $('#TB03020S_ptctSclY').is(':checked') ){
			thcoPtciAmtDcsnYn = 'Y';
		}
		if( $('#TB03020S_ptctSclN').is(':checked') ){
			thcoPtciAmtDcsnYn = 'N';
		}
		var thcoPtciAmt = $('#TB03020S_ptctScl').val().replaceAll(',', '');
		var allErnAmt = $('#TB03020S_allErn').val().replaceAll(',', '');
		var theYearErnAmt = $('#TB03020S_thyrErn').val().replaceAll(',', '');
		var baltErnAmt = $('#TB03020S_wrtErn').val().replaceAll(',', '');
		var intrErnAmt = $('#TB03020S_intrErn').val().replaceAll(',', '');
		var crncyCd = $('#TB03020S_I027').val();
		var crncyAmt = $('#invstCrncyAmt').val().replaceAll(',', '');
		var mtrtDt = $('#wrtDt').val().replaceAll('-', '');
		var expDt = $('#mtrtDt').val().replaceAll('-', '');

		/* 기타정보 */
		if(!isEmpty($('#TB03020S_c_corpRgstNo').val())){var csucCmpDscmNo = $('#TB03020S_c_corpRgstNo').val().replaceAll('-', '');}else{var csucCmpDscmNo=''}
		var crdtEhcmntCcd = $('#TB03020S_C010').val();
		var ltv = $('#TB03020S_ltv').val();
		var ovrsCorpCoprtnCd = $('#TB03020S_ovrsCorpCoprtnCd').val();
		var etcCntn = $('#TB03020S_etcCntn').val();

		/* 직원정보 */
		var chrrEmpno = $('#TB03020S_chrg_eno').val();
		var mngmBdcd = $('#TB03020S_chrg_dprtCd').val();

		/* 공동영업관리자/협업부서 정보 */
		var enoPList = [];

		if (pqGridObjEnopList.pdata.length > 0) {
			for (let i = 0; i < pqGridObjEnopList.pdata.length; i++) {
				//let sn = td.eq(0).text();
				let dprtCd = pqGridObjEnopList.pdata[i].dprtCd;
				let bsnssMngPEno = pqGridObjEnopList.pdata[i].bsnssMngPEno;
				let cntrt = pqGridObjEnopList.pdata[i].cntrt;

				let enoInfo = {
				"sn"     : i+1
				, "dprtCd" : dprtCd
				, "bsnssMngPEno" : bsnssMngPEno
				, "cntrt" : cntrt
				}; 
				enoPList.push(enoInfo);
			}
		}
		//console.log(pqGridObjEnopList.pdata);

		var paramDto = {
			"dealNo" : dealNo
			/* 기본정보 */
			, "dealNm" : dealNm
			//, "corptnTypCd" : corptnTypCd
			//, "bookCd" : bookCd
			, "invPrdtLclsCd" : invPrdtLclsCd
			, "invPrdtMdclCd" : invPrdtMdclCd
			, "invPrdtClsfCd" : invPrdtClsfCd
			, "invstGdsDtlsDvdCd" : invstGdsDtlsDvdCd
			, "invDealCntn" : invDealCntn
			, "bnkBd" : bnkBd
			, "ntnCd" : ntnCd
			, "invstCty" : invstCty
			/* 업체정보 */
			, "ptxtTrOthrDscmNo" : ptxtTrOthrDscmNo
			, "bzsacalCd" : bzsacalCd
			, "indTypDvdCd" : indTypDvdCd
			, "irls" : irls
			, "crdtGrdCd" : crdtGrdCd
			, "lstMkt" : lstMkt
			/* 수익정보 */
			, "invAmtDcsnYn" : invAmtDcsnYn
			, "allInvAmt" : (allInvAmt / 1)
			, "thcoPtciAmtDcsnYn" : thcoPtciAmtDcsnYn
			, "thcoPtciAmt" : (thcoPtciAmt / 1)
			, "allErnAmt" : (allErnAmt / 1)
			, "theYearErnAmt" : (theYearErnAmt / 1)
			, "baltErnAmt" : (baltErnAmt / 1)
			, "intrErnAmt" : (intrErnAmt / 1)
			, "crncyCd" : crncyCd
			, "crncyAmt" : (crncyAmt / 1)
			, "mtrtDt" : mtrtDt
			, "expDt" : expDt
			/* 기타정보 */
			, "csucCmpDscmNo" : csucCmpDscmNo
			, "crdtEhcmntCcd" : crdtEhcmntCcd
			, "ltv" : ltv
			, "ovrsCorpCoprtnCd" : ovrsCorpCoprtnCd
			, "etcCntn" : etcCntn
			/* 직원정보 */
			, "chrrEmpno" : chrrEmpno
			, "mngmBdcd" : mngmBdcd
			/* 공동영업관리자/협업부서 정보 */
			, "enoPList" : enoPList
		};

		return JSON.stringify(paramDto);
	}

	// Deal 정보 validation check
	function validateDealInfo() {
		var msg = '';
		var input = '';

		// 딜명
		if(isEmpty($('#TB03020S_dealNm').val())) {
			msg = '딜명';
			input = $('#TB03020S_dealNm');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// 협업유형
		/*if(isEmpty($('#TB03020S_C008').val())) {
			msg = '협업유형';
			input = $('#TB03020S_C008');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// Book
		if(isEmpty($('#TB03020S_B008').val())) {
			msg = '북코드';
			input = $('#TB03020S_B008');
			input.focus();
			emptyParameter(msg);
			return false;
		}
		*/
		// 상품대분류
		if(isEmpty($('#TB03020S_invstGdsLdvdCd').val())) {
			msg = '상품 대분류';
			input = $('#TB03020S_invstGdsLdvdCd');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// 상품중분류
		if(isEmpty($('#TB03020S_invstGdsMdvdCd').val())) {
			msg = '상품 중분류';
			input = $('#TB03020S_invstGdsMdvdCd');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// 상품소분류
		if(isEmpty($('#TB03020S_invstGdsSdvdCd').val())) {
			msg = '상품 소분류';
			input = $('#TB03020S_invstGdsMdvdCd');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// 상품상세분류
		if(isEmpty($('#TB03020S_I028').val())) {
			msg = '상품 상세분류';
			input = $('#TB03020S_I028');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// Deal내용
		if(isEmpty($('#TB03020S_dealCntnt').val())) {
			msg = 'Deal내용';
			input = $('#TB03020S_dealCntnt');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// 법인번호
		if(isEmpty($('#TB03020S_corpRgstNo').val())) {
			msg = '법인번호';
			input = $('#TB03020S_corpRgstNo');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// Deal규모
		if(isEmpty($('#TB03020S_dealScl').val())) {
			msg = 'Deal규모';
			input = $('#TB03020S_dealScl');
			input.focus();
			emptyParameter(msg);
			return false;
		}

	/*	// 참여규모
		if(isEmpty($('#TB03020S_ptctScl').val())) {
			msg = '참여규모';
			input = $('#TB03020S_ptctScl');
			input.focus();
			emptyParameter(msg);
			return false;
		}
		
		// 전체수익
		if(isEmpty($('#TB03020S_allErn').val())) {
			msg = '전체수익';
			input = $('#TB03020S_allErn');
			input.focus();
			emptyParameter(msg);
			return false;
		}
		
		// 당해수익
		if(isEmpty($('#TB03020S_thyrErn').val())) {
			msg = '당해수익';
			input = $('#TB03020S_thyrErn');
			input.focus();
			emptyParameter(msg);
			return false;
		}
		
		// 기표수익
		if(isEmpty($('#TB03020S_wrtErn').val())) {
			msg = '기표수익';
			input = $('#TB03020S_wrtErn');
			input.focus();
			emptyParameter(msg);
			return false;
		}
		
		// On-going
		if(isEmpty($('#TB03020S_intrErn').val())) {
			msg = 'On-going';
			input = $('#TB03020S_intrErn');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// 기표일자
		if(isEmpty($('#wrtDt').val())) {
			msg = '기표일자';
			input = $('#wrtDt');
			input.focus();
			emptyParameter(msg);
			return false;
		}
		
		// 만기일자
		if(isEmpty($('#mtrtDt').val())) {
			msg = '만기일자';
			input = $('#mtrtDt');
			input.focus();
			emptyParameter(msg);
			return false;
		}

		// 현지법인협업
		if(isEmpty($('#TB03020S_ovrsCorpCoprtnCd').val())) {
			msg = '현지법인협업';
			input = $('#TB03020S_ovrsCorpCoprtnCd');
			input.focus();
			emptyParameter(msg);
			return false;
		}
		let bsnssData = pqGridObjEnopList.pdata;
		if (bsnssData.length > 0) {
			for (let i = 0; i < bsnssData.length; i++) {
				if (isEmpty(bsnssData[i].cntrt)) 
				{	
					msg = '공동관리자/협업부서의 공헌도';
					emptyParameter(msg);
					return false;
				}
			}
		}*/
			
		
		function emptyParameter(msg) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: msg + "을(를) 입력해주세요."
				, confirmButtonText: "확인"
			})

		}

		return true;

	}

	// 딜 결재요청
	function reqApproveDeal() {

		// 안건 저장 후 결재요청
		if(validateDealInfo()){
			// 비동기통신 요청
			$.ajax({
				type: "POST",
				url: "/TB03020S/saveDeal",
				data: parameterSetting(),
				dataType: "text",
				success: function(data) {
					$('#selectedMngDealNo').val(data);
				}
			}).then( function (){
				approveDeal();
			});
		}

	}

	// Deal 결재요청
	function approveDeal() {

		var ibDealNo = $('#selectedMngDealNo').val();
		var eno = $('#TB03020S_pynt_eno').val();
		var entpNm = $('#TB03020S_entpRnm').val();

		if( isEmpty($('#TB03020S_pynt_empNm').val()) ) {
			Swal.fire({
				icon: 'error'
				, title: "Error!"
				, text: "결재자를 등록해주세요."
				, confirmButtonText: "확인"
			});

			return false;
		}

		var paramData = {
			"empno" : eno
			, "workDcd" : "01"
			, "workCtns" : "(결재) Deal기본정보관리"
			, "menuId" : "/TB03020S"
			, "rmrk" : "ibDealNo="+ibDealNo
			, "entpNm" : entpNm
		};

		$.ajax({
			type: "POST",
			url: "/TB03020S/reqApproveDeal",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "결재요청이 완료되었습니다."
					, confirmButtonText: "확인"
				}).then(() =>{
					getBscDealDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "결재요청이 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});

	}

	// 컴포넌트 컨트롤
	function componentCtrl() {
		
		var dealNo = $('#selectedMngDealNo').val();					// 딜번호
		var prgrsStCd = $('#selectedInspctPrgrsStCd').val();		// 진행상태코드
		let pyntEno = $('#TB03020S_pynt_eno').val();				// 결재자사번


		if( isEmpty(dealNo) ) {
			$('#saveDeal').attr('disabled', false);
			$('#approveDeal').attr('disabled', true);
			$('#saveDeal').show();
			$('#approveDeal').show();
			$('#confirmDeal').hide();
			$('#rejectDeal').hide();
		}else{
			if( pyntEno === loginUserId ) {
				$('#saveDeal').hide();
				$('#approveDeal').hide();
				$('#confirmDeal').show();
				$('#rejectDeal').show();
			}else{
				$('#saveDeal').show();
				$('#approveDeal').show();
				$('#confirmDeal').hide();
				$('#rejectDeal').hide();
			}

			switch ( prgrsStCd ){
				// 작성중
				case '100' : $('#saveDeal').attr('disabled', false);
							$('#approveDeal').attr('disabled', false);
							$('#confirmDeal').attr('disabled', true);
							$('#rejectDeal').attr('disabled', true);
							break;
				// 결재요청
				case '101' : $('#saveDeal').attr('disabled', true);
							$('#approveDeal').attr('disabled', true);
							$('#confirmDeal').attr('disabled', false);
							$('#rejectDeal').attr('disabled', false);
							break;
				// 결재승인
				case '102' : $('#saveDeal').attr('disabled', true);
							$('#approveDeal').attr('disabled', true);
							$('#confirmDeal').attr('disabled', true);
							$('#rejectDeal').attr('disabled', true);
							break;
				// 반송
				case '103' : $('#saveDeal').attr('disabled', false);
							$('#approveDeal').attr('disabled', false);
							$('#confirmDeal').attr('disabled', true);
							$('#rejectDeal').attr('disabled', true);
							break;
				default : $('#saveDeal').attr('disabled', true);
						$('#approveDeal').attr('disabled', true);
						$('#confirmDeal').attr('disabled', true);
						$('#rejectDeal').attr('disabled', true);
						break;
			}

		}

	}

	// 결재승인 (심사요청)
	function cnfmDeal() {

		/* RAA01B */
		const ibDealNo = $('#selectedMngDealNo').val();
		const ibDealNm = $('#dealNm').val();
		const tlAmt = ($('#dealScal').val().replaceAll(',', '') / 1);
		const ptcpAmt = ($('#ptctScal').val().replaceAll(',', '') / 1);
		const tlErnAmt = ($('#tlErnAmt').val().replaceAll(',', '') / 1);
		const wrtErnAmt = ($('#wrtErnAmt').val().replaceAll(',', '') / 1);
		const entpRnm = $('#TB03020S_entpRnm').val();
		const wrtDt = $('#wrtDt').val().replaceAll('-', '');
		const mtrtDt = $('#mtrtDt').val().replaceAll('-', '');
		const invstNtnCd = $('#invstNtnCd').val();
		const invstCrncyCd = $('#invstCrncyCd').val();
		const crncyAmt = ($('#invstCrncyAmt').val().replaceAll(',', '') / 1);
		const invstGdsLdvdCd = $('#TB03020S_invstGdsLdvdCd').val();
		const invstGdsMdvdCd = $('#TB03020S_invstGdsMdvdCd').val();
		const invstGdsSdvdCd = $('#TB03020S_invstGdsSdvdCd').val();
		const invstGdsDtlsDvdCd = $('#TB03020S_invstGdsDtlsDvdCd').val();
		const coprtnTypCd = $('#coprtnTypCd').val();
		const hdqtCd = $('#TB03020S_chrg_hdqtCd').val();
		const dprtCd = $('#TB03020S_chrg_dprtCd').val();
		const chrgPEno = $('#TB03020S_chrg_eno').val();

		/* RAA02B */
		const riskInspctCcd = '01';
		const lstCCaseCcd = '00';

		/* IBIMS100B 개발중 */
		const pyntEno = $('#TB03020S_pynt_eno').val();

		var paramData = {
			"ibDealNo" : ibDealNo
			, "riskInspctCcd" : riskInspctCcd
			, "lstCCaseCcd" : lstCCaseCcd
			, "ibDealNm" : ibDealNm
			, "tlAmt" : tlAmt
			, "ptcpAmt" : ptcpAmt
			, "tlErnAmt" : tlErnAmt
			, "wrtErnAmt" : wrtErnAmt
			, "entpRnm" : entpRnm
			, "wrtDt" : wrtDt
			, "mtrtDt" : mtrtDt
			, "invstNtnCd" : invstNtnCd
			, "invstCrncyCd" : invstCrncyCd
			, "crncyAmt" : crncyAmt
			, "invstGdsLdvdCd" : invstGdsLdvdCd
			, "invstGdsMdvdCd" : invstGdsMdvdCd
			, "invstGdsSdvdCd" : invstGdsSdvdCd
			, "invstGdsDtlsDvdCd" : invstGdsDtlsDvdCd
			, "coprtnTypCd" :coprtnTypCd
			, "hdqtCd" : hdqtCd
			, "dprtCd" : dprtCd
			, "chrgPEno" : chrgPEno
			, "pyntEno" : pyntEno
		};

		$.ajax({
			type: "POST",
			url: "/TB03020S/cnfmDeal",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "결재승인이 완료되었습니다."
					, confirmButtonText: "확인"
				}).then(() =>{
					getBscDealDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "결재승인이 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});

	}

	// 반송
	function rejtDeal() {

		ibDealNo = $('#selectedMngDealNo').val();

		var paramData = {
			"ibDealNo" : ibDealNo
		};

		$.ajax({
			type: "POST",
			url: "/TB03020S/rejtDeal",
			data: paramData,
			dataType: "json",
			success: function() {
				Swal.fire({
					icon: 'success'
					, title: "Success!"
					, text: "반송이 완료되었습니다."
					, confirmButtonText: "확인"
				}).then(() =>{
					getBscDealDetail();
				});
			},
			error: function() {
				Swal.fire({
					icon: 'error'
					, title: "Error!"
					, text: "반송이 실패하였습니다."
					, confirmButtonText: "확인"
				});
			}
		});

	}

	// 딜번호 조회 팝업 키다운 호출
	$('#selectedMngDealNo').keydown(function (e) {
		if(e.originalEvent.key === 'Enter' && $("#selectedMngDealNo").length < 30) {
			//callAS02020P('TB03020S');
		}
	});


	// 탭 접었다 펴기
	function tabCtrl(prefix) {
		if( prefix == '#invst') {
			if( $('.btn.btn-default.invst').attr('id') === 'invstClose' ) {
				$('#invstInfo').hide();
				$('.btn.btn-default.invst').attr('id', 'invstOpen')
				$('#invstIcon').attr('class', 'fa fa-arrow-down')
			}else{
				$('#invstInfo').show();
				$('.btn.btn-default.invst').attr('id', 'invstClose')
				$('#invstIcon').attr('class', 'fa fa-arrow-up')
			}
		}

		if( prefix == '#ern') {
			if ($('.btn.btn-default.ern').attr('id') === 'ernClose') {
				$('#ernInfo').hide();
				$('.btn.btn-default.ern').attr('id', 'ernOpen')
				$('#ernIcon').attr('class', 'fa fa-arrow-down')
			}else{
				$('#ernInfo').show();
				$('.btn.btn-default.ern').attr('id', 'ernClose')
				$('#ernIcon').attr('class', 'fa fa-arrow-up')
			}
		}

	}


	/**
	 * 모달 팝업 show

	function callTB03031P(prefix){
		$('#prefix').val(prefix);
		$('#modal-TB03031P').modal('show');
	}
	*/

	/**
	 * close modal

	function modalClose_TB03031P() {
		$('#modal-TB03031P').modal('hide');
	}
	*/
	/* ***********************************그리드 컬럼******************************** */
	let colEnopList = [
		{ 	
			title    : "부서코드", 
			dataType : "string", 
			dataIndx : "dprtCd", 
			align    : "left",
			hidden: true,
		},
		{ 	
			title    : "부서명", 
			dataType : "string", 
			dataIndx : "dprtNm", 
			halign   : "center",
			align    : "center",
		},
		{ 	
			title    : "영업관리자번호", 
			dataType : "string",
			dataIndx : "bsnssMngPEno",
			hidden   : true,
			align    : "left", 
		},
		{ 	
			title    : "영업관리자", 
			dataType : "string",
			dataIndx : "empNm", 
			halign   : "center",
			align    : "center", 
		},
		{ 	
			title    : "공헌도(%)", 
			dataType : "string", 
			dataIndx : "cntrt",
			halign   : "center",
			align    : "right", 
			type: 'textbox',
			editable: true,
			editor: { 
				type: 'textbox', 
				attr: "type='number'"
			},
			render : function (ui) {
				let cellData = ui.cellData;
				if (cellData && cellData > 100) return `100%` ;
				else return `${cellData}%`;
			}
		},
		{ 	
			title    : "삭제",
			editable : true, 
			editor: { type: 'checkbox'},
			dataType : "checkbox",
			dataIndx : "delYn",
			align    : "center",  
			type: 'checkbox',
			editType : 'checkbox',
			cb: {
				all: true,
				header: true,
				check: "Y",
				uncheck: "N"
			}
		}
	];

	return{
		resetSrchCondition : resetSrchCondition
		, getBscDealDetail : getBscDealDetail
		, resetSrchCondition : resetSrchCondition
		, tabCtrl : tabCtrl
		, mngPListDelRow : mngPListDelRow
		, saveDeal : saveDeal
	}
})();

