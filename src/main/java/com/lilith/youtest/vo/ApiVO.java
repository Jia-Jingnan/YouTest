package com.lilith.youtest.vo;

import com.lilith.youtest.entity.Api;
import com.lilith.youtest.entity.ApiRequestParam;
import lombok.Data;

import java.util.List;

/**
 * @Author:JiaJingnan
 * @Date: 上午1:51 2021/5/7
 */
@Data
public class ApiVO extends Api {

    private String createUserName;
    private String host;

    private List<ApiRequestParam> requestParams;
    private List<ApiRequestParam> queryParams;
    private List<ApiRequestParam> bodyParams;
    private List<ApiRequestParam> headerParams;
    private List<ApiRequestParam> bodyRawParams;

}
