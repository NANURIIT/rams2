package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.selectUseMenuVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper
public interface IBIMS007BMapper {
    
    public List<selectUseMenuVO> selectAvailableMenu(Map<String, String> menuId);			// RAA95B 수정 조회 가능 여부 조회
	public int insertUseMenu(selectUseMenuVO dtoList);									// RAA95B 수정 조회 가능 여부 저장
	public int deleteUseMenu(selectUseMenuVO dto);										// RAA95B 수정 조회 가능 여부 삭제
	public int nextVal();															// SQ값 구하기
	public boolean isExist(selectUseMenuVO dto);											// 업데이트 시 SQ에 해당 권한코드 데이터가 있는지 유무
	// public int updateUseMenu(RAA95BDTO dto);

	public Optional<IBIMS007BDTO> selectAuthCodeMenu(IBIMS007BDTO dto);
	public int updateAuthCodeMenu(IBIMS007BDTO dto);
	public int insertAuthCodeMenu(IBIMS007BDTO dto);
	public int deleteAuthCodeMenu(IBIMS007BDTO dto);
}
