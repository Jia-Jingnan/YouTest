package com.lilith.youtest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.Suite;
import com.lilith.youtest.service.SuiteService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-15
 */
@RestController
@RequestMapping("/suite")
public class SuiteController {

    @Autowired
    private SuiteService suiteService;


    @ApiOperation(value = "根据projectId获取测试集", httpMethod = "GET")
    @GetMapping("/list")
    public CommonResult list(String projectId){
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("project_id",projectId);
        List<Suite> list = suiteService.list(queryWrapper);
        return new CommonResult("1",list);
    }



}
