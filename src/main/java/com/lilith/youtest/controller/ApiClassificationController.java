package com.lilith.youtest.controller;


import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.ApiClassification;
import com.lilith.youtest.service.ApiClassificationService;
import com.lilith.youtest.vo.ApiClassificationVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.transform.Result;
import java.util.Date;
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

    //todo 搜索接口或分类的方法，使用模糊查询

    //todo 编辑分类方法

    @ApiOperation(value = "删除分类",httpMethod = "DELETE")
    @DeleteMapping("/{apiClassification}")
    public CommonResult delete(@PathVariable("id") Integer apiClassificationId){
        CommonResult commonResult = null;
        if (apiClassificationId != null){
            apiClassificationService.removeById(apiClassificationId);
            commonResult = new CommonResult("1","删除成功");
            return commonResult;
        } else {
            commonResult = new CommonResult("0","分类ID为空");
            return commonResult;
        }


    }



    @ApiOperation(value = "增加接口分类", httpMethod = "POST")
    @PostMapping("/{projectId}")
    public CommonResult add(String name,@PathVariable("projectId") Integer projectId){
        if (projectId != null){
            ApiClassification apiClassification = new ApiClassification();
            apiClassification.setName(name);
            apiClassification.setProjectId(projectId);
            apiClassification.setCreateTime(new Date());
            apiClassificationService.save(apiClassification);
            return new CommonResult("1",apiClassification,"新增成功");
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
