package com.nanuri.rams.business.common;

import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@Controller
public class CommonController {
    
    static final String lv1Path = "business/";

    private final CommonService commonService;
    private final AuthenticationFacade facade;

    // 화면이동
    @GetMapping(value = "/{urlNm}")
    public String getPath(Model model, @PathVariable String urlNm, HttpSession session) {
        String path = lv1Path + urlNm.substring(0,2).toLowerCase() + "/" + urlNm;
        log.debug("call html path : " + path);
        IBIMS005BVO.TitleVo vo = commonService.getTitle(urlNm);
        model.addAttribute("title", vo);

        List<Map<String, Object>> menuListM = commonService.getMenuListM(facade.getDetails().getRghtCd());
        List<Map<String, Object>> menuList = commonService.getMenuList(facade.getDetails().getRghtCd());
        Map<String, Object> userAuth = commonService.getUserAuth();

        model.addAttribute("menuListM", menuListM); // 화면권한리스트
        model.addAttribute("menuList", menuList); // 화면권한리스트
        model.addAttribute("userAuth", userAuth); // 접속자 정보

        // 세션에서 bzDd 값을 가져와 모델에 추가
        String bzDd = (String) session.getAttribute("bzDd");
        model.addAttribute("bzDd", bzDd);

        return path;
    }
}