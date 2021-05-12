package com.lilith.youtest.vo;

import lombok.Data;

/**
 * @Author:JiaJingnan
 * @Date: 下午6:17 2021/5/12
 * 调用api返回结果的封装
 *
 */
@Data
public class ApiResponseVO {

    private String statusCode;
    private String headers;
    private String body;
}
