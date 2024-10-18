let TB07140S_rowData = {};
const dummyData = TB07140S_rowData;
let TB07140S_rowIndx;
let TB07140S_pqGridLength = 0;
let selectBox;
let grdSelect = {};
let TB07140S_tagStatuses = [];

$(document).ready(function () {
    $("input[id*='Amt'], input[id*='Blce'], input[id*='Exrt'], input[id*='Mnum'], input[id*='Tmrd'], input[id*='tx']").val('0');
    selectorNumberFormater($("input[id*='Amt'], input[id*='Blce'], input[id*='Rt']"));

    // 처음 인풋 상태 체크
    getFirstStatus();
    
    // 인풋 기본값 설정
    dateInputSet();

    // 공통 코드 불러오기
    fnSelectBox();

    // 공통 코드 html에 셋팅하기
    createSelectTag();

    // 사용자명 세팅
    setDprtData();

    // pqgrid 오픈
    pqGrid();


    $('#disabledView').find('input').prop('disabled', true);

    // 옵션값 대조해서 input disabled, readonly 컨트롤
    fincInputHandler();

    // 옵션값 변동시 핸들러 작동
    selectTagChangeEvent();

});

const fincInputHandler = () => {

    const fincPrcsDcd = $('#TB07140S_fincPrcsDcd').val()
    const bfRsvPayDcd = $('#TB07140S_bfRsvPayDcd').val()


    const fincPrcsDcdMapping = {
        "01": () => {
            $('#TB07140S_fincCngeAmt').prop('readonly', false);
        }
        , "02": () => {
            $('#TB07140S_fincCngeAmt, #TB07140S_stlAmt').prop('readonly', false);
        }
        , "03": () => {
            $('#TB07140S_payErnAmt, #TB07140S_intx, #TB07140S_lotx').prop('readonly', false);
        }
        , "04": () => {
            $('#TB07140S_payErnAmt').prop('readonly', false);
        }
        , "05": () => {
            $('#TB07140S_payErnAmt').prop('readonly', false);
            $('#TB07140S_stlAcno ,#TB07140S_fnltCd').prop('readonly', true);
        }
        , "06": () => {
            $('#TB07140S_fincCngeAmt, #TB07140S_stlAmt, #TB07140S_trtx').prop('readonly', false);
        }
        , "07": () => {
            $('#TB07140S_payErnAmt').prop('readonly', false);
        }
    };

    const bfRsvPayDcdMapping = {
        "01": () => {

        }
        , "02": () => {
            $('#TB07140S_stlAcno').prop('readonly', true);
        }
        , "03": () => {
            $('#TB07140S_stlAcno').prop('readonly', true);
        }
        , "04": () => {
            $('#TB07140S_stlAcno ,#TB07140S_fnltCd').prop('readonly', true);
        }
    };

    setFirstStatus();
    // bfRsvPayDcdMapping[bfRsvPayDcd]();
    fincPrcsDcdMapping[fincPrcsDcd]();

}

const selectTagChangeEvent = () => {
    $('#TB07140S_fincPrcsDcd, #TB07140S_bfRsvPayDcd').on('change', function (evt) {
        fincInputHandler();
    });
}

/*
 *  처음 인풋의 disabled, readonly 상태 가져오기
 */
const getFirstStatus = () => {
    $("input, select").each(function () {
        TB07140S_tagStatuses.push({
            id: $(this).attr('id'),
            readonly: $(this).prop('readonly'),
            disabled: $(this).prop('disabled'),
            value: $(this).val()
        });
    });
}

/*
 *  처음 인풋의 disabled, readonly 상태로 돌리기
 */
const setFirstStatus = () => {
    $('.toggleBtn1').addClass('btn-info').removeClass('btn-default');
    $('.toggleBtn2').addClass('btn-default').removeClass('btn-info');
    $('.ibox-content .ibox-content .btn.btn-default').prop('disabled', false);
    TB07140S_tagStatuses.forEach(status => {
        $(`#${status.id}`).prop('readonly', status.readonly);
        $(`#${status.id}`).prop('disabled', status.disabled);
    });
    $('.toggleBtn2').prop('disabled', false);
}

/*
 *  날짜 기본세팅
 */
function dateInputSet() {
    const $this = $("input[id*='Dt']");
    $this.val('YYYY-MM-DD');
}

