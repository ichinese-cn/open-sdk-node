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
         *     - **标准 OIDC 的授权码**：普通浏览器里 JS SDK 退回签发方 `/authorize`（先 `prompt=none` 静默）拿到的码；
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
        /** 试听时段（默认只列没结束的，按时间） */
        get: operations["listTrialSlots"];
        put?: never;
        /**
         * 排试听时段（可以按周重复）；教学点要已发布
         * @description 409 `venue_not_published`；开始时间已过 400。老师在平台里指定（第一批不按 open_id 指定老师）。
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
        /** 取消一个试听时段（已约的人照常收到通知，预约随之取消） */
        post: operations["cancelTrialSlot"];
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
        /** 机构各教学点的试听预约 */
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
        /** 确认一个试听预约 */
        post: operations["confirmTrialBooking"];
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
        OpenErrorReason: "invalid_credentials" | "invalid_token" | "token_expired" | "token_type" | "app_disabled" | "not_installed" | "not_available" | "scope_denied" | "scope_pending" | "scope_not_declared" | "gold_only" | "rate_limited" | "daily_quota_exceeded" | "code_expired" | "code_used" | "code_invalid" | "redirect_uri_mismatch" | "origin_not_trusted" | "ip_not_allowed";
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
                } & {
                    [key: string]: unknown;
                };
            };
        };
        /** @description 一个人在一个应用里的 ID（同一个人在不同应用里不同，和 OIDC 的 `sub` 相同） */
        OpenId: string;
        /** @description 装了应用的机构（`<机构所在区>.<机构 ID>`） */
        TenantKey: string;
        /** @description App ID（`<应用所在区>.cli_…`），也是 OIDC 的 client_id */
        AppId: string;
        /** @description 权限码（目录见 `ScopeCode`；平台的 `GET /api/v1/open/scopes` 返回带说明的目录） */
        Scope: string;
        /** @enum {string} */
        ScopeCode: "openid" | "profile" | "org:member:readonly" | "org:member" | "class:readonly" | "class:member" | "schedule:readonly" | "schedule" | "attendance:readonly" | "coursework" | "grade:readonly" | "course" | "learning:progress:readonly" | "im:message:send_as_bot" | "im:chat:readonly" | "notify:send" | "live:recording:readonly" | "event" | "event:registration:readonly" | "job" | "job:candidate:readonly" | "trial" | "trade:order:readonly" | "review" | "profile:interest:readonly" | "profile:interest" | "profile:learning:readonly" | "report:create";
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
            /** @enum {string} */
            status: "scheduled" | "live" | "ended" | "cancelled";
            /** @description 是不是在在线课堂里上（课次都是） */
            live?: boolean;
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
            series_id?: string | null;
            /** @enum {string} */
            status: "open" | "cancelled";
        };
        TrialBooking: {
            /** Format: uuid */
            booking_id: string;
            venue_id?: string;
            open_id?: components["schemas"]["OpenId"];
            status: string;
            /** Format: date-time */
            starts_at: string;
            /** Format: date-time */
            ends_at?: string | null;
            course_title?: string | null;
        };
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
        EventType: "app.installed" | "app.uninstalled" | "app.scopes_changed" | "coursework.submitted" | "grade.published" | "schedule.session_changed" | "event.registered" | "job.candidate_applied" | "trade.order_paid" | "review.created" | "trial.booked" | "im.message_received";
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
         *     （金牌机构专属）或 `token_type`。应用要能降级。
         */
        ScopeDenied: {
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
        /** @description RATE_LIMITED（`details.reason`：`rate_limited` 或 `daily_quota_exceeded`） */
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
        BookingId: string;
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
                    /** Format: uuid */
                    venue_id: string;
                    /** Format: date-time */
                    starts_at: string;
                    duration_minutes: number;
                    capacity: number;
                    course_title: string;
                    /** @default 0 */
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
