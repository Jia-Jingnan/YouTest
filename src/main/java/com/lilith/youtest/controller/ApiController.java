package com.lilith.youtest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.service.ApiService;
import com.lilith.youtest.vo.ApiListVO;
import com.lilith.youtest.vo.ApiVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
@RestController
@RequestMapping("/api")
@Api(tags = "Api模块")
public class ApiController {

    @Autowired
    private ApiService apiService;

    //todo 添加接口（查询接口分类的name）

    //todo 删除接口

    //todo 根据id查询api

    @ApiOperation(value = "根据id查询api及创建人信息", httpMethod = "GET")
    @GetMapping("/toApiView")
    public CommonResult findApiViewVO(Integer apiId){
        ApiVO api = apiService.findApiViewVO(apiId);
        return new CommonResult("1",api);
    }

//    @ApiOperation(value = "根据id查询api", httpMethod = "POST")
//    @PostMapping("/findApi")
//    public CommonResult findApi(Integer apiId){
//        QueryWrapper queryWrapper = new QueryWrapper();
//        queryWrapper.eq("id",apiId);
//        com.lilith.youtest.entity.Api api = apiService.getOne(queryWrapper);
//        return new CommonResult("1",api);
//    }

    @ApiOperation(value = "查询分类下的所有接口",httpMethod = "GET")
    @GetMapping("/showApiListByClassificationId")
    public CommonResult showApiListByApiClassification(Integer apiClassificationId){

        List<ApiListVO> apiListVOList = apiService.showApiListByApiClassification(apiClassificationId);
        return new CommonResult("1", apiListVOList);
    }

    @ApiOperation(value = "查询项目下的所有接口", httpMethod = "GET")
    @GetMapping("/showApiListByProject")
    public CommonResult showApiListByProject(Integer projectId){

        List<ApiListVO> apiListVOList = apiService.showApiListByProject(projectId);
        return new CommonResult("1",apiListVOList);
    }


}
