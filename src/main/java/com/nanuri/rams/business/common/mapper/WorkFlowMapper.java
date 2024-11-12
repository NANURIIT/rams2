package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.vo.WfMapVo;
import com.nanuri.rams.com.dto.WFDTO;
import com.nanuri.rams.com.dto.WFStepDTO;
import com.nanuri.rams.com.dto.WorkFlowDTO;
import com.nanuri.rams.com.dto.WFMapDTO;

@Mapper
public interface WorkFlowMapper {
    
    public List<String> getPKList(String tableNm);              //테이블 PK 찾기

    public int wfMapRgst(List<WorkFlowDTO> workFlowDTOs);       //WF맵 등록

    public int wfStepRgst(List<WorkFlowDTO> workFlowDTOs);      //WF스텝 등록

    public int wfRgst(WorkFlowDTO workFlowDTO);                 //WF 등록

    public String getWfId(WorkFlowDTO workFlowDTO);             //WF_ID 찾기

    public int mergeIBIMS101B(WorkFlowDTO workFlowDTO);         //IBIMS101B WF 업데이트

    public int wfHisRgst(WorkFlowDTO workFlowDTO);              //WF_HIS 등록

    public String getNxtStepId(WorkFlowDTO workFlowDTO);        //다음 스텝 ID 찾기

    public int aprvWf(WorkFlowDTO workFlowDTO);                 //WF 상태 변경 (결재)

    public String getWfMapId(WorkFlowDTO workFlowDTO);          //해당 테이블 작업 WF_ID 찾기

    public List<WorkFlowDTO> workFlowInq(WorkFlowDTO wfAuthId);      //WF목록 조회(오늘의 할 일)

    public int wfAuthIdCheck(WorkFlowDTO wfAuthId);             //WF_STEP 권한 체크

    public List<WFMapDTO> getWfMapInfo(String wfMapNm);              //Map 조회

    public int deleteWfMapInfo(List<String> deleteInfo);                 //Map 삭제

    public int updateWfMapInfo(List<WfMapVo> updateInfo); //수정

    public List<WorkFlowDTO> getWfStepInfo(String wfMapId);      //step조회   
}
