create table user_access.user
(
    id           bigserial    not null,
    username     varchar(20)  not null,
    password     varchar(100) not null,
    name         text         not null,
    gender       int          not null,
    is_admin     boolean      not null default false,
    birthday     timestamp(3) not null,
    phone_num    varchar(15),
    home_address text,
    constraint user_pk PRIMARY KEY (id),
    constraint username_unique unique (username)
);

create table notice
(
    id             serial not null
    constraint notice_pk primary key,
    notice_context text   not null,
    notice_time    timestamp(3)
);

create table dialogue
(
    id           serial not null
    constraint dialogue_pkprimary key,
    context      text,
    context_time timestamp(3)
);