package com.lilith.youtest.controller;

import com.lilith.youtest.BaseTest;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;

import static org.junit.Assert.*;

/**
 * @Author:JiaJingnan
 * @Date: 下午6:13 2021/5/1
 */
public class UserControllerTest extends BaseTest {

    @Autowired
    private UserController userController;

    @Test
    public void register() {
        User user = new User();
        user.setUsername("001");
        user.setPassword("12345");
        user.setRegtime(new Date());
        CommonResult commonResult = userController.register(user);
        assertEquals("1",commonResult.getStatus());
    }

    @Test
    public void find() {
        User user = new User();
        user.setUsername("001");
        user.setPassword("12345");
        user.setRegtime(new Date());
        CommonResult commonResult = userController.find(user);
        assertEquals("1",commonResult.getStatus());

    }
}