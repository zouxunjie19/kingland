### 说明

功能 发布通告 通告列表

[java]

    add com/kingland/neusoft/course/mapper/dao/Notice.java
    add com/kingland/neusoft/course/controller/NoticeController.java
    add com/kingland/neusoft/course/mapper/NoticeMapper.java
    add com/kingland/neusoft/course/service/NoticeService.java
    add com/kingland/neusoft/course/mapper/NoticeMapper.xml
    add com/kingland/neusoft/course/util/tools.java;
    [SecurityConfig]
        .antMatchers("/login", "/logout","/notice").permitAll()
    [/SecurityConfig]

[angular]

    add src/app/plugins/notice //通告列表 发布通告
    edit proxy.conf.json //代理请求 4200端口转后台8080端口

[mysql]
```mysql
create table notice
(
    id             serial not null,
    notice_context text   not null,
    notice_time    timestamp(3),
    constraint notice_pk primary key (id)
);

INSERT INTO user_access.notice (id, notice_context, notice_time)
VALUES  (2, '111', '2022-05-25 00:00:00.000');

```
