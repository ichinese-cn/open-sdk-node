// Generated from docs/api/open-api.yaml by sdks/tools (pnpm sdk:gen) — do not edit.
import type { CallSpec, RequestOptions } from '../types.ts';
import type { operations } from './schema.ts';

type Op = keyof operations;
/** The query parameters of an operation. */
export type QueryOf<K extends Op> = operations[K] extends { parameters: { query?: infer P } }
  ? NonNullable<P>
  : never;
/** The JSON request body of an operation. */
export type BodyOf<K extends Op> = operations[K] extends {
  requestBody: { content: { 'application/json': infer T } };
}
  ? T
  : never;
/** What an operation answers (its 2xx JSON body; `void` for 204). */
export type ResultOf<K extends Op> = operations[K]['responses'] extends infer R
  ? R extends { 200: { content: { 'application/json': infer T } } }
    ? T
    : R extends { 201: { content: { 'application/json': infer T } } }
      ? T
      : void
  : never;
/** One item of a paged list. */
export type ItemOf<K extends Op> = ResultOf<K> extends { items: (infer I)[] } ? I : never;

/** Every operation of the open API as a method; the client (client.ts) supplies tokens, retries and paging. */
export abstract class Operations {
  protected abstract call<T>(spec: CallSpec, options?: RequestOptions): Promise<T>;
  protected abstract iterate<T>(spec: CallSpec, options?: RequestOptions): AsyncIterable<T>;

  /** The current user (user token) (`GET /user/info`; user token; scopes: openid) */
  getUserInfo(options?: RequestOptions): Promise<ResultOf<'getUserInfo'>> {
    return this.call({ id: 'getUserInfo', method: 'GET', path: '/user/info', pathParams: {}, tokenTypes: ['user'] }, options);
  }

  /** The institution that installed the app (tenant token) (`GET /tenant`; tenant token) */
  getTenant(options?: RequestOptions): Promise<ResultOf<'getTenant'>> {
    return this.call({ id: 'getTenant', method: 'GET', path: '/tenant', pathParams: {}, tokenTypes: ['tenant'] }, options);
  }

