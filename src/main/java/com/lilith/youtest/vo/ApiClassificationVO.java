package com.lilith.youtest.vo;

import com.lilith.youtest.entity.Api;
import com.lilith.youtest.entity.ApiClassification;
import lombok.Data;

import java.util.List;

/**
 * @Author:JiaJingnan
 * @Date: 下午5:53 2021/5/3
 */
@Data
public class ApiClassificationVO extends ApiClassification {

    // 关联对象
    List<Api> apis;

}
