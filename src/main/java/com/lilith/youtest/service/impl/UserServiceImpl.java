package com.lilith.youtest.service.impl;

import com.lilith.youtest.entity.User;
import com.lilith.youtest.mapper.UserMapper;
import com.lilith.youtest.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Jingnan
 * @since 2021-04-29
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
