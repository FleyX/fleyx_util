create table plan
(
    createdDate     bigint       not null,
    updatedDate     bigint       not null,
    planId          integer auto_increment,
    planName        varchar(100) not null,
    description     varchar(200) not null, sourcePath      varchar(200) not null,
    targetPath      varchar(200) null,
    launchInterval  int          null comment '发起间隔',
    nextLaunchTime  bigint       not null comment '下次执行时间',
    latestHistoryId int          null comment '最近一次备份id',
    ignoreList      varchar(400) null comment '忽略列表',
    holdHistory     int          null comment '保留多少份数据（最低1）',
    constraint plan_pk primary key (planId)
) comment '备份计划表';

create index plan_createdDate_index on plan (createdDate);

create table history
(
    createdDate bigint       not null,
    updatedDate bigint       not null,
    historyId   integer auto_increment,
    planId      INTEGER      NOT NULL,
    fileNum     varchar(100) not null,
    fileSize    varchar(200) not null,
    speed       varchar(200) not null,
    startTime   varchar(200) null,
    endTime     int          null,
    comment     bigint       not null,
    constraint history_pk primary key (historyId)
) comment '部署历史表';

create index history_planId_index on history (planId);

