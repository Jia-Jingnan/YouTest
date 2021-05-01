package com.lilith.youtest.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @Author:JiaJingnan
 * @Date: 下午8:44 2021/5/1
 */
@Component
public class YoutestMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        // 注册接口的regtime字段自动填充
        this.setFieldValByName("regtime",new Date(), metaObject);

    }

    @Override
    public void updateFill(MetaObject metaObject) {

    }
}