/*
 *  작성자 정보 불러오기
 */
const setDprtData = () => {
    $('#TB07140S_dprtCd').val($('#userDprtCd').val())
    $('#TB07140S_dprtNm').val($('#userDprtNm').val())
    $('#TB07140S_empNo').val($('#userEno').val())
    $('#TB07140S_empNm').val($('#userEmpNm').val())
}

/*
 *  등록
 */
const insertBtn = () => {
    setFirstStatus();
    fincInputHandler();
}

/*
 *  취소
 */
const cancelBtn = () => {
    $('.toggleBtn1').addClass('btn-default').removeClass('btn-info');
    $('.toggleBtn2').addClass('btn-info').removeClass('btn-default');
    $('.ibox-content .ibox-content input').prop('readonly', true);
    $('TB07140S_wholIssuShqt').prop('readonly', false);
    $('.ibox-content .ibox-content select').prop('disabled', true);
    $('.ibox-content .ibox-content .btn.btn-default').prop('disabled', true);
    $('.toggleBtn1').prop('disabled', false);
    resetInput();
}

/*
 *  전체 초기화
 */
const removeAll = () => {
    resetInput();
    TB07140S_resetPqGrid();
}

const resetInput = () => {
    $("input").val('');
    $("input[id*='Amt'], input[id*='Blce'], input[id*='Exrt'], input[id*='Mnum'], input[id*='Tmrd'], #TB07140S_trtx").val('0');
}

/*
 *  =====================OptionBox데이터 SET=====================
 */
function fnSelectBox() {
    selectBox = getSelectBoxList("TB07140",
        "/H002"
        + "/I027"
        + "/F016"
        + "/B026"
        , false);
    grdSelect.H002 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'H002'; });		//	보유목적코드
    grdSelect.I027 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'I027'; });		//	통화코드
    grdSelect.F016 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'F016'; });		//	출자처리구분코드
    grdSelect.B026 = selectBox.filter(function (item) { return item.cmnsGrpCd === 'B026'; });		//	전금지준구분코드
}

function createSelectTag() {

    //  보유목적코드
    let h002Html;
    grdSelect.H002.forEach(item => {
        h002Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
    });
    $('#TB07140S_holdPrpsDcd').append(h002Html);

    //  통화코드
    let i027Html;
    grdSelect.I027.forEach(item => {
        i027Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
    });
    $('#TB07140S_trCrryCd').append(i027Html);

    //	출자처리구분코드
    let f016Html;
    grdSelect.F016.forEach(item => {
        f016Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
    });
    $('#TB07140S_fincPrcsDcd').append(f016Html);

    //	전금지준구분코드
    let b026Html;
    grdSelect.B026.forEach(item => {
        b026Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
    });
    $('#TB07140S_bfRsvPayDcd').append(b026Html);
}



/*
 *  =====================OptionBox데이터 SET=====================
 */


/*
 *  =====================데이터변환용=====================
 */

/*
 *  날짜데이터편집
 */
function getDateData(
    date,
    format,
    cut			/* (-, ., /) 선택 */
) {

    if (!date) {
        return;
    }

    let dateTypeCheck = new Date(date)

    let year;
    let month;
    let day;
    let resultDate;

    if (isNaN(dateTypeCheck)) {
        year = date.slice(0, 4);
        month = date.slice(4, 6);
        day = date.slice(6, 8);
    } else {
        year = new Date(date).getFullYear().toString();
        month = (new Date(date).getMonth() + 1).toString().padStart(2, '0');
        day = new Date(date).getDate().toString().padStart(2, '0');
    }

    switch (format) {
        case ("yyyy"): {
            resultDate = year
            return resultDate;
        }
        case ("mm"): {
            resultDate = month
            return resultDate;
        }
        case ("dd"): {
            resultDate = day
            return resultDate;
        }
        case ("mmdd"): {
            resultDate = month + cut + day
            return resultDate;
        }
        case ("yyyymm"): {
            resultDate = year + cut + month
            return resultDate;
        }
        case ("yyyymmdd"): {
            resultDate = year + cut + month + cut + day
            return resultDate;
        }
    }
}

/*
 *  =====================데이터변환용=====================
 */




/*
 *  =====================PQGRID=====================
 */

/*
 *  pqGrid colModel
 */
