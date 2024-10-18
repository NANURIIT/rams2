package com.nanuri.rams.business.assessment.tb10.tb10720;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS998BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB10720S")
@RequiredArgsConstructor
@RestController
public class TB10720APIController {

    private final TB10720Service tb10720svc;

    // 마감기본 영업일 기준 조회
    @PostMapping("/selectTB10720S")
    public IBIMS998BVO selectTB10720S(@RequestBody IBIMS998BVO input) {
        return tb10720svc.selectTB10720S(input);
    }
    
    // 마감관리 개시/마감 실행
    @PostMapping("/updateTB10720S")
    public int updateTB10720S(@RequestBody IBIMS998BVO input) {
        return tb10720svc.updateTB10720S(input);
    }
    
}