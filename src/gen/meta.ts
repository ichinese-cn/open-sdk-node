// Generated from docs/api/open-api.yaml by sdks/tools (pnpm sdk:gen) — do not edit.
/** The SDK's version (it follows the open API's). */
export const VERSION = '1.0.0-rc.4';
/** The open API's address from the release configuration (sdks/release.json); `baseUrl` overrides it. */
export const DEFAULT_BASE_URL = 'https://open.ichinese.cn';
export const API_PREFIX = '/open-apis/v1';

/** Every scope (permission code) of the open API. */
export const SCOPES = [
  'openid',
  'profile',
  'org:member:readonly',
  'org:member',
  'class:readonly',
  'class:member',
  'schedule:readonly',
  'schedule',
  'attendance:readonly',
  'coursework',
  'grade:readonly',
  'course',
  'learning:progress:readonly',
  'im:message:send_as_bot',
  'im:chat:readonly',
  'notify:send',
  'live:recording:readonly',
  'event',
  'event:registration:readonly',
  'job',
  'job:candidate:readonly',
  'trial',
  'trade:order:readonly',
  'trade:booking:readonly',
  'venue:readonly',
  'venue',
  'opening:readonly',
  'review',
  'profile:interest:readonly',
  'profile:interest',
  'profile:learning:readonly',
  'report:create',
  'community:post',
  'me:schedule:readonly',
  'me:learning:readonly',
  'me:words:readonly',
  'me:words',
  'insights:readonly'
] as const;
export type Scope = (typeof SCOPES)[number];

