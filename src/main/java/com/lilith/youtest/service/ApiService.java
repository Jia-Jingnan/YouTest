package com.lilith.youtest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lilith.youtest.entity.Api;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lilith.youtest.vo.ApiListVO;
import com.lilith.youtest.vo.ApiResponseVO;
import com.lilith.youtest.vo.ApiVO;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
public interface ApiService extends IService<Api> {

    List<ApiListVO> showApiListByProject(Integer projectId);

    List<ApiListVO> showApiListByApiClassification(Integer apiClassificationId);

    ApiVO findApiViewVO(Integer apiId);

    ApiResponseVO run(ApiVO apiRunVO) throws JsonProcessingException;
}
