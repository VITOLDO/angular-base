package com.example.app;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by vfilonenko on 13.07.2017.
 */
@Controller
public class UserController {

    @RequestMapping(value="/user", method = RequestMethod.GET)
    public String getUser() {
        LdapUserDetailsImpl user = (LdapUserDetailsImpl ) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getUsername();
    }
}
