package com.lilith.youtest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.Project;
import com.lilith.youtest.service.ProjectService;
import io.swagger.annotations.Api;
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
 * @since 2021-05-02
 */
@RestController
@RequestMapping("/project")
@Api(tags = "项目模块")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @ApiOperation(value = "项目列表", httpMethod = "GET")
    @GetMapping("list")
    public CommonResult list(Integer userId){

        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("create_user",userId);

        List<Project> list = projectService.list(queryWrapper);
        CommonResult commonResult = new CommonResult("1",list,"项目列表");
        return commonResult;



    }


}
