package com.lilith.youtest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.User;
import com.lilith.youtest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Jingnan
 * @since 2021-04-29
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // 注册方法
    @RequestMapping("register")
    public CommonResult register(User user){

        // 调用业务层方法，插入到数据库中
        user.setRegtime(new Date());
        userService.save(user);
        return new CommonResult("1","注册成功");
    }


    // 帐号查重方法
    @GetMapping("find")
    public CommonResult find(User user){

        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.setEntity(user);
        userService.getOne(queryWrapper);
        return new CommonResult();
    }
}
