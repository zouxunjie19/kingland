package com.kingland.neusoft.course.service;

import com.kingland.neusoft.course.mapper.NoticeMapper;
import com.kingland.neusoft.course.mapper.dao.Notice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {
    private final NoticeMapper noticeMapper;

    public NoticeService(NoticeMapper noticeMapper) {
        this.noticeMapper = noticeMapper;
    }

    public List<Notice> getAllNotice() {
        return this.noticeMapper.query();
    }

    public int addNotice(Notice notice){
        return  noticeMapper.insert(notice);
    }

}
