// Generated from docs/api/open-api.yaml by sdks/tools (pnpm sdk:gen) — do not edit.
/** The SDK's version (it follows the open API's). */
export const VERSION = '1.0.0-rc.1';
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
  'review',
  'profile:interest:readonly',
  'profile:interest',
  'profile:learning:readonly',
  'report:create'
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
  'im.message_received'
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
  'ip_not_allowed'
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
  listTrialBookings: ['tenant'],
  confirmTrialBooking: ['tenant'],
  listTradeOrders: ['tenant'],
  listTenantReviews: ['tenant'],
  replyReview: ['tenant'],
  listPublicContent: ['app', 'tenant', 'user'],
  getUserInterests: ['user'],
  addInterestSignal: ['user'],
  getUserLearningProfile: ['user'],
  reportOnBehalf: ['user'],
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
export const SCOPE_REVIEW = 'review';
export const SCOPE_PROFILE_INTEREST_READONLY = 'profile:interest:readonly';
export const SCOPE_PROFILE_INTEREST = 'profile:interest';
export const SCOPE_PROFILE_LEARNING_READONLY = 'profile:learning:readonly';
export const SCOPE_REPORT_CREATE = 'report:create';
