package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA92BDTO;
import com.nanuri.rams.business.common.vo.RAA92BVO;

@Mapper
public interface RAA92BMapper {
    
    public int getLastSq();                                         			// AutoIncrement 적용이 되어 있지 않아 쿼리 숫자를 셀렉해 옴
    public void insertUser(RAA92BDTO userManageDTO);            				// 사용자 추가
    public void updateUser(RAA92BDTO userManageDTO);            				// 사용자 수정
    public List<RAA92BVO.selectVO> selectUser(RAA92BVO.selectVO userVo);        // 사용자 목록 조회
    public int checkEno(String eno);        									// 사번 중복체크
    public void deleteUser(RAA92BDTO userManageDTO);            				// 사용자 삭제(퇴사)
    
}
