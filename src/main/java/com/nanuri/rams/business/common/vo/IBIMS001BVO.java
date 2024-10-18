package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 공통코드그룹 VO
 */
public class IBIMS001BVO extends IBIMS001BDTO {
	
	private String         rgstEmpnm;         // 등록사원명
	private String         hndEmpnm;          // 조작사원명
	
    private String 		   oldCmnsCdGrp;	  // 공통코드그룹
}