function TB07140S_colModelData() {

    const TB07140S_colModel = [
        {
            title: "거래일자",
            dataType: "string",
            dataIndx: "trDt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            render: function (ui) {
                let result;
                if (ui.cellData) {
                    result = getDateData(ui.cellData, "yyyymmdd", "-")
                }
                return result;
            }
        }
        , {
            title: "거래번호",
            dataType: "string",
            dataIndx: "trSn",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "출자처리구분",
            dataType: "string",
            dataIndx: "fincPrcsDcd",    //  F016
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            editor: {
                type: "select",
                valueIndx: "cdValue",
                labelIndx: "cdName",
                options: grdSelect.F016
            },
            render: function (ui) {
                let fSel = grdSelect.F016.find(({ cdValue }) => cdValue == ui.cellData);
                return fSel ? fSel.cdName : ui.cellData;
            }
        }
        , {
            title: "운용펀드",
            dataType: "string",
            dataIndx: "fndNm",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
        }
        , {
            title: "종목코드",
            dataType: "string",
            dataIndx: "prdtCd",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "보유목적",
            dataType: "string",
            dataIndx: "holdPrpsDcd",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            editor: {
                type: "select",
                valueIndx: "cdValue",
                labelIndx: "cdName",
                options: grdSelect.H002
            },
            render: function (ui) {
                let fSel = grdSelect.H002.find(({ cdValue }) => cdValue == ui.cellData);
                return fSel ? fSel.cdName : ui.cellData;
            }
        }
        , {
            title: "통화",
            dataType: "string",
            dataIndx: "trCrryCd",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            editor: {
                type: "select",
                valueIndx: "cdValue",
                labelIndx: "cdName",
                options: grdSelect.I027
            },
            render: function (ui) {
                let fSel = grdSelect.I027.find(({ cdValue }) => cdValue == ui.cellData);
                return fSel ? fSel.cdName : ui.cellData;
            }
        }
        , {
            title: "출자변동금액",
            dataType: "string",
            dataIndx: "fincCngeAmt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###"
        }
        , {
            title: "보수/수익",
            dataType: "string",
            dataIndx: "payErnAmt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###"
        }
        , {
            title: "결제금액",
            dataType: "string",
            dataIndx: "stlAmt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###"
        }
        , {
            title: "매매환율",
            dataType: "string",
            dataIndx: "trdeExrt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###"
        }
        , {
            title: "환산출자변동금액",
            dataType: "string",
            dataIndx: "trslFincCngeAmt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###"
        }
        , {
            title: "환산보수/수익",
            dataType: "string",
            dataIndx: "trslPayErnAmt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###"
        }
        , {
            title: "환산결제금액",
            dataType: "string",
            dataIndx: "trslStlAmt",
            halign: "center",
            align: "center",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###"
        }
    ]

    return TB07140S_colModel;
}

/*
 *  PQGRID SETTING
 */
function pqGrid() {
    // 그리드 옵션 생성
    let pqGridObjs = [
        {
            height: 180
            , maxHeight: 180
            , id: 'TB07140S_colModel'
            , colModel: TB07140S_colModelData()
            , scrollModel: { autoFit: true }
            , editable: true
            , rowClick: function (event, ui) {
                if (TB07140S_rowData === ui.rowData) {
                    TB07140S_rowData = dummyData;
                } else {
                    TB07140S_rowData = ui.rowData;
                }
            }
            , selectionModel: { type: 'row' }
        }
    ];
    setPqGrid(pqGridObjs);
    $("#TB07140S_colModel").pqGrid('instance');
}

/*
 *  ====================PQGRID변환====================
 */

/*
 *  PQGRID 줄추가
 */
function TB07140S_addNewRow() {

    $("#TB07140S_colModel").pqGrid("addRow", { rowData: newRow, checkEditable: false });
}

/*
 *  PQGRID 줄삭제
 */
