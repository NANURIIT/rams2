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

        //이벤트 리스너 등록
        // $( "#gridWfMapList" ).pqGrid({
        //     // rowRightClick: function( event, ui ) {
        //     //     console.log("더블클릭된 행 이벤트 실행");

        //     //     // 더블클릭된 행의 데이터 가져오기
        //     //     if (ui.rowData) {
        //     //         let clickedRowData = ui.rowData;

        //     //         // 디버그용 콘솔 출력
        //     //         console.log("더블클릭된 행 데이터:", clickedRowData);
        //     //     }
        //     // },
        //     cellClick: function(event, ui) {

        //         if (ui.dataIndx === "rowCheck") {
        //             // 클릭 이벤트가 끝난 후 체크 상태 반영을 위해 약간의 지연 추가
        //             setTimeout(function() {
        //                 let isChecked = ui.rowData.rowCheck; // 클릭 후의 상태 가져오기
                    
        //             // 행 데이터의 다른 칼럼 값을 변경
        //             if (isChecked) {

        //                 //if(updateWfMapRowYn = "Y"){
        //                 //    ui.rowData.rowState = "U"; // "rowState" 값 변경
        //                 //}else if(deleteWfMapRowYn = "Y"){
        //                 //    ui.rowData.rowState = "D"; // "rowState" 값 변경
        //                // }
        //             } else {
        //                 ui.rowData.rowState = ""; // "rowState" 값 변경
        //             }
        
        //             // 변경 사항 반영
        //             $("#gridWfMapList").pqGrid("refreshRow", { rowIndx: ui.rowIndx });
                    
        //         }, 0);
        //         }
        //     }    
        // });
        

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
			title    : "워크플로우맵ID", 
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
                            //wfMapId : "",
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
          chgDttm : false,
          chgUserId : false,
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
    
        let rowsToDelete = [];
        let WfMapList = [];

        // 체크된 행의 인덱스를 수집
        for (let i = 0; i < gridData.length; i++) {
            if (gridData[i].rowCheck === true) {
                rowsToDelete.push(i);
            }
        }

        // 인덱스를 역순으로 정렬하여 삭제
        for (let j = rowsToDelete.length - 1; j >= 0; j--) {
            $("#gridWfMapList").pqGrid("deleteRow", { rowIndx: rowsToDelete[j] });
        }

        // 삭제된 후 그리드 다시 그리기
        $("#gridWfMapList").pqGrid("refreshDataAndView");
            
        //deleteWfMap(WfMapList);
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
    function saveWfMapRow(params) {
        
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


    return{
        searchButtonClick : searchButtonClick,
        addWfMapRow : addWfMapRow,
        deleteWfMapRow : deleteWfMapRow,
        addWfStepRow : addWfStepRow,
        deleteWfStepRow : deleteWfStepRow, 
    }

})();