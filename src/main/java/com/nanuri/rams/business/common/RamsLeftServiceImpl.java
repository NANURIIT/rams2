package com.nanuri.rams.business.common;

import java.util.List;

import org.apache.bcel.generic.RETURN;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS005BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS007BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RamsLeftServiceImpl implements RamsLeftService {

    private final AuthenticationFacade facade;

    private final IBIMS005BMapper ibims005bMapper;
    private final IBIMS007BMapper ibims007bMapper;

    @Override
    public List<IBIMS005BDTO> createRamsNav(String param){
        return ibims005bMapper.createRamsNav(param);
    };


    @Override
    public int chkAthCd(IBIMS007BDTO param){
        
        // 사원번호를 코드값에 세팅했음
        // facade 정보를 불러오려다보니 AthCd를 하드코딩 해놓은것으로 보임
        // DB데이터에 따라 오류가 날 수 있다고 생각하여 사원번호로 받음
        param.setAthCd(facade.getDetails().getEno());

        return ibims007bMapper.chkAthCd(param);
    };


}