function TB07140S_deleteRow() {
    let getLength = $("#TB07140S_colModel").pqGrid("instance").pdata.length;

    if (TB07140S_rowData != dummyData && TB07140S_pqGridLength < getLength && !TB07140S_rowData.excSn) {
        $("#TB07140S_colModel").pqGrid("deleteRow", { rowData: TB07140S_rowData, checkEditable: false });
        TB07140S_rowData = dummyData;
    } else if (TB07140S_rowData === dummyData && TB07140S_pqGridLength < getLength) {
        $("#TB07140S_colModel").pqGrid("deleteRow", { rowData: TB07140S_rowData, checkEditable: false });
        TB07140S_rowData = dummyData;
    } else if (TB07140S_rowData === dummyData && TB07140S_pqGridLength === getLength) {
        Swal.fire({
            icon: 'warning'
            , text: "삭제하실 행을 선택해주세요"
            , confirmButtonText: "확인"
        });
        TB07140S_rowData = dummyData;
    } else if (TB07140S_rowData != dummyData) {
        Swal.fire({
            icon: "warning"
            , text: "정말 삭제하시겠습니까?"
            , confirmButtonText: "확인"
            , denyButtonText: "아니오"
            , showDenyButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteIBIMS404B();
                TB07140S_rowData = dummyData;
                return;
            } else if (result.isDenied) {
                TB07140S_rowData = dummyData;
                return;
            }
        })
    }
}

/*
 *  PQGRID 초기화
 */
function TB07140S_resetPqGrid() {
    $("#TB07140S_colModel").pqGrid('option', 'dataModel.data', []);
    $("#TB07140S_colModel").pqGrid('refreshDataAndView');
}

/*
 *	엑셀(Excel) PQGrid ExcelExport
 */
function pqExportExcel() {
    let blob = $("#TB07140S_colModel").pqGrid('instance').exportExcel({});
    let fileName = "출자금 거래등록 목록.xlsx";
    pq.saveAs(blob, fileName);
}

/*
 *  =====================PQGRID=====================
 */

/*
 *  실행
 */
function excFinc() {
    let btnToggle1 = $('.btn.btn-s.toggleBtn1.btn-info')
    if (btnToggle1) {
        TB07140S_checkQueryType();
    } else {
        deleteFinc();
    }
}

/*
 *  인설트 업데이트 구분
 */
function TB07140S_checkQueryType() {
    if (dummyData === TB07140S_rowData) {
        insertFinc();
    } else {
        updateFinc();
    }
}


/*
 *  =====================SELECT모음=====================
 */

/*
 *  SELECT 출자금 거래등록 정보
 */
function getFincList() {

    let result;

    let prdtCd = $('#TB07140S_prdtCd').val();
    let nsFndCd = $('#TB07140S_fndCd').val();

    let paramData;
    paramData = {
        prdtCd: prdtCd
        , NS_FND_CD: nsFndCd
    }

    $.ajax({
        type: "POST",
        url: "/TB07140S/getFincList",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            if (data) {
                let gridList = $("#TB07140S_colModel").pqGrid('instance');
                gridList.setData(data);
                gridList.getData();
            } else {
                result = -1;
            }
        }, error: function () {
            result = -2;
        }
    });

    if (result < 0) {
        Swal.fire({
            icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
            text: '정보가 없습니다!'
        })
    }
    return result;
}



/*
 *  SELECT 실행순번
 */
// function getExcSn(prdtCd) {
//     $.ajax({
//         type: "POST",
//         url: "/TB07140S/getExcSnTB07140S",
//         contentType: "application/json; charset=UTF-8",
//         data: prdtCd,
//         dataType: "json",
//         success: function (data) {
//             let html = '<option value="">전체</option>';
//             if (data.length > 0) {
//                 //let html
//                 data.forEach(item => {
//                     html += '<option value="' + item + '">' + item + '</option>';
//                 });
//                 $('#TB07140S_excSn').html(html);
//             }
//         }, error: function () {

//         }
//     });
// }

/*
 *  SELECT 실행금리정보
 */
// function getIntrtData() {

//     let result;

//     let prdtCd = $('#TB07140S_prdtCd').val();
//     let excSn = $('#TB07140S_excSn').val();

//     let paramData;
//     paramData = {
//         prdtCd: prdtCd
//         , excSn: excSn
//     }

//     $.ajax({
//         type: "POST",
//         url: "/TB07140S/getIntrtData",
//         contentType: "application/json; charset=UTF-8",
//         data: JSON.stringify(paramData),
//         dataType: "json",
//         success: function (data) {
//             if (data.length > 0) {
//                 TB07140S_pqGridLength = data.length
//                 let detail = $('#TB07140S_colModel').pqGrid('instance')
//                 detail.setData(data);
//                 detail.getData();
//             } else {
//                 result = 2
//             }
//         }, error: function () {
//             result = 0
//         }
//     });

