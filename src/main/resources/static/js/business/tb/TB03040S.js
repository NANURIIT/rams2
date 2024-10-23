let pqGridObjEnopList;
$(document).ready(function () {
  $(".table").footable();

  // 1개월전 ~ 오늘일자 디폴트 세팅
  $("#TB03040S_fromDate").val(addMonth(getToday(), -1));
  $("#TB03040S_toDate").val(getToday());
  let arrPqGridObj = [
    {
      height: 500,
      maxHeight: 500,
      id: "gridDealList",
      colModel: colDealList,
    },
  ];
  setPqGrid(arrPqGridObj);
  pqGridObjEnopList = $("#gridDealList").pqGrid("instance");
});

// 유효성 검사용 날짜패턴
var pattern = /(^\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

function ibSpecSearch() {
  let TB03040S_fromDate = $("#TB03040S_fromDate").val(); // 조회시작일자
  let TB03040S_toDate = $("#TB03040S_toDate").val(); // 조회종료일자
  let msgError = "";

  if (isEmpty(TB03040S_fromDate)) {
    msgError = "필수 입력값(조회시작일자)을 입력해주세요.";
    alertPopup();
  } else if (!pattern.test(TB03040S_fromDate)) {
    msgError = "필수 입력값(조회시작일자)을 확인해주세요.";
    alertPopup();
  } else if (isEmpty(TB03040S_toDate)) {
    msgError = "필수 입력값(조회종료일자)을 입력해주세요.";
    alertPopup();
  } else if (!pattern.test(TB03040S_toDate)) {
    msgError = "필수 입력값(조회종료일자)을 확인해주세요.";
    alertPopup();
  } else if (TB03040S_fromDate > TB03040S_toDate) {
    msgError = "조회시작일자가 조회종료일자보다 큽니다.";
    alertPopup();
  } else {
    businessFunction();
  }

  function alertPopup() {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: msgError,
      confirmButtonText: "확인",
    });
  }

  function businessFunction() {
    var inParam = {
      dealNm: $("#TB03040S_ibDealNm").val(),
      dealNo: $("#TB03040S_ibDealNo").val(),
      //	"inqDvsn": $('#TB03040S_inqDvsn').val(),
      start: $("#TB03040S_fromDate").val().replaceAll("-", ""),
      end: $("#TB03040S_toDate").val().replaceAll("-", ""),
    };

    $.ajax({
      type: "GET",
      url: "/TB03040S/ibSpecSearch",
      data: inParam,
      dataType: "json",
      success: function (data) {
        pqGridObjEnopList.setData(data);
        pqGridObjEnopList.option("rowDblClick", function (event, ui) {
          movePage(ui.rowData);
        });
      },
    });
  }
}

/* 더블클릭 했을시 이동*/
function movePage(e) {
  console.log(e);
  var inspctPrgrsStCd = e.mtrPrgSttsDcd;

  sessionStorage.setItem("dealNo", e.dealNo);
  sessionStorage.setItem("dealNm", e.dealNm);

  if (inspctPrgrsStCd < 301) {
    callPageTest("TB04010S", "심사신청관리");
  } else {
    callPageTest('TB05040S', '협의체 현황 및 결과조회');
  }
}

/* ***********************************그리드 컬럼******************************** */
let colDealList = [
  {
    title: "Deal번호",
    dataType: "string",
    dataIndx: "dealNo",
    align: "center",
  },
  {
    title: "Deal명",
    dataType: "string",
    dataIndx: "dealNm",
    halign: "center",
    align: "left",
  },
  {
    title: "Deal 생성일자",
    dataType: "string",
    dataIndx: "rgstDt",
    align: "center",
    render: function (ui) {
      let cellData = ui.cellData;
      if (cellData && cellData.length !== 0) {
        let rgstDt1 = cellData.substring(0, 4);
        let rgstDt2 = cellData.substring(4, 6);
        let rgstDt3 = cellData.substring(6, 8);
        return `${rgstDt1}-${rgstDt2}-${rgstDt3}`.trim();
      }
      return cellData;
    },
  },
  {
    title: "부서코드",
    dataType: "string",
    dataIndx: "mngmBdcd",
    halign: "center",
    align: "center",
    hidden: true,
  },
  {
    title: "부서명",
    dataType: "string",
    dataIndx: "mngmBdcdNm",
    halign: "center",
    align: "center",
  },
  {
    title: "담당자사번",
    dataType: "string",
    dataIndx: "chrrEmpno",
    halign: "center",
    align: "center",
    hidden: true,
  },
  {
    title: "담당자명",
    dataType: "string",
    dataIndx: "chrrEmpnm",
    halign: "center",
    align: "center",
  },
  {
    title: "진행상태구분코드",
    dataType: "string",
    dataIndx: "mtrPrgSttsDcd",
    align: "center",
    hidden: true,
  },
  {
    title: "진행상태",
    dataType: "string",
    dataIndx: "mtrPrgSttsDcdNm",
    align: "center",
  },
];
