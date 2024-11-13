const TB02030Sjs = (() => {
    let lastClickedRowId = null;
    let lastWfMapId;
    const GRID_MAP_ID = "#gridWfMapList";
    const GRID_STEP_ID = "#gridWfStepList";
    const URLS = {
        MENU_AUTH      : "/menuByAuth",
        GET_WF_MAP     : "/TB02030S/getWfMapInfo",
        DELETE_WF_MAP  : "/TB02030S/deleteWfMapInfo",
        UPDATE_WF_MAP  : "/TB02030S/updateWfMapInfo",
        INSERT_WF_MAP  : "/TB02030S/insertWfMapInfo",
        GET_WF_STEP    : "/TB02030S/getWfStepInfo",
        DELETE_WF_STEP : "/TB02030S/deleteWfStepInfo",
        UPDATE_WF_STEP : "/TB02030S/updateWfStepInfo",
        INSERT_WF_STEP : "/TB02030S/insertWfStepInfo",
    };

    $(document).ready(() => setGrid_TB20230S([]));

    const getAthCodeInfo = () => {
        ajaxCall({
            url: URLS.MENU_AUTH,
            success: (data) => {
                const dropdownData = data.map(item => ({
                    label: `${item.athCd} ${item.athCdNm}`,
                    value: item.athCd
                }));
                setGrid_TB20230S(dropdownData);
            }
        });
    };

    const setGrid_TB20230S = (dropdownData) => {
        const obj_WfMap = {
            height: 220,
            width: "100%",
            colModel: colWfMapList,
            editable: false,
            showTitle: false,
            numberCell: { show: false },
            //cellClick: onCheckboxClick,
            rowDblClick: (evt, ui) => {
                if (ui.rowData) {
                    const wfMapId = ui.rowData.wfMapId;
                    getWfStepList(wfMapId);
                    lastWfMapId = wfMapId;
                }
            },
            scrollModel: {  // 수평 스크롤을 비활성화
                horizontal: false,
                vertical: true  // 수직 스크롤은 필요에 따라 활성화
            },
            autoResize: true ,// 열 너비 자동 조정
            strNoRows: '조회된 데이터가 없습니다.'
        };
    
        const obj_WfStep = {
            height: 220,
            colModel: colWfStepList,
            editable: false,
            showTitle: false,
            numberCell: { show: false },
            //cellClick: onCheckboxClick,
            strNoRows: '조회된 데이터가 없습니다.'
        };
    
        initializeGrid(GRID_MAP_ID, obj_WfMap);
        initializeGrid(GRID_STEP_ID, obj_WfStep);
    
        wfMapObj = $(GRID_MAP_ID).pqGrid('instance');
        wfStepObj = $(GRID_STEP_ID).pqGrid('instance');
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
            editable : true,
		},
		{ 	
			title    : "맵 명", 
			dataType : "string", 
			dataIndx : "wfMapNm", 
			align    : "left",
			halign   : "center",
			width    : "15%",
            editable : true,
		},
		{ 	
			title    : "업무테이블", 
			dataType : "string", 
			dataIndx : "jobTable", 
			halign   : "center",
			align    : "center",
			width    : "15%",
            editable : true,
		},
		{ 	
			title    : "업무테이블KEY컬럼명", 
			dataType : "string", 
			dataIndx : "jobTableKey", 
			halign   : "center",
			align    : "left",
            width    : "23%",
            editable : true,
		},
		{ 	
			title    : "등록자", 
			dataType : "string",
			dataIndx : "regUserId",
			align    : "center",
            width    : "15%",
            editable : true,
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

    const toggleEditable = (isEditable, gridId) => {
        $(gridId).pqGrid("option", "editable", isEditable);
    };

    const initializeGrid = (gridId, options) => {
        if ($(gridId).pqGrid("instance") === undefined) {
            $(gridId).pqGrid(options);
        } else {
            $(gridId).pqGrid("refreshDataAndView");
        }
    };

    // 체크박스 클릭 이벤트 처리 함수
    // const onCheckboxClick = (event, ui) => {
    //     if (ui.dataIndx === "rowCheck") {
    //         setTimeout(() => {
    //             const isChecked = ui.rowData.rowCheck;
    //             console.log("체크박스 상태:", isChecked);
    //             $(ui.$grid).pqGrid("option", "editable", isChecked);
    //         }, 50);
    //     }
    // };

    const searchButtonClick = () => {
        const wfMapNm = $("#wfMapNmSearchInput").val();
        getWfMapList(wfMapNm);
    };

    const getWfMapList = (wfMapNm) => {
        const _url = wfMapNm ? `${URLS.GET_WF_MAP}?wfMapNm=${wfMapNm}` : URLS.GET_WF_MAP;
     
        ajaxCall({
            url: _url,
            beforeSend: () => {
                clearGridData(GRID_MAP_ID);   // GRID_MAP_ID 비우기
                clearGridData(GRID_STEP_ID);  // GRID_STEP_ID 비우기
            },
            success: populateWfMapData
        });
    };

    const clearGridData = (gridId) => {

        const $grid = $(gridId);
        const gridInstance = $grid.pqGrid("instance");

        gridInstance.option("dataModel.data", []);
        gridInstance.option("strNoRows", "조회 중입니다..."); // 조회 중 메시지 설정
        gridInstance.refreshDataAndView(); // 데이터 새로 고침

        $grid.pqGrid("refresh");
    };

    const populateWfMapData = (data) => {
        const rowList = data.map(value => ({
            rowCheck: false,
            wfMapId: value.wfMapId,
            wfMapNm: value.wfMapNm,
            jobTable: value.jobTable,
            jobTableKey: value.jobTableKey,
            regUserId: value.regUserId,
            regDttm: formatDate(value.regDttm),
            state: "R",
            originalWfMapId: value.wfMapId
        }));
        updateGridData(GRID_MAP_ID, rowList);
        lastClickedRowId = null;
    };

    const updateGridData = (gridId, data) => {
        const gridInstance = $(gridId).pqGrid("instance");
        gridInstance.option("dataModel.data", data);
        gridInstance.refreshDataAndView();
    };

    const addWfMapRow = () => {
        const newRow = {
            rowCheck: false,
            wfMapId: "",
            wfMapNm: "",
            jobTable: "",
            jobTableKey: "",
            regUserId: "",
            regDttm: "",
            state: "N",
            originalWfMapId: false
        };
        $(GRID_MAP_ID).pqGrid("addRow", { rowData: newRow, checkEditable: true });
        toggleEditable(true, GRID_MAP_ID);
    };

    const deleteWfMapRow = () => {
        const gridData = $(GRID_MAP_ID).pqGrid("option", "dataModel.data");
        const rowsToDelete = gridData.filter(row => row.rowCheck && !isRowEmpty(row));
        if (rowsToDelete.length) {
            confirmDelete(() => deleteWfMap(rowsToDelete.map(row => row.wfMapId)));
        }
    };

    const confirmDelete = (onConfirm) => {
        Swal.fire({
            title: '정말 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        }).then((result) => result.isConfirmed && onConfirm());
    };

    const deleteWfMap = (wfMapList) => {
        ajaxCall({
            url: URLS.DELETE_WF_MAP,
            method: "DELETE",
            data: wfMapList,
            success: () => {
                openPopup({
                    title: "성공",
                    type: "success",
                    text: "WF맵 삭제가 완료되었습니다",
                });

                searchButtonClick();  // 기존의 조회 함수 호출하여 데이터 재로드
            },
        });
    };

    const clickSaveWfMapButton = async () => {
        const allData = $(GRID_MAP_ID).pqGrid("option", "dataModel").data;
        const saveRows = [];
        const updateRows = [];
        const checkRows = [];
    
        const filterCheckedRows = () => {
            for (const row of allData) {
                if (row.rowCheck) {
                    checkRows.push(row);
                    if (!row.wfMapId || row.wfMapId.length !== 4) {
                        openPopup({
                            type: "info",
                            text: `${row.pq_ri + 1}번째 행의 워크플로우 맵ID를 입력해주세요.`,
                        });
                        $(GRID_STEP_ID).pqGrid("setSelection", { rowIndx: row.pq_ri, dataIndx: "stepId" });
                        return false;
                    }
                    (row.state === "N" ? saveRows : updateRows).push(row);
                }
            }
            return true;
        };
    
        if (filterCheckedRows()) {
            if (checkRows.length > 0) {
                let saveSuccess = false;
                let updateSuccess = false;
    
                try {
                    if (saveRows.length) {
                        saveSuccess = await saveWfMapData(saveRows);
                    }
                    if (updateRows.length) {
                        updateSuccess = await updateWfMapData(updateRows);
                    }
    
                    if (saveSuccess || updateSuccess) {
                        openPopup({
                            title: "성공",
                            type: "success",
                            text: "WF맵 저장이 완료되었습니다",
                        });
                        searchButtonClick();
                    }
                } catch (error) {
                    console.error("저장 또는 수정 중 오류가 발생했습니다:", error);
                    openPopup({
                        title: "실패",
                        type: "error",
                        text: "저장 또는 수정 중 오류가 발생했습니다.",
                    });
                }
            } else {
                openPopup({ type: "info", text: "저장하려면 체크박스를 먼저 선택하세요." });
            }
        }
    };

    const updateWfMapData = (wfMapList) => {
        return new Promise((resolve, reject) => {
            ajaxCall({
                url: URLS.UPDATE_WF_MAP,
                method: "PUT",
                data: wfMapList,
                success: () => resolve(true),  // 성공 시 resolve 호출
                error: (response) => reject(new Error("오류 발생")),  // 실패 시 reject 호출만 처리
            });
        });
    };

    const saveWfMapData = (wfMapList) => {
        return new Promise((resolve, reject) => {
            ajaxCall({
                url: URLS.INSERT_WF_MAP,
                method: "POST",
                data: wfMapList,
                success: () => resolve(true),  // 성공 시 resolve 호출
                error: (response) => reject(new Error("오류 발생")),  // 실패 시 reject 호출만 처리
            });
        });
    };

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
            hidden   : true
		},
		{ 	
			title    : "스텝 ID", 
			dataType : "string", 
			dataIndx : "stepId", 
			align    : "center",
			halign   : "center",
			width    : "14%",
            editable : true,
		},
		{ 	
			title    : "스텝명", 
			dataType : "string", 
			dataIndx : "stepNm", 
			halign   : "center",
			align    : "center",
			width    : "14%",
            editable : true,
		},
		{ 	
			title    : "다음스텝", 
			dataType : "string", 
			dataIndx : "nextStepId", 
			halign   : "center",
			align    : "center",
            width    : "14%",
            editable : true,
		},
		{ 	
			title    : "반송스텝", 
			dataType : "string",
			dataIndx : "rtnStepId",
			align    : "center",
            width    : "14%",
            editable : true,
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
            editable : true,
                    
		},
        { 	
			title    : "예외권한 사원번호", 
			dataType : "string",
			dataIndx : "excAuthEmp",
			align    : "center", 
			width    : "14%",
            editable : true,
		},
        { 	
			title    : "예외권한 부서코드", 
			dataType : "string",
			dataIndx : "excAuthDept",
			align    : "center", 
			width    : "14%",
            editable: true 
		},
        { 	
			title    : "상태", 
			dataType : "string",
			dataIndx : "state",
			align    : "center", 
			width    : "5%",
            hidden: true
		},
		
	];

    // WF 스텝 관리 조회 AJAX
    function getWfStepList(wfMapId) {
        // if (String(lastClickedRowId) === String(wfMapId)) {
        //     console.log("같은 행이 이미 선택되었습니다. 서비스 호출을 생략합니다.");
        //     return;
        // }
        lastClickedRowId = wfMapId;
        const url = wfMapId ? `${URLS.GET_WF_STEP}?wfMapId=${wfMapId}` : URLS.GET_WF_STEP;

        ajaxCall({
            method: "GET",
            url: url,
            beforeSend: () => updateGrid(GRID_STEP_ID, [], "조회 중입니다..."),
            success: (data) => {
                const rowList = data.map(value => ({
                    rowCheck: false,
                    wfMapId,
                    stepId: value.stepId,
                    stepNm: value.stepNm,
                    nextStepId: value.nextStepId,
                    rtnStepId: value.rtnStepId,
                    wfAuthId: value.wfAuthId,
                    excAuthEmp : value.excAuthEmp,
                    excAuthDept : value.excAuthDept,
                    state: "R",
                }));
                updateGrid(GRID_STEP_ID, rowList, data.length ? "" : "조회된 데이터가 없습니다.");
            }
        });
    }

    // WF 스텝 행 추가
    function addWfStepRow() {
        const newRow = {
            rowCheck: true,
            wfMapId: lastWfMapId || "",
            stepId: "",
            stepNm: "",
            nextStepId: "",
            rtnStepId: "",
            wfAuthId: "",
            excAuthEmp : "",
            excAuthDept : "",
            state: "N",
        };

        $(GRID_STEP_ID).pqGrid("addRow", { rowData: newRow, checkEditable: false });
        $(GRID_STEP_ID).pqGrid("option", "editable", true);
    }

    // WF 스텝 행 삭제
    function deleteWfStepRow() {
        const gridData = $(GRID_STEP_ID).pqGrid("option", "dataModel.data");
        const rowsToDelete = [];
        const rowsToDeleteEmpty = [];

        if (!gridData.some(row => row.rowCheck)) {
            openPopup({ type: 'info', text: '삭제를 실행하려면 먼저 체크박스를 선택하세요' });
            return;
        }

        gridData.forEach((row, index) => {
            if (row.rowCheck) {
                isRowEmpty(row) ? rowsToDeleteEmpty.push(index) : rowsToDelete.push({ wfMapId: row.wfMapId, stepId: row.stepId });
            }
        });

        rowsToDeleteEmpty.forEach(index => $(GRID_STEP_ID).pqGrid("deleteRow", { rowIndx: index }));
        if (rowsToDelete.length > 0) {
            Swal.fire({
                title: '정말 삭제하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) deleteWfStep(rowsToDelete);
            });
        }
    }

    // WF 스텝 삭제 AJAX
    function deleteWfStep(data) {
        ajaxCall({
            url: URLS.DELETE_WF_STEP,
            method: "DELETE",
            data: data,
            success: () => {
                openPopup({
                    title: "성공",
                    type: "success",
                    text: "WF스텝 삭제가 완료되었습니다",
                })
                //
                getWfStepList(data[0].wfMapId);
            }
        });
        $(GRID_STEP_ID).pqGrid("refreshDataAndView");
    }

    // WF 스텝 저장 버튼 클릭
    function clickSaveWfStepButton() {
        const allData = $(GRID_STEP_ID).pqGrid("option", "dataModel").data;
        const saveWfStepRows = [];
        const updateWfStepRows = [];
        const checkRows = [];
    
        const filterCheckedRows = () => {
            for (const row of allData) {
                if (row.rowCheck) {
                    checkRows.push(row);
                    if (!row.stepId) {
                        openPopup({
                            type: "info",
                            text: `${row.pq_ri + 1}번째 행의 스탭 ID를 입력해주세요.`,
                        });
                        $(GRID_STEP_ID).pqGrid("setSelection", { rowIndx: row.pq_ri, dataIndx: "stepId" });
                        return false;  // stepId가 없으면 더 이상 진행하지 않음
                    }
                    (row.state === "N" ? saveWfStepRows : updateWfStepRows).push(row);
                }
            }
            return true;
        };
    
        if (filterCheckedRows()) {
            if (checkRows.length > 0) {
                if (saveWfStepRows.length) saveWfStepData(saveWfStepRows);
                if (updateWfStepRows.length) updateWfStepData(updateWfStepRows);
            } else {
                openPopup({ type: "info", text: "저장하려면 체크박스를 먼저 선택하세요." });
            }
        }
    }

    // WF 스텝 저장 AJAX
    function saveWfStepData(data) {
        ajaxCall({
            url: URLS.INSERT_WF_STEP,
            method: "POST",
            data: data,
            success: () => {
                openPopup({
                    title: "성공",
                    type: "success",
                    text: "WF스텝 저장이 완료되었습니다",
                })
                getWfStepList(data[0].wfMapId);
            }
        });
    }

    // WF 스텝 수정 AJAX
    function updateWfStepData(data) {
        ajaxCall({
            url: URLS.UPDATE_WF_STEP,
            method: "PUT",
            data: data,
            success: () => {
                openPopup({
                    title: "성공",
                    type: "success",
                    text: "WF스텝 저장이 완료되었습니다",
                })
                getWfStepList(data[0].wfMapId);
            }
        });
    }

    // 행이 비어있는지 확인
    function isRowEmpty(row) {
        return !Object.keys(row).some(key => key !== "rowCheck" && !key.startsWith("pq_") && row[key]);
    }

    // 그리드 업데이트
    function updateGrid(gridId, data, noRowsMessage) {
        $(gridId).pqGrid("option", "dataModel.data", data);
        $(gridId).pqGrid("option", "strNoRows", noRowsMessage);
        $(gridId).pqGrid("refreshDataAndView");
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
