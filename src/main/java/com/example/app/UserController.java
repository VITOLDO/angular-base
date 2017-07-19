package com.example.app;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by vfilonenko on 13.07.2017.
 */
@Controller
public class UserController {

    @RequestMapping(value="/user", method = RequestMethod.GET)
    @ResponseBody
    public String getUser() {
        LdapUserDetailsImpl user = (LdapUserDetailsImpl ) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getUsername();
    }

    @RequestMapping(value="/user/roles", method = RequestMethod.GET)
    @ResponseBody
    public Object[] getUserRoles() {
        List<String> strings = new ArrayList<>();
        strings.add("SYSTEM PROPERTIES, READ");
        strings.add("SYSTEM PROPERTIES, WRITE");
        return strings.toArray();
    }
}
