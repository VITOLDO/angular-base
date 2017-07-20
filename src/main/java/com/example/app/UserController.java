package com.example.app;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * Created by vfilonenko on 13.07.2017.
 */
@Controller
public class UserController {

    public static final Map<String, List<String>> USER_TO_ROLES = new HashMap<String, List<String>>();
    static {
        USER_TO_ROLES.put("Viktor Filonenko", Arrays.asList("SYSTEM PROPERTIES, READ", "SYSTEM PROPERTIES, WRITE"));
        USER_TO_ROLES.put("John Smith", Arrays.asList("SYSTEM PROPERTIES, READ"));
    }

    @RequestMapping(value="/user", method = RequestMethod.GET)
    @ResponseBody
    public String getUser() {
        LdapUserDetailsImpl user = (LdapUserDetailsImpl ) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getUsername();
    }

    @RequestMapping(value="/user/roles", method = RequestMethod.GET)
    @ResponseBody
    public Object[] getUserRoles() {
        LdapUserDetailsImpl user = (LdapUserDetailsImpl ) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return USER_TO_ROLES.get(user.getUsername()).toArray();
    }
}
