package com.lilith.youtest.service.impl;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lilith.youtest.entity.Api;
import com.lilith.youtest.entity.ApiRequestParam;
import com.lilith.youtest.mapper.ApiMapper;
import com.lilith.youtest.service.ApiService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lilith.youtest.vo.ApiListVO;
import com.lilith.youtest.vo.ApiResponseVO;
import com.lilith.youtest.vo.ApiVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import sun.plugin.javascript.navig.Link;

import java.net.URL;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
@Service
public class ApiServiceImpl extends ServiceImpl<ApiMapper, Api> implements ApiService {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public ApiVO findApiViewVO(Integer apiId) {
        return apiMapper.findApiViewVO(apiId);
    }

    @Override
    public ApiResponseVO run(ApiVO apiRunVO) throws JsonProcessingException {

        String url = apiRunVO.getHost() + apiRunVO.getUrl();
        // URL url1 = new URL(url);
        String method = apiRunVO.getMethod();
        List<ApiRequestParam> list = apiRunVO.getRequestParams();
        LinkedMultiValueMap<String,String> headers = new LinkedMultiValueMap<>();
        LinkedMultiValueMap<String,String> bodyParams = new LinkedMultiValueMap<>();

        for (ApiRequestParam apiRequestParam : list){
            if (apiRequestParam.getType() == 3){ // 头
                headers.add(apiRequestParam.getName(),apiRequestParam.getValue());
            } else { // body
                // type=2，4  如果此时type=1没有处理
                bodyParams.add(apiRequestParam.getName(),apiRequestParam.getValue());
            }
        }
        HttpEntity httpEntity = null;
        ResponseEntity responseEntity = null;
        ApiResponseVO apiResponseVO = new ApiResponseVO();

        // 远程调用接口
        try {
            if ("GET".equalsIgnoreCase(method)){
                httpEntity = new HttpEntity(headers);
                responseEntity = restTemplate.exchange(url, HttpMethod.GET,httpEntity,String.class);
                apiResponseVO.setStatusCode(responseEntity.getStatusCodeValue() + "");
                HttpHeaders headersResult = responseEntity.getHeaders();
                // 将java转成json
                // apiResponseVO.setHeaders(new ObjectMapper().writeValueAsString(headersResult));
                apiResponseVO.setHeaders(JSON.toJSONString(headersResult));
                apiResponseVO.setBody(responseEntity.getBody().toString());
            } else if ("POST".equalsIgnoreCase(method)){
                httpEntity = new HttpEntity(bodyParams,headers);
                responseEntity = restTemplate.exchange(url,HttpMethod.POST,httpEntity,String.class);
            }
        } catch (HttpStatusCodeException e) {
            e.printStackTrace();
            // 注意此时有调用异常情况需要处理，异常可能没有body
            apiResponseVO.setStatusCode(e.getStatusCode() + "");
            apiResponseVO.setHeaders(JSON.toJSONString(e.getResponseHeaders()));
            apiResponseVO.setBody(e.getResponseBodyAsString());
        }
        return apiResponseVO;
    }

    @Autowired
    private ApiMapper apiMapper;

    @Override
    public List<ApiListVO> showApiListByApiClassification(Integer apiClassificationId) {
        return apiMapper.showApiListByApiClassification(apiClassificationId);
    }

    @Override
    public List<ApiListVO> showApiListByProject(Integer projectId) {

        return apiMapper.showApiListByProject(projectId);
    }
}
