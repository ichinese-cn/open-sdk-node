// Generated from docs/api/open-api.yaml (openapi-typescript, via packages/contracts) — do not edit.
export interface paths {
    "/auth/app_access_token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 取应用令牌
         * @description 用 App ID 和 App Secret 换应用令牌。网关按 `app_id` 的区前缀转到应用所在区。
         */
        post: operations["getAppAccessToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/tenant_access_token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 取机构令牌
         * @description 机构装了应用（并且应用的这个版本对它可用）才给。网关按 `tenant_key` 的区前缀转到机构所在区；应用在别的区时，
         *     机构所在区去应用所在区核对 App Secret。令牌里的权限是机构管理员批了的那些（随时可能被撤销）。
         *     `tenant_key` 在 `app.installed` 事件和开发者后台里能看到。
         */
        post: operations["getTenantAccessToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/exchange_auth_code": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 授权码换用户令牌（网页免登）
         * @description 应用后端用前端拿到的授权码换用户令牌和 `open_id`（同一个人在同一个应用里的 `open_id` 不变，在不同应用里不同）。
         *     两种码都接受：
         *     - **网页免登的授权码**：应用网页在桌面端或手机 App 里调 JS SDK 的 `requestAuthCode()` 拿到，带区前缀、
         *       5 分钟、只能用一次、绑定这个应用和页面来源；不用传 `redirect_uri`。
         *     - **标准 OIDC 的授权码**：普通浏览器里 JS SDK 退回签发方 `/auth`（先 `prompt=none` 静默）拿到的码；
         *       要传当时的 `redirect_uri`（和登记的一致），公开客户端用了 PKCE 时传 `code_verifier`。
         *     网关按码的区前缀转到用户的归属区。码过期返回 400 `details.reason = code_expired`，用过返回 400 `code_used`，
         *     不是这个应用的码返回 400 `code_invalid`。
         */
        post: operations["exchangeAuthCode"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh_user_token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 刷新用户令牌
         * @description 刷新令牌用一次换一对新的（旧的作废）。用户撤销授权或卸载应用后刷新令牌失效（401 `invalid_token`）。
         */
        post: operations["refreshUserToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/revoke": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 作废一个令牌（用户退出应用时） */
        post: operations["revokeToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 当前用户（用户令牌）
         * @description 总有 `open_id`；`name`、`avatar_url`、`locale` 要用户批了 `profile`。
         */
        get: operations["getUserInfo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tenant": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 装了应用的机构（机构令牌） */
        get: operations["getTenant"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tenant/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 机构成员（通讯录），各区的成员一起列，不暴露区 */
        get: operations["listTenantMembers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tenant/invitations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 邀请成员（对方接受后才加入；和机构后台的邀请一样）
         * @description 响应里的 `invite_link` 是邀请链接，只给这一次，由你的应用发给对方（比如在你的应用里展示、发到你们自己的群）。
         *     邮箱会另外收到一封邀请邮件，手机号不发短信（M6.03）。链接会核对打开的人是不是这个号码或邮箱的主人。
         */
        post: operations["inviteTenantMember"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 班级：机构令牌是机构的全部班级；用户令牌是这个用户教的班级 */
        get: operations["listClasses"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 一个班级 */
        get: operations["getClass"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 花名册（老师和学员） */
        get: operations["listClassMembers"];
        put?: never;
        /**
         * 把本机构的一个成员加进班级（做学员）
         * @description 要是本机构在这个区的成员；别的区的成员要按平台的邀请加入（他们本人同意后才跨区，D2），这里返回 409 `details.reason = member_in_other_region`。
         *     已经在班里返回 409 `already_member`。
         */
        post: operations["addClassMember"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/members/{open_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** 把学员移出班级 */
        delete: operations["removeClassMember"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 班级的课次（时间段内，最多 100 天） */
        get: operations["listClassSessions"];
        put?: never;
        /**
         * 给班级排课次（一次，或按周重复），在线或在本机构的教学点
         * @description 和老师在班级课表里排课一样：查老师在各区的时间（撞了 409 `teacher_busy`），排好的课次进成员的课表、发提醒，
         *     并推 `schedule.session_changed`（`change = scheduled`）。还没上架的班（草稿）排的课次也是草稿，上架时才进课表。
         *     地点：`place` 不传跟着班级的默认地点，`null` 在线，给 `venue_id` 就在这个教学点（必须是班级所属机构的，`note` 写教室）。
         *     教学点还没发布也能排，只是班级上架前要发布；关了或被下架的教学点 409 `venue_unavailable`。
         *     个人老师的班、公开课只能在线（409 `online_only`）。
         */
        post: operations["createClassSessions"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/sessions/{session_id}/place": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * 改一次课（或这一次及同一系列以后的课）的地点
         * @description 和班级课表里「改地点」一样：成员收到通知、不用回复，跟着这些课次的约课地点也改，推 `schedule.session_changed`（`change = place_changed`）。
         *     `place` 为 `null` 改成在线；地点的规则同 `createClassSessions`。已经结束、取消的课次 409 `not_editable`。
         */
        put: operations["setClassSessionPlace"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/sessions/{session_id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 取消一次课（成员收到通知，和课表里取消一样） */
        post: operations["cancelClassSession"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/sessions/{session_id}/reschedule": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 改期一次课 */
        post: operations["rescheduleClassSession"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/sessions/{session_id}/attendance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 一次课的考勤（谁来了、在课堂里待了多久）
         * @description 每个学员一条（老师、助教不列）；没进过课堂的 `attended: false`、`seconds: 0`，正在课堂里的时长算到现在。
         */
        get: operations["getSessionAttendance"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/assignments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 班级的作业和考试
         * @description 作业（含草稿）和考试，新的在前；随堂小测（练习，不限次数）不列。考试的 `due_at` 是截止时间，`max_score` 是总分。
         */
        get: operations["listAssignments"];
        put?: never;
        /** 布置作业（文字说明 + 截止时间；题目在平台里编辑）。用户令牌要是这个班的老师 */
        post: operations["createAssignment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/assignments/{assignment_id}/submissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 一份作业的提交和分数 */
        get: operations["listSubmissions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/assignments/{assignment_id}/submissions/{open_id}/score": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * 回写分数（外部批改的结果），学员收到「成绩已发布」
         * @description 只用于作业。分数超过满分 400；作业被退回重做、等学员再交时 409 `awaiting_resubmission`；学员没交 404 `not_submitted`；
         *     考试按题在平台里批，这里返回 409 `exam_scored_per_question`。
         */
        put: operations["setSubmissionScore"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/grades": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 导出成绩（每个学员每份作业一行） */
        get: operations["exportClassGrades"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/courses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 机构的视频课（机构令牌）或这个用户编写的课（用户令牌） */
        get: operations["listCourses"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/courses/{course_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 课程大纲（章节和课时的标题、顺序） */
        get: operations["getCourseOutline"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** 改课程的标题、简介；改了的已发布课程照常重新走审核 */
        patch: operations["updateCourseOutline"];
        trace?: never;
    };
    "/courses/{course_id}/progress": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 学员的学习进度（学完的课时数）。用户令牌只能看自己的
         * @description 学习进度存在每个学员的归属区（D2）。本区的学员直接列；别的区的学员由他们的归属区回答，只列本人同意把这门课的进度给开课机构的
         *     （平台的 `PUT /me/courses/{itemId}/progress-sharing`），只带必要字段（学完几课、最后学习时间），两边记跨境日志（D3）。
         *     别的区暂时连不上时它的学员缺席，`partial: true`。
         */
        get: operations["listCourseProgress"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/im/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 机器人发消息（文字或卡片），发到机器人所在的群，或私聊装了应用的用户
         * @description 私聊（`receive_id_type = open_id`）要求对方装了应用或所在机构装了应用；群（`chat_id`）要机器人已经在群里
         *     （机构管理员把它拉进班级群或机构群）。内容照常过审核。卡片按钮点了以后，平台把 `card.action` 推到应用的
         *     卡片回调地址。
         *     私聊（`open_id`）：由本区的「系统通知」发出，正文前标应用名（「<应用名>」…），卡片按文字发（标题、正文、按钮链接）。
         *     群（`chat_id`，取自 `GET /im/chats` 或 `im.message_received`）：以应用机器人的名义发进群，卡片是真的卡片（按钮可回调）；
         *     机器人不在这个群里返回 409 `details.reason = bot_not_in_chat`。机构令牌只能发机构安装授权加进去的群，应用令牌能发所有加了它的群。
         */
        post: operations["sendBotMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/im/chats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 机器人所在的群
         * @description 机构令牌：这个机构的人（凭机构的授权）加了机器人的群；`chat_id` 就是平台的会话 ID。
         */
        get: operations["listBotChats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 给本机构成员发通知（进「系统通知」，按对方的通知设置和免打扰时段推送） */
        post: operations["sendNotification"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/recordings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 班级在线课堂的回放和课后总结（不给播放地址；`watch_url` 打开平台里的回放页） */
        get: operations["listClassRecordings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 机构的活动（含草稿和待审） */
        get: operations["listTenantEvents"];
        put?: never;
        /**
         * 建一个活动（草稿；发布由机构在机构后台做，照常审核）
         * @description 课次和在线课堂照平台的规则建好；记作机构负责人建的（课堂的主持人是负责人）。
         */
        post: operations["createTenantEvent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/events/{event_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * 改一个活动（字段同平台机构后台的活动编辑）
         * @description 已发布的活动改了以后照常重新发布（易盾机审，D20）；有人报名后不能改参加方式（409 `mode_locked`），名额不能少于已确认的人数
         *     （409 `capacity_below_confirmed`），取消了的活动不能改（409 `cancelled`）。记作机构负责人改的。
         */
        patch: operations["updateTenantEvent"];
        trace?: never;
    };
    "/events/{event_id}/registrations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 活动的报名和签到 */
        get: operations["listEventRegistrations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jobs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 机构的职位（含草稿和待审） */
        get: operations["listTenantJobs"];
        put?: never;
        /** 同步一个职位进来（草稿；提交和发布仍走本机构审核和易盾机审） */
        post: operations["createTenantJob"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/jobs/{job_id}/candidates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 职位的候选人（投递时本人同意给机构的那些字段） */
        get: operations["listJobCandidates"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trial/venues": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 机构的教学点（排试听时段用它的 venue_id） */
        get: operations["listTrialVenues"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trial/slots": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 试听时间（教学点上的试听自己的时间；默认只列没结束的，按时间）
         * @description 开课里「试听」的单独时间（这个试听专用的时间，可以几个人一起约）。老师的每周可约时间是所有 1v1 和试听共用的，不在这里列。
         *     线上试听没有教学点，不在这里列。
         */
        get: operations["listTrialSlots"];
        put?: never;
        /**
         * 开试听时间（可以按周重复）：加到已有的试听，或开一份新的试听草稿
         * @description 试听是平台「开课」里的一种课，学员在它的页面上约时间，老师或机构在「约课」里确认。这里直接读写同一套：
         *     - 给 `opening_id`（`GET /openings?kind=trial` 或之前返回的 `opening_id`）：把时间加到这份试听上，老师是它的老师，`duration_minutes` 要等于它每节的时长（否则 400）。
         *       它在招生中时，学员马上能约；已经结束或下架的 409 `opening_ended`。
         *     - 不给 `opening_id`：给 `venue_id`、`course_title`（可带 `teacher_open_id`）。同一个教学点、同一个名字、同一位老师、同样时长的试听还没结束时加到那份上，
         *       否则开一份新的**试听草稿**。草稿和平台里开的一样，要机构在「开课」里上架（上架前检查老师、时间和教学点是否发布，照常审核），这里不能上架。
         *       没给老师的草稿缺老师，用 `PUT /trial/openings/{opening_id}/teacher` 补上。
         *     时间不能早于现在（400），同一位老师的时间不能重叠（409 `slot_overlap`）。教学点关了或被下架 409 `venue_unavailable`，
         *     不是本机构的 404。`series_id` 一直是 null（新的约课没有「系列」）。
         */
        post: operations["createTrialSlots"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trial/slots/{slot_id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 关掉一个试听时间（不再能约；已有的约课不变，也不通知）
         * @description 和老师在「约课」里关掉一个时间一样；已经约满的 409 `slot_taken`（要取消的是约课）。
         */
        post: operations["cancelTrialSlot"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trial/openings/{opening_id}/teacher": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * 给一份试听草稿补上（或换）老师
         * @description 只能改草稿（还没上架、没在审核）：409 `not_draft`。老师要是本机构在机构所在区的老师（否则 400），他这些时间不能和他别的时间重叠（409 `slot_overlap`）。
         *     这份试听的时间都换成这位老师的。也用来补以前用这组接口开的、缺老师的试听。
         */
        put: operations["setTrialTeacher"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trial/bookings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 机构各教学点的试听预约
         * @description 在本机构教学点上的试听课的约课（开课里开的「试听」商品，学员在商品页约时间），新约的在前。线上试听没有教学点，不在这里列出。
         *     状态：`pending` 等老师确认；`reschedule_proposed` 老师换了时间、等学员同意；`confirmed` 约上了；`rejected` 老师没接受；
         *     `cancelled` 学员或机构取消（老师没来、退回的也算）；`expired` 到时间还没确认；`attended` 上过了。
         */
        get: operations["listTrialBookings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trial/bookings/{booking_id}/confirm": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 确认一个试听预约
         * @description 和老师在「约课」里确认一样：排一节课次并告诉学员。不是等确认的 409 `not_requested`，已经到时间 409 `too_late`，老师那时有课 409 `teacher_busy`。
         */
        post: operations["confirmTrialBooking"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/venues": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 机构的教学点（校区），新建的在前
         * @description 所有状态的都列（草稿、等审核、已发布、停用、被下架）；`shown` 为 true 的才在地图和发现里给人看。
         */
        get: operations["listVenues"];
        put?: never;
        /**
         * 新建一个教学点（校区）的草稿；发布在平台里，照常审核
         * @description 和机构后台「教学点」里新建一样，存成草稿（`status = draft`），不公开。要公开得由机构在平台里提交，按机构的审核规则发布；
         *     照片、「咨询」转给谁也在平台里设。草稿就能用来排课（`createClassSessions` 的 `place`），只是班级上架前教学点要发布。
         *     机构还没认证 403 `org_not_verified`。
         */
        post: operations["createVenue"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/venues/{venue_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 一个教学点（只限本机构的） */
        get: operations["getVenue"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/openings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 开课：开的每一个班和课（多人班、1v1、公开课、试听、视频课），新开的在前
         * @description 和平台「开课」列表同一套（只读）。机构令牌列本机构的；用户令牌只列这个人以个人老师身份开的课（不属于任何机构的），
         *     他在机构里教的课要用那家机构的机构令牌读。状态：`draft` 草稿；`review` 老师交了、等机构审；`enrolling` 招生中；
         *     `running` 开始上了；`ended` 结束了或下架了。上架、下架、改课都在平台里做。
         */
        get: operations["listOpenings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/openings/{opening_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 一个开课 */
        get: operations["getOpening"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/insights": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 机构看板的一页（只读）：招生、教学、校区、收入、社区和活动
         * @description 和机构工作台「数据」同一套数（M6.19 的每日汇总和实时的课次、订单），只给机构令牌、只限本机构。
         *     - 页（`tab`）：`enrollment` 招生、`teaching` 教学、`venues` 校区、`income` 收入、`community` 社区和活动；不带时是 `enrollment`。
         *       平台里的「老师」（每位老师的数）和「接待」（谁接了咨询）两页不开放：老师的数只在机构内部看、不排名；接待是内部流程。
         *     - **少于 5 人在接口里就压掉了**：人数是 1–4 时给 null、`withheld: true`；比例的分母、平均分的条数也要 ≥5。课次、小时、金额、次数不是人数，不压。
         *     - **金额按币种分开，不换算**：一页一种币种（`currency`，不带时是收入最多的那种），`filters.currencies` 列出有哪几种。
         *     - 时间：`range`（截止今天、含今天）或自定义 `from`、`to`（机构时区的本地日期，含两头，最多 366 天，不能晚于今天）；`compare` 多给上一周期。
         *     - 没有任何一个人的 ID 或名字；按课程、校区、活动的行带它们的名字。别的区的学员只在汇总里，别的区某项不到 5 不给；有区没答上 `partial: true`。
         */
        get: operations["getInsights"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/trade/orders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 机构的订单（只读对账）。跟钱有关的写操作不开放 */
        get: operations["listTradeOrders"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/bookings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 机构的约课（1v1 和试听，只读对账），上课时间晚的在前
         * @description 学员在开课里约的每一节课，和平台「约课」同一套。确认、拒绝、换时间、取消都在平台里做（试听的确认见 `confirmTrialBooking`）。
         *     状态：`requested` 等老师确认（`change.kind = teacher_proposed` 是老师换了时间、等学员同意）；`confirmed` 约上了
         *     （`change.kind` 是 `teacher_moved` 或 `learner_requested` 时有一个改期等回复）；`declined` 老师没接受；`cancelled` 取消了；
         *     `expired` 到时间还没确认；`completed` 上过了（`outcome` 写学员来没来）；`missed` 老师没来，这一节退回了。
         *     只给学员的 `open_id`，不给名字和留言。
         */
        get: operations["listBookings"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/bookings/{booking_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 一节约课 */
        get: operations["getBooking"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reviews": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 对本机构（及其课程、教学点）的评价 */
        get: operations["listTenantReviews"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reviews/{review_id}/reply": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 以机构的名义回复一条评价（每条只能回复一次，内容照常审核） */
        post: operations["replyReview"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/public/{kind}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 本区显示的公开课程、活动、职位
         * @description 每个应用每种每天最多返回 10000 条（按返回条数算），超了 429 `daily_quota_exceeded`。
         */
        get: operations["listPublicContent"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/profile/interests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 用户的兴趣画像（话题、内容类型的权重标签，不给原始的浏览和互动记录）
         * @description 用户关了「个性化推荐」时返回空（`personalized: false`）。只给金牌机构开发的应用。
         */
        get: operations["getUserInterests"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/profile/interest_signals": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 加一条带来源的兴趣信号
         * @description 只能加，不能删别人的、不能改等级。权重 0–1（平台再按上限折算，一个应用对一个话题的总权重有上限）；
         *     推荐依据里显示「来自 xx 应用」，用户能看、能删。用户关了「个性化推荐」时不写（返回 `accepted: false`）。
         */
        post: operations["addInterestSignal"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/profile/learning": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 用户的学习画像（等级、目标、在学的语言） */
        get: operations["getUserLearningProfile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 代用户举报一条公开内容（进平台的审核队列，用户能在自己的举报记录里看到） */
        post: operations["reportOnBehalf"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/images": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 要一个图片上传地址（发帖时才重新编码、去掉 EXIF）
         * @description 用 `upload_url` 把图片 PUT 上去（`headers` 照带），发帖时在 `images` 里写 `key`。一天内没用上的会被删掉。
         *     图片最大 10 MB，jpeg、png、webp、gif。这个人每小时最多要 60 次（和他自己在 App 里传图算在一起）。
         *     只有要到地址的这个应用能把它放进帖子。
         */
        post: operations["createCommunityImageUpload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/videos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 要一个视频上传地址（最大 4 GB、1 小时）
         * @description 用 `upload.url` 把视频 PUT 上去，再 `POST /community/videos/{asset_id}/complete`。转码好了收到 `community.video_ready`，
         *     也可以查 `GET /community/videos/{asset_id}`。一周内没用上的会被删掉。这个应用每天的视频总大小有上限（`community_video_gb`）。
         */
        post: operations["createCommunityVideoUpload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/videos/{asset_id}/complete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 传完了，开始转码（重复调用没有副作用） */
        post: operations["completeCommunityVideoUpload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/videos/{asset_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 看转码状态（只限这个应用替这个人传的） */
        get: operations["getCommunityVideo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 这个应用替这个人发过的帖子（这个人自己发的、别的应用发的都看不到） */
        get: operations["listCommunityPosts"];
        put?: never;
        /**
         * 用这个人的名义发一条公开帖子（文字、最多 9 张图或 1 个视频、最多 10 个标签）
         * @description 规则和审核都和这个人自己发帖一样，帖子上写明「来自 <应用名>」。没有 `title` 时取正文第一句，没有文字时必须给 `title`。
         *     `uuid` 是幂等键：同一个 `uuid` 一小时内只发一次，重复调用返回同一条帖子。
         *
         *     不能替人同意：这个人还没同意公开作者身份，或者撤回了同意，返回 409 `details.reason = consent_required`，带 `details.consent_url`，
         *     请这个人自己去点。视频没转好是 409 `video_not_ready`，转码失败是 409 `video_failed`。
         *     平台没有定时发、存草稿；被拒的帖子进这个人的草稿箱，应用收到 `community.post_reviewed`。
         *
         *     限额：这个人每小时 20 帖（和他自己发的算在一起，`post_rate_limited`）；这个应用替这个人每天 10 帖（`app_user_daily_limit`）；
         *     这个应用每天的总量（`daily_quota_exceeded`，`details.kind = community_posts`）。
         *
         *     **机构令牌**（机构号发帖）：用机构的社区账号发，帖子作者是机构（机构名、logo），同样写明「来自 <应用名>」、同样审核，审核结果记在应用头上。
         *     要机构装了这个应用、批了 `community:post`；机构的主页还没发布过、没有社区账号时 409 `no_org_account`。机构号每小时 20 帖、
         *     这个应用替这家机构每天 10 帖，和应用每天的总量算在一起。机构号的帖子没有 IP 属地和发布地。上传图片、视频，列出、查看、删除帖子
         *     也都用机构令牌，只碰这个应用替这家机构传的、发的。
         */
        post: operations["createCommunityPost"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/posts/{post_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 一条帖子的状态（只限这个应用发的，别的都是 404） */
        get: operations["getCommunityPost"];
        put?: never;
        post?: never;
        /** 删帖（只限这个应用发的，别的都是 404） */
        delete: operations["deleteCommunityPost"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 发帖能选的分类（本区开着的） */
        get: operations["listCommunityCategories"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/me/schedule": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * 这个人的课表：他的课次、报名的活动、确认的试听和考试（给日历类应用；只读）
         * @description 时间范围最长 100 天。别的区的课次也在里面（在它们所在的区读）。取消的课次也列出来（`cancelled`），方便日历把它去掉。
         */
        get: operations["getMySchedule"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/me/courses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 这个人在学的课和进度（学完几课、最后学习时间；等级和目标是金牌专属的画像，不在这里） */
        get: operations["listMyCourses"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/me/words": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 这个人的生词本：字词、拼音、复习状态（不给释义，也改不了复习记录） */
        get: operations["listMyWords"];
        put?: never;
        /** 往这个人的生词本里加一个词（已经有时不变；来源记成这个应用） */
        post: operations["addMyWord"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/exams": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 班级的考试（只限机构令牌、本机构） */
        get: operations["listClassExams"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/classes/{class_id}/exams/{exam_id}/results": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 一场考试每个学员的结果（公布以后才有分数；只限机构令牌、本机构） */
        get: operations["listClassExamResults"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export interface webhooks {
    event: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 事件推送（平台 → 应用的请求地址）
         * @description 订阅的事件发生时，平台 POST 到应用在「事件与回调」里填的请求地址。
         *     - **签名**：`X-Ich-Timestamp`（秒）、`X-Ich-Nonce`、`X-Ich-Signature: v1=<hex>`，
         *       其中 `hex = HMAC-SHA256(签名密钥, timestamp + "." + nonce + "." + 原始请求体)`。应用要验签，并拒绝
         *       时间戳和当前相差 5 分钟以上的请求。
         *     - **加密（可选）**：填了加密密钥时请求体是 `{"encrypt": "<base64>"}`，内容是 AES-256-GCM 加密的事件 JSON：
         *       密钥 = SHA-256(加密密钥)，base64 解出来依次是 12 字节 IV、密文、16 字节认证标签。签名对加密后的请求体算。
         *     - **重试**：应用 5 秒内回 2xx 算成功；否则按 1、2、4、8 … 分钟退避重试，最多 12 次（约 3 天），每次都进
         *       事件推送日志，开发者后台能手动重推。同一个事件重试时 `event_id` 不变，应用按它去重（幂等）。
         *     - **地址验证**：保存请求地址时平台先推一次 `{"type": "url_verification", "challenge": "…"}`，应用原样回
         *       `{"challenge": "…"}`（同样签名）。
         *     - 按机构订阅（机构令牌的事件）的，只推装了应用的机构的事件，`header.tenant_key` 是那个机构；个人数据只在
         *       用户授权了相应权限时才带（否则只带 `open_id`）。
         */
        post: operations["onEvent"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "card.action": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * 卡片回调（用户点了机器人卡片上的按钮 → 应用的卡片回调地址）
         * @description 签名和加密同事件推送。应用 3 秒内可以回一张新卡片替换原来的（`{"card": {...}}`），或回空。
         */
        post: operations["onCardAction"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export interface components {
    schemas: {
        PageMeta: {
            has_more: boolean;
            page_token?: string | null;
        };
        /**
         * @description 错误的细分原因（`error.details.reason`）
         * @enum {string}
         */
        OpenErrorReason: "invalid_credentials" | "invalid_token" | "token_expired" | "token_type" | "app_disabled" | "not_installed" | "not_available" | "scope_denied" | "scope_pending" | "scope_not_declared" | "gold_only" | "rate_limited" | "daily_quota_exceeded" | "code_expired" | "code_used" | "code_invalid" | "redirect_uri_mismatch" | "origin_not_trusted" | "ip_not_allowed" | "org_not_installed" | "minor_not_allowed" | "birth_year_required" | "feature_disabled" | "app_post_stopped" | "consent_required" | "video_not_ready" | "video_failed" | "post_rate_limited" | "app_user_daily_limit" | "post_in_progress" | "no_org_account" | "teacher_busy" | "online_only" | "venue_unavailable" | "venue_not_found" | "slot_overlap" | "slot_taken" | "not_draft" | "not_editable" | "org_not_verified" | "opening_ended" | "opening_incomplete";
        ErrorResponse: {
            error: {
                /** @enum {string} */
                code: "UNAUTHENTICATED" | "FORBIDDEN" | "NOT_FOUND" | "VALIDATION_FAILED" | "CONFLICT" | "RATE_LIMITED" | "PAYLOAD_TOO_LARGE" | "WRONG_REGION" | "SERVICE_UNAVAILABLE" | "INTERNAL";
                /** @description 按 Accept-Language 本地化的提示 */
                message: string;
                request_id: string;
                details?: {
                    reason?: components["schemas"]["OpenErrorReason"];
                    scope?: string;
                    never_ask?: boolean;
                    /** @description `consent_required` 时给：请这个人打开它，自己点同意 */
                    consent_url?: string;
                } & {
                    [key: string]: unknown;
                };
            };
        };
        /**
         * @description 一个人在一个应用里的 ID（同一个人在不同应用里不同，和 OIDC 的 `sub` 相同）。同一个应用被几家机构安装时，同一个人的 `open_id`
         *     是同一个；开发者协议禁止用它跨机构比对。
         */
        OpenId: string;
        /** @description 装了应用的机构（`<机构所在区>.<机构 ID>`） */
        TenantKey: string;
        /** @description App ID（`<应用所在区>.cli_…`），也是 OIDC 的 client_id */
        AppId: string;
        /** @description 权限码（目录见 `ScopeCode`；平台的 `GET /api/v1/open/scopes` 返回带说明的目录） */
        Scope: string;
        /** @enum {string} */
        ScopeCode: "openid" | "profile" | "org:member:readonly" | "org:member" | "class:readonly" | "class:member" | "schedule:readonly" | "schedule" | "attendance:readonly" | "coursework" | "grade:readonly" | "course" | "learning:progress:readonly" | "im:message:send_as_bot" | "im:chat:readonly" | "notify:send" | "live:recording:readonly" | "event" | "event:registration:readonly" | "job" | "job:candidate:readonly" | "trial" | "trade:order:readonly" | "trade:booking:readonly" | "venue:readonly" | "venue" | "opening:readonly" | "review" | "profile:interest:readonly" | "profile:interest" | "profile:learning:readonly" | "report:create" | "community:post" | "me:schedule:readonly" | "me:learning:readonly" | "me:words:readonly" | "me:words" | "insights:readonly";
        /** @enum {string} */
        OrgRole: "owner" | "admin" | "academic" | "editor" | "content_reviewer" | "teacher" | "community" | "recruiter" | "member";
        AppCredentials: {
            app_id: components["schemas"]["AppId"];
            app_secret: string;
        };
        AppAccessToken: {
            app_access_token: string;
            /** @description 秒 */
            expires_in: number;
        };
        TenantAccessToken: {
            tenant_access_token: string;
            expires_in: number;
            tenant_key: components["schemas"]["TenantKey"];
            /** @description 机构管理员批了的权限 */
            scopes: components["schemas"]["Scope"][];
        };
        UserAccessToken: {
            access_token: string;
            /** @enum {string} */
            token_type: "Bearer";
            expires_in: number;
            refresh_token: string;
            refresh_expires_in: number;
            open_id: components["schemas"]["OpenId"];
            /** @description 用户批了的权限 */
            scopes: components["schemas"]["Scope"][];
            /** @description 用户拒绝的权限 */
            denied_scopes: components["schemas"]["Scope"][];
            /** @description 用户通过机构装的应用时，是那个机构 */
            tenant_key?: string | null;
        };
        OpenUser: {
            open_id: components["schemas"]["OpenId"];
            name?: string;
            avatar_url?: string | null;
            locale?: string;
        };
        Tenant: {
            tenant_key: components["schemas"]["TenantKey"];
            name: string;
            kind: string;
            /** @description ISO 3166-1 alpha-2 */
            country: string;
            verified: boolean;
            /** @enum {string} */
            rating: "standard" | "silver" | "gold";
        };
        TenantMember: {
            open_id: components["schemas"]["OpenId"];
            name: string;
            roles: components["schemas"]["OrgRole"][];
            /** Format: date-time */
            joined_at: string;
        };
        OpenClass: {
            /** Format: uuid */
            class_id: string;
            name: string;
            /**
             * @description class 班级；lecture 公开课；event 活动
             * @enum {string}
             */
            kind: "class" | "lecture" | "event";
            description?: string | null;
            student_count: number;
            /** Format: date-time */
            created_at: string;
        };
        ClassMember: {
            open_id: components["schemas"]["OpenId"];
            name: string;
            /** @enum {string} */
            role: "teacher" | "assistant" | "student";
            /** Format: date-time */
            joined_at?: string | null;
        };
        OpenSession: {
            /** Format: uuid */
            session_id: string;
            /** Format: uuid */
            class_id: string;
            title: string;
            /** Format: date-time */
            starts_at: string;
            /** Format: date-time */
            ends_at: string;
            /**
             * @description draft 是还没上架的班的课次（只在排课的回应里出现，不进课表）
             * @enum {string}
             */
            status: "draft" | "scheduled" | "live" | "ended" | "cancelled";
            /** @description 在线课堂里上为 true；在教学点上（`place` 不为 null）为 false */
            live?: boolean;
            /** @description 在哪个教学点上；null 在线 */
            place?: components["schemas"]["OpenPlace"] | null;
            /** @description 上这次课的老师 */
            teacher_open_id?: components["schemas"]["OpenId"] | null;
        };
        OpenPlaceInput: {
            /**
             * Format: uuid
             * @description 本机构的教学点（`GET /venues`）
             */
            venue_id: string;
            /** @description 教室、楼层等，只给上课的人看 */
            note?: string | null;
        };
        /** @description 上课的地点：教学点公开的地址，加上教室 */
        OpenPlace: {
            /** Format: uuid */
            venue_id: string;
            name: string;
            address: string;
            city?: string | null;
            /** @description ISO 3166-1 两位代码 */
            country?: string | null;
            time_zone?: string | null;
            /** @description 教室 */
            note?: string | null;
        };
        AttendanceRecord: {
            open_id: components["schemas"]["OpenId"];
            attended: boolean;
            /** @description 在课堂里待了多久 */
            seconds: number;
            /** Format: date-time */
            first_joined_at?: string | null;
        };
        OpenAssignment: {
            /** Format: uuid */
            assignment_id: string;
            /** Format: uuid */
            class_id: string;
            /** @enum {string} */
            kind: "homework" | "exam";
            title: string;
            /** @enum {string} */
            status: "draft" | "published" | "closed";
            /** Format: date-time */
            due_at?: string | null;
            max_score?: number | null;
            /** Format: date-time */
            created_at: string;
        };
        OpenSubmission: {
            open_id: components["schemas"]["OpenId"];
            /** @enum {string} */
            status: "not_submitted" | "submitted" | "graded";
            /** Format: date-time */
            submitted_at?: string | null;
            score?: number | null;
            max_score?: number | null;
            feedback?: string | null;
        };
        GradeRow: {
            open_id: components["schemas"]["OpenId"];
            /** Format: uuid */
            assignment_id: string;
            title?: string;
            score: number | null;
            max_score?: number | null;
            /** Format: date-time */
            graded_at?: string | null;
        };
        OpenCourse: {
            /** Format: uuid */
            course_id: string;
            title: string;
            summary?: string | null;
            /** @description draft / in_review / published / … */
            status: string;
            lesson_count?: number;
            /** Format: date-time */
            updated_at: string;
        };
        CourseOutline: components["schemas"]["OpenCourse"] & {
            sections: {
                title: string;
                lessons: {
                    lesson_id: string;
                    title: string;
                    kind?: string;
                }[];
            }[];
        };
        CourseProgress: {
            open_id: components["schemas"]["OpenId"];
            completed_lessons: number;
            total_lessons: number;
            /** Format: date-time */
            last_studied_at?: string | null;
        };
        BotMessage: {
            /** @enum {string} */
            receive_id_type: "open_id" | "chat_id";
            receive_id: string;
            /** @enum {string} */
            msg_type: "text" | "card";
            content: {
                text: string;
            } | {
                card: components["schemas"]["Card"];
            };
            /** @description 幂等键：同一个 uuid 1 小时内只发一次 */
            uuid?: string;
        };
        /** @description 消息卡片（和平台的卡片消息同一套：标题、正文、按钮；按钮的 value 原样回到卡片回调） */
        Card: {
            title: string;
            body?: string;
            /** Format: uri */
            image_url?: string;
            buttons?: {
                text: string;
                /**
                 * Format: uri
                 * @description 打开链接（要在可信域名里）
                 */
                url?: string;
                /** @description 回调时原样带回（≤1 KB） */
                value?: {
                    [key: string]: unknown;
                };
            }[];
        };
        BotChat: {
            chat_id: string;
            name: string;
            /** @enum {string} */
            kind: "class" | "org" | "group";
            member_count: number;
        };
        OpenRecording: {
            /** Format: uuid */
            session_id: string;
            title: string;
            /** Format: date-time */
            starts_at: string;
            duration_seconds: number;
            /**
             * Format: uri
             * @description 平台里的回放页（要登录、有权限的人才能看）
             */
            watch_url: string;
            /** @description 课后总结（AI 生成，老师确认过的） */
            summary?: string | null;
        };
        OpenEvent: {
            /** Format: uuid */
            event_id: string;
            title: string;
            status: string;
            /** Format: date-time */
            starts_at: string;
            /** Format: date-time */
            ends_at?: string | null;
            registered?: number;
            capacity?: number | null;
        };
        EventRegistration: {
            open_id: components["schemas"]["OpenId"];
            name: string;
            /** @description registered / checked_in / cancelled / waitlisted */
            status: string;
            /** Format: date-time */
            registered_at: string;
            /** Format: date-time */
            checked_in_at?: string | null;
        };
        OpenJob: {
            /** Format: uuid */
            job_id: string;
            title: string;
            status: string;
            city?: string | null;
            /** Format: date-time */
            updated_at: string;
        };
        OpenJobBody: {
            title: string;
            description: string;
            city?: string;
            country?: string;
            /** @description 应用自己系统里的 ID（同一个 external_id 再同步时更新原来那条） */
            external_id?: string;
        };
        JobCandidate: {
            candidate_id: string;
            open_id?: components["schemas"]["OpenId"];
            name: string;
            status: string;
            /** Format: date-time */
            applied_at: string;
        };
        /**
         * @description 和平台机构后台建活动的请求体相同（`CreateOrgEventBody`，见 openapi.yaml）：至少 `type`、`title`、`mode`、`time_zone`、
         *     `sessions`（每个课次 `starts_at`、`ends_at`）；其余（简介、日程、地点、名额、报名问题、标签、等级……）照那里的规则。
         *     `cover_key` 不收（封面在平台里上传）。
         */
        OpenEventCreate: {
            type: string;
            title: string;
            /** @enum {string} */
            mode: "offline" | "online";
            time_zone: string;
            summary?: string;
            capacity?: number | null;
            sessions: {
                /** Format: date-time */
                starts_at: string;
                /** Format: date-time */
                ends_at: string;
            }[];
        } & {
            [key: string]: unknown;
        };
        /** @description 和平台机构后台改活动的请求体相同（`UpdateOrgEventBody`）；`cover_key` 不收。 */
        OpenEventPatch: {
            [key: string]: unknown;
        };
        TrialVenue: {
            /** Format: uuid */
            venue_id: string;
            name: string;
            status: string;
            city?: string | null;
            time_zone: string;
        };
        TrialSlot: {
            /** Format: uuid */
            slot_id: string;
            /** Format: uuid */
            venue_id: string;
            /** Format: date-time */
            starts_at: string;
            /** Format: date-time */
            ends_at: string;
            time_zone?: string;
            capacity: number;
            booked: number;
            pending: number;
            course_title: string;
            /** @description 一直是 null（以前按周重复的一组时间共用一个） */
            series_id?: string | null;
            /**
             * @description open 还能约或已经约了；cancelled 关掉了
             * @enum {string}
             */
            status: "open" | "cancelled";
            /**
             * Format: uuid
             * @description 属于哪份试听（`GET /openings/{opening_id}`）
             */
            opening_id: string;
            /** @description 上这个时间的老师；试听还缺老师时为 null */
            teacher_open_id?: components["schemas"]["OpenId"] | null;
        };
        TrialBooking: {
            /** Format: uuid */
            booking_id: string;
            /** @description 上课的教学点（`/trial/venues` 的 `venue_id`） */
            venue_id?: string;
            open_id?: components["schemas"]["OpenId"];
            status: string;
            /** Format: date-time */
            starts_at: string;
            /** Format: date-time */
            ends_at?: string | null;
            course_title?: string | null;
        };
        OpenVenue: {
            /** Format: uuid */
            venue_id: string;
            name: string;
            /**
             * @description campus 校区；point 教学点；partner 合作点
             * @enum {string}
             */
            kind: "campus" | "point" | "partner";
            /**
             * @description 草稿、等本机构审核、被退回、已发布、停用、被语合中心下架
             * @enum {string}
             */
            status: "draft" | "pending" | "returned" | "published" | "closed" | "taken_down";
            /** @description 现在给不给人看（发布过，没停用、没被下架；改了还没再审时照旧显示上一次发布的） */
            shown: boolean;
            /** @description ISO 3166-1 两位代码 */
            country: string;
            city?: string | null;
            address: string;
            /** @description 地图上的点；没选点时为 null */
            location?: null | {
                lat: number;
                lng: number;
                /** @enum {string} */
                datum?: "wgs84" | "bd09";
            };
            time_zone: string;
            /** @description 发布过的公开内容 ID（`<区>:venue:<id>`） */
            item_id?: string | null;
            /** Format: date-time */
            created_at: string;
        };
        /** @description 和机构后台建教学点的请求体相同（`VenueInput`，见 openapi.yaml），但不收「咨询」转给谁和挂在这里的班级、商品、活动（这些在平台里设）。 */
        OpenVenueCreate: {
            name: string;
            /** @enum {string} */
            kind: "campus" | "point" | "partner";
            audiences?: ("children" | "adults" | "business")[];
            course_types?: ("hsk" | "yct" | "conversation" | "business" | "children" | "culture" | "other")[];
            description?: string;
            country: string;
            city?: string | null;
            address: string;
            /** @description 在地图上选的点；没给的教学点不上地图 */
            location?: null | {
                lat: number;
                lng: number;
                /**
                 * @description 默认 wgs84；bd09 是百度地图的坐标
                 * @enum {string}
                 */
                datum?: "wgs84" | "bd09";
            };
            /** @description 交通说明 */
            transit?: string;
            /** @description IANA 时区 */
            time_zone: string;
            /** @description 每周的开放时间（教学点所在时区的本地时间，一天可以有几段） */
            hours?: {
                /** @description 1 星期一 … 7 星期日 */
                weekday: number;
                opens: string;
                /** @description 晚于 opens */
                closes: string;
            }[];
            facilities?: ("wifi" | "projector" | "library" | "lounge" | "parking" | "accessible" | "kids_area" | "recording_room")[];
            /** @description 公开的联系人 */
            contact_name?: string | null;
            /** @description 公开的电话 */
            contact_phone?: string | null;
        };
        OpenOpening: {
            /**
             * Format: uuid
             * @description 有班级的（多人班、公开课）是班级 ID，其余是商品 ID
             */
            opening_id: string;
            /**
             * @description group 多人班；one_on_one 1v1 课时包；lecture 公开课；trial 试听；video 视频课
             * @enum {string}
             */
            kind: "group" | "one_on_one" | "lecture" | "trial" | "video";
            /** @enum {string} */
            status: "draft" | "review" | "enrolling" | "running" | "ended";
            /** @description 招生中但名额满了 */
            full?: boolean;
            title: string;
            summary?: string;
            level?: number | null;
            languages?: string[];
            /**
             * Format: uuid
             * @description 班级（`/classes/{class_id}`）；1v1、试听、视频课没有
             */
            class_id?: string | null;
            /** @description 上过架的商品的公开内容 ID（`<区>:offer:<id>`） */
            offer_item_id?: string | null;
            /**
             * Format: uuid
             * @description 教的课程（`/courses/{course_id}`）
             */
            course_id?: string | null;
            course_title?: string | null;
            teachers: {
                open_id: components["schemas"]["OpenId"];
                name: string;
            }[];
            /** @description 默认地点；null 在线 */
            place?: components["schemas"]["OpenPlace"] | null;
            /** @description 课次不都在同一个地方 */
            mixed_places?: boolean;
            /**
             * @description public 公开招生（商品上架）；code 只凭加入码进
             * @enum {string}
             */
            enrollment?: "public" | "code";
            /** @description 商品在卖（招生中） */
            listed: boolean;
            /** @description 名额（多人班、公开课） */
            seats?: null | {
                max?: number | null;
                min?: number | null;
                taken: number;
            };
            price?: null | {
                amount_minor: number;
                currency: string;
            };
            /** @description 课次进度（有班级的） */
            sessions: {
                total: number;
                done: number;
                /** Format: date-time */
                first_starts_at?: string | null;
                next?: null | {
                    /** Format: uuid */
                    session_id: string;
                    /** Format: date-time */
                    starts_at: string;
                    /** Format: date-time */
                    ends_at: string;
                    time_zone?: string;
                    place?: components["schemas"]["OpenPlace"] | null;
                };
            };
            /** @description 1v1 一共几节 */
            lessons?: number | null;
            /** @description 1v1、试听每节多长 */
            lesson_minutes?: number | null;
            /**
             * Format: date-time
             * @description 1v1、试听在卖时最近能约的时间
             */
            next_available?: string | null;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        OpenBooking: {
            /** Format: uuid */
            booking_id: string;
            /** @enum {string} */
            kind: "one_on_one" | "trial";
            /**
             * Format: uuid
             * @description 约的是哪个开课（`GET /openings/{opening_id}`）
             */
            opening_id: string;
            title: string;
            open_id: components["schemas"]["OpenId"];
            teacher_open_id?: components["schemas"]["OpenId"];
            /** @enum {string} */
            status: "requested" | "confirmed" | "declined" | "cancelled" | "completed" | "expired" | "missed";
            /** @description 等回复的改期 */
            change?: null | {
                /** @enum {string} */
                kind: "teacher_moved" | "teacher_proposed" | "learner_requested";
                /** Format: date-time */
                to_starts_at: string;
                /** Format: date-time */
                to_ends_at: string;
            };
            /**
             * @description 上完以后的结果
             * @enum {string|null}
             */
            outcome?: "held" | "learner_absent" | "teacher_absent" | "both_absent" | null;
            /** @description 学员在规定时间内取消，这一节不退 */
            forfeited?: boolean;
            /** Format: date-time */
            starts_at: string;
            /** Format: date-time */
            ends_at: string;
            time_zone: string;
            /** @description 在哪上；null 在线 */
            place?: components["schemas"]["OpenPlace"] | null;
            /**
             * Format: uuid
             * @description 确认后排的课次
             */
            session_id?: string | null;
            /** @description 用的哪张订单的课时（免费试听为 null） */
            order_id?: string | null;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at?: string;
        };
        /** @description 一页看板。数字（`tiles`）和图（`cards`）都按 `key` 给，名字和说明由应用自己写（和平台三端一样按 key 取文案）。 */
        OpenInsightsPage: {
            tab: string;
            /** @description 这个接口能看的页 */
            tabs: string[];
            /** @enum {string} */
            range: "7d" | "30d" | "90d" | "365d" | "custom";
            /**
             * Format: date
             * @description 第一天
             */
            from: string;
            /**
             * Format: date
             * @description 最后一天（含）
             */
            to: string;
            /** Format: date */
            previous_from?: string | null;
            /** Format: date */
            previous_to?: string | null;
            /** @description 机构的时区（算「天」用的） */
            time_zone: string;
            /** @enum {string} */
            granularity: "day" | "week" | "month";
            /** @description 每个点从哪天开始 */
            points: string[];
            compare: boolean;
            /** Format: date-time */
            data_until: string;
            /**
             * Format: date-time
             * @description 每日汇总最后算到什么时候；还没算过为 null
             */
            summary_at: string | null;
            /** @description 有别的区没答上，跨区的汇总不全 */
            partial: boolean;
            /** @description 能筛的维度和选项 */
            filters: {
                courses?: components["schemas"]["OpenInsightsOption"][];
                venues?: components["schemas"]["OpenInsightsOption"][];
                currencies?: string[];
            };
            tiles: {
                /** @description 数字的名字 */
                key: string;
                unit: components["schemas"]["OpenInsightsUnit"];
                /** @description 没有分母或少于 5 人时为 null */
                value: number | null;
                /** @description 少于 5 人，不给 */
                withheld: boolean;
                /** @description 上一周期（`compare` 时才有） */
                previous?: number | null;
                /** @description 现在的数（不按时间段算） */
                current: boolean;
                currency?: string | null;
                trend?: (number | null)[];
            }[];
            cards: {
                /** @description 图的名字 */
                key: string;
                /** @enum {string} */
                kind: "line" | "stack" | "hbar" | "funnel" | "heat" | "table";
                unit: components["schemas"]["OpenInsightsUnit"];
                currency?: string | null;
                /** @description 整张图都是少于 5 人的 */
                withheld: boolean;
                series?: {
                    key: string;
                    label?: string | null;
                    /** @description 和 `points` 一一对应；null 是没有数或压掉了 */
                    values: (number | null)[];
                }[];
                previous?: (number | null)[];
                rows?: {
                    key: string;
                    label?: string | null;
                    /** @description null：少于 5 人 */
                    value: number | null;
                    share?: number | null;
                }[];
                heat?: {
                    rows?: string[];
                    cols?: number[];
                    values?: (number | null)[][];
                };
                table?: {
                    columns?: string[];
                    units?: components["schemas"]["OpenInsightsUnit"][];
                    rows?: {
                        /** @description 课程、活动等的 ID（不会是人） */
                        id?: string | null;
                        cells: (number | string | null)[];
                    }[];
                    total?: number;
                };
            }[];
        };
        OpenInsightsOption: {
            id: string;
            name: string;
        };
        /**
         * @description `ratio` 是 0–1 的比例；`money` 是最小货币单位（看 `currency`）；`rating` 满分 5；`minutes` 分钟；其余是个数
         * @enum {string}
         */
        OpenInsightsUnit: "count" | "people" | "sessions" | "hours" | "ratio" | "minutes" | "rating" | "money" | "lessons";
        TradeOrder: {
            order_id: string;
            status: string;
            amount_minor: number;
            currency: string;
            item_title?: string | null;
            open_id?: components["schemas"]["OpenId"];
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            paid_at?: string | null;
        };
        OpenReview: {
            review_id: string;
            /** @description 评价对象的公开内容 ID */
            target_id: string;
            stars: number;
            body?: string | null;
            author_name?: string | null;
            replied?: boolean;
            /** Format: date-time */
            created_at: string;
        };
        PublicContent: {
            item_id: string;
            kind: string;
            title: string;
            summary?: string | null;
            /**
             * Format: uri
             * @description 平台里的详情页
             */
            url?: string;
            /** Format: date-time */
            updated_at?: string | null;
        };
        InterestProfile: {
            /** @description 用户关了「个性化推荐」时为 false，其余为空 */
            personalized: boolean;
            topics: {
                topic: string;
                /** @description 归一化后的权重 */
                weight: number;
            }[];
            /** @description 三等九级的级（1–9，D27） */
            level?: number | null;
            content_types?: {
                /** @enum {string} */
                type: "post" | "video" | "course" | "event";
                weight: number;
            }[];
        };
        LearningProfile: {
            level?: number | null;
            goals: string[];
            /** @description 在学的语言（BCP 47） */
            languages: string[];
        };
        /**
         * @description 可订阅的事件（取自通知目录里以机构为中心的事件）。`x-token` 说明按机构还是按用户订阅，`x-scope` 是要的权限。
         * @enum {string}
         */
        EventType: "app.installed" | "app.uninstalled" | "app.scopes_changed" | "coursework.submitted" | "grade.published" | "schedule.session_changed" | "event.registered" | "job.candidate_applied" | "trade.order_paid" | "review.created" | "trial.booked" | "im.message_received" | "class.member_changed" | "course.completed" | "exam.results_released" | "event.checked_in" | "live.recording_ready" | "trade.order_refunded" | "trial.confirmed" | "trial.cancelled" | "community.post_reviewed" | "community.video_ready" | "booking.changed";
        CommunityImageUpload: {
            /** @description 发帖时写进 `images[].key` */
            key: string;
            upload_url: string;
            /** @enum {string} */
            method: "PUT";
            headers: {
                [key: string]: string;
            };
            /** Format: date-time */
            expires_at: string;
        };
        CommunityVideo: {
            /** Format: uuid */
            asset_id: string;
            /**
             * @description ready 才能发帖；failed 换一个文件重传
             * @enum {string}
             */
            status: "uploading" | "queued" | "processing" | "ready" | "failed";
            duration_s?: number | null;
            width?: number | null;
            height?: number | null;
            /** @description failed 时的原因代码 */
            error?: string | null;
        };
        CommunityVideoUpload: {
            /** Format: uuid */
            asset_id: string;
            /** @enum {string} */
            status: "uploading" | "queued" | "processing" | "ready" | "failed";
            upload: {
                url: string;
                /** @enum {string} */
                method: "PUT";
                headers: {
                    [key: string]: string;
                };
                /** Format: date-time */
                expires_at: string;
            };
        };
        /** @description 不接受 `consent`、`as_org_id`、`report_ref`、`city_id`，也不接受用户 IP；写了这些字段返回 400。 */
        CreateCommunityPost: {
            /** @description 幂等键，一小时内同一个 uuid 只发一次 */
            uuid?: string;
            /** @description 可不填（取正文第一句）；没有文字时必须填 */
            title?: string;
            /** @description 正文里的 `#话题` 也算标签 */
            body?: string;
            /** @description 最多 9 张，不能和 `video` 同时给 */
            images?: {
                /** @description `POST /community/images` 给的 key */
                key: string;
            }[];
            /** @description 转好的视频，不能和 `images` 同时给 */
            video?: {
                /** Format: uuid */
                asset_id: string;
            };
            /** @description 标签，和正文里的 `#话题` 合起来最多 10 个；统一转小写，最长 30 字 */
            topics?: string[];
            /** @description `GET /community/categories` 的 key；不选时自动判断 */
            category?: string;
            /**
             * @description 只有文字时的背景，默认 paper
             * @enum {string}
             */
            cover_style?: "paper" | "grid" | "bamboo" | "mountains" | "dawn" | "dusk" | "ink" | "plain";
        };
        OpenCommunityPost: {
            /** @description `<区>:post:<uuid>` */
            post_id: string;
            /**
             * @description visible 已显示；in_review 审核中；rejected 被拒（在这个人的草稿箱）；removed 被下架；deleted 这个人或应用删了
             * @enum {string}
             */
            status: "visible" | "in_review" | "rejected" | "removed" | "deleted";
            /** @description 被拒的原因类别，不给命中的词 */
            rejection_reason?: string | null;
            /** @description 帖子链接 */
            url: string;
            title: string;
            /** @description 最终的标签 */
            topics: string[];
            /** @description 最终的分类；还没判出来时是 null */
            category: string | null;
            /** Format: date-time */
            created_at: string;
        };
        MyScheduleEntry: {
            /** @enum {string} */
            kind: "session" | "event" | "trial" | "exam";
            id: string;
            title: string;
            /** Format: date-time */
            starts_at: string;
            /** Format: date-time */
            ends_at: string;
            cancelled: boolean;
            /** @description 打开这一项的页面 */
            url: string;
        };
        MyCourse: {
            /** @description 公开内容 ID（`<区>:course:<id>`） */
            course_id: string;
            title: string;
            completed_lessons: number;
            total_lessons: number;
            /** Format: date-time */
            last_studied_at: string | null;
            /** Format: date-time */
            completed_at: string | null;
        };
        MyWord: {
            /** @description 简体 */
            word: string;
            traditional?: string | null;
            pinyin?: string | null;
            /** @enum {string} */
            status: "learning" | "known";
            /** Format: date-time */
            added_at: string;
            /** @description 复习状态；还没进复习时为 null */
            review: null | {
                /** @enum {string} */
                state: "new" | "learning" | "review" | "relearning";
                /** Format: date-time */
                due_at: string | null;
                /** Format: date-time */
                last_reviewed_at: string | null;
                mastered: boolean;
            };
        };
        ClassExam: {
            /** Format: uuid */
            exam_id: string;
            /** Format: uuid */
            class_id: string;
            title: string;
            /** Format: date-time */
            closes_at: string | null;
            max_score: number | null;
            /** @description 结果公布了没有 */
            released: boolean;
        };
        EventEnvelope: {
            /** @enum {string} */
            schema: "1.0";
            header: {
                event_id: string;
                event_type: components["schemas"]["EventType"];
                /** Format: date-time */
                create_time: string;
                app_id: components["schemas"]["AppId"];
                tenant_key?: string | null;
            };
            /** @description 各事件自己的字段（只带 ID 和 open_id，详情用接口取） */
            event: {
                [key: string]: unknown;
            };
        };
        EncryptedEnvelope: {
            /** @description base64(IV 12 字节 + 密文 + 认证标签 16 字节) */
            encrypt: string;
        };
        UrlVerification: {
            /** @enum {string} */
            type: "url_verification";
            challenge: string;
        };
        CardActionEnvelope: {
            /** @enum {string} */
            schema: "1.0";
            header: {
                event_id: string;
                app_id: components["schemas"]["AppId"];
                tenant_key?: string | null;
                /** Format: date-time */
                create_time: string;
            };
            operator?: {
                open_id?: components["schemas"]["OpenId"];
            };
            /** @description 卡片所在的会话 */
            chat_id?: string;
            action: {
                value: {
                    [key: string]: unknown;
                };
            };
            message_id?: string;
        };
    };
    responses: {
        /** @description VALIDATION_FAILED（`details.reason` 可能是 `code_expired`、`code_used`、`code_invalid`、`redirect_uri_mismatch`） */
        ValidationFailed: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description UNAUTHENTICATED（`details.reason`：`token_expired` 或 `invalid_token`），带 `WWW-Authenticate` */
        Unauthenticated: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description UNAUTHENTICATED（`details.reason = invalid_credentials`：App ID 或 App Secret 不对） */
        InvalidCredentials: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /**
         * @description FORBIDDEN（`details.reason`：`app_disabled` 应用被停用或下架，`not_installed` 机构或用户没装，
         *     `not_available` 当前版本对这个机构或用户不可用，`token_type` 这个接口不接受这种令牌）
         */
        Forbidden: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /**
         * @description FORBIDDEN，`details.reason` 是 `scope_denied`（用户或机构管理员拒绝了，`details.scope`、`details.never_ask`）、
         *     `scope_pending`（新版本加的权限还没问到）、`scope_not_declared`（应用没声明这个权限）、`gold_only`
         *     （金牌机构专属）、`minor_not_allowed`（这个人是未成年人）、`org_not_installed`（用户令牌碰机构的班级或课程，
         *     那家机构没装这个应用，或没批同一项权限）或 `token_type`。应用要能降级。
         */
        ScopeDenied: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /**
         * @description FORBIDDEN，除了 `ScopeDenied` 的那些，`details.reason` 还可能是 `minor_not_allowed`（这个人是未成年人，不能授权代发）、
         *     `birth_year_required`（这个人还没填出生年份，要他自己去填）、`app_post_stopped`（语合运营停了这个应用的发帖权限）。
         */
        PostForbidden: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description SERVICE_UNAVAILABLE，`details.reason = feature_disabled`（本区暂时关了发帖，`details.feature = community_post`） */
        FeatureDisabled: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description PAYLOAD_TOO_LARGE */
        PayloadTooLarge: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description NOT_FOUND（没权限时同样返回 404） */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description CONFLICT（`details.reason` 说明） */
        Conflict: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description RATE_LIMITED（`details.reason`：`rate_limited`、`daily_quota_exceeded`、`post_rate_limited` 或 `app_user_daily_limit`） */
        RateLimited: {
            headers: {
                "Retry-After"?: number;
                "X-RateLimit-Limit"?: number;
                "X-RateLimit-Remaining"?: number;
                "X-RateLimit-Reset"?: number;
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
    };
    parameters: {
        PageSize: number;
        PageToken: string;
        ClassId: string;
        SessionId: string;
        AssignmentId: string;
        CourseId: string;
        EventId: string;
        JobIdPath: string;
        OpeningId: string;
        VenueId: string;
        BookingId: string;
        AssetId: string;
        PostId: string;
        OpenIdPath: components["schemas"]["OpenId"];
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getAppAccessToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AppCredentials"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AppAccessToken"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["InvalidCredentials"];
            403: components["responses"]["Forbidden"];
            429: components["responses"]["RateLimited"];
        };
    };
    getTenantAccessToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AppCredentials"] & {
                    tenant_key: components["schemas"]["TenantKey"];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TenantAccessToken"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["InvalidCredentials"];
            403: components["responses"]["Forbidden"];
            429: components["responses"]["RateLimited"];
        };
    };
    exchangeAuthCode: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AppCredentials"] & {
                    /** @description 授权码（带区前缀） */
                    code: string;
                    /**
                     * Format: uri
                     * @description 标准 OIDC 的码要传
                     */
                    redirect_uri?: string;
                    /** @description 用了 PKCE 时传 */
                    code_verifier?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserAccessToken"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["InvalidCredentials"];
            403: components["responses"]["Forbidden"];
            429: components["responses"]["RateLimited"];
        };
    };
    refreshUserToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AppCredentials"] & {
                    refresh_token: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserAccessToken"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["InvalidCredentials"];
            429: components["responses"]["RateLimited"];
        };
    };
    revokeToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AppCredentials"] & {
                    /** @description 用户令牌或刷新令牌 */
                    token: string;
                };
            };
        };
        responses: {
            /** @description 已作废（本来就无效也返回 204） */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["InvalidCredentials"];
        };
    };
    getUserInfo: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenUser"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            429: components["responses"]["RateLimited"];
        };
    };
    getTenant: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Tenant"];
                };
            };
            401: components["responses"]["Unauthenticated"];
        };
    };
    listTenantMembers: {
        parameters: {
            query?: {
                role?: components["schemas"]["OrgRole"];
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["TenantMember"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            429: components["responses"]["RateLimited"];
        };
    };
    inviteTenantMember: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 邮箱或手机号（E.164） */
                    identifier: string;
                    roles: components["schemas"]["OrgRole"][];
                };
            };
        };
        responses: {
            /** @description 已创建 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        invitation_id: string;
                        /** @enum {string} */
                        status: "sent" | "already_member";
                        /** @description 邀请链接，只给这一次 */
                        invite_link: string;
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            429: components["responses"]["RateLimited"];
        };
    };
    listClasses: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenClass"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    getClass: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenClass"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listClassMembers: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["ClassMember"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    addClassMember: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    open_id: components["schemas"]["OpenId"];
                };
            };
        };
        responses: {
            /** @description 已加入 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ClassMember"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    removeClassMember: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
                open_id: components["parameters"]["OpenIdPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 已移出 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listClassSessions: {
        parameters: {
            query: {
                from: string;
                to: string;
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenSession"][];
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    createClassSessions: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    title: string;
                    /**
                     * Format: date-time
                     * @description 第一次课的开始时间
                     */
                    starts_at: string;
                    /**
                     * Format: date-time
                     * @description 第一次课的结束时间（最长 12 小时）
                     */
                    ends_at: string;
                    /** @description IANA 时区 */
                    time_zone: string;
                    /** @description 上这些课的老师（必须是本班的老师）；不填时用户令牌是本人，机构令牌是班里唯一的那位老师（有几位时必填） */
                    teacher_open_id?: components["schemas"]["OpenId"];
                    /** @description 按周重复；`until`（含当天）和 `count` 二选一。第一次课那天的星期几必须在 `weekdays` 里。 */
                    recurrence?: {
                        /** @description 星期几（1 = 周一 … 7 = 周日），按 `time_zone` 的当地日期 */
                        weekdays: number[];
                        /**
                         * Format: date
                         * @description 最后一天（当地日期，含当天）
                         */
                        until?: string;
                        /** @description 一共几次 */
                        count?: number;
                    };
                    /** @description 地点：不传跟着班级，`null` 在线 */
                    place?: components["schemas"]["OpenPlaceInput"] | null;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        items: components["schemas"]["OpenSession"][];
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    setClassSessionPlace: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
                session_id: components["parameters"]["SessionId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 新地点；`null` 在线 */
                    place: components["schemas"]["OpenPlaceInput"] | null;
                    /**
                     * @description this 只改这一次；following 这一次及同一系列以后的课次
                     * @default this
                     * @enum {string}
                     */
                    scope?: "this" | "following";
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 改到了的课次 */
                        items: components["schemas"]["OpenSession"][];
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    cancelClassSession: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
                session_id: components["parameters"]["SessionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenSession"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    rescheduleClassSession: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
                session_id: components["parameters"]["SessionId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    starts_at: string;
                    duration_minutes?: number;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenSession"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    getSessionAttendance: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
                session_id: components["parameters"]["SessionId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        items: components["schemas"]["AttendanceRecord"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listAssignments: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenAssignment"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    createAssignment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    title: string;
                    instructions?: string;
                    /** Format: date-time */
                    due_at?: string | null;
                    /** @default 100 */
                    max_score?: number;
                    /**
                     * @description false 时留作草稿
                     * @default true
                     */
                    publish?: boolean;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenAssignment"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listSubmissions: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
                assignment_id: components["parameters"]["AssignmentId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenSubmission"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    setSubmissionScore: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
                assignment_id: components["parameters"]["AssignmentId"];
                open_id: components["parameters"]["OpenIdPath"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    score: number;
                    feedback?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenSubmission"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    exportClassGrades: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["GradeRow"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listCourses: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenCourse"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    getCourseOutline: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                course_id: components["parameters"]["CourseId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CourseOutline"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    updateCourseOutline: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                course_id: components["parameters"]["CourseId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    title?: string;
                    summary?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CourseOutline"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listCourseProgress: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                course_id: components["parameters"]["CourseId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["CourseProgress"][];
                        /** @description 有别的区没回答（它的学员这次缺席） */
                        partial?: boolean;
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    sendBotMessage: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BotMessage"];
            };
        };
        responses: {
            /** @description 已发出 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message_id: string;
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listBotChats: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["BotChat"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    sendNotification: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    open_ids: components["schemas"]["OpenId"][];
                    title: string;
                    body?: string;
                    /**
                     * Format: uri
                     * @description 必须在应用登记的可信域名里（否则 400）。通知卡片上出现「打开 xx 应用」按钮，点了在应用的容器里打开这个地址
                     *     （桌面端、手机走免登桥；`ChatSystemNotice.action`）。
                     */
                    link?: string;
                };
            };
        };
        responses: {
            /** @description 已接收（不是本机构成员的 open_id 跳过，列在 skipped 里） */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        sent: number;
                        skipped: components["schemas"]["OpenId"][];
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    listClassRecordings: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenRecording"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listTenantEvents: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenEvent"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    createTenantEvent: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OpenEventCreate"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenEvent"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            409: components["responses"]["Conflict"];
        };
    };
    updateTenantEvent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                event_id: components["parameters"]["EventId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OpenEventPatch"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenEvent"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    listEventRegistrations: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                event_id: components["parameters"]["EventId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["EventRegistration"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listTenantJobs: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenJob"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    createTenantJob: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OpenJobBody"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenJob"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    listJobCandidates: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                job_id: components["parameters"]["JobIdPath"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["JobCandidate"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listTrialVenues: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["TrialVenue"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    listTrialSlots: {
        parameters: {
            query?: {
                venue_id?: string;
                /** @description 只列这一个试听的时间 */
                opening_id?: string;
                include_past?: boolean;
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["TrialSlot"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    createTrialSlots: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * Format: uuid
                     * @description 加到这份试听上（不能和 `venue_id`、`course_title`、`teacher_open_id` 一起给）
                     */
                    opening_id?: string;
                    /**
                     * Format: uuid
                     * @description 没有 `opening_id` 时必填
                     */
                    venue_id?: string;
                    /** @description 没有 `opening_id` 时必填 */
                    course_title?: string;
                    /** @description 上试听的老师（本机构的老师，在机构所在区）；不填时新开的草稿缺老师 */
                    teacher_open_id?: components["schemas"]["OpenId"];
                    /** Format: date-time */
                    starts_at: string;
                    duration_minutes: number;
                    /** @description 每个时间几个人一起上 */
                    capacity: number;
                    /**
                     * @description 再按周重复几次（按教学点所在时区的当地时间）
                     * @default 0
                     */
                    repeat_weeks?: number;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        items: components["schemas"]["TrialSlot"][];
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            409: components["responses"]["Conflict"];
        };
    };
    cancelTrialSlot: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slot_id: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    reason?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TrialSlot"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    setTrialTeacher: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                opening_id: components["parameters"]["OpeningId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    teacher_open_id: components["schemas"]["OpenId"];
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenOpening"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    listTrialBookings: {
        parameters: {
            query?: {
                status?: "pending" | "confirmed" | "cancelled" | "reschedule_proposed" | "attended" | "expired";
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["TrialBooking"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    confirmTrialBooking: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                booking_id: components["parameters"]["BookingId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TrialBooking"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    listVenues: {
        parameters: {
            query?: {
                status?: "draft" | "pending" | "returned" | "published" | "closed" | "taken_down";
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenVenue"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    createVenue: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["OpenVenueCreate"];
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenVenue"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    getVenue: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                venue_id: components["parameters"]["VenueId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenVenue"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listOpenings: {
        parameters: {
            query?: {
                status?: "draft" | "review" | "enrolling" | "running" | "ended";
                kind?: "group" | "one_on_one" | "lecture" | "trial" | "video";
                /** @description 只列教这门课程的 */
                course_id?: string;
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenOpening"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    getOpening: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                opening_id: components["parameters"]["OpeningId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenOpening"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    getInsights: {
        parameters: {
            query?: {
                tab?: "enrollment" | "teaching" | "venues" | "income" | "community";
                /** @description 截止今天（含今天）往前几天；带了 `from`、`to` 时不看它 */
                range?: "7d" | "30d" | "90d" | "365d";
                /** @description 自定义时间的第一天（和 `to` 一起带） */
                from?: string;
                /** @description 自定义时间的最后一天（含） */
                to?: string;
                /** @description 和上一周期比 */
                compare?: boolean;
                /** @description 只看这个教学点（校区） */
                venue_id?: string;
                /** @description 只看这门课程 */
                course_id?: string;
                /** @description 收入页看哪种币种 */
                currency?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenInsightsPage"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    listTradeOrders: {
        parameters: {
            query?: {
                status?: string;
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["TradeOrder"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    listBookings: {
        parameters: {
            query?: {
                status?: "requested" | "confirmed" | "declined" | "cancelled" | "completed" | "expired" | "missed";
                kind?: "one_on_one" | "trial";
                /** @description 只列这一个开课的 */
                opening_id?: string;
                /** @description 上课时间不早于 */
                from?: string;
                /** @description 上课时间早于 */
                to?: string;
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenBooking"][];
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    getBooking: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                booking_id: components["parameters"]["BookingId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenBooking"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listTenantReviews: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenReview"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    replyReview: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                review_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    body: string;
                };
            };
        };
        responses: {
            /** @description 已提交 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    listPublicContent: {
        parameters: {
            query?: {
                q?: string;
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                kind: "courses" | "events" | "jobs";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    /** @description 今天这一种还能取多少条 */
                    "X-Daily-Quota-Remaining"?: number;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["PublicContent"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            429: components["responses"]["RateLimited"];
        };
    };
    getUserInterests: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InterestProfile"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    addInterestSignal: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 话题（和社区话题同一套写法，例如「商务中文」） */
                    topic: string;
                    /** @default 0.5 */
                    weight?: number;
                    /** @description 给用户看的来源说明，例如「在 xx 里常学商务中文」 */
                    reason: string;
                };
            };
        };
        responses: {
            /** @description OK */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        accepted: boolean;
                        signal_id?: string;
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    getUserLearningProfile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LearningProfile"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    reportOnBehalf: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 公开内容 ID（`<区>:<种类>:<ID>`） */
                    item_id: string;
                    /**
                     * @description 和平台举报的类别相同
                     * @enum {string}
                     */
                    category: "illegal" | "hate" | "harassment" | "violence" | "sexual" | "minors" | "self_harm" | "spam" | "scam" | "misinformation" | "privacy" | "ip" | "other";
                    details?: string;
                };
            };
        };
        responses: {
            /** @description 已提交 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    createCommunityImageUpload: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    content_type: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
                    size_bytes: number;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommunityImageUpload"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
            429: components["responses"]["RateLimited"];
            503: components["responses"]["FeatureDisabled"];
        };
    };
    createCommunityVideoUpload: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    filename: string;
                    /** @description 比如 video/mp4 */
                    content_type: string;
                    size_bytes: number;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommunityVideoUpload"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
            413: components["responses"]["PayloadTooLarge"];
            429: components["responses"]["RateLimited"];
        };
    };
    completeCommunityVideoUpload: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                asset_id: components["parameters"]["AssetId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommunityVideo"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
        };
    };
    getCommunityVideo: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                asset_id: components["parameters"]["AssetId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommunityVideo"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
            404: components["responses"]["NotFound"];
        };
    };
    listCommunityPosts: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["OpenCommunityPost"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
        };
    };
    createCommunityPost: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCommunityPost"];
            };
        };
        responses: {
            /** @description 已发出（看 `status`）；`uuid` 重复时返回的是原来那条 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenCommunityPost"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
            404: components["responses"]["NotFound"];
            409: components["responses"]["Conflict"];
            429: components["responses"]["RateLimited"];
            503: components["responses"]["FeatureDisabled"];
        };
    };
    getCommunityPost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                post_id: components["parameters"]["PostId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpenCommunityPost"];
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
            404: components["responses"]["NotFound"];
        };
    };
    deleteCommunityPost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                post_id: components["parameters"]["PostId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description 已删除 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
            404: components["responses"]["NotFound"];
        };
    };
    listCommunityCategories: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        items: {
                            /** @description 发帖时写进 `category` */
                            key: string;
                            /** @description 按 Accept-Language 本地化的名称 */
                            name: string;
                        }[];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["PostForbidden"];
        };
    };
    getMySchedule: {
        parameters: {
            query: {
                from: string;
                to: string;
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["MyScheduleEntry"][];
                    };
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    listMyCourses: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["MyCourse"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    listMyWords: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["MyWord"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
        };
    };
    addMyWord: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description 简体或繁体，存成简体 */
                    word: string;
                };
            };
        };
        responses: {
            /** @description 已经在生词本里 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MyWord"];
                };
            };
            /** @description 加进去了 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MyWord"];
                };
            };
            400: components["responses"]["ValidationFailed"];
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            409: components["responses"]["Conflict"];
        };
    };
    listClassExams: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        items: components["schemas"]["ClassExam"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    listClassExamResults: {
        parameters: {
            query?: {
                page_size?: components["parameters"]["PageSize"];
                page_token?: components["parameters"]["PageToken"];
            };
            header?: never;
            path: {
                class_id: components["parameters"]["ClassId"];
                exam_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PageMeta"] & {
                        /** @description 结果公布了没有；没公布时分数和评语都是 null */
                        released: boolean;
                        items: components["schemas"]["OpenSubmission"][];
                    };
                };
            };
            401: components["responses"]["Unauthenticated"];
            403: components["responses"]["ScopeDenied"];
            404: components["responses"]["NotFound"];
        };
    };
    onEvent: {
        parameters: {
            query?: never;
            header: {
                "X-Ich-Timestamp": string;
                "X-Ich-Nonce": string;
                "X-Ich-Signature": string;
                "X-Ich-Event-Id": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EventEnvelope"] | components["schemas"]["EncryptedEnvelope"] | components["schemas"]["UrlVerification"];
            };
        };
        responses: {
            /** @description 收到 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    onCardAction: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CardActionEnvelope"];
            };
        };
        responses: {
            /** @description 收到 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        card?: components["schemas"]["Card"];
                    };
                };
            };
        };
    };
}
