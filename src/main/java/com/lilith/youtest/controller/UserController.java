package com.lilith.youtest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.User;
import com.lilith.youtest.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.*;


/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Jingnan
 * @since 2021-04-29
 */
@Api(tags = "用户模块")
@RestController
@RequestMapping("/user")
//@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // 注册方法
    @ApiOperation(value = "注册方法", httpMethod = "POST")
    @PostMapping("register")
    public CommonResult register(User user){

        // 调用业务层方法，插入到数据库中
        // user.setRegtime(new Date());
        userService.save(user);
        return new CommonResult("1","注册成功");
    }


    // 帐号查重方法
    @ApiOperation(value = "帐号查重方法", httpMethod = "GET")
    @GetMapping("find")
    public CommonResult find(String username){
        CommonResult commonResult = null;

        QueryWrapper queryWrapper = new QueryWrapper();
        // 设置查询条件，username列等于传入的username参数
        queryWrapper.eq("username",username);
        User user = userService.getOne(queryWrapper);
        if (user == null){
            commonResult = new CommonResult("1","帐号不存在");
        } else {
            commonResult = new CommonResult("0","帐号已存在");
        }
        return commonResult;
    }

    @ApiOperation(value = "登陆方法",httpMethod = "POST")
    @PostMapping("login")
    public CommonResult login(User user){
        CommonResult commonResult = null;
        try {
            UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(),user.getPassword());
            // 通过shiro进行安全验证
            Subject subject = SecurityUtils.getSubject();
            // 验证逻辑
            subject.login(token);
            // 将sessionid返回
            String sessionId = (String) SecurityUtils.getSubject().getSession().getId();
            User loginUser = (User) subject.getPrincipal();
            commonResult = new CommonResult("1",loginUser.getId(),sessionId);
        } catch (AuthenticationException e){
            if (e instanceof UnknownAccountException){
                commonResult = new CommonResult("0","用户名错误");
            } else {
                commonResult = new CommonResult("0","密码错误");
            }
            e.printStackTrace();
        }
        return commonResult;

    }

    @ApiOperation(value = "登出方法",httpMethod = "GET")
    @GetMapping("logout")
    public CommonResult logout(){
        CommonResult commonResult = null;
        // 从shiro中退出登陆
        SecurityUtils.getSubject().logout();
        commonResult = new CommonResult("1","帐号未登陆");
        return commonResult;
    }
}