//     return result
// }

/*
 *  SELECT TB07140S
 */
// function selectTB07140S() {
//     let excResult;
//     let intrtResult;
//     excResult = getExcData();   // 데이터값이 나온 함수
//     intrtResult = getIntrtData();

//     if (!$('#TB07140S_prdtCd').val()) {
//         Swal.fire({
//             icon: 'warning'
//             , text: "종목코드를 입력해주세요!"
//             , confirmButtonText: "확인"
//         });
//         return;
//     } else if (!$('#TB07140S_prdtNm').val()) {
//         Swal.fire({
//             icon: 'warning'
//             , text: "상품명을 입력해주세요!"
//             , confirmButtonText: "확인"
//         });
//         return;
//     } else if (!$('#TB07140S_excSn').val()) {
//         Swal.fire({
//             icon: 'warning'
//             , text: "실행순번을 지정해주세요!"
//             , confirmButtonText: "확인"
//         });
//         return;
//     } else if (excResult === 2 || intrtResult === 2) {
//         Swal.fire({
//             icon: 'warning'
//             , text: "조회된 데이터가 없습니다"
//             , confirmButtonText: "확인"
//         });
//     } else if (excResult === 0 && intrtResult === 0) {
//         Swal.fire({
//             icon: 'error'
//             , text: "정보조회 실패!"
//             , confirmButtonText: "확인"
//         });
//     }
// }

/*
 *  =====================SELECT모음=====================
 */

/*
 *  =====================INSERT모음=====================
 */

/*
 *  출자금 거래등록
 */
function insertFinc() {

    paramData = {
        prdtCd: $(`#TB07140S_prdtCd`).val()
        , trSn: $(`#TB07140S_trSn`).val()
        , excSn: $(`#TB07140S_excSn`).val()
        , trDt: $(`#TB07140S_trDt`).val()
        , etprCrdtGrntTrKindCd: $(`#TB07140S_etprCrdtGrntTrKindCd`).val()
        , nsFndCd: $(`#TB07140S_nsFndCd`).val()
        , synsCd: $(`#TB07140S_synsCd`).val()
        , holdPrpsDcd: $(`#TB07140S_holdPrpsDcd`).val()
        , fincPrcsDcd: $(`#TB07140S_fincPrcsDcd`).val()
        , trDptCd: $(`#TB07140S_trDptCd`).val()
        , fincCngeAmt: $(`#TB07140S_fincCngeAmt`).val()
        , payErnAmt: $(`#TB07140S_payErnAmt`).val()
        , stlAmt: $(`#TB07140S_stlAmt`).val()
        , trdeExrt: $(`#TB07140S_trdeExrt`).val()
        , trslFincCngeAmt: $(`#TB07140S_trslFincCngeAmt`).val()
        , trslPayErnAmt: $(`#TB07140S_trslPayErnAmt`).val()
        , trslStlAmt: $(`#TB07140S_trslStlAmt`).val()
        , trtx: $(`#TB07140S_trtx`).val()
        , intx: $(`#TB07140S_intx`).val()
        , lotx: $(`#TB07140S_lotx`).val()
        , bfRsvPayDcd: $(`#TB07140S_bfRsvPayDcd`).val()
        , stlXtnlIsttCd: $(`#TB07140S_stlXtnlIsttCd`).val()
        , stlAcno: $(`#TB07140S_stlAcno`).val()
        , fincPayCntn: $(`#TB07140S_fincPayCntn`).val()
        , reFincPossYn: $(`#TB07140S_reFincPossYn`).val()
    }

    $.ajax({
        type: "POST",
        url: "/TB07140S/insertFinc",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            if (data) {
                result = data;
                Swal.fire({
                    icon: 'success',
                    title: '등록성공!'
                })
            } else {
                result = -1;
            }
        }, error: function () {
            result = -2;
        }
    });

    if (result < 0) {
        Swal.fire({
            icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
            title: '등록실패!'
        })
    }

    getFincList();

}

/*
 *  =====================INSERT모음=====================
 */


/*
 *  =====================UPDATE모음=====================
 */

/*
 *  출자금 거래등록 업데이트
 */
