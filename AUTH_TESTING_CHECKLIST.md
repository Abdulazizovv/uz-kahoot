# Authentication System - Testing Checklist

Use this checklist to verify all authentication features work correctly.

---

## 🧪 Test Environment Setup

### Prerequisites

- [ ] Dev server running (`pnpm dev`)
- [ ] Browser DevTools open (F12)
- [ ] Network tab open (to observe redirects)
- [ ] Console tab open (to check for errors)
- [ ] Application tab open (to inspect cookies/localStorage)

### Test Users

Create test accounts for both user types:

- **Student Account:** username/email + password
- **Teacher Account:** username/email + password

---

## ✅ Test Suite 1: Redirect Loop Prevention

### Test 1.1: Fresh Start (No Auth)

**Steps:**

1. Clear all cookies and localStorage
2. Visit `http://localhost:3000/`

**Expected:**

- [ ] Redirects to `/auth`
- [ ] Shows login form
- [ ] No infinite redirect loop
- [ ] No console errors
- [ ] Loading screen appears briefly (< 1 second)

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 1.2: Login as Student

**Steps:**

1. On `/auth` page, login with student credentials
2. Wait for redirect

**Expected:**

- [ ] Redirects to `/student/dashboard`
- [ ] No intermediate redirects or flickers
- [ ] Loading screen shows "Yo'naltirilmoqda..."
- [ ] Dashboard loads within 2 seconds
- [ ] No console errors

**Check Storage:**

- [ ] `localStorage.user` contains user object
- [ ] `localStorage.access_token` exists
- [ ] `localStorage.refresh_token` exists
- [ ] Cookie `auth-storage` is set
- [ ] Cookie contains `isAuthenticated: true`

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 1.3: Visit /auth When Already Logged In

**Steps:**

1. While logged in as student
2. Manually navigate to `/auth`

**Expected:**

- [ ] Immediately redirects to `/student/dashboard`
- [ ] No redirect loop
- [ ] No flicker of login form
- [ ] Takes < 100ms to redirect

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 1.4: Logout Flow

**Steps:**

1. Click logout button
2. Observe redirect

**Expected:**

- [ ] Redirects to `/auth`
- [ ] Shows login form
- [ ] `localStorage` cleared (all 3 items removed)
- [ ] Cookie `auth-storage` deleted
- [ ] No console errors

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 1.5: Login as Teacher

**Steps:**

1. Login with teacher credentials
2. Wait for redirect

**Expected:**

- [ ] Redirects to `/teacher/dashboard`
- [ ] No redirect to student dashboard
- [ ] Teacher-specific content visible
- [ ] Cookie contains `user_type: "teacher"`

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

## ✅ Test Suite 2: Protected Routes

### Test 2.1: Student Accessing Teacher Route

**Steps:**

1. Login as student
2. Manually navigate to `/teacher/dashboard`

**Expected:**

- [ ] Immediately redirects to `/student/dashboard`
- [ ] No flash of teacher content
- [ ] Middleware handles redirect (server-side)
- [ ] No console errors

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 2.2: Teacher Accessing Student Route

**Steps:**

1. Login as teacher
2. Manually navigate to `/student/dashboard`

**Expected:**

- [ ] Immediately redirects to `/teacher/dashboard`
- [ ] No flash of student content
- [ ] Middleware handles redirect (server-side)
- [ ] No console errors

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 2.3: Unauthenticated Access to Protected Route

**Steps:**

1. Logout (clear all auth)
2. Try to visit `/student/dashboard` directly

**Expected:**

- [ ] Redirects to `/auth`
- [ ] No flash of protected content
- [ ] Shows login form
- [ ] No console errors

**Repeat for:**

- [ ] `/teacher/dashboard`
- [ ] `/student/labs`
- [ ] `/teacher/quizzes`
- [ ] `/teacher/groups`

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

## ✅ Test Suite 3: Hydration

### Test 3.1: No Hydration Mismatch Errors

**Steps:**

1. Login as any user
2. Navigate through the app
3. Check console for warnings

**Expected:**

