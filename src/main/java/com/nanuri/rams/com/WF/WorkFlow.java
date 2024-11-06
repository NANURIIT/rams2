package com.nanuri.rams.com.WF;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.mapper.WorkFlowMapper;
import com.nanuri.rams.com.dto.WorkFlowDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class WorkFlow {

    /* WF */
    @Autowired
    private final WorkFlowMapper workFlowMapper;
    
    /**
	 * WF맵 등록
	 * @param WorkFlowDTO
	 * @return
	 */
    public int wfMapRgst(WorkFlowDTO workFlowDTO){

        String tableNm = workFlowDTO.getJobTable();         //작업 테이블 명

        List<String> pkList = new ArrayList<>();            //테이블 PK리스트

        pkList = workFlowMapper.getPKList(tableNm);
        String jobTableKey = String.join("||", pkList);

        workFlowDTO.setJobTableKey(jobTableKey);

        return workFlowMapper.wfMapRgst(workFlowDTO);
    }

    /**
	 * WF스텝 등록
	 * @param WorkFlowDTOList List<WorkFlowDTO>
	 * @return
	 */
    public int wfStepRgst(List<WorkFlowDTO> workFlowDTOList){
        return workFlowMapper.wfStepRgst(workFlowDTOList);
    }

    /**
	 * WF 등록
	 * @param WorkFlowDTO
	 * @return
	 */
    public int wfRgst(WorkFlowDTO workFlowDTO){
        return workFlowMapper.wfRgst(workFlowDTO);
    }
}
