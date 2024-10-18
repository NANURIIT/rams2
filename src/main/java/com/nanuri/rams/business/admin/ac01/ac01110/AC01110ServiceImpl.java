package com.nanuri.rams.business.admin.ac01.ac01110;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.mapper.*;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.dto.RAA94BDTO;
import com.nanuri.rams.business.common.dto.RAA99ADTO;
import com.nanuri.rams.business.common.vo.RAA92BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AC01110ServiceImpl implements AC01110Service {
	
	private final AuthenticationFacade facade;
	
	@Autowired
 	private PasswordEncoder passwordEncoder;
	
	private final RAA92BMapper raa92BMapper;
	private final RAA99AMapper raa99AMapper;

    private final IBIMS003BMapper ibims003BMapper;
    private final IBIMS006BMapper ibims006BMapper;

    /* 사용자 추가 */
    @Override
    public void insertUser(IBIMS003BDTO dto) {
        LocalDate today = LocalDate.now();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");

        String rgstDt = today.format(date);
        String eno = facade.getDetails().getEno();
        String dprtCd = facade.getDetails().getDprtCd();

        dto.setDprtCd(dprtCd);
        dto.setRgstEmpno(eno);
        dto.setRgstDt(rgstDt);
        dto.setAplyStrtDt(dto.getAplyStrtDt().replace("-", ""));
        dto.setAplyEndDt(dto.getAplyEndDt().replace("-", ""));
        dto.setHndEmpno(eno);
        dto.setPwd(passwordEncoder.encode("1"));
        dto.setLginPwd(passwordEncoder.encode("1"));

        ibims003BMapper.insertUser(dto);
    }
    
    /* 사용자 수정 */
    public void updateUser(IBIMS003BDTO dto) {
    	LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter time = DateTimeFormatter.ofPattern("HHmmss");
        
        String rgstDt = today.format(date);
        String eno = facade.getDetails().getEno();
        String dprtCd = facade.getDetails().getDprtCd();
        
        dto.setAplyStrtDt(dto.getAplyStrtDt().replace("-", ""));
        dto.setAplyEndDt(dto.getAplyEndDt().replace("-", ""));
        dto.setRgstEmpno(eno);
        dto.setRgstDt(rgstDt);
        dto.setDprtCd(dprtCd);
        dto.setHndEmpno(eno);

        ibims003BMapper.updateUser(dto);
    }

    /* 사용자 목록 */
    @Override
    public List<IBIMS003BVO> getUserList(IBIMS003BDTO paramData) {
        return ibims003BMapper.selectUser(paramData);
    }

    /* 사용자 삭제(퇴사) */
    @Override
    public void deleteUser(IBIMS003BDTO dto) {
        String eno = facade.getDetails().getEno();

        dto.setDelEmpno(eno);
        dto.setDelYn("Y");
        dto.setHndEmpno(eno);

        ibims003BMapper.deleteUser(dto);
    }

    /* 사용자관리화면 권한구분 */
    @Override
    public List<IBIMS006BVO> selectAuthCode() {
        return ibims006BMapper.selectRghtCd();
    }
    
    /* 사번 중복체크 raa92b*/
	@Override
    public int checkEno(String eno) {
        return ibims003BMapper.checkEno(eno);
    }

    /* 사번 중복체크 raa99a*/
	@Override
    public int checkUserEno(String eno) {
        return raa99AMapper.checkUserEno(eno);
    }

}
