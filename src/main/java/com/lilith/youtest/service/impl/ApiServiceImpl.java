package com.lilith.youtest.service.impl;

import com.lilith.youtest.entity.Api;
import com.lilith.youtest.mapper.ApiMapper;
import com.lilith.youtest.service.ApiService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

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

}
