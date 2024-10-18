package com.nanuri.rams.com.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.nanuri.rams.business.common.mapper.IBIMS999BMapper;

@Component
public class AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	private RedirectStrategy redirectStragtegy = new DefaultRedirectStrategy();

	@Autowired
	private IBIMS999BMapper ibims999bMapper;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

		String defaultUrl = "/TB02010S";

		//에러세션 지우기
		HttpSession session = request.getSession(false);
		if( session != null ) {
			session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
		}
		session = request.getSession();

		redirectStragtegy.sendRedirect(request, response, defaultUrl);

		String bzDd = ibims999bMapper.getFormattedBzDd();

		session.setAttribute("bzDd", bzDd);

		//System.out.println("bzDd::: " + bzDd);
	}

}