function updateFinc() {

    paramData = {
        prdtCd: $(`#TB07140S_prdtCd`).val()
        , trSn: $(`#TB07140S_trSn`).val()
        , excSn: $(`#TB07140S_excSn`).val()
        , trDt: $(`#TB07140S_trDt`).val()
        , etprCrdtGrntTrKindCd: $(`#TB07140S_etprCrdtGrntTrKindCd`).val()
        , nsFndCd: $(`#TB07140S_nsFndCd`).val()
        , synsCd: $(`#TB07140S_synsCd`).val()
        , holdPrpsDcd: $(`#TB07140S_holdPrpsDcd`).val()
        , fincPrcsDcd: $(`#TB07140S_fincPrcsDcd`).val()
        , trDptCd: $(`#TB07140S_trDptCd`).val()
        , fincCngeAmt: $(`#TB07140S_fincCngeAmt`).val()
        , payErnAmt: $(`#TB07140S_payErnAmt`).val()
        , stlAmt: $(`#TB07140S_stlAmt`).val()
        , trdeExrt: $(`#TB07140S_trdeExrt`).val()
        , trslFincCngeAmt: $(`#TB07140S_trslFincCngeAmt`).val()
        , trslPayErnAmt: $(`#TB07140S_trslPayErnAmt`).val()
        , trslStlAmt: $(`#TB07140S_trslStlAmt`).val()
        , trtx: $(`#TB07140S_trtx`).val()
        , intx: $(`#TB07140S_intx`).val()
        , lotx: $(`#TB07140S_lotx`).val()
        , bfRsvPayDcd: $(`#TB07140S_bfRsvPayDcd`).val()
        , stlXtnlIsttCd: $(`#TB07140S_stlXtnlIsttCd`).val()
        , stlAcno: $(`#TB07140S_stlAcno`).val()
        , fincPayCntn: $(`#TB07140S_fincPayCntn`).val()
        , reFincPossYn: $(`#TB07140S_reFincPossYn`).val()
    }

    $.ajax({
        type: "POST",
        url: "/TB07140S/updateFinc",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            if (data) {
                result = data;
                Swal.fire({
                    icon: 'success',
                    title: '수정완료!'
                })
            } else {
                result = -1;
            }
        }, error: function () {
            result = -2;
        }
    });

    if (result < 0) {
        Swal.fire({
            icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
            title: '수정완료!'
        })
    }

    getFincList();

}

/*
 *  UPDATE 실행금리정보
 */
function updateIntrtData() {

    let result;

    let prdtCd = $('#TB07140S_prdtCd').val();
    let excSn = $('#TB07140S_excSn').val();
    let intrtList = $("#TB07140S_colModel").pqGrid('instance').getData();

    let insertList = [];
    let updateList = [];

    for (let i = 0; i < intrtList.length; i++) {
        const item = intrtList[i];
        if (!item.rgstSn && item.rgstSn === undefined) {
            insertList.push(item)
        } else {
            updateList.push(item)
        }
    }

    let insertParamData = {
        prdtCd: prdtCd
        , excSn: excSn
        , intrtList: insertList
    };
    let updateParamData = {
        prdtCd: prdtCd
        , excSn: excSn
        , intrtList: updateList
    };
    console.log(updateParamData);
    if (insertList.length > 0) {
        $.ajax({
            type: "POST",
            url: "/TB07140S/insertIntrtData",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(insertParamData),
            dataType: "json",
            success: function (data) {
                if (data) {
                    result = data;
                }
            }, error: function () {
                result = -1;
            }
        });
    }

    if (updateList.length > 0) {
        $.ajax({
            type: "POST",
            url: "/TB07140S/updateIntrtData",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(updateParamData),
            dataType: "json",
            success: function (data) {
                if (data) {
                    result = data;
                }
            }, error: function () {
                result = -1;
            }
        });
    }
    return result;
}

/*
 *  UPDATE TB07140S
 */
