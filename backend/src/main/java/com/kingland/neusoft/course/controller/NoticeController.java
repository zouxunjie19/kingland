package com.kingland.neusoft.course.controller;


import com.kingland.neusoft.course.mapper.NoticeMapper;
import com.kingland.neusoft.course.mapper.dao.Dialogue;
import com.kingland.neusoft.course.mapper.dao.Notice;
import com.kingland.neusoft.course.service.NoticeService;
import com.kingland.neusoft.course.util.tools;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class NoticeController {
    private final NoticeMapper noticeMapper;
    private final NoticeService noticeService;

    public NoticeController(NoticeMapper noticeMapper, NoticeService noticeService) {
        this.noticeMapper = noticeMapper;
        this.noticeService = noticeService;
    }
    @GetMapping("/notice")//浏览器输入地址
    public List<Notice> getNoticeList(){
        return noticeService.getAllNotice();
    }

    @PostMapping("/notice/add")//浏览器输入地址
    public Map<String, Object> addNotice(@RequestBody Map<String, Object> notice) {
        notice.put("time", tools.getNowDate());
        if(noticeService.addNotice(tools.toNoticeModel(notice)) ==0)
            return tools.responseJson(false, null, "新增通知失败");
        else
            return tools.responseJson(true, null, "新增通知成功");
    }
}