- [ ] No "Text content does not match" warnings
- [ ] No "Hydration failed" errors
- [ ] No React warnings in console
- [ ] Content renders smoothly

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 3.2: Loading Screen During Hydration

**Steps:**

1. Refresh page while logged in
2. Observe initial render

**Expected:**

- [ ] LoadingScreen appears briefly
- [ ] Shows "Yuklanmoqda..." message
- [ ] Animated spinner visible
- [ ] No flash of unauthorized content
- [ ] Transitions smoothly to content

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 3.3: Consistent State After Hydration

**Steps:**

1. Login and navigate to dashboard
2. Refresh page
3. Check auth state in React DevTools

**Expected:**

- [ ] `isHydrated` starts as `false`
- [ ] `isHydrated` becomes `true` within 500ms
- [ ] `isAuthenticated` matches actual login state
- [ ] `user` object populated correctly
- [ ] No state flickering

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

## ✅ Test Suite 4: Edge Cases

### Test 4.1: Browser Back Button

**Steps:**

1. Login as student
2. Navigate to `/student/labs`
3. Click browser back button

**Expected:**

- [ ] Returns to previous page correctly
- [ ] No redirect loop
- [ ] No re-authentication needed
- [ ] State maintained

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 4.2: Browser Forward Button

**Steps:**

1. Navigate back (from Test 4.1)
2. Click browser forward button

**Expected:**

- [ ] Goes forward to `/student/labs`
- [ ] No redirect loop
- [ ] Content loads correctly
- [ ] No re-authentication

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 4.3: Page Refresh Maintains Auth

**Steps:**

1. Login as any user
2. Navigate to any protected page
3. Press F5 or Ctrl+R to refresh

**Expected:**

- [ ] Stays logged in
- [ ] Same page loads
- [ ] No redirect to login
- [ ] Loading screen shows briefly
- [ ] Auth state preserved

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 4.4: Hard Refresh Maintains Auth

**Steps:**

1. While logged in
2. Press Ctrl+Shift+R (hard refresh)

**Expected:**

- [ ] Stays logged in
- [ ] Cache cleared but auth preserved
- [ ] No redirect to login
- [ ] Page loads correctly

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 4.5: Multiple Tabs - Logout Sync

**Steps:**

1. Open app in Tab A and login
2. Open app in Tab B (should be logged in)
3. Logout in Tab A
4. Refresh Tab B

**Expected:**

- [ ] Tab B shows login page after refresh
- [ ] Both tabs in sync after refresh
- [ ] No errors in either tab

**Note:** Real-time sync between tabs is not implemented (expected limitation)

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 4.6: Cookie Expiration (Simulated)

**Steps:**

1. Login as any user
2. In DevTools Application tab, manually delete `auth-storage` cookie
3. Try to navigate to a protected route

**Expected:**

- [ ] Redirects to `/auth`
- [ ] Shows login form
- [ ] No JavaScript errors
- [ ] Graceful handling

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 4.7: localStorage Corruption

**Steps:**

1. Login as any user
2. In DevTools Console, run: `localStorage.setItem('user', 'invalid json')`
3. Refresh page

**Expected:**

- [ ] No crash
- [ ] Redirects to `/auth` or shows error boundary
- [ ] Error logged to console
- [ ] Graceful recovery

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

## ✅ Test Suite 5: Performance

### Test 5.1: Auth Check Speed

**Steps:**

1. Login as any user
2. In DevTools Performance tab, start recording
3. Refresh page
4. Stop recording after page loads

**Expected:**

- [ ] Hydration completes < 500ms
- [ ] Auth check completes < 100ms
- [ ] Total page load < 2 seconds
- [ ] No long tasks blocking main thread

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 5.2: Re-render Count

**Steps:**

1. Install React DevTools
2. Enable "Highlight updates"
3. Login and navigate around

**Expected:**

- [ ] ProtectedRoute re-renders ≤ 3 times on mount
- [ ] Auth page re-renders ≤ 2 times on mount
- [ ] No infinite re-render loops
- [ ] Minimal flashing of highlights

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 5.3: Lighthouse Score