async function updateTB07140S() {
    let excResult;
    let intrtResult;
    excResult = await updateExcData();   // 데이터값이 나온 함수
    intrtResult = await updateIntrtData();
    if (!$('#TB07140S_prdtCd').val()) {
        Swal.fire({
            icon: 'warning'
            , text: "종목코드를 입력해주세요!"
            , confirmButtonText: "확인"
        });
        return;
    } else if (!$('#TB07140S_prdtNm').val()) {
        Swal.fire({
            icon: 'warning'
            , text: "상품명을 입력해주세요!"
            , confirmButtonText: "확인"
        });
        return;
    } else if (!$('#TB07140S_excSn').val()) {
        Swal.fire({
            icon: 'warning'
            , text: "실행순번을 지정해주세요!"
            , confirmButtonText: "확인"
        });
        return;
    } else if (excResult === -1 || intrtResult === -1) {
        Swal.fire({
            icon: 'error'
            , text: "저장실패!"
            , confirmButtonText: "확인"
        });
        return;
    } else {
        Swal.fire({
            icon: 'success'
            , text: "저장성공!"
            , confirmButtonText: "확인"
        });
    }
    selectTB07140S();
}

/*
 *  =====================UPDATE모음=====================
 */

/*
 *  =====================DELETE모음=====================
 */

function deleteFinc() {

    paramData = {
        prdtCd: $(`#TB07140S_prdtCd`).val()
        , trSn: $(`#TB07140S_trSn`).val()
        , excSn: $(`#TB07140S_excSn`).val()
        , trDt: $(`#TB07140S_trDt`).val()
        , etprCrdtGrntTrKindCd: $(`#TB07140S_etprCrdtGrntTrKindCd`).val()
        , nsFndCd: $(`#TB07140S_nsFndCd`).val()
        , synsCd: $(`#TB07140S_synsCd`).val()
        , holdPrpsDcd: $(`#TB07140S_holdPrpsDcd`).val()
        , fincPrcsDcd: $(`#TB07140S_fincPrcsDcd`).val()
        , trDptCd: $(`#TB07140S_trDptCd`).val()
        , fincCngeAmt: $(`#TB07140S_fincCngeAmt`).val()
        , payErnAmt: $(`#TB07140S_payErnAmt`).val()
        , stlAmt: $(`#TB07140S_stlAmt`).val()
        , trdeExrt: $(`#TB07140S_trdeExrt`).val()
        , trslFincCngeAmt: $(`#TB07140S_trslFincCngeAmt`).val()
        , trslPayErnAmt: $(`#TB07140S_trslPayErnAmt`).val()
        , trslStlAmt: $(`#TB07140S_trslStlAmt`).val()
        , trtx: $(`#TB07140S_trtx`).val()
        , intx: $(`#TB07140S_intx`).val()
        , lotx: $(`#TB07140S_lotx`).val()
        , bfRsvPayDcd: $(`#TB07140S_bfRsvPayDcd`).val()
        , stlXtnlIsttCd: $(`#TB07140S_stlXtnlIsttCd`).val()
        , stlAcno: $(`#TB07140S_stlAcno`).val()
        , fincPayCntn: $(`#TB07140S_fincPayCntn`).val()
        , reFincPossYn: $(`#TB07140S_reFincPossYn`).val()
    }

    $.ajax({
        type: "POST",
        url: "/TB07140S/deleteFinc",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            if (data) {
                result = data;
                Swal.fire({
                    icon: 'success',
                    title: '삭제완료!'
                })
            } else {
                result = -1;
            }
        }, error: function () {
            result = -2;
        }
    });

    if (result < 0) {
        Swal.fire({
            icon: result === -1 ? 'warning' : result === -2 ? 'error' : '',
            title: '삭제실패!'
        })
    }

    getFincList();

}

async function deleteIBIMS404B() {

    let prdtCd = $('#TB07140S_prdtCd').val();
    let excSn = $('#TB07140S_excSn').val();
    let rgstSn = TB07140S_rowData.rgstSn;

    paramData = {
        prdtCd
        , excSn
        , rgstSn
    }
    await $.ajax({
        type: "POST",
        url: "/TB07140S/deleteIBIMS404B",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(paramData),
        dataType: "json",
        success: function (data) {
            if (data) {
                Swal.fire({
                    icon: "success"
                    , text: "삭제성공!"
                    , confirmButtonText: "확인"
                })
            } else {
                Swal.fire({
                    icon: "warning"
                    , text: "삭제실패!"
                    , confirmButtonText: "확인"
                })
            }
        }, error: function () {
            Swal.fire({
                icon: "error"
                , text: "에러!"
                , confirmButtonText: "확인"
            })
        }
    });
    selectTB07140S();
}

/*
 *  =====================DELETE모음=====================
 */