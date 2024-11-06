const TB10210Sjs = (function () {
  let authCdTbObj;
  let authCdMenuTbObj;

  let colModel_authCdTb = [
    //체크박스
    {
      dataIndx: "authCdState",
      align: "center",
      halign: "center",
      title: "삭제",
      menuIcon: false,
      width: "3%",
      type: "checkBoxSelection",
      editor: false,
      dataType: "bool",
      editable: "true",
      cb: {
        all: false,
        header: false,
      },
    },
    {
      title: "권한코드",
      dataType: "string",
      dataIndx: "athCd",
      width: "5%",
      editable: true,
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "권한명",
      dataType: "string",
      dataIndx: "athCdNm",
      width: "14%",
      editable: true,
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "권한설명",
      dataType: "string",
      dataIndx: "athCdExpl",
      width: "25%",
      editable: true,
      align: "left",
      halign: "center",
      width: "",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "메뉴관리",
      align: "center",
      halign: "center",
      dataType: "string",
      dataIndx: "authCdBtn",
      width: "5%",
      render: function (ui) {
        return (
          "<button class='ui-button ui-corner-all ui-widget' name='detail_btn' data-row-indx='" +
          ui.rowIndx +
          "'><i class='fa fa-arrow-down'></i>&nbsp;상세</button>"
        );

        //return '<td style="text-align:center;"><button class="groupCodeDetail btn btn-warning btn-xs" name = "detail_btn" data-row-indx="' + ui.rowIndx + '"><i class="fa fa-arrow-down"></i>&nbsp;상세</button></td>'
      },
    },
    {
      title: "등록일자",
      dataType: "string",
      dataIndx: "rgstDt",
      editable: false,
      align: "center",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "등록자",
      dataType: "string",
      dataIndx: "rgstEmpNm",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      dataIndx: "aplyYn",
      align: "center",
      halign: "center",
      title: "적용여부",
      width: "5%",
      menuIcon: false,
      type: "checkBoxSelection",
      editor: false,
      dataType: "bool",
      editable: "true",
      cb: {
        all: false,
        header: false,
      },
    },
    {
      title: "처리일자",
      dataType: "string",
      dataIndx: "hndDt",
      editable: false,
      align: "center",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리시간",
      dataType: "string",
      dataIndx: "hndTm",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리자",
      dataType: "string",
      dataIndx: "hndEmpNm",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  let colModel_authCdMenuTb = [
    {
      title: "메뉴ID",
      dataType: "string",
      dataIndx: "menuId",
      editable: false,
      align: "left",
      halign: "center",
      width: "12%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "메뉴명",
      dataType: "string",
      dataIndx: "menuNm",
      editable: false,
      align: "left",
      halign: "center",
      width: "35%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "권한코드",
      dataType: "string",
      dataIndx: "rghtCd",
      editable: false,
      align: "left",
      halign: "center",
      width: "12%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "메뉴레벨",
      dataType: "string",
      dataIndx: "menuLvl",
      editable: false,
      align: "left",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      dataIndx: "modifyYn",
      align: "center",
      halign: "center",
      title: "수정가능여부",
      width: "7%",
      menuIcon: false,
      type: "checkBoxSelection",
      editor: false,
      dataType: "bool",
      editable: "true",
      cb: {
        all: false,
        header: false,
      },
    },
    {
      title: "처리일자",
      dataType: "string",
      dataIndx: "hndDt",
      editable: false,
      align: "center",
      halign: "center",
      width: "7%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리시간",
      dataType: "string",
      dataIndx: "hndTm",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
    {
      title: "처리자",
      dataType: "string",
      dataIndx: "hndEmpNm",
      editable: false,
      align: "center",
      halign: "center",
      width: "5%",
      filter: { crules: [{ condition: "range" }] },
    },
  ];

  $(function () {
    //

    setGrid_TB10210S();
    getAuthCode();

    clickDetailButton();
    doubleClickColumn();

    $(document).on("click", ".can_use_yn", function () {
      let useCheckBox = $(this);
      let modifyCheckBox = $(this)
        .parent()
        .parent()
        .find("td:eq(5)")
        .find(".can_modify_yn");
      if (!useCheckBox.prop("checked") && modifyCheckBox.prop("checked")) {
        modifyCheckBox.prop("checked", false);
      }
    });

    $(document).on("click", ".can_modify_yn", function () {
      let useChecked = $(this)
        .parent()
        .parent()
        .find("td:eq(4)")
        .find(".can_use_yn");
      let modifyChecked = $(this);
      if (!useChecked.prop("checked") && modifyChecked.prop("checked")) {
        useChecked.prop("checked", true);
      }
    });
  });

  /*******************************************************************
   *** 공통 event
   *******************************************************************/

  /**
   * 그리드 세팅
   */
  function setGrid_TB10210S() {
    //그룹코드
    let obj_authCdTb = {
      height: 220,
      maxHeight: 220,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: { show: false },
      scrollModel: { autoFit: true },
      //toolbar: cdDtlToolBar,
      colModel: colModel_authCdTb,
      strNoRows: "조회된 데이터가 없습니다.",
      //pageModel: pageMdCdDtl
    };

    $("#authCodeTable").pqGrid(obj_authCdTb);
    authCdTbObj = $("#authCodeTable").pqGrid("instance");

    //상세코드
    let obj_authCdMenuTb = {
      height: 220,
      maxHeight: 220,
      showTitle: false,
      showToolbar: false,
      collapsible: false,
      wrap: false,
      hwrap: false,
      numberCell: {
        show: true,
        width: 40,
        resizable: true,
        title: "<p class='text-center'>순번</p>",
      },
      scrollModel: { autoFit: true },
      colModel: colModel_authCdMenuTb,
      strNoRows: "조회된 데이터가 없습니다.",
      cellClick: function (event, ui) {
        if (ui.column.dataIndx === "useYn") {
          //alert("useYn");
        } else if (ui.column.dataIndx === "modifyYn") {
          //alert("modifyYn");
        }
      },
    };

    $("#authCodeMenuTable").pqGrid(obj_authCdMenuTb);
    authCdMenuTbObj = $("#authCodeMenuTable").pqGrid("instance");
  }

  /**
   * 권한명으로 검색
   */
  function searchButtonClick() {
    let searchKeyword = $("#authCodeSearchInput").val();
    getAuthCode(searchKeyword);
  }

  /**
   * 변경 가능한 컬럼 더블클릭 했을시 input박스 생성
   */
  function doubleClickColumn() {
    $(document).on("dblclick", ".update_column", function () {
      let trClass = $(this).attr("class").split(" ")[1];
      tdInputHTML =
        '<input class="' +
        trClass +
        '_input" style="width: 100%;" type="text" value="' +
        $(this).text() +
        '">';
      $(this).html(tdInputHTML);
    });
  }

  /*******************************************************************
   *** 상단 그리드 event
   *******************************************************************/
  /**
   * 권한목록 조회 ajax
   */
  function getAuthCode(rghtCdNm) {
    let _url = "/getAuthCode";
    if (!isEmpty(rghtCdNm)) {
      _url += "?rghtCdNm=" + rghtCdNm;
    }
    ajaxCall({
      method: "GET",
      url: _url,
      beforeSend: function () {
        authCdTbObj.option("dataModel.data", []);
        authCdTbObj.option("strNoRows", "조회 중입니다...");
        authCdTbObj.refreshDataAndView();
      },
      success: function (authCode) {
        //let html = '';
        let rowList = [];

        if (authCode.length > 0) {
          $.each(authCode, function (key, value) {
            let aplyYn = true;
            if (value.aplyYn === "Y") {
              aplyYn = true;
            } else {
              aplyYn = false;
            }

            let newRow = {
              authCdState: false,
              athCd: value.athCd,
              athCdNm: value.athCdNm,
              athCdExpl: value.athCdExpl,
              rgstDt: formatDate(value.rgstDt),
              rgstEmpNm: value.rgstEmpNm,
              aplyYn: aplyYn,
              hndDt: value.hndDt,
              hndTm: value.hndTm,
              hndEmpNm: value.hndEmpNm,
            };

            rowList.push(newRow);
          });
          authCdTbObj.option("dataModel.data", rowList);
          authCdTbObj.refreshDataAndView();
        } else {
          authCdTbObj.option("strNoRows", "조회된 데이터가 없습니다.");
          authCdTbObj.refreshDataAndView();
        }
      },
    });
  }

  /**
   * 행추가 버튼 클릭
   */
  function addAuthCodeRow() {
    // $('.auth_code_input').focus();

    let newRow = {
      authCdState: false,
      athCd: "",
      athCdNm: "",
      athCdExpl: "",
      rgstDt: "",
      rgstEmpNm: "",
      aplyYn: "",
      hndDt: "",
      hndTm: "",
      hndEmpNm: "",
    };

    $("#authCodeTable").pqGrid("addRow", {
      rowData: newRow,
      checkEditable: false,
    });
  }

  /**
   * 권한코드 상세버튼 클릭
   */
  function clickDetailButton() {
    $(document).on("click", "button[name='detail_btn']", function () {
      let rowIndex = $(this).data("row-indx");

      let rowData = authCdTbObj.getRowData({ rowIndx: rowIndex });

      let rghtCd = rowData.athCd;
      getAuthCodeMenu(rghtCd);
    });
  }

  /**
   * 권한코드별 상세 메뉴 호출
   * @param {권한코드} rghtCd
   */
  function getAuthCodeMenu(rghtCd) {
    ajaxCall({
      method: "get",
      url: "/getAuthCodeMenu?rghtCd=" + rghtCd,
      success: function (authCodeMenu) {
        //let html = '';
        let rowList = [];

        if (authCodeMenu.length > 0) {
          $.each(authCodeMenu, function (key, value) {
            // html += '<tr>';
            // html += '   <td>' + (key + 1) + '</td>';
            // html += '   <td>' + value.menuId + '</td>';
            // html += '   <td>' + value.menuNm + '</td>';
            // html += '   <td>'+ rghtCd +'</td>';
            // html += '   <td>' + value.menuLvl + '</td>';
            // if (isEmpty(value.mdfyRghtCcd)) {
            //     html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox" onclick="checkboxUseYn(this);"><input type="hidden" class="use_hidden_yn" value="N"></td>';
            //     html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox" onclick="checkboxModifyYn(this);"><input type="hidden" class="modify_hidden_yn" value="N"></td>';
            // } else if(value.mdfyRghtCcd === '1') {
            //     html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox" checked onclick="checkboxUseYn(this);"><input type="hidden" class="use_hidden_yn" value="Y"></td>';
            //     html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox" onclick="checkboxModifyYn(this);"><input type="hidden" class="modify_hidden_yn" value="N"></td>';
            // } else {
            //     html += '   <td><input style="width:100%;" class="can_use_yn" type="checkbox" checked onclick="checkboxUseYn(this);"><input type="hidden" class="use_hidden_yn" value="Y"></td>';
            //     html += '   <td><input style="width:100%;" class="can_modify_yn" type="checkbox" checked onclick="checkboxModifyYn(this);"><input type="hidden" class="modify_hidden_yn" value="Y"></td>';
            // }
            // if (isEmpty(value.hndDetlDtm)) {
            // 	html += '   <td style="text-align:center;"></td>';
            // 	html += '   <td style="text-align:center;"></td>';
            // } else {
            // 	html += '   <td style="text-align:center;">' + value.hndDetlDtm.substring(0, 10) + '</td>';
            // 	html += '   <td style="text-align:center;">' + value.hndDetlDtm.substring(10, value.hndDetlDtm.length) + '</td>';
            // }
            // html += '   <td style="text-align:center;">' + value.hndEmpNm + '</td>';
            // html += '</tr>';

            let modifyYn = false;

            if (value.mdfyRghtCcd === "1") {
              modifyYn = false;
            } else if (value.mdfyRghtCcd === "2"){
              modifyYn = true;
            }

            let hndDt = "";
            let hndTm = "";
            if (isEmpty(value.hndDetlDtm)) {
              hndDt = "";
              hndTm = "";
            } else {
              hndDt = value.hndDetlDtm.substring(0, 10);
              hndTm = value.hndDetlDtm.substring(10, value.hndDetlDtm.length);
            }

            let newRow = {
              menuId: value.menuId,
              menuNm: value.menuNm,
              rghtCd: rghtCd,
              menuLvl: value.menuLvl,
              modifyYn: modifyYn,
              hndDt: hndDt,
              hndTm: hndTm,
              hndEmpNm: value.hndEmpNm,
            };

            rowList.push(newRow);
          });
          authCdMenuTbObj.option("dataModel.data", rowList);
          authCdMenuTbObj.refreshDataAndView();
        } else {
          authCdMenuTbObj.option("strNoRows", "조회된 데이터가 없습니다.");
          authCdMenuTbObj.refreshDataAndView();
        }
      },
    });
  }

  /**
   * 행삭제 버튼 클릭
   */
  function clickDeleteButton() {
    let tr = $("#authCodeTable").children();
    let authCodeList = [];
    for (let i = 0; i < tr.length; i++) {
      let deleteCheckBox = $(tr[i]).find("td:eq(0)").find("input");
      console.log(deleteCheckBox);
      if (deleteCheckBox.is(":checked")) {
        authCodeList.push(deleteCheckBox.attr("id"));
      }
    }
    deleteRow(authCodeList);
  }

  /**
   * 행삭제 ajax
   * @param {권한코드 리스트} authCodeList
   */
  function deleteRow(authCodeList) {
    $.ajax({
      method: "patch",
      url: "/deleteAuthCode",
      data: authCodeList,
      success: function () {
        getAuthCode();
        Swal.fire({
          icon: "success",
          title: "권한삭제가 완료되었습니다",
          text: "",
          confirmButtonText: "확인",
        });
      },
    });
  }

  /**
   * 권한코드 저장버튼 클릭 event
   */
  function clickAuthSaveButton() {
    let authCodeList = [];
    let tr = $("#authCodeTable").children();

    for (let i = 0; i < tr.length; i++) {
      let authCode = {};
      let authCodeInput = $(tr[i]).find("td:eq(1)").find("input");
      let authCodeNameInput = $(tr[i]).find("td:eq(2)").find("input");
      let authExplainInput = $(tr[i]).find("td:eq(3)").find("input");
      let authCodeUseYn = $(tr[i])
        .find("td:eq(7)")
        .find(".auth_code_use_yn")
        .prop("checked");
      let authCodeUseYnCheck = $(tr[i])
        .find("td:eq(7)")
        .find(".hidden_yn")
        .val();

      if (authCodeInput.length === 1) {
        if (!authCodeInput.val()) {
          openPopup({
            title: "실패",
            text: "권한코드를 입력해주세요.",
            type: "error",
            callback: function () {
              $(document).on("click", ".confirm", function () {
                authCodeInput.focus();
              });
            },
          });
          return;
        } else if (authCodeInput.val().length > 4) {
          openPopup({
            title: "실패",
            text: "권한코드는 4자리 이하로 입력해주세요.",
            type: "error",
            callback: function () {
              $(document).on("click", ".confirm", function () {
                authCodeInput.focus();
              });
            },
          });
          return;
        }
        authCode.athCd = authCodeInput.val();
      }

      if (authCodeNameInput.length === 1) {
        if (!authCodeNameInput.val()) {
          openPopup({
            title: "실패",
            text: "권한명를 입력해주세요.",
            type: "error",
            callback: function () {
              $(document).on("click", ".confirm", function () {
                authCodeNameInput.focus();
              });
            },
          });
          return;
        }
        authCode.athCdNm = authCodeNameInput.val();
      }

      if (authExplainInput.length === 1) {
        if (!authExplainInput.val()) {
          openPopup({
            title: "실패",
            text: "권한설명을 입력해주세요.",
            type: "error",
            callback: function () {
              $(document).on("click", ".confirm", function () {
                authCodeNameInput.focus();
              });
            },
          });
          return;
        }
        authCode.athCdExpl = authExplainInput.val();
      }

      if (
        !authCodeUseYnCheck ||
        (!authCodeUseYn && authCodeUseYnCheck === "Y") ||
        (authCodeUseYn && authCodeUseYnCheck === "N")
      ) {
        authCode.aplyYn = authCodeUseYn ? "Y" : "N";
      }

      if (!(Object.keys(authCode).length === 0)) {
        authCode.oldAthCd = $(tr[i]).find("td:eq(0)").find("input").attr("id");
        authCodeList.push(authCode);
      }
    }

    if (authCodeList.length > 0) {
      saveAuthCode(authCodeList);
    }
  }

  /**
   * 권한코드 저장 ajax
   * @param {권한코드 리스트} authCodeList
   */
  function saveAuthCode(authCodeList) {
    ajaxCall({
      url: "/registerAuthCode",
      method: "POST",
      data: authCodeList,
      success: function (data, status, settings) {
        getAuthCode();
        Swal.fire({
          icon: "success",
          title: "권한저장이 완료되었습니다",
          text: "",
          confirmButtonText: "확인",
        });
      },
      fail: function (response) {
        let message = response.responseJSON.message;
        openPopup({
          title: "실패",
          type: "error",
          text: message,
        });
      },
    });
  }

  /*******************************************************************
   *** 하단 그리드 event
   *******************************************************************/
  /**
   * 메뉴 저장버튼 클릭
   */
  function clickSaveMenuButton() {
    let authCodeMenuList = [];
    let tr = $("#authCodeMenuTable").children();
    let authCode = $(tr[0]).find("td:eq(3)").text();

    for (let i = 0; i < tr.length; i++) {
      let authCodeMenu = {};

      let menuUseYn = $(tr[i])
        .find("td:eq(5)")
        .find(".can_use_yn")
        .prop("checked");
      let menuUseYnCheck = $(tr[i])
        .find("td:eq(5)")
        .find(".use_hidden_yn")
        .val();
      let menuModifyYn = $(tr[i])
        .find("td:eq(6)")
        .find(".can_modify_yn")
        .prop("checked");
      let menuModifyYnCheck = $(tr[i])
        .find("td:eq(6)")
        .find(".modify_hidden_yn")
        .val();

      if (
        !menuUseYnCheck ||
        (menuUseYn && menuUseYnCheck === "N") ||
        (!menuUseYn && menuUseYnCheck === "Y")
      ) {
        authCodeMenu.chkUseYn = menuUseYn;
      }

      if (
        !menuModifyYnCheck ||
        (menuModifyYn && menuModifyYnCheck === "N") ||
        (!menuModifyYn && menuModifyYnCheck === "Y")
      ) {
        authCodeMenu.chkUseYn = menuUseYn;
        authCodeMenu.chkModifyYn = menuModifyYn;
      }

      if (!(Object.keys(authCodeMenu).length === 0)) {
        authCodeMenu.menuId = $(tr[i]).find("td:eq(1)").text();
        authCodeMenu.athCd = authCode;
        authCodeMenuList.push(authCodeMenu);
      }
    }

    if (authCodeMenuList.length > 0) {
      saveMenu(authCodeMenuList, authCode);
    }
  }

  /**
   * 메뉴 저장 ajax
   */
  function saveMenu(authCodeMenuList, authCode) {
    ajaxCall({
      method: "Post",
      url: "/registerAuthCodeMenu",
      data: authCodeMenuList,
      success: function () {
        getAuthCodeMenu(authCode);
        Swal.fire({
          icon: "success",
          title: "저장이 완료되었습니다",
          text: "",
          confirmButtonText: "확인",
        });
      },
      fail: function (response) {
        let message = response.responseJSON.message;
        openPopup({
          title: "실패",
          type: "error",
          text: message,
        });
      },
    });
  }

  /**
   * 사용여부와 수정가능여부 클릭 모션
   * @param {this} 체크박스 클릭 이벤트 발생한 <input>
   */
  function checkboxModifyYn(e) {
    // 수정가능여부
    let modifyYn = $(e);
    let thisTr = modifyYn.parent().parent();
    let checkedUseYn = thisTr.find("td:eq(5)").children();
    if (modifyYn.is(":checked")) {
      // 수정가능 여부를 체크(사용)할 때,
      checkedUseYn.prop("checked", true); // 사용 여부도 체크를 한다.
    }
  }
  function checkboxUseYn(e) {
    // 사용여부
    let useYn = $(e);
    let thisTr = useYn.parent().parent();
    let checkedModifyYn = thisTr.find("td:eq(6)").children();
    if (!useYn.is(":checked")) {
      // 사용 여부를 취소할 때,
      if (checkedModifyYn.is(":checked")) {
        // 수정가능 여부가 체크 되어 있으면,
        checkedModifyYn.prop("checked", false); // 수정가능 여부를 취소한다.
      }
    }
  }
  return {
    searchButtonClick: searchButtonClick,
    addAuthCodeRow: addAuthCodeRow,
    clickDeleteButton: clickDeleteButton,
    clickAuthSaveButton: clickAuthSaveButton,
    clickSaveMenuButton: clickSaveMenuButton,
  };
})();
