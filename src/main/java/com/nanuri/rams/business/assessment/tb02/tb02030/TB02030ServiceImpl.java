package com.nanuri.rams.business.assessment.tb02.tb02030;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.WorkFlowMapper;
import com.nanuri.rams.business.common.vo.WfMapVo;
import com.nanuri.rams.com.dto.WFMapDTO;
import com.nanuri.rams.com.dto.WorkFlowDTO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB02030ServiceImpl implements TB02030Service {

    private final WorkFlowMapper workFlowMapper;
    
    //map 조회
    @Override
    public List<WFMapDTO> getWfMapInfo(String wfMapNm) {
        return workFlowMapper.getWfMapInfo(wfMapNm);
    }

    //map 저장
    @Override
    public int insertWfMapInfo(List<WorkFlowDTO> insertInfo) {
        return workFlowMapper.wfMapRgst(insertInfo);
    }

    //map 삭제
    @Override
    public int deleteWfMapInfo(List<String>deleteInfo) {
        return workFlowMapper.deleteWfMapInfo(deleteInfo);
    }

    //map 수정
    @Override
    public int updateWfMapInfo(List<WfMapVo> updateInfo) {
        return workFlowMapper.updateWfMapInfo(updateInfo);
    }

    @Override
    public List<WorkFlowDTO> getWfStepInfo(String wfMapId) {
        return workFlowMapper.getWfStepInfo(wfMapId);
    }

    //WF STEP등록
    @Override
    public int wfStepRgst(List<WorkFlowDTO> insertInfo) {
        return workFlowMapper.wfStepRgst(insertInfo);
    }
    
}
