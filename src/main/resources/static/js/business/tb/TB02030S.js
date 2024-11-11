const TB02030Sjs = (function(){
    let dropdownData = []; // 초기화
    //let updateWfMapRowYn; //
    //let deleteWfMapRowYn; //

    $(document).ready(function() {
        getAthCodeInfo(); // 권한 코드 정보를 가져옴.
    });
    
    function setGrid_TB20230S(){
        //WF 맵관리 
        let obj_WfMap = {
			height    : 220,
		    maxHeight : 220,
		    id        : 'gridWfMapList',
		    colModel  : colWfMapList,
		    showTitle: false,
		    showToolbar: false,
		    collapsible: false,
		    wrap: false,
		    hwrap: false,
		    numberCell: { show: false },
		    editable: true,
		    scrollModel : {autoFit : false},
		    strNoRows: '조회된 데이터가 없습니다.',
		}

		$("#gridWfMapList").pqGrid(obj_WfMap);
		wfMapObj = $("#gridWfMapList").pqGrid('instance');
        

        //WF 스텝관리
        let obj_WfStep = {
			height    : 220,
			maxHeight : 220,
			id        : 'gridWfStepList',
			colModel  : colWfStepList,
			showTitle: false,
			showToolbar: false,
			collapsible: false,
			wrap: false,
			hwrap: false,
			numberCell: { show: false },
			editable: true,
			scrollModel : {autoFit : false},
			strNoRows: '조회된 데이터가 없습니다.',
		}

		$("#gridWfStepList").pqGrid(obj_WfStep);
		wfStepObj = $("#gridWfStepList").pqGrid('instance');

        // select box의 options을 설정
        colWfStepList.forEach(col => {
            if (col.dataIndx === "wfAuthId") {
                col.editor.options = dropdownData; // options에 dropdownData를 할당
            }
        });
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
        let _url = "";

        if(wfMapNm){
            _url += "?wfMapNm=" + wfMapNm;
        }
        ajaxCall({
            method: "GET",
            url: _url,
            beforeSend: function () {
                wfMapObj.option("dataModel.data", []);
                wfMapObj.option("strNoRows", "조회 중입니다...");
                wfMapObj.refreshDataAndView();
            },
            success: function (data) {
                var rowList = [];

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
                        };
    
                        rowList.push(newRow);
                    });
                    wfMapObj.option("dataModel.data", rowList);
                    wfMapObj.refreshDataAndView();
                }else{
                    wfMapObj.option("strNoRows", "조회된 데이터가 없습니다.");
                    wfMapObj.refreshDataAndView();
                }
            }
        });
    }

    //Wf 맵 관리
    let colWfMapList = [
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
            //width    : "1.3%",
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
		},
		{ 	
			title    : "맵 명", 
			dataType : "string", 
			dataIndx : "wfMapNm", 
			align    : "left",
			halign   : "center",
			width    : "15%",
		},
		{ 	
			title    : "업무테이블", 
			dataType : "string", 
			dataIndx : "jobTable", 
			halign   : "center",
			align    : "center",
			width    : "15%",
		},
		{ 	
			title    : "업무테이블KEY컬럼명", 
			dataType : "string", 
			dataIndx : "jobTableKey", 
			halign   : "center",
			align    : "left",
            width    : "23%",
		},
		{ 	
			title    : "등록자", 
			dataType : "string",
			dataIndx : "regUserId",
			align    : "center",
            width    : "15%",
		},
		{ 	
			title    : "등록일시", 
			dataType : "string",
			dataIndx : "regDttm",
			align    : "center", 
			width    : "15%",
            editable: false // 이 열은 편집 불가능
		},
		
	];
    

  /**
   * 권한ID select박스 호출 함수
   */
    var getAthCodeInfo = function () {
        $.ajax({
            url: "/menuByAuth",
            method: "GET",
            dataType: "json",
            success: function(data) {
                dropdownData = data.map(item => ({
                    value: item.athCd,  // 권한코드
                    label: item.athCd + " " + item.athCdNm   // 권한코드 권한코드명
                }));

                // AJAX 호출이 성공한 후 pqGrid 초기화
                setGrid_TB20230S(dropdownData);
            },
            error: function(error) {
                console.error("Error fetching dropdown data:", error);
            }
        });
    };

    /**
    * WF 스텝 관리 조회 ajax
    * @param {워크플로우 맵ID} wfMapId 
    */
   //======= url 다시 해애함
    function getWfStepList(wfMapId){
        ajaxCall({
            method: "get",
            url: "/?wfMapId=" + wfMapId,
            success: function (data) {
                var rowList = [];

                if(data.length > 0){
                    $.each(data, function(key, value){
                        var newRow = {
                            rowCheck : false,  
                            stepId : value.stepId,
                            stepNm : value.stepNm,
                            nextStepId : value.nextStepId,
                            rtnStepId : value.rtnStepId,
                            wfAuthId : value.wfAuthId,
                            chgDttm : false,
                            chgUserId : false,
                          };
              
                          rowList.push(newRow);
                    });

                }else{
                    wfStepObj.option("strNoRows", "조회된 데이터가 없습니다.");
                    wfStepObj.refreshDataAndView();
                }
            }
        })
    }


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
            //width    : "1.3%",
            resizable: false,
            cb: {
                all: false,
                header: false,
            },
        },
        { 	
			title    : "", 
			dataType : "string", 
			dataIndx : "wfMapId", 
			align    : "center",
            hidden   : true
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
			dataIndx : "mtrDcdNm", 
			halign   : "center",
			align    : "center",
			width    : "14%",
		},
		{ 	
			title    : "다음스텝", 
			dataType : "string", 
			dataIndx : "nextStepId", 
			halign   : "center",
			align    : "left",
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
            formatter: 'listItemText',
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
		
	];

    /**
     * Wf 맵관리
     * 행추가 버튼 클릭
     */
    function addWfMapRow(){
        updateWfMapRowYn = "Y";

        var newRow = {
          rowCheck : false,  
          wfMapId : "",
          wfMapNm : "",
          jobTable : "",
          jobTableKey : "",
          regUserId : "",
          regDttm : "",
          chgDttm : "",
          chgUserId : "",
        }

        $("#gridWfMapList").pqGrid("addRow", {
            rowData: newRow,
            checkEditable: false,
        });

    }

    /*
     * Wf 맵관리 
     * 행삭제 버튼 클릭
     */
    function deleteWfMapRow() {
        let gridData = $("#gridWfMapList").pqGrid("option", "dataModel.data");
        
        // 선택된 행을 저장할 배열
        let rowsToDelete = [];
        let rowsToDeleteEmpty = [];
    
        // 모든 행을 순회하여 rowCheck가 true인 행만 선택
        gridData.forEach(function(row, index) {
            if (row.rowCheck) { // 체크박스가 선택된 경우만 처리
                // 체크박스를 제외한 데이터만 확인 (rowCheck는 데이터 판단에서 제외)
                if (isRowEmpty(row)) {
                    // 빈 행이면 바로 삭제
                    console.log("빈 row를 바로 삭제합니다.");
                    rowsToDeleteEmpty.push(index); // 빈 행의 인덱스만 저장
                } else {
                    // 데이터가 있는 행인 경우 삭제 서비스에 필요한 데이터 저장
                    rowsToDelete.push({
                        rowData: row,
                        rowIndx: index
                    });
                }
            }else{
                Swal.fire({
                    icon: 'info',
                    title: '삭제를 실행하려면 먼저 체크박스를 선택하세요',
                })
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
  
                    console.log("rowsToDelete : ", rowsToDelete)
    

                    //deleteWfMap(rowsToDelete);

                    // 삭제된 후 그리드 다시 그리기
                    //$("#gridWfMapList").pqGrid("refreshDataAndView");
                    
                  
                }
            });
        } else {
            console.log("선택된 항목이 없습니다.");
        }
    }
    
    

    /**
     * 행삭제 ajax
     * @param {WF 맵관리 리스트} WfMapList
    */
    function deleteWfMap(WfMapList){

    }

    /**
     * Wf 맵관리
     * 저장 버튼 클릭
     */
    function clickSaveWfMapButton() {
    
        // 현재 그리드의 모든 행 데이터를 가져오기
        let allData = $("#gridWfMapList").pqGrid("option", "dataModel").data;
        let clickedWfMapRows = [];

        
        // 모든 행을 순회하여 rowCheck가 true인 행만 선택
        allData.forEach(function(row) {
            let wfMapId = row["wfMapId"];
            if (row.rowCheck) {

                if (!row["wfMapId"]) {
                    console.log("test123456");
                    // wfMapId 값이 없으면 경고 메시지를 표시하고 함수 종료
                    openPopup({
                        title: "실패",
                        text: "워크플로우 맵ID를 입력해주세요.",
                        type: "error",
                        callback: function () {
                            console.log("test!!!!!!!!");
                            $(document).on("click", ".confirm", function () {
                                console.log("test22222");
                            });
                          },
                    });
                    return;
                    
                }

                clickedWfMapRows.push({
                    wfMapId: row["wfMapId"],
                    wfMapNm: row["wfMapNm"],
                    jobTable: row["jobTable"],
                    jobTableKey: row["jobTableKey"],
                    regUserId: row["regUserId"],
                    regDttm: row["regDttm"]
                });
            }
        });
        
        if(clickedWfMapRows.length > 0){
            // 디버그용 콘솔 출력
            console.log("체크된 행 데이터:", clickedWfMapRows);
            saveWfMapData(clickedWfMapRows);
        }
        
    }

    /**
     * WF맵 저장 ajax
     * @param {WF맵 리스트} wfMapList
     */
    function saveWfMapData(wfMapList){
        console.log("wfMapList : ", wfMapList)
        // ajaxCall({
        //     url: "/",
        //     method: "POST",
        //     data: wfMapList,
        //     success: function (data, status, settings) {
        //       Swal.fire({
        //         icon: "success",
        //         title: "권한저장이 완료되었습니다",
        //         text: "",
        //         confirmButtonText: "확인",
        //       });
        //     },
        //     fail: function (response) {
        //       let message = response.responseJSON.message;
        //       openPopup({
        //         title: "실패",
        //         type: "error",
        //         text: message,
        //       });
        //     },
        //   });
    }
    





    //=========================
    /**
     * Wf 스텝관리
     * 행추가 버튼 클릭
     */
    function addWfStepRow(){

        var newRow = {
          rowCheck : false,  
          //wfMapId : "",
          stepId : "",
          stepNm : "",
          nextStepId : "",
          rtnStepId : "",
          wfAuthId : "",
          chgDttm : false,
          chgUserId : false,
        }

        $("#gridWfStepList").pqGrid("addRow", {
            rowData: newRow,
            checkEditable: false,
        });

    }

    /*
     * Wf 스텝관리 
     * 행삭제 버튼 클릭
     */
    function deleteWfStepRow() {
        let gridData = $("#gridWfStepList").pqGrid("option", "dataModel.data");
        
        let rowsToDelete = [];
        let WfStepList = [];

        // 체크된 행의 인덱스를 수집
        for (let i = 0; i < gridData.length; i++) {
            if (gridData[i].rowCheck === true) {
                rowsToDelete.push(i);
            }
        }

        // 인덱스를 역순으로 정렬하여 삭제
        for (let j = rowsToDelete.length - 1; j >= 0; j--) {
            $("#gridWfStepList").pqGrid("deleteRow", { rowIndx: rowsToDelete[j] });
        }

        // 삭제된 후 그리드 다시 그리기
        $("#gridWfStepList").pqGrid("refreshDataAndView");
        //deleteWfStep(WfStepList);
    }

    /**
     * 행삭제 ajax
     * @param {WF 스텝관리 리스트} WfStepList
    */
    function deleteWfStep(WfStepList){

    }

    /**
     * Wf 스텝관리
     * 저장 버튼 클릭
     */
    function saveWfStepRow(){

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
    }

})();