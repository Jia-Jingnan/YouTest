package com.lilith.youtest.shiro;

import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Author:JiaJingnan
 * @Date: 下午7:58 2021/5/1
 * shiro配置
 */
@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager) {

        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        // 拦截器.
        Map<String, String> filterChainDefinitionMap = new LinkedHashMap<String, String>();
        // 配置不会被拦截的链接 顺序判断

        filterChainDefinitionMap.put("/user/login", "anon");
        filterChainDefinitionMap.put("/user/find", "anon");
        filterChainDefinitionMap.put("/user/register", "anon");

        // 放行，anno表示放行
        filterChainDefinitionMap.put("/swagger-ui.html", "anon");
        filterChainDefinitionMap.put("/swagger/**", "anon");
        filterChainDefinitionMap.put("/swagger-resources/**", "anon");
        filterChainDefinitionMap.put("/v2/**", "anon");
        filterChainDefinitionMap.put("/webjars/**", "anon");
        filterChainDefinitionMap.put("/configuration/**", "anon");

        // 过滤链定义，从上向下顺序执行
        // authc:url都必须认证通过才可以访问; anon:url都可以匿名访问
        filterChainDefinitionMap.put("/**", "authc");

        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
        // 如果不设置默认会自动寻找Web工程根目录下的"/login"页面
        shiroFilterFactoryBean.setLoginUrl("/user/unauth");
        return shiroFilterFactoryBean;
    }

    // 重新设置SecurityManager，通过自动以的MyRealm完成登录校验：
    @Bean
    public MyRealm myReal() {
        return new MyRealm();
    }

    @Bean
    public SecurityManager securityManager(MyRealm myReal) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        //自定义session管理
        securityManager.setSessionManager(sessionManager());
        // 设置realm
        securityManager.setRealm(myReal);
        return securityManager;
    }

    @Bean
    public SessionManager sessionManager() {
        CustomSessionManager manager = new CustomSessionManager();
        manager.setSessionDAO(new EnterpriseCacheSessionDAO());
        return manager;
    }
}

