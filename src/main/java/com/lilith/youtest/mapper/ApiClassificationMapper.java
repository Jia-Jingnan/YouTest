package com.lilith.youtest.mapper;

import com.lilith.youtest.entity.ApiClassification;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lilith.youtest.vo.ApiClassificationVO;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.type.JdbcType;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
public interface ApiClassificationMapper extends BaseMapper<ApiClassification> {

    // 两表 延迟加载 先查询分类信息List<Api> 按需加载（即此时再查询另外一张表）
    @Select("SELECT * FROM api_classification WHERE project_id = #{projectId}")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "project_id", property = "projectId"),
            @Result(column = "name", property = "name"),
            @Result(column = "id", property = "apis",many = @Many(select = "com.lilith.youtest.ApiMapper.findApi")),
    })
    List<ApiClassificationVO> getWithApi(Integer projectId);
}
