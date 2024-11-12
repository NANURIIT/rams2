const TB02030Sjs = (function(){
    let modifiedRows = [];  // 수정된 행
    // 이전에 클릭한 행의 ID를 저장할 변수
    var lastClickedRowId = null;
    var lastWfMapId;

    $(document).ready(function() {
        getAthCodeInfo(); // 권한 코드 정보를 가져옴.

        
    });

    /**
   * 권한ID select박스 호출 함수
   */
    var getAthCodeInfo = function () {
        $.ajax({
            url: "/menuByAuth",
            method: "GET",
            dataType: "json",
            success: function(data) {
                let dropdownData = data.map(item => ({
                    label: item.athCd + " " + item.athCdNm,   // 권한코드 권한코드명
                    value: item.athCd,  // 권한코드
                }));

                // 바로 colWfStepList에서 select 박스에 옵션을 설정
                colWfStepList.forEach(col => {
                    if (col.dataIndx === "wfAuthId") {
                        col.editor.options = dropdownData;
                    }
                });

                // 그리드를 설정한 후 refresh
                setGrid_TB20230S(dropdownData);
            },
            error: function(error) {
                console.error("Error fetching dropdown data:", error);
            }
        });
    };


    //Wf 맵 관리
    let colWfMapList = [
		//체크박스
        {
            dataIndx: "rowCheck",
            align: "center",
            halign: "center",
            title: "",
            menuIcon: false,
            type: "checkbox",
            editor: true,  
            dataType: "bool",
            editable: true,
            width    : "1%",
            resizable: false,
            cb: {
                all: false,
                header: false,
            },
        },
        { 	
			title    : "워크플로우 맵ID", 
			dataType : "string", 
			dataIndx : "wfMapId", 
			align    : "center",
			width    : "15%",
            // editable: true,
		},
		{ 	
			title    : "맵 명", 
			dataType : "string", 
			dataIndx : "wfMapNm", 
			align    : "left",
			halign   : "center",
			width    : "15%",
            // editable: true,
		},
		{ 	
			title    : "업무테이블", 
			dataType : "string", 
			dataIndx : "jobTable", 
			halign   : "center",
			align    : "center",
			width    : "15%",
            // editable: true,
		},
		{ 	
			title    : "업무테이블KEY컬럼명", 
			dataType : "string", 
			dataIndx : "jobTableKey", 
			halign   : "center",
			align    : "left",
            width    : "23%",
            // editable: true,
		},
		{ 	
			title    : "등록자", 
			dataType : "string",
			dataIndx : "regUserId",
			align    : "center",
            width    : "15%",
            // editable: true,
		},
		{ 	
			title    : "등록일시", 
			dataType : "string",
			dataIndx : "regDttm",
			align    : "center", 
			width    : "15%",
            editable: false // 이 열은 편집 불가능
		},
        { 	
			title    : "상태", 
			dataType : "string",
			dataIndx : "state",
			align    : "center", 
			width    : "5%",
            hidden: true
		},
		{ 	
			title    : "원래 맵ID", 
			dataType : "string",
			dataIndx : "originalWfMapId",
			align    : "center", 
			width    : "5%",
            hidden: true
		},
	];
    
    // Wf 스텝 관리
    let colWfStepList = [
		//체크박스
        {
            dataIndx: "rowCheck",
            align: "center",
            halign: "center",
            title: "",
            menuIcon: false,
            type: "checkBoxSelection",
            editor: false,
            dataType: "bool",
            editable: true,
            resizable: false,
            cb: {
                all: false,
                header: false,
            },
        },
        { 	
			title    : "wfMapId", 
			dataType : "string", 
			dataIndx : "wfMapId", 
			align    : "center",
            //hidden   : true
		},
		{ 	
			title    : "스텝 ID", 
			dataType : "string", 
			dataIndx : "stepId", 
			align    : "center",
			halign   : "center",
			width    : "14%",
		},
		{ 	
			title    : "스텝명", 
			dataType : "string", 
			dataIndx : "stepNm", 
			halign   : "center",
			align    : "center",
			width    : "14%",
		},
		{ 	
			title    : "다음스텝", 
			dataType : "string", 
			dataIndx : "nextStepId", 
			halign   : "center",
			align    : "center",
            width    : "14%",
		},
		{ 	
			title    : "반송스텝", 
			dataType : "string",
			dataIndx : "rtnStepId",
			align    : "center",
            width    : "14%",
		},
		{ 	
			title    : "권한ID", 
			dataType : "string",
			dataIndx : "wfAuthId",
			align    : "center", 
			width    : "14%",
            formatter: 'listItemText', // 선택된 항목의 label을 표시
            editor: {
                type: "select",
                options: [],
                valueIndx: "value",
                labelIndx: "label",
            },
                    
		},
        { 	
			title    : "등록자", 
			dataType : "string",
			dataIndx : "",
			align    : "center", 
			width    : "14%",
		},
        { 	
			title    : "등록일시", 
			dataType : "string",
			dataIndx : "",
			align    : "center", 
			width    : "14%",
            editable: false // 이 열은 편집 불가능
		},
        { 	
			title    : "상태", 
			dataType : "string",
			dataIndx : "state",
			align    : "center", 
			width    : "5%",
            //idden: true
		},
		
	];
    
    function setGrid_TB20230S(dropdownData) {
        // WF 맵관리
        let obj_WfMap = {
            height        : 220,
            maxHeight     : 220,
            width         : "100%",  
            id            : 'gridWfMapList',
            colModel      : colWfMapList,  // colWfMapList가 정의되어 있어야 함
            showTitle     : false,
            showToolbar   : false,
            collapsible   : false,
            wrap          : false,
            hwrap         : false,
            numberCell    : { show: false },
            editable: false,  // 초기 상태는 false로 설정
            cellClick: function (event, ui) {
                // 체크박스가 클릭된 경우
                if (ui.dataIndx === "rowCheck") {
                    
                    // setTimeout을 사용해 일정 시간 후 체크박스 상태를 확인
                    setTimeout(function() {
                        var isChecked = ui.rowData.rowCheck;  // 체크박스 상태 (true/false)
                        console.log("setTimeout 후 체크박스 상태:", isChecked);
        
                        // 체크박스 상태에 따라 편집 가능 여부 설정
                        if (isChecked === true) {
                            // 체크박스가 체크된 경우 편집 가능
                            $("#gridWfMapList").pqGrid("option", "editable", true); 
                        } else {
                            // 체크박스가 해제된 경우 편집 불가
                            $("#gridWfMapList").pqGrid("option", "editable", false);
                        }
                    }, 50);  // 50ms 후에 상태 점검
                }
            },
            // 더블 클릭 이벤트 추가
            rowDblClick: function (evt, ui) {
                if (ui.rowData) {
                    var wfMapId = ui.rowData["wfMapId"];
                    getWfStepList(wfMapId);
                    lastWfMapId = wfMapId;
                }
            },
            scrollModel : { autoFit : false },
            strNoRows: '조회된 데이터가 없습니다.',

        }
        
        // 그리드가 이미 초기화 되어 있는지 확인하고 초기화 또는 갱신
        if ($("#gridWfMapList").pqGrid("instance") === undefined) {
            // 그리드가 초기화되지 않았다면, 그리드 초기화
            $("#gridWfMapList").pqGrid(obj_WfMap);
        } else {
            // 그리드가 이미 초기화 되어 있으면 데이터 갱신
            $("#gridWfMapList").pqGrid("refreshDataAndView");
        }
        
        wfMapObj = $("#gridWfMapList").pqGrid('instance');  // 변수 이름 wfMapObj로 정의
    
    
        // WF 스텝관리
        let obj_WfStep = {
            height    : 220,
            maxHeight : 220,
            id        : 'gridWfStepList',
            colModel  : colWfStepList,  // colWfStepList가 정의되어 있어야 함
            showTitle: false,
            showToolbar: false,
            collapsible: false,
            wrap: false,
            hwrap: false,
            numberCell: { show: false },
            editable: false,
            cellClick: function (event, ui) {
                // 체크박스가 클릭된 경우
                if (ui.dataIndx === "rowCheck") {
                    
                    // setTimeout을 사용해 일정 시간 후 체크박스 상태를 확인
                    setTimeout(function() {
                        var isChecked = ui.rowData.rowCheck;  // 체크박스 상태 (true/false)
                        console.log("WfStep_setTimeout 후 체크박스 상태:", isChecked);
        
                        // 체크박스 상태에 따라 편집 가능 여부 설정
                        if (isChecked === true) {
                            // 체크박스가 체크된 경우 편집 가능
                            $("#gridWfStepList").pqGrid("option", "editable", true); 
                        } else {
                            // 체크박스가 해제된 경우 편집 불가
                            $("#gridWfStepList").pqGrid("option", "editable", false);
                        }
                    }, 50);  // 50ms 후에 상태 점검
                }
            },
            scrollModel : { autoFit : false },
            strNoRows: '조회된 데이터가 없습니다.',
        }
    
        $("#gridWfStepList").pqGrid(obj_WfStep);
        wfStepObj = $("#gridWfStepList").pqGrid('instance');  // 변수 이름 wfStepObj로 정의
    

    }

    /**
     * 맵 명으로 검색
     */
    function searchButtonClick(){
        let wfMapNm = $("#wfMapNmSearchInput").val();
        getWfMapList(wfMapNm);
    }

    /**
    * WF 맵관리 조회 ajax
    */
    function getWfMapList(wfMapNm){
        //url 추가 필요
        let _url = "/TB02030S/getWfMapInfo";

        if(wfMapNm){
            _url += "?wfMapNm=" + wfMapNm;
        }
        ajaxCall({
            method: "GET",
            url: _url,
            beforeSend: function () {
                // 데이터 초기화만 수행하고 편집 모드 관련 설정은 변경하지 않음
                wfMapObj.option("dataModel.data", []);
                wfMapObj.option("strNoRows", "조회 중입니다...");
                wfMapObj.refreshDataAndView();
            },
            success: function (data) {
                var rowList = [];
                console.log("data.length : ", data.length)
                if(data.length > 0 ){
                    $.each(data, function(key, value){

                        var newRow =  {
                            rowCheck : false,  
                            wfMapId : value.wfMapId,
                            wfMapNm : value.wfMapNm,
                            jobTable : value.jobTable,
                            jobTableKey : value.jobTableKey,
                            regUserId : value.regUserId,
                            regDttm : formatDate(value.regDttm),
                            chgDttm : false,
                            chgUserId : false,
                            state : "R",
                            originalWfMapId: value.wfMapId, // 원래 wfMapId 값을 originalWfMapId에 저장
                        };
    
                        rowList.push(newRow);
                    });

                    wfMapObj.option("dataModel.data", rowList);
                    wfMapObj.refreshDataAndView();
                    wfStepObj.refreshDataAndView();

                }else{
                    wfMapObj.option("strNoRows", "조회된 데이터가 없습니다.");
                    wfMapObj.refreshDataAndView();
                    wfStepObj.refreshDataAndView();
                }
            }
        });
    }

    /**
    * WF 스텝 관리 조회 ajax
    * @param {워크플로우 맵ID} wfMapId 
    */
    function getWfStepList(wfMapId){
        // 이미 같은 행이 클릭된 경우에는 호출하지 않도록 체크
        if (String(lastClickedRowId) === String(wfMapId)) {
            console.log("같은 행이 이미 선택되었습니다. 서비스 호출을 생략합니다.");
            console.log("lastClickedRowId : ", lastClickedRowId)
            return;  // 서비스 호출을 중지
        }

        // 이전에 클릭한 행의 ID 업데이트
        lastClickedRowId = wfMapId;

        //url 추가 필요
        let _url = "/TB02030S/getWfStepInfo";

        if(wfMapId){
            _url += "?wfMapId=" + wfMapId;
        }
        ajaxCall({
            method: "GET",
            url: _url,
            beforeSend: function () {
                wfStepObj.option("dataModel.data", []);
                wfStepObj.option("strNoRows", "조회 중입니다...");
                wfStepObj.refreshDataAndView();
            },
            success: function (data) {
                var rowList = [];
                console.log("getWfStepList_wfMapId : ", wfMapId)
                if(data.length > 0 ){
                    $.each(data, function(key, value){

                        var newRow =  {
                            rowCheck : false,  
                            wfMapId: wfMapId,
                            stepId : value.stepId,
                            stepNm : value.stepNm,
                            nextStepId : value.nextStepId,
                            rtnStepId : value.rtnStepId,
                            wfAuthId : value.wfAuthId,
                            chgDttm : false,
                            chgUserId : false,
                            state : "R",
                            //originalWfMapId: value.wfMapId, // 원래 wfMapId 값을 originalWfMapId에 저장
                        };
    
                        rowList.push(newRow);
                    });

                    wfStepObj.option("dataModel.data", rowList);
                    wfStepObj.refreshDataAndView();
                }else{
                    wfStepObj.option("strNoRows", "조회된 데이터가 없습니다.");
                    wfStepObj.refreshDataAndView();
                }
            }
        });
    }

    

    /**
     * Wf 맵관리
     * 행추가 버튼 클릭
     */
    function addWfMapRow(){

        var newRow = {
          rowCheck : true,  
          wfMapId : "",
          wfMapNm : "",
          jobTable : "",
          jobTableKey : "",
          regUserId : "",
          regDttm : "",
          chgDttm : "",
          chgUserId : "",
          state : false,
          originalWfMapId : false,
        }

        $("#gridWfMapList").pqGrid("addRow", {
            rowData: newRow,
            checkEditable: true,
        });

        // 체크박스가 기본적으로 선택된 상태이므로, 편집 가능한 상태로 설정 
        $("#gridWfMapList").pqGrid("option", "editable", true);
        
    }

    /*
     * Wf 맵관리 
     * 행삭제 버튼 클릭
     */
    function deleteWfMapRow() {
        let gridData = $("#gridWfMapList").pqGrid("option", "dataModel.data");
    
        // 선택된 행을 저장할 배열
        let rowsToDelete = [];       // 삭제할 행 중 데이터가 있는 행을 저장할 배열
        let rowsToDeleteEmpty = [];  // 삭제할 행 중 빈 행(데이터가 없는 행)의 인덱스를 저장할 배열
    
        // 체크된 행이 있는지 확인
        let hasCheckedRow = gridData.some(row => row.rowCheck);
    
        // 체크된 행이 없는 경우 알림창을 띄우고 함수 종료
        if (!hasCheckedRow) {
            Swal.fire({
                icon: 'info',
                title: '삭제를 실행하려면 먼저 체크박스를 선택하세요',
            });
            return;
        }
    
        // 모든 행을 순회하여 rowCheck가 true인 행만 선택
        gridData.forEach(function(row, index) {
            if (row.rowCheck) { // 체크박스가 선택된 경우만 처리
                // 체크박스를 제외한 데이터만 확인 (rowCheck는 데이터 판단에서 제외)
                if (isRowEmpty(row)) {
                    // 빈 행이면 바로 삭제
                    rowsToDeleteEmpty.push(index); // 빈 행의 인덱스만 저장
                } else {
                    // 데이터가 있는 행인 경우 삭제 서비스에 필요한 데이터 저장
                    //rowsToDelete.push({
                    //    wfMapId: row["wfMapId"],
                        //rowIndx: index
                    //});
                    rowsToDelete.push(row["wfMapId"]);  // wfMapId만 배열에 추가
                }
            }
        });
    
    
        // 빈 행을 먼저 삭제
        rowsToDeleteEmpty.forEach(function(index) {
            $("#gridWfMapList").pqGrid("deleteRow", { rowIndx: index });
        });
    
        // 만약 데이터가 있는 행이 하나라도 있다면 삭제 여부 확인
        if (rowsToDelete.length > 0) {
            Swal.fire({
                title: '정말 삭제하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                reverseButtons: true // 버튼 순서 변경
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("rowsToDelete : ", rowsToDelete);
                    
                    deleteWfMap(rowsToDelete);
    
                    // 삭제된 후 그리드 다시 그리기
                    //$("#gridWfMapList").pqGrid("refreshDataAndView");
                }
            });
        } 
    }
    

    /**
     * 행삭제 ajax
     * @param {WF 맵관리 리스트} wfMapList
    */
    function deleteWfMap(wfMapList){
        ajaxCall({
            url: "/TB02030S/deleteWfMapInfo",
            method: "DELETE",
            data: wfMapList,  
            success: function (data, status, settings) {
              Swal.fire({
                icon: "success",
                title: "삭제가 완료되었습니다",
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
     * Wf 맵관리
     * 저장 버튼 클릭
     */
    function clickSaveWfMapButton() {

        // 현재 그리드의 모든 행 데이터를 가져오기
        const allData = $("#gridWfMapList").pqGrid("option", "dataModel").data;
        const saveWfMapRows = [];
        const updateWfMapRows = [];
        const checkRows = [];

        // 필수값 누락 시 알림창 표시
        const showAlertForMissingId = (row) => {
            Swal.fire({
                title: "실패",
                text: "워크플로우 맵ID를 입력해주세요.",
                icon: "error",
                confirmButtonText: "확인",
            }).then(() => {
                $("#gridWfMapList").pqGrid("setSelection", { rowIndx: row.pq_ri, dataIndx: "wfMapId" });
            });
        };

        // 데이터 저장 또는 수정 목록에 행 추가
        const addRowToSaveOrUpdate = (row) => {
            const rowData = {
                wfMapId: row["wfMapId"],
                wfMapNm: row["wfMapNm"],
                jobTable: row["jobTable"],
                jobTableKey: row["jobTableKey"],
                regUserId: row["regUserId"],
                regDttm: row["regDttm"],
                originalWfMapId: row["originalWfMapId"], // 원래 wfMapId 값을 추가(수정시 사용)
            };

            if (row.state === "R") {
                updateWfMapRows.push(rowData);
            } else {
                saveWfMapRows.push(rowData);
            }
        };

        // 체크된 행을 필터링하고 유효성을 검사
        const filterCheckedRows = () => {
            for (const row of allData) {
                if (row.rowCheck) {
                    checkRows.push(row);
                    
                    if (!row["wfMapId"]) {
                        showAlertForMissingId(row);
                        return false; // 필수값 누락 시 저장 중단
                    }
                    
                    addRowToSaveOrUpdate(row);
                }
            }
            return true; // 모든 체크된 행이 유효함
        };

        // 데이터 저장 및 수정 처리
        const processSaveAndUpdate = () => {
            if (saveWfMapRows.length > 0) {
                console.log("체크된 행 데이터_저장:", saveWfMapRows);
                saveWfMapData(saveWfMapRows); // 저장 함수 호출
            }

            if (updateWfMapRows.length > 0) {
                console.log("체크된 행 데이터_수정:", updateWfMapRows);
                updateWfMapData(updateWfMapRows); // 수정 함수 호출
            }
        };

        // 메인 로직
        if (filterCheckedRows()) {
            if (checkRows.length > 0) {
                processSaveAndUpdate();
            } else {
                Swal.fire({
                    icon: 'info',
                    title: '저장하려면 체크박스를 먼저 선택하세요',
                });
            }
        }
        
    }
    

    /**
     * WF맵 수정 ajax
     * @param {WF맵 리스트} wfMapList
     */
    function updateWfMapData(wfMapList){
        console.log("wfMapList : ", wfMapList)
        ajaxCall({
            url: "/TB02030S/updateWfMapInfo",
            method: "PUT",
            data: wfMapList,  
            success: function (data, status, settings) {
              Swal.fire({
                icon: "success",
                title: "WF맵 저장이 완료되었습니다",
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
     * WF맵 저장 ajax
     * @param {WF맵 리스트} wfMapList
     */
    function saveWfMapData(wfMapList){
        console.log("wfMapList : ", wfMapList)
        ajaxCall({
            url: "/TB02030S/insertWfMapInfo",
            method: "POST",
            data: wfMapList,  
            success: function (data, status, settings) {
              Swal.fire({
                icon: "success",
                title: "WF맵 저장이 완료되었습니다",
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
     * Wf 스텝관리
     * 행추가 버튼 클릭
     */
    function addWfStepRow(){

        var newRow = {
          rowCheck : true,  
          wfMapId : lastWfMapId || "",
          stepId : "",
          stepNm : "",
          nextStepId : "",
          rtnStepId : "",
          wfAuthId : "",
          state : "N",
          chgDttm : false,
          chgUserId : false,
        }

        $("#gridWfStepList").pqGrid("addRow", {
            rowData: newRow,
            checkEditable: false,
        });

        // 체크박스가 기본적으로 선택된 상태이므로, 편집 가능한 상태로 설정 
        $("#gridWfStepList").pqGrid("option", "editable", true);

    }

    /*
     * Wf 스텝관리 
     * 행삭제 버튼 클릭
     */
    function deleteWfStepRow() {
        let gridData = $("#gridWfStepList").pqGrid("option", "dataModel.data");

        // 선택된 행을 저장할 배열
        let rowsToDelete = [];       // 삭제할 행 중 데이터가 있는 행을 저장할 배열
        let rowsToDeleteEmpty = [];  // 삭제할 행 중 빈 행(데이터가 없는 행)의 인덱스를 저장할 배열

        // 체크된 행이 있는지 확인
        let hasCheckedRow = gridData.some(row => row.rowCheck);
    
        // 체크된 행이 없는 경우 알림창을 띄우고 함수 종료
        if (!hasCheckedRow) {
            Swal.fire({
                icon: 'info',
                title: '삭제를 실행하려면 먼저 체크박스를 선택하세요',
            });
            return;
        }

        // 모든 행을 순회하여 rowCheck가 true인 행만 선택
        gridData.forEach(function(row, index) {
            if (row.rowCheck) { // 체크박스가 선택된 경우만 처리
                // 체크박스를 제외한 데이터만 확인 (rowCheck는 데이터 판단에서 제외)
                if (isRowEmpty(row)) {
                    // 빈 행이면 바로 삭제
                    rowsToDeleteEmpty.push(index); // 빈 행의 인덱스만 저장
                } else {
                    rowsToDelete.push({ wfMapId: row["wfMapId"], stepId: row["stepId"] }); // 배열에 추가
                }
            }
        });

        console.log("rowsToDelete : ", rowsToDelete)

        // 빈 행을 먼저 삭제
        rowsToDeleteEmpty.forEach(function(index) {
            $("#gridWfStepList").pqGrid("deleteRow", { rowIndx: index });
        });

        // 만약 데이터가 있는 행이 하나라도 있다면 삭제 여부 확인
        if (rowsToDelete.length > 0) {
            Swal.fire({
                title: '정말 삭제하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                reverseButtons: true // 버튼 순서 변경
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("rowsToDelete : ", rowsToDelete);
                    
                    deleteWfStep(rowsToDelete);
    
                    // 삭제된 후 그리드 다시 그리기
                    //$("#gridWfStepList").pqGrid("refreshDataAndView");
                }
            });
        } 
    }

    /**
     * 행삭제 ajax
     * @param {WF 스텝관리 리스트} WfStepList
    */
    function deleteWfStep(WfStepList){
        ajaxCall({
            url: "/TB02030S/deleteInfo",
            method: "DELETE",
            data: WfStepList,  
            success: function (data, status, settings) {
              Swal.fire({
                icon: "success",
                title: "삭제가 완료되었습니다",
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
     * Wf 스텝관리
     * 저장 버튼 클릭
     */
    function clickSaveWfStepButton(){
        // 현재 그리드의 모든 행 데이터를 가져오기
        const allData = $("#gridWfStepList").pqGrid("option", "dataModel").data;
        const saveWfStepRows = [];
        const updateWfStepRows = [];
        const checkRows = [];

        // 필수값 누락 시 알림창 표시
        const showAlertForMissingId = (row) => {
            Swal.fire({
                title: "실패",
                text: "스탭 ID를 입력해주세요.",
                icon: "error",
                confirmButtonText: "확인",
            }).then(() => {
                $("#gridWfStepList").pqGrid("setSelection", { rowIndx: row.pq_ri, dataIndx: "stepId" });
            });
        };

        // 데이터 저장 또는 수정 목록에 행 추가
        const addRowToSaveOrUpdate = (row) => {
            const rowData = {
                wfMapId: row["wfMapId"],
                stepId: row["stepId"],
                stepNm: row["stepNm"],
                nextStepId: row["nextStepId"],
                rtnStepId: row["rtnStepId"],
                wfAuthId: row["wfAuthId"],
                //등록자
                //등록일시
            };

            if (row.state === "N") { //새로 추가
                saveWfStepRows.push(rowData);
            }else if (row.state === "R"){ //기존 내용 변경
                updateWfStepRows.push(rowData);
            }
        };

        // 체크된 행을 필터링하고 유효성을 검사
        const filterCheckedRows = () => {
            for (const row of allData) {
                if (row.rowCheck) {
                    checkRows.push(row);
                    
                    if (!row["stepId"]) {
                        showAlertForMissingId(row);
                        return false; // 필수값 누락 시 저장 중단
                    }
                    
                    addRowToSaveOrUpdate(row);
                }
            }
            return true; // 모든 체크된 행이 유효함
        };

        // 데이터 저장 및 수정 처리
        const processSaveAndUpdate = () => {
            if (saveWfStepRows.length > 0) {
                console.log("saveWfStepRows.length : ", saveWfStepRows.length)
                console.log("체크된 행 데이터_저장:", saveWfStepRows);
                saveWfStepData(saveWfStepRows); // 저장 함수 호출
            }

            if (updateWfStepRows.length > 0) {
                console.log("updateWfStepRows.length : ", updateWfStepRows.length)
                console.log("체크된 행 데이터_수정:", updateWfStepRows);
                updateWfStepData(updateWfStepRows); // 수정 함수 호출
            }
        };

        // 메인 로직
        if (filterCheckedRows()) {
            if (checkRows.length > 0) {
                processSaveAndUpdate();
            } else {
                Swal.fire({
                    icon: 'info',
                    title: '저장하려면 체크박스를 먼저 선택하세요',
                });
            }
        }

    }

    /**
     * WF맵 수정 ajax
     * @param {WF스텝 리스트} wfStepList
     */
    function updateWfStepData(wfStepList){
        console.log("wfStepList : ", wfStepList)
        
        
    }

    /**
     * WF맵 저장 ajax
     * @param {WF스텝 리스트} wfStepList
     */
    function saveWfStepData(wfStepList){
        ajaxCall({
            url: "/TB02030S/insertWfStepInfo",
            method: "POST",
            data: wfStepList,  
            success: function (data, status, settings) {
              Swal.fire({
                icon: "success",
                title: "WF스텝 저장이 완료되었습니다",
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

    // 입력 값이 있는지 확인 (빈 값을 판단하는 조건)
    function isRowEmpty(row) {
        // rowCheck 칼럼을 제외한 다른 칼럼들만 체크
        for (let key in row) {
            if (key !== "rowCheck"&& !key.startsWith("pq_")) { // rowCheck와 pq_로 시작하는 시스템 칼럼 제외
                let value = row[key];
    
                // 빈 문자열, null, undefined, false, NaN 등을 빈 값으로 간주
                if (value !== "" && value !== null && value !== undefined && value !== false && !Number.isNaN(value)) {
                    return false; // 값이 하나라도 있으면 false
                }
            }
        }
        return true; // 모든 값이 비어 있으면 true 반환
    }


    return{
        searchButtonClick : searchButtonClick,
        addWfMapRow : addWfMapRow,
        deleteWfMapRow : deleteWfMapRow,
        clickSaveWfMapButton : clickSaveWfMapButton,
        addWfStepRow : addWfStepRow,
        deleteWfStepRow : deleteWfStepRow, 
        clickSaveWfStepButton: clickSaveWfStepButton,
    }

})();