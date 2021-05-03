package com.lilith.youtest.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="Api对象", description="")
public class Api implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "主键id")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "接口分类编号")
    private Integer apiClassificationId;

    @ApiModelProperty(value = "接口名称")
    private String name;

    @ApiModelProperty(value = "接口请求方法")
    private String method;

    @ApiModelProperty(value = "接口请求URL地址")
    private String url;

    @ApiModelProperty(value = "接口描述")
    private String description;

    @ApiModelProperty(value = "创建人")
    private String createUser;

    @ApiModelProperty(value = "创建时间")
    private Date createTime;


}
