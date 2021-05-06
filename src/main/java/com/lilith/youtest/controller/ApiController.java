package com.lilith.youtest.controller;


import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.service.ApiService;
import com.lilith.youtest.vo.ApiListVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
