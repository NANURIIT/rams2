package com.nanuri.rams.business.assessment.tb10.tb10410;

import com.nanuri.rams.business.common.vo.IBIMS005BVO.MainMenuVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.SubMenuVo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TB10410Service {
	
	public List<MainMenuVo> selectMainMenuList(String menuNm);

	public List<MainMenuVo> selectSubMenuList(String menuId);

	public boolean deleteMainMenuInfo(List<String> menuId);

	public boolean deleteSubMenuInfo(List<String> menuId);

	public boolean registMainMenuInfo(List<MainMenuVo> requestDtos);

	public boolean registSubMenuInfo(List<SubMenuVo> requestDtos);

}
