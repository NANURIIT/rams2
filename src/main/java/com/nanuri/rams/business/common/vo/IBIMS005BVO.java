package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;

import com.nanuri.rams.business.common.dto.RAA93BDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
/*
 * 메뉴기본 Table.IBIMS005B VO
 * */
public class IBIMS005BVO {
    
    @Getter
    @Setter
    public static class MenuListVO extends IBIMS005BDTO {
        private int rowNum;
        private String menuName;
        private String lv1Id;
        private String lv2Id;
        private String lv3Id;
    }
    
    @Getter
    @Setter
    public static class MainMenuVo extends IBIMS005BDTO {
    	private String oldMenuId;		/* 변경전 상위메뉴ID*/
    	private String hndEmpNm;
    }
    
    @Getter
    @Setter
    @ToString
    public static class SubMenuVo extends IBIMS005BDTO {
    	private String oldSubMenuId;	/* 변경전 하위메뉴ID*/
    	private String hndEmpNm;
    }

    @Getter
    @Setter
    public static class TitleVo extends IBIMS005BDTO {
        private String title;	/* 변경전 하위메뉴ID*/
        private String hgTitle;
    }
    
    private int sortNo;
    private String menuId;
    private String menuNm;
    private String rghtCd;
    private String menuLvl;
    private String dltF;
    private String mdfyRghtCcd;
    private String hndDetlDtm;
    private String hndlEmpno;
    private String hndEmpNm;
    private String hndlDprtCd;
    
    
}
