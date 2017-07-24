package com.example.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.InetOrgPerson;
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
    public static final String NO_ROLE = "NO_ROLE";
    public static final String NO_ACCESS = "NO_ACCESS";

    @Value("${ad.authority.admintool}")
    private String ZEPPELIN_ADMIN_AUTHORITY;

    static {
        USER_TO_ROLES.put("vfilonenko", Arrays.asList("SYSTEM PROPERTIES, READ", "SYSTEM PROPERTIES, WRITE"));
        USER_TO_ROLES.put("jsmith", Arrays.asList("SYSTEM PROPERTIES, READ"));
    }

    @RequestMapping(value="/user", method = RequestMethod.GET)
    @ResponseBody
    public InetOrgPerson getUser() {
        InetOrgPerson user = (InetOrgPerson) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user;
    }

    @RequestMapping(value="/user/roles", method = RequestMethod.GET)
    @ResponseBody
    public Object[] getUserRoles() {
        LdapUserDetailsImpl user = (LdapUserDetailsImpl ) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Boolean zeppelinAdminAccess = user.getAuthorities().contains(new SimpleGrantedAuthority(ZEPPELIN_ADMIN_AUTHORITY));
        if (zeppelinAdminAccess) {
            return Optional.ofNullable(USER_TO_ROLES.get(user.getUsername())).orElse(Collections.singletonList(NO_ROLE)).toArray();
        } else {
            return Collections.singletonList(NO_ACCESS).toArray();
        }
    }
}
