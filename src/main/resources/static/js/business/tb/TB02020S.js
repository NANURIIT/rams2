const TB03030Sjs = (function () {
  let arrPqGridDealInfo;
  let arrPqGridMapInfo;
  let arrPqGridMapRecInfo;

  $(document).ready(function () {
    renderGrid(); // 그리드 렌더링
  });

  // 그리드 렌더링함수
  function renderGrid() {
    let arrPqGridObj = [
      {
        height: 145,
        maxHeight: 145,
        id: "gridDealInfo",
        colModel: colDealInfo,
      },
      ,
      {
        height: 145,
        maxHeight: 145,
        id: "gridMapInfo",
        colModel: colMapInfo,
      },
      {
        height: 145,
        maxHeight: 145,
        id: "gridMapRecInfo",
        colModel: colMapRecInfo,
      },
    ];
    setPqGrid(arrPqGridObj);

    arrPqGridDealInfo = $("#gridDealInfo").pqGrid("instance");
    arrPqGridMapInfo = $("#gridMapInfo").pqGrid("instance");
    arrPqGridMapRecInfo = $("#gridMapRecInfo").pqGrid("instance");
  }
  /* ***********************************그리드 컬럼******************************** */

  /* 딜기본정보 그리드 */
  let colDealInfo = [
    {
      title: "순번",
      dataType: "string",
      dataIndx: "entpHnglNm",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        return ui.rowIndx + 1;
      },
    },
    {
      title: "결재단계",
      dataType: "string",
      dataIndx: "wfStepNm",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록건수",
      dataType: "string",
      dataIndx: "rgstCount",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "수정건수",
      dataType: "string",
      dataIndx: "mdfyCount",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "삭제건수",
      dataType: "string",
      dataIndx: "delCount",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  /* 맵관리 그리드 */
  let colMapInfo = [
    {
      title: "결재일자",
      dataType: "date",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData && cellData.length === 8) {
          let year = cellData.substring(0, 4);
          let month = cellData.substring(4, 6);
          let day = cellData.substring(6, 8);
          return `${year}-${month}-${day}`.trim();
        }
        return cellData;
      },
    },
    {
      title: "부서",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "업무구분",
      dataType: "string",
      dataIndx: "",
      align: "left",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재구분",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "내용",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "이전결재자",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  /* 결재이력 그리드 */
  let colMapRecInfo = [
    {
      title: "결재일자",
      dataType: "date",
      dataIndx: "",
      align: "center",
      hidden: true,
      filter: { crules: [{ condition: "range" }] },
      render: function (ui) {
        let cellData = ui.cellData;
        if (cellData && cellData.length === 8) {
          let year = cellData.substring(0, 4);
          let month = cellData.substring(4, 6);
          let day = cellData.substring(6, 8);
          return `${year}-${month}-${day}`.trim();
        }
        return cellData;
      },
    },
    {
      title: "결재단계",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재구분",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "결재자",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "반송사유",
      dataType: "string",
      dataIndx: "",
      align: "center",
      filter: { crules: [{ condition: "range" }] },
    },
  ];
})();
