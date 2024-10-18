package com.nanuri.rams.business.assessment.tb07.tb07180;


import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS421BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07180S")
@RequiredArgsConstructor
@RestController
public class TB07180APIController {
	
	private final TB07180Service tb07180Service;

	@PostMapping(value = "/IBIMS421BSelect")
	public List<IBIMS421BDTO> IBIMS421BSelect(@RequestBody String param) {
		return tb07180Service.IBIMS421BSelect(param);
	}
	
	@PostMapping(value = "/IBIMS421BInsert")
	public int IBIMS421BInsert(@RequestBody IBIMS421BDTO param){
		return tb07180Service.IBIMS421BInsert(param);
	};

	@PostMapping(value = "/IBIMS421BUpdate")
	public int IBIMS421BUpdate(@RequestBody IBIMS421BDTO param){
		return tb07180Service.IBIMS421BUpdate(param);
	};

	@PostMapping(value = "/IBIMS421BDelete")
	public int IBIMS421BDelete(@RequestBody IBIMS421BDTO param){
		return tb07180Service.IBIMS421BDelete(param);
	};
}