/** The events an app can subscribe to. */
export const EVENT_TYPES = [
  'app.installed',
  'app.uninstalled',
  'app.scopes_changed',
  'coursework.submitted',
  'grade.published',
  'schedule.session_changed',
  'event.registered',
  'job.candidate_applied',
  'trade.order_paid',
  'review.created',
  'trial.booked',
  'im.message_received',
  'class.member_changed',
  'course.completed',
  'exam.results_released',
  'event.checked_in',
  'live.recording_ready',
  'trade.order_refunded',
  'trial.confirmed',
  'trial.cancelled',
  'community.post_reviewed',
  'community.video_ready',
  'booking.changed'
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

/** `error.details.reason` values. */
export const ERROR_REASONS = [
  'invalid_credentials',
  'invalid_token',
  'token_expired',
  'token_type',
  'app_disabled',
  'not_installed',
  'not_available',
  'scope_denied',
  'scope_pending',
  'scope_not_declared',
  'gold_only',
  'rate_limited',
  'daily_quota_exceeded',
  'code_expired',
  'code_used',
  'code_invalid',
  'redirect_uri_mismatch',
  'origin_not_trusted',
  'ip_not_allowed',
  'org_not_installed',
  'minor_not_allowed',
  'birth_year_required',
  'feature_disabled',
  'app_post_stopped',
  'consent_required',
  'video_not_ready',
  'video_failed',
  'post_rate_limited',
  'app_user_daily_limit',
  'post_in_progress',
  'no_org_account',
  'teacher_busy',
  'online_only',
  'venue_unavailable',
  'venue_not_found',
  'slot_overlap',
  'slot_taken',
  'not_draft',
  'not_editable',
  'org_not_verified',
  'opening_ended',
  'opening_incomplete'
] as const;
export type ErrorReason = (typeof ERROR_REASONS)[number];

/** Token types each operation accepts (the client picks the token by them). */
export const OPERATION_TOKENS: Record<string, readonly ('app' | 'tenant' | 'user')[]> = {
  getUserInfo: ['user'],
  getTenant: ['tenant'],
  listTenantMembers: ['tenant'],
  inviteTenantMember: ['tenant'],
  listClasses: ['tenant', 'user'],
  getClass: ['tenant', 'user'],
  listClassMembers: ['tenant', 'user'],
  addClassMember: ['tenant', 'user'],
  removeClassMember: ['tenant', 'user'],
  listClassSessions: ['tenant', 'user'],
  createClassSessions: ['tenant', 'user'],
  setClassSessionPlace: ['tenant', 'user'],
  cancelClassSession: ['tenant', 'user'],
  rescheduleClassSession: ['tenant', 'user'],
  getSessionAttendance: ['tenant', 'user'],
  listAssignments: ['tenant', 'user'],
  createAssignment: ['tenant', 'user'],
  listSubmissions: ['tenant', 'user'],
  setSubmissionScore: ['tenant', 'user'],
  exportClassGrades: ['tenant', 'user'],
  listCourses: ['tenant', 'user'],
  getCourseOutline: ['tenant', 'user'],
  updateCourseOutline: ['tenant', 'user'],
  listCourseProgress: ['tenant', 'user'],
  sendBotMessage: ['tenant', 'app'],
  listBotChats: ['tenant', 'app'],
  sendNotification: ['tenant'],
  listClassRecordings: ['tenant', 'user'],
  listTenantEvents: ['tenant'],
  createTenantEvent: ['tenant'],
  updateTenantEvent: ['tenant'],
  listEventRegistrations: ['tenant'],
  listTenantJobs: ['tenant'],
  createTenantJob: ['tenant'],
  listJobCandidates: ['tenant'],
  listTrialVenues: ['tenant'],
  listTrialSlots: ['tenant'],
  createTrialSlots: ['tenant'],
  cancelTrialSlot: ['tenant'],
  setTrialTeacher: ['tenant'],
  listTrialBookings: ['tenant'],
  confirmTrialBooking: ['tenant'],
  listVenues: ['tenant'],
  createVenue: ['tenant'],
  getVenue: ['tenant'],
  listOpenings: ['tenant', 'user'],
  getOpening: ['tenant', 'user'],
  getInsights: ['tenant'],
  listTradeOrders: ['tenant'],
  listBookings: ['tenant'],
  getBooking: ['tenant'],
  listTenantReviews: ['tenant'],
  replyReview: ['tenant'],
  listPublicContent: ['app', 'tenant', 'user'],
  getUserInterests: ['user'],
  addInterestSignal: ['user'],
  getUserLearningProfile: ['user'],
  reportOnBehalf: ['user'],
  createCommunityImageUpload: ['user', 'tenant'],
  createCommunityVideoUpload: ['user', 'tenant'],
  completeCommunityVideoUpload: ['user', 'tenant'],
  getCommunityVideo: ['user', 'tenant'],
  listCommunityPosts: ['user', 'tenant'],
  createCommunityPost: ['user', 'tenant'],
  getCommunityPost: ['user', 'tenant'],
  deleteCommunityPost: ['user', 'tenant'],
  listCommunityCategories: ['user', 'tenant'],
  getMySchedule: ['user'],
  listMyCourses: ['user'],
  listMyWords: ['user'],
  addMyWord: ['user'],
  listClassExams: ['tenant'],
  listClassExamResults: ['tenant'],
};

export const SCOPE_OPENID = 'openid';
export const SCOPE_PROFILE = 'profile';
export const SCOPE_ORG_MEMBER_READONLY = 'org:member:readonly';
export const SCOPE_ORG_MEMBER = 'org:member';
export const SCOPE_CLASS_READONLY = 'class:readonly';
export const SCOPE_CLASS_MEMBER = 'class:member';
export const SCOPE_SCHEDULE_READONLY = 'schedule:readonly';
export const SCOPE_SCHEDULE = 'schedule';
export const SCOPE_ATTENDANCE_READONLY = 'attendance:readonly';
export const SCOPE_COURSEWORK = 'coursework';
export const SCOPE_GRADE_READONLY = 'grade:readonly';
export const SCOPE_COURSE = 'course';
export const SCOPE_LEARNING_PROGRESS_READONLY = 'learning:progress:readonly';
export const SCOPE_IM_MESSAGE_SEND_AS_BOT = 'im:message:send_as_bot';
export const SCOPE_IM_CHAT_READONLY = 'im:chat:readonly';
export const SCOPE_NOTIFY_SEND = 'notify:send';
export const SCOPE_LIVE_RECORDING_READONLY = 'live:recording:readonly';
export const SCOPE_EVENT = 'event';
export const SCOPE_EVENT_REGISTRATION_READONLY = 'event:registration:readonly';
export const SCOPE_JOB = 'job';
export const SCOPE_JOB_CANDIDATE_READONLY = 'job:candidate:readonly';
export const SCOPE_TRIAL = 'trial';
export const SCOPE_TRADE_ORDER_READONLY = 'trade:order:readonly';
export const SCOPE_TRADE_BOOKING_READONLY = 'trade:booking:readonly';
export const SCOPE_VENUE_READONLY = 'venue:readonly';
export const SCOPE_VENUE = 'venue';
export const SCOPE_OPENING_READONLY = 'opening:readonly';
export const SCOPE_REVIEW = 'review';
export const SCOPE_PROFILE_INTEREST_READONLY = 'profile:interest:readonly';
export const SCOPE_PROFILE_INTEREST = 'profile:interest';
export const SCOPE_PROFILE_LEARNING_READONLY = 'profile:learning:readonly';
export const SCOPE_REPORT_CREATE = 'report:create';
export const SCOPE_COMMUNITY_POST = 'community:post';
export const SCOPE_ME_SCHEDULE_READONLY = 'me:schedule:readonly';
export const SCOPE_ME_LEARNING_READONLY = 'me:learning:readonly';
export const SCOPE_ME_WORDS_READONLY = 'me:words:readonly';
export const SCOPE_ME_WORDS = 'me:words';
export const SCOPE_INSIGHTS_READONLY = 'insights:readonly';
