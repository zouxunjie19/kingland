package com.kingland.neusoft.course.controller;

import com.kingland.neusoft.course.mapper.dao.UserModel;
import com.kingland.neusoft.course.service.UserService;
import com.kingland.neusoft.course.util.tools;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

/**
 * The user information related rest api controller
 *
 * @author KSC
 */
@RestController
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Initialize controller with user service bean
     *
     * @param userService service implementation bean
     */
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/users")
    public Map<String, Object> addUser(@RequestBody Map<String, Object> userData) {
        try {
            userData.put("DateBirthday", new SimpleDateFormat("yyyy-MM-dd").parse((String)userData.get("birthday")));
        } catch (ParseException e) {
            return tools.responseJson(false, null, e.getMessage());
        }
        if(userData.get("password") != ""){
            if(userData.get("password").toString().length() <6){
                return tools.responseJson(false, null, "密码必须大于6位数");
            }else if(!userData.get("password").equals(userData.get("confirmPassword"))){
                return tools.responseJson(false, null, "两次密码不相同");
            }
            userData.replace("password", this.passwordEncoder.encode(userData.get("password").toString()));
        }else{
            return tools.responseJson(false, null, "密码不能为空"); 
        }
        if(userService.addUser(tools.toUserModel(userData)) ==0)
            return tools.responseJson(false, null, "新增用户数据失败");
        else 
            return tools.responseJson(true, null, "成功新增用户数据");
    }

    /**
     * Api for counting all users exists in the system
     *
     * @return number of users exists in the system
     */
    @GetMapping("/users/count")
    public Map<String, Integer> countUser() {
        Integer userCount = userService.countUser();
        return Map.of("count", userCount);
    }

    /**
     * Api get all users exists in the system
     *
     * @return all user data
     */
    @GetMapping("/users")
    public List<UserModel> getAllUser() {
        return userService.getAllUser();
    }


    /**
     * Api for counting all users exists in the system
     *
     * @return user id
     */
    @GetMapping("/users/{id}")
    public UserModel getUserById(@PathVariable("id") Long userId) {
        return userService.getUserById(userId);
    }

    /**
     * Api for deleting user by id
     *
     * @return id of deleted user
     */
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAnyAuthority('role_admin')")
    public ResponseEntity deleteUser(@PathVariable("id") Long userId) {
        if (userService.deleteUser(userId) == 1) {
            // 204
            return ResponseEntity.noContent().build();
        } else {
            // 404
            return ResponseEntity.notFound().build();
        }
    }
}