  /** The institution's members (directory); members in all regions are listed together, without revealing regions (`GET /tenant/members`; tenant token; scopes: org:member:readonly, org:member) */
  listTenantMembers(query?: QueryOf<'listTenantMembers'>, options?: RequestOptions): Promise<ResultOf<'listTenantMembers'>> {
    return this.call({ id: 'listTenantMembers', method: 'GET', path: '/tenant/members', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listTenantMembers`, page after page. */
  listTenantMembersAll(query?: Omit<QueryOf<'listTenantMembers'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listTenantMembers'>> {
    return this.iterate({ id: 'listTenantMembers', method: 'GET', path: '/tenant/members', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Invite a member (they join only after accepting, the same as inviting in the institution admin) (`POST /tenant/invitations`; tenant token; scopes: org:member) */
  inviteTenantMember(body: BodyOf<'inviteTenantMember'>, options?: RequestOptions): Promise<ResultOf<'inviteTenantMember'>> {
    return this.call({ id: 'inviteTenantMember', method: 'POST', path: '/tenant/invitations', pathParams: {}, body, tokenTypes: ['tenant'] }, options);
  }

  /** Classes: with a tenant token, all of the institution's classes; with a user token, the classes this user teaches (`GET /classes`; tenant / user token; scopes: class:readonly, class:member) */
  listClasses(query?: QueryOf<'listClasses'>, options?: RequestOptions): Promise<ResultOf<'listClasses'>> {
    return this.call({ id: 'listClasses', method: 'GET', path: '/classes', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listClasses`, page after page. */
  listClassesAll(query?: Omit<QueryOf<'listClasses'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listClasses'>> {
    return this.iterate({ id: 'listClasses', method: 'GET', path: '/classes', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** A class (`GET /classes/{class_id}`; tenant / user token; scopes: class:readonly, class:member) */
  getClass(classId: string, options?: RequestOptions): Promise<ResultOf<'getClass'>> {
    return this.call({ id: 'getClass', method: 'GET', path: '/classes/{class_id}', pathParams: { class_id: classId }, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Roster (teachers and learners) (`GET /classes/{class_id}/members`; tenant / user token; scopes: class:readonly, class:member) */
  listClassMembers(classId: string, query?: QueryOf<'listClassMembers'>, options?: RequestOptions): Promise<ResultOf<'listClassMembers'>> {
    return this.call({ id: 'listClassMembers', method: 'GET', path: '/classes/{class_id}/members', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listClassMembers`, page after page. */
  listClassMembersAll(classId: string, query?: Omit<QueryOf<'listClassMembers'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listClassMembers'>> {
    return this.iterate({ id: 'listClassMembers', method: 'GET', path: '/classes/{class_id}/members', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Add one of the institution's members to a class (as a learner) (`POST /classes/{class_id}/members`; tenant / user token; scopes: class:member) */
  addClassMember(classId: string, body: BodyOf<'addClassMember'>, options?: RequestOptions): Promise<ResultOf<'addClassMember'>> {
    return this.call({ id: 'addClassMember', method: 'POST', path: '/classes/{class_id}/members', pathParams: { class_id: classId }, body, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Remove a learner from a class (`DELETE /classes/{class_id}/members/{open_id}`; tenant / user token; scopes: class:member) */
  removeClassMember(classId: string, openId: string, options?: RequestOptions): Promise<ResultOf<'removeClassMember'>> {
    return this.call({ id: 'removeClassMember', method: 'DELETE', path: '/classes/{class_id}/members/{open_id}', pathParams: { class_id: classId, open_id: openId }, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** A class's sessions (within a time range of at most 100 days) (`GET /classes/{class_id}/sessions`; tenant / user token; scopes: schedule:readonly, schedule) */
  listClassSessions(classId: string, query: QueryOf<'listClassSessions'>, options?: RequestOptions): Promise<ResultOf<'listClassSessions'>> {
    return this.call({ id: 'listClassSessions', method: 'GET', path: '/classes/{class_id}/sessions', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listClassSessions`, page after page. */
  listClassSessionsAll(classId: string, query?: Omit<QueryOf<'listClassSessions'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listClassSessions'>> {
    return this.iterate({ id: 'listClassSessions', method: 'GET', path: '/classes/{class_id}/sessions', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Schedule a class's sessions (once, or repeating weekly), online or at one of the institution's teaching sites (`POST /classes/{class_id}/sessions`; tenant / user token; scopes: schedule) */
  createClassSessions(classId: string, body: BodyOf<'createClassSessions'>, options?: RequestOptions): Promise<ResultOf<'createClassSessions'>> {
    return this.call({ id: 'createClassSessions', method: 'POST', path: '/classes/{class_id}/sessions', pathParams: { class_id: classId }, body, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Change where one session (or this one and the later ones of its series) is held (`PUT /classes/{class_id}/sessions/{session_id}/place`; tenant / user token; scopes: schedule) */
  setClassSessionPlace(classId: string, sessionId: string, body: BodyOf<'setClassSessionPlace'>, options?: RequestOptions): Promise<ResultOf<'setClassSessionPlace'>> {
    return this.call({ id: 'setClassSessionPlace', method: 'PUT', path: '/classes/{class_id}/sessions/{session_id}/place', pathParams: { class_id: classId, session_id: sessionId }, body, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Cancel a class session (members are notified, the same as cancelling in the timetable) (`POST /classes/{class_id}/sessions/{session_id}/cancel`; tenant / user token; scopes: schedule) */
  cancelClassSession(classId: string, sessionId: string, options?: RequestOptions): Promise<ResultOf<'cancelClassSession'>> {
    return this.call({ id: 'cancelClassSession', method: 'POST', path: '/classes/{class_id}/sessions/{session_id}/cancel', pathParams: { class_id: classId, session_id: sessionId }, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Reschedule a class session (`POST /classes/{class_id}/sessions/{session_id}/reschedule`; tenant / user token; scopes: schedule) */
  rescheduleClassSession(classId: string, sessionId: string, body: BodyOf<'rescheduleClassSession'>, options?: RequestOptions): Promise<ResultOf<'rescheduleClassSession'>> {
    return this.call({ id: 'rescheduleClassSession', method: 'POST', path: '/classes/{class_id}/sessions/{session_id}/reschedule', pathParams: { class_id: classId, session_id: sessionId }, body, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Attendance of a class session (who came, and how long they stayed in the classroom) (`GET /classes/{class_id}/sessions/{session_id}/attendance`; tenant / user token; scopes: attendance:readonly) */
  getSessionAttendance(classId: string, sessionId: string, options?: RequestOptions): Promise<ResultOf<'getSessionAttendance'>> {
    return this.call({ id: 'getSessionAttendance', method: 'GET', path: '/classes/{class_id}/sessions/{session_id}/attendance', pathParams: { class_id: classId, session_id: sessionId }, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** A class's assignments and exams (`GET /classes/{class_id}/assignments`; tenant / user token; scopes: coursework, grade:readonly) */
  listAssignments(classId: string, query?: QueryOf<'listAssignments'>, options?: RequestOptions): Promise<ResultOf<'listAssignments'>> {
    return this.call({ id: 'listAssignments', method: 'GET', path: '/classes/{class_id}/assignments', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listAssignments`, page after page. */
  listAssignmentsAll(classId: string, query?: Omit<QueryOf<'listAssignments'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listAssignments'>> {
    return this.iterate({ id: 'listAssignments', method: 'GET', path: '/classes/{class_id}/assignments', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Create an assignment (text instructions + due time; questions are edited in the platform). With a user token, the user must be a teacher of this class (`POST /classes/{class_id}/assignments`; tenant / user token; scopes: coursework) */
  createAssignment(classId: string, body: BodyOf<'createAssignment'>, options?: RequestOptions): Promise<ResultOf<'createAssignment'>> {
    return this.call({ id: 'createAssignment', method: 'POST', path: '/classes/{class_id}/assignments', pathParams: { class_id: classId }, body, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** An assignment's submissions and scores (`GET /classes/{class_id}/assignments/{assignment_id}/submissions`; tenant / user token; scopes: grade:readonly) */
  listSubmissions(classId: string, assignmentId: string, query?: QueryOf<'listSubmissions'>, options?: RequestOptions): Promise<ResultOf<'listSubmissions'>> {
    return this.call({ id: 'listSubmissions', method: 'GET', path: '/classes/{class_id}/assignments/{assignment_id}/submissions', pathParams: { class_id: classId, assignment_id: assignmentId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listSubmissions`, page after page. */
  listSubmissionsAll(classId: string, assignmentId: string, query?: Omit<QueryOf<'listSubmissions'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listSubmissions'>> {
    return this.iterate({ id: 'listSubmissions', method: 'GET', path: '/classes/{class_id}/assignments/{assignment_id}/submissions', pathParams: { class_id: classId, assignment_id: assignmentId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Write back a score (the result of external grading); the learner is notified that grades are published (`PUT /classes/{class_id}/assignments/{assignment_id}/submissions/{open_id}/score`; tenant / user token; scopes: coursework) */
  setSubmissionScore(classId: string, assignmentId: string, openId: string, body: BodyOf<'setSubmissionScore'>, options?: RequestOptions): Promise<ResultOf<'setSubmissionScore'>> {
    return this.call({ id: 'setSubmissionScore', method: 'PUT', path: '/classes/{class_id}/assignments/{assignment_id}/submissions/{open_id}/score', pathParams: { class_id: classId, assignment_id: assignmentId, open_id: openId }, body, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Export grades (one row per learner per assignment) (`GET /classes/{class_id}/grades`; tenant / user token; scopes: grade:readonly) */
  exportClassGrades(classId: string, query?: QueryOf<'exportClassGrades'>, options?: RequestOptions): Promise<ResultOf<'exportClassGrades'>> {
    return this.call({ id: 'exportClassGrades', method: 'GET', path: '/classes/{class_id}/grades', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `exportClassGrades`, page after page. */
  exportClassGradesAll(classId: string, query?: Omit<QueryOf<'exportClassGrades'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'exportClassGrades'>> {
    return this.iterate({ id: 'exportClassGrades', method: 'GET', path: '/classes/{class_id}/grades', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** The institution's recorded courses (tenant token) or the courses this user authored (user token) (`GET /courses`; tenant / user token; scopes: course, learning:progress:readonly) */
  listCourses(query?: QueryOf<'listCourses'>, options?: RequestOptions): Promise<ResultOf<'listCourses'>> {
    return this.call({ id: 'listCourses', method: 'GET', path: '/courses', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listCourses`, page after page. */
  listCoursesAll(query?: Omit<QueryOf<'listCourses'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listCourses'>> {
    return this.iterate({ id: 'listCourses', method: 'GET', path: '/courses', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Course outline (titles and order of chapters and lessons) (`GET /courses/{course_id}`; tenant / user token; scopes: course) */
  getCourseOutline(courseId: string, options?: RequestOptions): Promise<ResultOf<'getCourseOutline'>> {
    return this.call({ id: 'getCourseOutline', method: 'GET', path: '/courses/{course_id}', pathParams: { course_id: courseId }, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Change a course's title and introduction; a published course that is changed goes through review again as usual (`PATCH /courses/{course_id}`; tenant / user token; scopes: course) */
  updateCourseOutline(courseId: string, body: BodyOf<'updateCourseOutline'>, options?: RequestOptions): Promise<ResultOf<'updateCourseOutline'>> {
    return this.call({ id: 'updateCourseOutline', method: 'PATCH', path: '/courses/{course_id}', pathParams: { course_id: courseId }, body, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Learners' learning progress (number of lessons completed). A user token can only see its own (`GET /courses/{course_id}/progress`; tenant / user token; scopes: learning:progress:readonly) */
  listCourseProgress(courseId: string, query?: QueryOf<'listCourseProgress'>, options?: RequestOptions): Promise<ResultOf<'listCourseProgress'>> {
    return this.call({ id: 'listCourseProgress', method: 'GET', path: '/courses/{course_id}/progress', pathParams: { course_id: courseId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listCourseProgress`, page after page. */
  listCourseProgressAll(courseId: string, query?: Omit<QueryOf<'listCourseProgress'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listCourseProgress'>> {
    return this.iterate({ id: 'listCourseProgress', method: 'GET', path: '/courses/{course_id}/progress', pathParams: { course_id: courseId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Send a bot message (text or card) to a group chat the bot is in, or privately to a user who installed the app (`POST /im/messages`; tenant / app token; scopes: im:message:send_as_bot) */
  sendBotMessage(body: BodyOf<'sendBotMessage'>, options?: RequestOptions): Promise<ResultOf<'sendBotMessage'>> {
    return this.call({ id: 'sendBotMessage', method: 'POST', path: '/im/messages', pathParams: {}, body, tokenTypes: ['tenant', 'app'] }, options);
  }

  /** Group chats the bot is in (`GET /im/chats`; tenant / app token; scopes: im:chat:readonly) */
  listBotChats(query?: QueryOf<'listBotChats'>, options?: RequestOptions): Promise<ResultOf<'listBotChats'>> {
    return this.call({ id: 'listBotChats', method: 'GET', path: '/im/chats', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'app'] }, options);
  }

  /** Every item of `listBotChats`, page after page. */
  listBotChatsAll(query?: Omit<QueryOf<'listBotChats'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listBotChats'>> {
    return this.iterate({ id: 'listBotChats', method: 'GET', path: '/im/chats', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'app'] }, options);
  }

  /** Send a notification to members of this institution (it goes to "System notifications" and is pushed according to each recipient's notification settings and quiet hours) (`POST /notifications`; tenant token; scopes: notify:send) */
  sendNotification(body: BodyOf<'sendNotification'>, options?: RequestOptions): Promise<ResultOf<'sendNotification'>> {
    return this.call({ id: 'sendNotification', method: 'POST', path: '/notifications', pathParams: {}, body, tokenTypes: ['tenant'] }, options);
  }

  /** Replays and post-class summaries of a class's live sessions (no playback URL; `watch_url` opens the replay page in the platform) (`GET /classes/{class_id}/recordings`; tenant / user token; scopes: live:recording:readonly) */
  listClassRecordings(classId: string, query?: QueryOf<'listClassRecordings'>, options?: RequestOptions): Promise<ResultOf<'listClassRecordings'>> {
    return this.call({ id: 'listClassRecordings', method: 'GET', path: '/classes/{class_id}/recordings', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listClassRecordings`, page after page. */
  listClassRecordingsAll(classId: string, query?: Omit<QueryOf<'listClassRecordings'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listClassRecordings'>> {
    return this.iterate({ id: 'listClassRecordings', method: 'GET', path: '/classes/{class_id}/recordings', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** The institution's events (including drafts and those pending review) (`GET /events`; tenant token; scopes: event, event:registration:readonly) */
  listTenantEvents(query?: QueryOf<'listTenantEvents'>, options?: RequestOptions): Promise<ResultOf<'listTenantEvents'>> {
    return this.call({ id: 'listTenantEvents', method: 'GET', path: '/events', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listTenantEvents`, page after page. */
  listTenantEventsAll(query?: Omit<QueryOf<'listTenantEvents'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listTenantEvents'>> {
    return this.iterate({ id: 'listTenantEvents', method: 'GET', path: '/events', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Create an event (a draft; the institution publishes it in its console, moderated as usual) (`POST /events`; tenant token; scopes: event) */
  createTenantEvent(body: BodyOf<'createTenantEvent'>, options?: RequestOptions): Promise<ResultOf<'createTenantEvent'>> {
    return this.call({ id: 'createTenantEvent', method: 'POST', path: '/events', pathParams: {}, body, tokenTypes: ['tenant'] }, options);
  }

  /** Change an event (the same fields as event editing in the platform's institution console) (`PATCH /events/{event_id}`; tenant token; scopes: event) */
  updateTenantEvent(eventId: string, body: BodyOf<'updateTenantEvent'>, options?: RequestOptions): Promise<ResultOf<'updateTenantEvent'>> {
    return this.call({ id: 'updateTenantEvent', method: 'PATCH', path: '/events/{event_id}', pathParams: { event_id: eventId }, body, tokenTypes: ['tenant'] }, options);
  }

  /** An event's registrations and check-ins (`GET /events/{event_id}/registrations`; tenant token; scopes: event:registration:readonly) */
  listEventRegistrations(eventId: string, query?: QueryOf<'listEventRegistrations'>, options?: RequestOptions): Promise<ResultOf<'listEventRegistrations'>> {
    return this.call({ id: 'listEventRegistrations', method: 'GET', path: '/events/{event_id}/registrations', pathParams: { event_id: eventId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listEventRegistrations`, page after page. */
  listEventRegistrationsAll(eventId: string, query?: Omit<QueryOf<'listEventRegistrations'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listEventRegistrations'>> {
    return this.iterate({ id: 'listEventRegistrations', method: 'GET', path: '/events/{event_id}/registrations', pathParams: { event_id: eventId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** The institution's job postings (including drafts and those pending review) (`GET /jobs`; tenant token; scopes: job, job:candidate:readonly) */
  listTenantJobs(query?: QueryOf<'listTenantJobs'>, options?: RequestOptions): Promise<ResultOf<'listTenantJobs'>> {
    return this.call({ id: 'listTenantJobs', method: 'GET', path: '/jobs', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listTenantJobs`, page after page. */
  listTenantJobsAll(query?: Omit<QueryOf<'listTenantJobs'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listTenantJobs'>> {
    return this.iterate({ id: 'listTenantJobs', method: 'GET', path: '/jobs', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Sync in a job posting (as a draft; submitting and publishing still go through the institution's review and NetEase Yidun automatic review) (`POST /jobs`; tenant token; scopes: job) */
  createTenantJob(body: BodyOf<'createTenantJob'>, options?: RequestOptions): Promise<ResultOf<'createTenantJob'>> {
    return this.call({ id: 'createTenantJob', method: 'POST', path: '/jobs', pathParams: {}, body, tokenTypes: ['tenant'] }, options);
  }

  /** A job's candidates (the fields they agreed to give the institution when applying) (`GET /jobs/{job_id}/candidates`; tenant token; scopes: job:candidate:readonly) */
  listJobCandidates(jobId: string, query?: QueryOf<'listJobCandidates'>, options?: RequestOptions): Promise<ResultOf<'listJobCandidates'>> {
    return this.call({ id: 'listJobCandidates', method: 'GET', path: '/jobs/{job_id}/candidates', pathParams: { job_id: jobId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listJobCandidates`, page after page. */
  listJobCandidatesAll(jobId: string, query?: Omit<QueryOf<'listJobCandidates'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listJobCandidates'>> {
    return this.iterate({ id: 'listJobCandidates', method: 'GET', path: '/jobs/{job_id}/candidates', pathParams: { job_id: jobId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** The institution's teaching sites (use their venue_id to schedule trial slots) (`GET /trial/venues`; tenant token; scopes: trial) */
  listTrialVenues(query?: QueryOf<'listTrialVenues'>, options?: RequestOptions): Promise<ResultOf<'listTrialVenues'>> {
    return this.call({ id: 'listTrialVenues', method: 'GET', path: '/trial/venues', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listTrialVenues`, page after page. */
  listTrialVenuesAll(query?: Omit<QueryOf<'listTrialVenues'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listTrialVenues'>> {
    return this.iterate({ id: 'listTrialVenues', method: 'GET', path: '/trial/venues', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Trial times (a trial lesson's own times at teaching sites; by default only those not over yet, by time) (`GET /trial/slots`; tenant token; scopes: trial) */
  listTrialSlots(query?: QueryOf<'listTrialSlots'>, options?: RequestOptions): Promise<ResultOf<'listTrialSlots'>> {
    return this.call({ id: 'listTrialSlots', method: 'GET', path: '/trial/slots', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listTrialSlots`, page after page. */
  listTrialSlotsAll(query?: Omit<QueryOf<'listTrialSlots'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listTrialSlots'>> {
    return this.iterate({ id: 'listTrialSlots', method: 'GET', path: '/trial/slots', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Open trial times (they can repeat weekly): add them to an existing trial lesson, or open a new trial draft (`POST /trial/slots`; tenant token; scopes: trial) */
  createTrialSlots(body: BodyOf<'createTrialSlots'>, options?: RequestOptions): Promise<ResultOf<'createTrialSlots'>> {
    return this.call({ id: 'createTrialSlots', method: 'POST', path: '/trial/slots', pathParams: {}, body, tokenTypes: ['tenant'] }, options);
  }

  /** Close a trial time (no more bookings; bookings already made stay as they are, and nobody is notified) (`POST /trial/slots/{slot_id}/cancel`; tenant token; scopes: trial) */
  cancelTrialSlot(slotId: string, body?: BodyOf<'cancelTrialSlot'>, options?: RequestOptions): Promise<ResultOf<'cancelTrialSlot'>> {
    return this.call({ id: 'cancelTrialSlot', method: 'POST', path: '/trial/slots/{slot_id}/cancel', pathParams: { slot_id: slotId }, body, tokenTypes: ['tenant'] }, options);
  }

  /** Fill in (or change) the teacher of a trial draft (`PUT /trial/openings/{opening_id}/teacher`; tenant token; scopes: trial) */
  setTrialTeacher(openingId: string, body: BodyOf<'setTrialTeacher'>, options?: RequestOptions): Promise<ResultOf<'setTrialTeacher'>> {
    return this.call({ id: 'setTrialTeacher', method: 'PUT', path: '/trial/openings/{opening_id}/teacher', pathParams: { opening_id: openingId }, body, tokenTypes: ['tenant'] }, options);
  }

  /** Trial lesson bookings at the institution's teaching sites (`GET /trial/bookings`; tenant token; scopes: trial) */
  listTrialBookings(query?: QueryOf<'listTrialBookings'>, options?: RequestOptions): Promise<ResultOf<'listTrialBookings'>> {
    return this.call({ id: 'listTrialBookings', method: 'GET', path: '/trial/bookings', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listTrialBookings`, page after page. */
  listTrialBookingsAll(query?: Omit<QueryOf<'listTrialBookings'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listTrialBookings'>> {
    return this.iterate({ id: 'listTrialBookings', method: 'GET', path: '/trial/bookings', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Confirm a trial lesson booking (`POST /trial/bookings/{booking_id}/confirm`; tenant token; scopes: trial) */
  confirmTrialBooking(bookingId: string, options?: RequestOptions): Promise<ResultOf<'confirmTrialBooking'>> {
    return this.call({ id: 'confirmTrialBooking', method: 'POST', path: '/trial/bookings/{booking_id}/confirm', pathParams: { booking_id: bookingId }, tokenTypes: ['tenant'] }, options);
  }

  /** The institution's teaching sites (campuses), newest first (`GET /venues`; tenant token; scopes: venue:readonly, venue, trial) */
  listVenues(query?: QueryOf<'listVenues'>, options?: RequestOptions): Promise<ResultOf<'listVenues'>> {
    return this.call({ id: 'listVenues', method: 'GET', path: '/venues', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listVenues`, page after page. */
  listVenuesAll(query?: Omit<QueryOf<'listVenues'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listVenues'>> {
    return this.iterate({ id: 'listVenues', method: 'GET', path: '/venues', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Create a draft teaching site (campus); it is published in the platform and reviewed as usual (`POST /venues`; tenant token; scopes: venue) */
  createVenue(body: BodyOf<'createVenue'>, options?: RequestOptions): Promise<ResultOf<'createVenue'>> {
    return this.call({ id: 'createVenue', method: 'POST', path: '/venues', pathParams: {}, body, tokenTypes: ['tenant'] }, options);
  }

  /** One teaching site (of this institution only) (`GET /venues/{venue_id}`; tenant token; scopes: venue:readonly, venue, trial) */
  getVenue(venueId: string, options?: RequestOptions): Promise<ResultOf<'getVenue'>> {
    return this.call({ id: 'getVenue', method: 'GET', path: '/venues/{venue_id}', pathParams: { venue_id: venueId }, tokenTypes: ['tenant'] }, options);
  }

  /** Openings: every class and course opened (group classes, one-to-ones, open classes, trial lessons, video courses), newest first (`GET /openings`; tenant / user token; scopes: opening:readonly) */
  listOpenings(query?: QueryOf<'listOpenings'>, options?: RequestOptions): Promise<ResultOf<'listOpenings'>> {
    return this.call({ id: 'listOpenings', method: 'GET', path: '/openings', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** Every item of `listOpenings`, page after page. */
  listOpeningsAll(query?: Omit<QueryOf<'listOpenings'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listOpenings'>> {
    return this.iterate({ id: 'listOpenings', method: 'GET', path: '/openings', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** One opening (`GET /openings/{opening_id}`; tenant / user token; scopes: opening:readonly) */
  getOpening(openingId: string, options?: RequestOptions): Promise<ResultOf<'getOpening'>> {
    return this.call({ id: 'getOpening', method: 'GET', path: '/openings/{opening_id}', pathParams: { opening_id: openingId }, tokenTypes: ['tenant', 'user'] }, options);
  }

  /** One page of the institution's dashboard (read only): enrolment, teaching, teaching sites, income, community and events (`GET /insights`; tenant token; scopes: insights:readonly) */
  getInsights(query?: QueryOf<'getInsights'>, options?: RequestOptions): Promise<ResultOf<'getInsights'>> {
    return this.call({ id: 'getInsights', method: 'GET', path: '/insights', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** The institution's orders (read-only, for reconciliation). Write operations involving money are not open (`GET /trade/orders`; tenant token; scopes: trade:order:readonly) */
  listTradeOrders(query?: QueryOf<'listTradeOrders'>, options?: RequestOptions): Promise<ResultOf<'listTradeOrders'>> {
    return this.call({ id: 'listTradeOrders', method: 'GET', path: '/trade/orders', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listTradeOrders`, page after page. */
  listTradeOrdersAll(query?: Omit<QueryOf<'listTradeOrders'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listTradeOrders'>> {
    return this.iterate({ id: 'listTradeOrders', method: 'GET', path: '/trade/orders', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** The institution's bookings (one-to-ones and trial lessons, read only for reconciliation), latest lesson first (`GET /bookings`; tenant token; scopes: trade:booking:readonly) */
  listBookings(query?: QueryOf<'listBookings'>, options?: RequestOptions): Promise<ResultOf<'listBookings'>> {
    return this.call({ id: 'listBookings', method: 'GET', path: '/bookings', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listBookings`, page after page. */
  listBookingsAll(query?: Omit<QueryOf<'listBookings'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listBookings'>> {
    return this.iterate({ id: 'listBookings', method: 'GET', path: '/bookings', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** One booked lesson (`GET /bookings/{booking_id}`; tenant token; scopes: trade:booking:readonly) */
  getBooking(bookingId: string, options?: RequestOptions): Promise<ResultOf<'getBooking'>> {
    return this.call({ id: 'getBooking', method: 'GET', path: '/bookings/{booking_id}', pathParams: { booking_id: bookingId }, tokenTypes: ['tenant'] }, options);
  }

  /** Reviews of this institution (and its courses and teaching sites) (`GET /reviews`; tenant token; scopes: review) */
  listTenantReviews(query?: QueryOf<'listTenantReviews'>, options?: RequestOptions): Promise<ResultOf<'listTenantReviews'>> {
    return this.call({ id: 'listTenantReviews', method: 'GET', path: '/reviews', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listTenantReviews`, page after page. */
  listTenantReviewsAll(query?: Omit<QueryOf<'listTenantReviews'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listTenantReviews'>> {
    return this.iterate({ id: 'listTenantReviews', method: 'GET', path: '/reviews', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Reply to a review on behalf of the institution (one reply per review; the content is moderated as usual) (`POST /reviews/{review_id}/reply`; tenant token; scopes: review) */
  replyReview(reviewId: string, body: BodyOf<'replyReview'>, options?: RequestOptions): Promise<ResultOf<'replyReview'>> {
    return this.call({ id: 'replyReview', method: 'POST', path: '/reviews/{review_id}/reply', pathParams: { review_id: reviewId }, body, tokenTypes: ['tenant'] }, options);
  }

  /** Public courses, events and jobs shown in this region (`GET /public/{kind}`; app / tenant / user token) */
  listPublicContent(kind: string, query?: QueryOf<'listPublicContent'>, options?: RequestOptions): Promise<ResultOf<'listPublicContent'>> {
    return this.call({ id: 'listPublicContent', method: 'GET', path: '/public/{kind}', pathParams: { kind: kind }, query: query as Record<string, unknown> | undefined, tokenTypes: ['app', 'tenant', 'user'] }, options);
  }

  /** Every item of `listPublicContent`, page after page. */
  listPublicContentAll(kind: string, query?: Omit<QueryOf<'listPublicContent'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listPublicContent'>> {
    return this.iterate({ id: 'listPublicContent', method: 'GET', path: '/public/{kind}', pathParams: { kind: kind }, query: query as Record<string, unknown> | undefined, tokenTypes: ['app', 'tenant', 'user'] }, options);
  }

  /** The user's interest profile (weighted tags of topics and content types; raw browsing and interaction records are not given) (`GET /user/profile/interests`; user token; scopes: profile:interest:readonly) */
  getUserInterests(options?: RequestOptions): Promise<ResultOf<'getUserInterests'>> {
    return this.call({ id: 'getUserInterests', method: 'GET', path: '/user/profile/interests', pathParams: {}, tokenTypes: ['user'] }, options);
  }

  /** Add an interest signal with its source (`POST /user/profile/interest_signals`; user token; scopes: profile:interest) */
  addInterestSignal(body: BodyOf<'addInterestSignal'>, options?: RequestOptions): Promise<ResultOf<'addInterestSignal'>> {
    return this.call({ id: 'addInterestSignal', method: 'POST', path: '/user/profile/interest_signals', pathParams: {}, body, tokenTypes: ['user'] }, options);
  }

  /** The user's learning profile (level, goals, languages being learned) (`GET /user/profile/learning`; user token; scopes: profile:learning:readonly) */
  getUserLearningProfile(options?: RequestOptions): Promise<ResultOf<'getUserLearningProfile'>> {
    return this.call({ id: 'getUserLearningProfile', method: 'GET', path: '/user/profile/learning', pathParams: {}, tokenTypes: ['user'] }, options);
  }

  /** Report a piece of public content on behalf of a user (it enters the platform's moderation queue; the user can see it in their own report history) (`POST /reports`; user token; scopes: report:create) */
  reportOnBehalf(body: BodyOf<'reportOnBehalf'>, options?: RequestOptions): Promise<ResultOf<'reportOnBehalf'>> {
    return this.call({ id: 'reportOnBehalf', method: 'POST', path: '/reports', pathParams: {}, body, tokenTypes: ['user'] }, options);
  }

  /** Get an upload URL for an image (it is re-encoded and its EXIF removed when the post is made) (`POST /community/images`; user / tenant token; scopes: community:post) */
  createCommunityImageUpload(body: BodyOf<'createCommunityImageUpload'>, options?: RequestOptions): Promise<ResultOf<'createCommunityImageUpload'>> {
    return this.call({ id: 'createCommunityImageUpload', method: 'POST', path: '/community/images', pathParams: {}, body, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** Get an upload URL for a video (up to 4 GB, 1 hour) (`POST /community/videos`; user / tenant token; scopes: community:post) */
  createCommunityVideoUpload(body: BodyOf<'createCommunityVideoUpload'>, options?: RequestOptions): Promise<ResultOf<'createCommunityVideoUpload'>> {
    return this.call({ id: 'createCommunityVideoUpload', method: 'POST', path: '/community/videos', pathParams: {}, body, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** The upload is done; start transcoding (calling it again has no side effects) (`POST /community/videos/{asset_id}/complete`; user / tenant token; scopes: community:post) */
  completeCommunityVideoUpload(assetId: string, options?: RequestOptions): Promise<ResultOf<'completeCommunityVideoUpload'>> {
    return this.call({ id: 'completeCommunityVideoUpload', method: 'POST', path: '/community/videos/{asset_id}/complete', pathParams: { asset_id: assetId }, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** Transcoding status (only for videos this app uploaded for this person) (`GET /community/videos/{asset_id}`; user / tenant token; scopes: community:post) */
  getCommunityVideo(assetId: string, options?: RequestOptions): Promise<ResultOf<'getCommunityVideo'>> {
    return this.call({ id: 'getCommunityVideo', method: 'GET', path: '/community/videos/{asset_id}', pathParams: { asset_id: assetId }, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** Posts this app made in this person's name (the person's own posts and other apps' posts are not visible) (`GET /community/posts`; user / tenant token; scopes: community:post) */
  listCommunityPosts(query?: QueryOf<'listCommunityPosts'>, options?: RequestOptions): Promise<ResultOf<'listCommunityPosts'>> {
    return this.call({ id: 'listCommunityPosts', method: 'GET', path: '/community/posts', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** Every item of `listCommunityPosts`, page after page. */
  listCommunityPostsAll(query?: Omit<QueryOf<'listCommunityPosts'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listCommunityPosts'>> {
    return this.iterate({ id: 'listCommunityPosts', method: 'GET', path: '/community/posts', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** Publish a public post in this person's name (text, up to 9 images or 1 video, up to 10 topics) (`POST /community/posts`; user / tenant token; scopes: community:post) */
  createCommunityPost(body: BodyOf<'createCommunityPost'>, options?: RequestOptions): Promise<ResultOf<'createCommunityPost'>> {
    return this.call({ id: 'createCommunityPost', method: 'POST', path: '/community/posts', pathParams: {}, body, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** The status of one post (only posts this app made; anything else is 404) (`GET /community/posts/{post_id}`; user / tenant token; scopes: community:post) */
  getCommunityPost(postId: string, options?: RequestOptions): Promise<ResultOf<'getCommunityPost'>> {
    return this.call({ id: 'getCommunityPost', method: 'GET', path: '/community/posts/{post_id}', pathParams: { post_id: postId }, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** Delete a post (only posts this app made; anything else is 404) (`DELETE /community/posts/{post_id}`; user / tenant token; scopes: community:post) */
  deleteCommunityPost(postId: string, options?: RequestOptions): Promise<ResultOf<'deleteCommunityPost'>> {
    return this.call({ id: 'deleteCommunityPost', method: 'DELETE', path: '/community/posts/{post_id}', pathParams: { post_id: postId }, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** Categories a post can be filed under (those enabled in this region) (`GET /community/categories`; user / tenant token; scopes: community:post) */
  listCommunityCategories(options?: RequestOptions): Promise<ResultOf<'listCommunityCategories'>> {
    return this.call({ id: 'listCommunityCategories', method: 'GET', path: '/community/categories', pathParams: {}, tokenTypes: ['user', 'tenant'] }, options);
  }

  /** This person's timetable: their sessions, the events they signed up for, confirmed trial lessons and exams (for calendar apps; read-only) (`GET /me/schedule`; user token; scopes: me:schedule:readonly) */
  getMySchedule(query: QueryOf<'getMySchedule'>, options?: RequestOptions): Promise<ResultOf<'getMySchedule'>> {
    return this.call({ id: 'getMySchedule', method: 'GET', path: '/me/schedule', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['user'] }, options);
  }

  /** Every item of `getMySchedule`, page after page. */
  getMyScheduleAll(query?: Omit<QueryOf<'getMySchedule'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'getMySchedule'>> {
    return this.iterate({ id: 'getMySchedule', method: 'GET', path: '/me/schedule', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['user'] }, options);
  }

  /** The courses this person is studying and their progress (lessons completed, last studied; level and goals belong to the gold-only profile and are not here) (`GET /me/courses`; user token; scopes: me:learning:readonly) */
  listMyCourses(query?: QueryOf<'listMyCourses'>, options?: RequestOptions): Promise<ResultOf<'listMyCourses'>> {
    return this.call({ id: 'listMyCourses', method: 'GET', path: '/me/courses', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['user'] }, options);
  }

  /** Every item of `listMyCourses`, page after page. */
  listMyCoursesAll(query?: Omit<QueryOf<'listMyCourses'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listMyCourses'>> {
    return this.iterate({ id: 'listMyCourses', method: 'GET', path: '/me/courses', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['user'] }, options);
  }

  /** This person's word bank: words, pinyin, review state (no meanings, and review records cannot be changed) (`GET /me/words`; user token; scopes: me:words:readonly, me:words) */
  listMyWords(query?: QueryOf<'listMyWords'>, options?: RequestOptions): Promise<ResultOf<'listMyWords'>> {
    return this.call({ id: 'listMyWords', method: 'GET', path: '/me/words', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['user'] }, options);
  }

  /** Every item of `listMyWords`, page after page. */
  listMyWordsAll(query?: Omit<QueryOf<'listMyWords'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listMyWords'>> {
    return this.iterate({ id: 'listMyWords', method: 'GET', path: '/me/words', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['user'] }, options);
  }

  /** Add a word to this person's word bank (unchanged if it is already there; its source is recorded as this app) (`POST /me/words`; user token; scopes: me:words) */
  addMyWord(body: BodyOf<'addMyWord'>, options?: RequestOptions): Promise<ResultOf<'addMyWord'>> {
    return this.call({ id: 'addMyWord', method: 'POST', path: '/me/words', pathParams: {}, body, tokenTypes: ['user'] }, options);
  }

  /** A class's exams (tenant tokens only, own institution) (`GET /classes/{class_id}/exams`; tenant token; scopes: grade:readonly) */
  listClassExams(classId: string, query?: QueryOf<'listClassExams'>, options?: RequestOptions): Promise<ResultOf<'listClassExams'>> {
    return this.call({ id: 'listClassExams', method: 'GET', path: '/classes/{class_id}/exams', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listClassExams`, page after page. */
  listClassExamsAll(classId: string, query?: Omit<QueryOf<'listClassExams'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listClassExams'>> {
    return this.iterate({ id: 'listClassExams', method: 'GET', path: '/classes/{class_id}/exams', pathParams: { class_id: classId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Each learner's result in one exam (scores only once released; tenant tokens only, own institution) (`GET /classes/{class_id}/exams/{exam_id}/results`; tenant token; scopes: grade:readonly) */
  listClassExamResults(classId: string, examId: string, query?: QueryOf<'listClassExamResults'>, options?: RequestOptions): Promise<ResultOf<'listClassExamResults'>> {
    return this.call({ id: 'listClassExamResults', method: 'GET', path: '/classes/{class_id}/exams/{exam_id}/results', pathParams: { class_id: classId, exam_id: examId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** Every item of `listClassExamResults`, page after page. */
  listClassExamResultsAll(classId: string, examId: string, query?: Omit<QueryOf<'listClassExamResults'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listClassExamResults'>> {
    return this.iterate({ id: 'listClassExamResults', method: 'GET', path: '/classes/{class_id}/exams/{exam_id}/results', pathParams: { class_id: classId, exam_id: examId }, query: query as Record<string, unknown> | undefined, tokenTypes: ['tenant'] }, options);
  }

  /** List assignable avatar frames (`GET /gray/avatar-frames`; app token) */
  listGrayAvatarFrames(query?: QueryOf<'listGrayAvatarFrames'>, options?: RequestOptions): Promise<ResultOf<'listGrayAvatarFrames'>> {
    return this.call({ id: 'listGrayAvatarFrames', method: 'GET', path: '/gray/avatar-frames', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['app'] }, options);
  }

  /** Every item of `listGrayAvatarFrames`, page after page. */
  listGrayAvatarFramesAll(query?: Omit<QueryOf<'listGrayAvatarFrames'>, 'page_token'>, options?: RequestOptions): AsyncIterable<ItemOf<'listGrayAvatarFrames'>> {
    return this.iterate({ id: 'listGrayAvatarFrames', method: 'GET', path: '/gray/avatar-frames', pathParams: {}, query: query as Record<string, unknown> | undefined, tokenTypes: ['app'] }, options);
  }

  /** Temporarily set an avatar frame for any platform user (`POST /gray/avatar-frame-assignments`; app token) */
  assignGrayAvatarFrame(body: BodyOf<'assignGrayAvatarFrame'>, options?: RequestOptions): Promise<ResultOf<'assignGrayAvatarFrame'>> {
    return this.call({ id: 'assignGrayAvatarFrame', method: 'POST', path: '/gray/avatar-frame-assignments', pathParams: {}, body, tokenTypes: ['app'] }, options);
  }

  /** Count posts across all regions (`GET /gray/community/post-counts`; app token) */
  getGrayCommunityPostCounts(options?: RequestOptions): Promise<ResultOf<'getGrayCommunityPostCounts'>> {
    return this.call({ id: 'getGrayCommunityPostCounts', method: 'GET', path: '/gray/community/post-counts', pathParams: {}, tokenTypes: ['app'] }, options);
  }
}
