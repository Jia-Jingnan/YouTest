package com.lilith.youtest.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.User;
import com.lilith.youtest.service.ApiRequestParamService;
import com.lilith.youtest.service.ApiService;
import com.lilith.youtest.vo.ApiListVO;
import com.lilith.youtest.vo.ApiResponseVO;
import com.lilith.youtest.vo.ApiVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
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
@RequestMapping("/api")
@Api(tags = "Api模块")
public class ApiController {

    @Autowired
    private ApiService apiService;

    @Autowired
    private ApiRequestParamService apiRequestParamService;


    @ApiOperation(value = "添加Api方法", httpMethod = "POST")
    @PostMapping("/add")
    public CommonResult add(Integer apiClassificationId, @RequestParam("name") String apiName, @RequestParam("method")String apiRequestMethod, @RequestParam("url")String apiRequestUrl, @RequestParam("description")String apiDescription){
        com.lilith.youtest.entity.Api api = new com.lilith.youtest.entity.Api();
        api.setApiClassificationId(apiClassificationId);
        api.setName(apiName);
        api.setMethod(apiRequestMethod);
        api.setUrl(apiRequestUrl);
        User user =(User) SecurityUtils.getSubject().getPrincipal();
        api.setCreateUser(user.getId());
        api.setCreateTime(new Date());
        apiService.save(api);
        CommonResult result = new CommonResult("1","新增成功");
        return result;

    }

    //todo 删除接口

    @ApiOperation(value = "接口运行方法", httpMethod = "POST")
    @PostMapping("/run")
    public CommonResult run(ApiVO apiRunVO) throws JsonProcessingException {

        ApiResponseVO apiRunResult = apiService.run(apiRunVO);

        return new CommonResult("1",apiRunResult,"请求成功");
    }

    @ApiOperation(value = "编辑接口方法",httpMethod = "PUT")
    @PutMapping("/edit")
    public CommonResult toApiEdit(ApiVO apiEdit){
        //1.直接根据apiId进行更新
        apiService.updateById(apiEdit);
        //2.删除原来的数据
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("api_id",apiEdit.getId());
        apiRequestParamService.remove(queryWrapper);
        //3.插入新的数据
        apiEdit.getRequestParams().addAll(apiEdit.getQueryParams());
        apiEdit.getRequestParams().addAll(apiEdit.getBodyParams());
        apiEdit.getRequestParams().addAll(apiEdit.getBodyRawParams());
        apiEdit.getRequestParams().addAll(apiEdit.getHeaderParams());
        apiRequestParamService.saveBatch(apiEdit.getRequestParams());
        return new CommonResult("1","更新成功");

    }


    @ApiOperation(value = "根据id查询api及创建人信息", httpMethod = "GET")
    @GetMapping("/toApiView")
    public CommonResult findApiViewVO(Integer apiId){
        ApiVO api = apiService.findApiViewVO(apiId);
        return new CommonResult("1",api);
    }


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