**Steps:**

1. Open DevTools Lighthouse tab
2. Run audit on `/auth` page (logged out)
3. Run audit on `/student/dashboard` (logged in)

**Expected:**

- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 80

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

## ✅ Test Suite 6: Error Handling

### Test 6.1: AuthErrorBoundary - Catch Errors

**Steps:**

1. Temporarily add error-throwing code to auth page:
   ```typescript
   if (Math.random() > 0) throw new Error("Test error");
   ```
2. Navigate to auth page

**Expected:**

- [ ] Error boundary catches error
- [ ] Shows "Xatolik yuz berdi" message
- [ ] Displays "Qayta urinish" button
- [ ] Displays "Tizimdan chiqish" button
- [ ] No white screen of death

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 6.2: AuthErrorBoundary - Retry

**Steps:**

1. From error boundary screen
2. Click "Qayta urinish" button

**Expected:**

- [ ] Error boundary resets
- [ ] Component re-renders
- [ ] If error persists, shows error again
- [ ] If error resolved, shows normal content

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 6.3: AuthErrorBoundary - Logout

**Steps:**

1. From error boundary screen
2. Click "Tizimdan chiqish" button

**Expected:**

- [ ] Clears all auth data
- [ ] Redirects to `/auth`
- [ ] Shows login form
- [ ] No errors persist

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 6.4: Network Failure During Login

**Steps:**

1. Go to DevTools Network tab
2. Set throttling to "Offline"
3. Try to login

**Expected:**

- [ ] Shows appropriate error message
- [ ] No crash
- [ ] Can retry after enabling network
- [ ] Error is user-friendly

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

## ✅ Test Suite 7: Middleware Validation

### Test 7.1: Server-Side Redirect (Check Network Tab)

**Steps:**

1. Logout
2. In Network tab, navigate to `/student/dashboard`
3. Check Response

**Expected:**

- [ ] Status: 307 (Temporary Redirect)
- [ ] Location header: `/auth`
- [ ] Redirect happens on server (not client JS)
- [ ] No HTML content from protected page served

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

### Test 7.2: Middleware Cookie Parsing

**Steps:**

1. Login as student
2. Check Network tab for any request
3. Look at Request Headers

**Expected:**

- [ ] `Cookie: auth-storage=...` present
- [ ] Cookie value is URL-encoded JSON
- [ ] Contains `isAuthenticated` and `user` object
- [ ] Middleware correctly parses it

**Status:** ⬜ Pass | ⬜ Fail | ⬜ N/A

---

## 📊 Test Results Summary

### Overall Statistics

- Total Tests: 27
- Passed: \_\_\_
- Failed: \_\_\_
- N/A: \_\_\_
- Pass Rate: \_\_\_%

### Critical Issues Found

List any critical issues:

1.
2.
3.

### Minor Issues Found

List any minor issues:

1.
2.
3.

### Performance Metrics

- Average auth check time: \_\_\_ms
- Average page load time: \_\_\_ms
- Lighthouse Performance: \_\_\_
- Lighthouse Accessibility: \_\_\_

---

## 🎯 Acceptance Criteria

For production deployment, ALL of the following must be true:

- [ ] 0 redirect loops observed
- [ ] 0 hydration errors in console
- [ ] All protected routes properly secured
- [ ] All user types properly enforced
- [ ] Loading states display correctly
- [ ] Error boundaries catch and handle errors
- [ ] No flash of unauthorized content (FOUC)
- [ ] Auth persists across page refreshes
- [ ] Performance metrics meet targets
- [ ] No critical bugs found

---

## 📝 Tester Notes

**Date Tested:** ******\_\_\_******

**Tested By:** ******\_\_\_******

**Browser(s) Tested:**

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari

**Additional Comments:**

```
[Add any observations, suggestions, or issues encountered]


```

---

**Status:** ⬜ Ready for Production | ⬜ Needs Fixes | ⬜ Blocked

**Next Steps:**

```
[List any actions needed before deployment]


```
