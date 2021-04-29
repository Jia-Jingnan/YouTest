package com.lilith.youtest.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author:JiaJingnan
 * @Date: 下午9:37 2021/4/29、
 * 通用返回对象
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonResult {

    public String status;
    public Object data;
    public String message;

    public CommonResult(String status, Object data){
        this.status = status;
        this.data = data;
    }

    public CommonResult(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
