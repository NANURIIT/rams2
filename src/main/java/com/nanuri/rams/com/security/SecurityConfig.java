package com.nanuri.rams.com.security;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.nanuri.rams.com.security.handler.AuthenticationAccessDeniedHandler;
import com.nanuri.rams.com.security.handler.AuthenticationLogoutSuccessHandler;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	private final AuthenticationFailureHandler customFailureHandler;

	private final AuthenticationSuccessHandler customSuccessHandler;
	
	private final AuthenticationLogoutSuccessHandler customLogoutSuccessHandler;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}

	@Bean
    public AuthenticationProvider authenticationProvider() {
        return new EmpAuthenticationProvider();
    }

	//정적 자원에 대해서는 Security 적용 안함.
	@Override
    public void configure(WebSecurity web) {
		web.ignoring().mvcMatchers("/sample/**", "/business/**", "/img/**");
		web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
	}

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	CharacterEncodingFilter filter = new CharacterEncodingFilter();
    	filter.setEncoding("UTF-8");
    	filter.setForceEncoding(true);
    	http.addFilterBefore(filter, CsrfFilter.class);

    	http.authorizeRequests()
				.antMatchers("/login", "/", "/**").permitAll()
				.anyRequest().authenticated()
    			.and()
    		.formLogin()
    			.loginPage("/login")
    			.defaultSuccessUrl("/TB02010S", true)
    			.usernameParameter("eno").passwordParameter("pwd")
    			.successHandler(customSuccessHandler)
    			.failureHandler(customFailureHandler)
    			.permitAll()
    			.and()
    		.logout()
    			.logoutUrl("/logout")
	            .logoutSuccessUrl("/")
	            .logoutSuccessHandler(customLogoutSuccessHandler) //로그아웃 성공시 handler
    			.invalidateHttpSession(true);

    	http.csrf().disable();

    	http.sessionManagement()
			.invalidSessionUrl("/login");

    	// 인증 거부 관련 처리
        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler());
	}

    @Configuration
    @EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true, jsr250Enabled = true)
    public class MethodSecurity {

    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    private AccessDeniedHandler accessDeniedHandler() {
    	AuthenticationAccessDeniedHandler accessDeniedHandler = new AuthenticationAccessDeniedHandler();
        accessDeniedHandler.setErrorPage("/denied");
        return accessDeniedHandler;
    }

}
