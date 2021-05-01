package com.lilith.youtest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.User;
import com.lilith.youtest.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

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
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // 注册方法
    @ApiOperation(value = "注册方法", httpMethod = "POST")
    @PostMapping("register")
    public CommonResult register(User user){

        // 调用业务层方法，插入到数据库中
        user.setRegtime(new Date());
        userService.save(user);
        return new CommonResult("1","注册成功");
    }


    // 帐号查重方法
    @ApiOperation(value = "帐号查重方法", httpMethod = "GET")
    @GetMapping("find")
    public CommonResult find(String username){
        CommonResult commonResult = null;

        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.setEntity(username);
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
}
