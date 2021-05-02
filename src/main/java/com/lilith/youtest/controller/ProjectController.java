package com.lilith.youtest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.Project;
import com.lilith.youtest.entity.User;
import com.lilith.youtest.service.ProjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @ApiOperation(value = "根据ID查询项目", httpMethod = "GET")
    @GetMapping("/{projectId}")
    public CommonResult getById(@PathVariable("projectId") Integer projectId){
        CommonResult commonResult = null;
        Project project = projectService.getById(projectId);
        commonResult = new CommonResult("1",project,"成功");
        return commonResult;
    }

    @ApiOperation(value = "项目新增方法",httpMethod = "POST")
    @PostMapping("add")
    public CommonResult add(Project project){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        project.setCreateUser(user.getId());
        projectService.save(project);

        return new CommonResult("1","项目添加成功");
    }

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
