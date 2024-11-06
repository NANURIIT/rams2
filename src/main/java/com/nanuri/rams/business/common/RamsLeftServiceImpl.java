package com.nanuri.rams.business.common;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS005BMapper;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class RamsLeftServiceImpl implements RamsLeftService {

    private final IBIMS005BMapper ibims005bMapper;

    @Override
    public List<IBIMS005BDTO> createRamsNav(String param){
        return ibims005bMapper.createRamsNav(param);
    };

}
