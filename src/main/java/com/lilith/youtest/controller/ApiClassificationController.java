package com.lilith.youtest.controller;


import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.ApiClassification;
import com.lilith.youtest.service.ApiClassificationService;
import com.lilith.youtest.vo.ApiClassificationVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import javax.xml.transform.Result;
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
@RequestMapping("/apiClassification")
@Api(tags = "分类模块")
public class ApiClassificationController {

    @Autowired
    private ApiClassificationService apiClassificationService;

    //todo 添加接口分类，单表操作
    @ApiOperation(value = "增加接口分类", httpMethod = "POST")
    @PostMapping("add")
    public CommonResult add(ApiClassification apiClassification,Integer projectId){
        if (projectId != null){
            apiClassification.setProjectId(projectId);
            apiClassificationService.save(apiClassification);
            return new CommonResult("1",apiClassification,"添加成功");
        } else {
            return new CommonResult("0","缺少项目ID");
        }
    }

    @ApiOperation(value = "查询所有分类下的接口", httpMethod = "GET")
    @GetMapping("/toIndex")
    public CommonResult getWithApi(Integer projectId, Integer tab) {
        CommonResult commonResult = null;
        if (tab == 1) {
            // 接口列表
            List<ApiClassificationVO> list = apiClassificationService.getWithApi(projectId);
            commonResult = new CommonResult("1", list, "查询分类同时延迟加载API列表");
        } else {
            // 测试集合
        }
        return commonResult;
    }

}
