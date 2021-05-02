package com.lilith.youtest.controller;

import com.lilith.youtest.BaseTest;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.Project;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.Assert.*;

/**
 * @Author:JiaJingnan
 * @Date: 下午2:33 2021/5/2
 */
public class ProjectControllerTest extends BaseTest {

    @Autowired
    private ProjectController projectController;

    @Test
    public void list() {
        CommonResult list = projectController.list(11);
        assertEquals("1",list.getStatus());
        System.out.println(list.getData());
    }
}