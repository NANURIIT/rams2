package com.nanuri.rams.business.assessment.tb10.tb10310;

import com.nanuri.rams.business.common.vo.IBIMS005BVO.MenuListVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.selectUseMenuVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class TB10310APIController {
	
	private final TB10310Service service;

	/* 메뉴명 조회 */
	@GetMapping(value = "/findMenu")
	public List<MenuListVO> getMethodName(String menuNm) {
		return service.getMenuList(menuNm);
	}

	/* 권한별 메뉴화면 사용권한 조회 */
	@GetMapping(value="/menuByAuth")
	public List<IBIMS006BVO> menuByAuth(MenuListVO paramData) {
		return service.getMenuByAuth(paramData);
	}

	/* RAA95B 수정 조회 가능 여부 조회 */
	@GetMapping(value="/checkAvailableMenu")
	public List<selectUseMenuVO> getAvailableMenu(@RequestParam Map<String, String> menuId) {
		return service.getAvailableMenu(menuId);
	}

	/* RAA95B 조회, 수정 가능 여부 저장 */
	@PatchMapping(value="/saveUseMenu")
	public boolean registUseMenu(@RequestBody ArrayList<selectUseMenuVO> dtoList) {
		return service.registUseMenu(dtoList);
	}

}
