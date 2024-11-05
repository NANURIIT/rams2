package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.MainMenuVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.SubMenuVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.TitleVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.MenuListVO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface IBIMS005BMapper {
    public List<MenuListVO> selectMenuList(String menuNm);    // 메뉴별권한관리 메뉴명 조회
    
    public List<IBIMS005BVO> selectAuthCodeMenu(String rghtCd);
    
    public List<MainMenuVo> selectMainMenuList(String menuNm);  // 메뉴관리 메뉴명 조회 

	public List<MainMenuVo> selectSubMenuList(String menuId);	//메뉴관리 하위메뉴 조회

	public int deleteMainMenuInfo(@Param("list")List<String> menuId, @Param("deltEmpno") String deltEmpno);

	public int deleteSubMenuInfo(List<String> menuId);

	public Optional<IBIMS005BVO> getMainMenuInfo(String menuId);

	public int insertMainMenuInfo(MainMenuVo requestDto);

	public int updateMainMenuInfo(MainMenuVo requestDto);

	public Optional<IBIMS005BVO> getSubMenuInfo(String menuId);

	public int insertSubMenuInfo(SubMenuVo requestDto);

	public int updateSubMenuInfo(SubMenuVo requestDto);

	public int updateSubHgRnkMenuId(MainMenuVo requestDto);
	
	public TitleVo getTitle(String menuId);

	public List<IBIMS005BDTO> createRamsNav(String param);

}
