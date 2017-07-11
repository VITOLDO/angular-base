package com.example.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.encoding.LdapShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;

import java.util.Arrays;

/**
 * Created by vfilonenko on 10.07.2017.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${ad.domain}")
    private String AD_DOMAIN;

    @Value("${ad.url}")
    private String AD_URL;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests().anyRequest()
                .fullyAuthenticated().and().formLogin();
                /*.authenticated()
                    .and().httpBasic();
        http.requiresChannel().anyRequest().requiresSecure();
        http.portMapper().http(8080).mapsTo(8443);*/
    }

    @Override
    public void configure(AuthenticationManagerBuilder authManagerBuilder) throws Exception {
        /*authManagerBuilder
                .authenticationProvider(activeDirectoryLdapAuthenticationProvider())
                .userDetailsService(userDetailsService());*/

        authManagerBuilder
                .ldapAuthentication()
                    .userDnPatterns("cn=admin")
                    .userSearchBase("dc=example,dc=org")
                    .userSearchFilter("(objectClass=*)")
                    .contextSource(contextSource())
                    .passwordCompare()
                        .passwordEncoder(new LdapShaPasswordEncoder())
                        .passwordAttribute("userPassword:");
    }

    @Bean
    public DefaultSpringSecurityContextSource contextSource() {
        return  new DefaultSpringSecurityContextSource(Arrays.asList(AD_URL), AD_DOMAIN);
    }

    /*@Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(Arrays.asList(activeDirectoryLdapAuthenticationProvider()));
    }

    @Bean
    public AuthenticationProvider activeDirectoryLdapAuthenticationProvider() {
        ActiveDirectoryLdapAuthenticationProvider provider = new ActiveDirectoryLdapAuthenticationProvider(AD_DOMAIN, AD_URL);
        provider.setConvertSubErrorCodesToExceptions(true);
        provider.setUseAuthenticationRequestCredentials(true);

        return provider;
    }*/
}
