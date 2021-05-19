package com.lilith.youtest.vo;

import lombok.Data;

/**
 * @Author:JiaJingnan
 * @Date: 上午1:29 2021/5/20
 */
@Data
public class AddApiVO {

    private Integer apiClassificationId;
    private String apiName;
    private String apiRequestMethod;
    private String apiRequestUrl;
    private String apiDesc;
}
