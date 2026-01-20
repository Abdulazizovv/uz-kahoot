# Authentication System - Troubleshooting Guide

## 🔍 Common Issues and Solutions

### 1. Redirect Loop on /auth Page

**Symptoms:**

- Page keeps refreshing infinitely
- URL constantly changes between /auth and dashboard
- Browser becomes unresponsive

**Causes:**

- Cookie and localStorage out of sync
- Corrupted auth state
- Middleware and client-side disagreeing on auth state

**Solutions:**

#### Solution A: Clear All Auth Data

```javascript
// Open browser console and run:
localStorage.clear();
document.cookie =
  "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
window.location.href = "/auth";
```

#### Solution B: Hard Refresh

1. Press `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
2. This clears the cache and reloads the page

#### Solution C: Incognito/Private Mode

1. Open the app in an incognito window
2. This starts with a clean slate (no cookies/localStorage)
3. Try logging in again

---

### 2. Flash of Unauthorized Content (FOUC)

**Symptoms:**

- Briefly see protected content before redirect
- Loading screen flickers
- Wrong dashboard appears momentarily

**Causes:**

- Not waiting for `isHydrated` before rendering
- Middleware not configured correctly
- Component rendering before auth check

**Solutions:**

#### Check Hydration Wait

Ensure components wait for hydration:

```typescript
const { isHydrated, isAuthenticated } = useAuthStore()

if (!isHydrated) {
  return <LoadingScreen />
}

// Only render after hydration
```

#### Verify Middleware

Check [middleware.ts](packages/web/middleware.ts) is configured:

```typescript
export const config = {
  matcher: ["/", "/auth", "/student/:path*", "/teacher/:path*"],
};
```

---

### 3. "useAuthStore must be used within AuthProvider" Error

**Symptoms:**

- Error thrown when accessing `useAuthStore()`
- App crashes on load
- Console shows context error

**Causes:**

- Component rendered outside `<AuthProvider>`
- Provider not in layout hierarchy

**Solutions:**

#### Verify Provider Hierarchy

Check [app/layout.tsx](packages/web/src/app/layout.tsx):

```typescript
<AuthErrorBoundary>
  <AuthProvider>
    <SocketProvider>
      {children}
    </SocketProvider>
  </AuthProvider>
</AuthErrorBoundary>
```

#### Don't Use in Server Components

Auth store only works in client components:

```typescript
"use client"; // Add this at the top of the file

export default function MyComponent() {
  const { user } = useAuthStore(); // Now works
}
```

---

### 4. Middleware Not Protecting Routes

**Symptoms:**

- Unauthenticated users can access protected pages
- No redirect to /auth
- Server-side protection not working

**Causes:**

- Middleware matcher not configured
- Cookie not being set
- Middleware not deployed/running

**Solutions:**

#### Check Cookie in DevTools

1. Open DevTools (F12)
2. Go to Application → Cookies
3. Look for `auth-storage` cookie
4. Should contain JSON with user data

#### Verify Middleware Matcher

The matcher must include the route:

```typescript
export const config = {
  matcher: [
    "/",
    "/auth",
    "/student/:path*", // Matches all /student/* routes
    "/teacher/:path*", // Matches all /teacher/* routes
  ],
};
```

#### Check Server Logs

In terminal where dev server runs, you should see middleware executions

---

### 5. Hydration Mismatch Errors

**Symptoms:**

- Warning: "Text content does not match server-rendered HTML"
- Warning: "Hydration failed"
- Content appears then disappears

**Causes:**

- Rendering auth-dependent content during SSR
- Not using suppressHydrationWarning
- Browser extensions interfering

**Solutions:**

#### Wait for Hydration

```typescript
const { isHydrated, user } = useAuthStore()

if (!isHydrated) {
  return <LoadingScreen /> // Consistent between server and client
}

return <div>{user?.name}</div> // Only after hydration
```

#### Suppress in Root Layout

Already configured in [layout.tsx](packages/web/src/app/layout.tsx):

```typescript
<html suppressHydrationWarning={true}>
```

#### Disable Browser Extensions

Some extensions modify the DOM and cause hydration issues. Try disabling them.

---

### 6. User Can Access Wrong Dashboard

**Symptoms:**

- Student can access /teacher/dashboard
- Teacher can access /student/dashboard
- No redirect to correct dashboard

**Causes:**

- Middleware not checking user type
- Cookie missing user_type field
- Layout not using ProtectedRoute correctly

**Solutions:**

#### Verify Cookie Contains user_type

In browser console:

```javascript
const cookie = document.cookie
  .split(";")
  .find((c) => c.includes("auth-storage"));
const data = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
console.log(data.state.user.user_type); // Should be "student" or "teacher"
```

#### Check Layout Protection

Student layout should have:

```typescript
<ProtectedRoute allowedUserTypes={["student"]}>
  {children}
</ProtectedRoute>
```

Teacher layout should have:

```typescript
<ProtectedRoute allowedUserTypes={["teacher"]}>
  {children}
</ProtectedRoute>
```

---

### 7. Auth State Not Persisting on Refresh

**Symptoms:**

- User logged out on page refresh
- Must login again every time
- Auth state lost between sessions

**Causes:**

- localStorage not being saved
- Cookie expired or not set
- Browser in private/incognito mode

**Solutions:**

#### Check localStorage

In browser console:

```javascript
localStorage.getItem("user");
localStorage.getItem("access_token");
localStorage.getItem("refresh_token");
```

All three should have values when logged in.

#### Check Cookie Expiry

Cookie is set to expire in 30 days:

```typescript
max-age=2592000 // 30 days in seconds
```

#### Private Mode Warning

In incognito/private mode, storage is cleared when tab closes. Use normal mode for persistence.

---

### 8. Multiple Tabs Out of Sync

**Symptoms:**

- Logout in one tab doesn't affect others
- Login in one tab doesn't sync to others
- Different auth states across tabs

**Causes:**

- localStorage events don't fire in same tab that made the change
- By design limitation

**Solutions:**

#### Manual Sync (Refresh)

Users must refresh other tabs after auth changes.

#### Future Enhancement: BroadcastChannel

Can be implemented later for real-time sync:

```typescript
const authChannel = new BroadcastChannel("auth-updates");
authChannel.postMessage({ type: "logout" });
```

---

### 9. Error Boundary Shows Unexpectedly

**Symptoms:**

- Red error screen appears
- "Xatolik yuz berdi" message
- Can't access the app

**Causes:**

- Actual JavaScript error in auth flow
- Network error during auth check
- Corrupted auth data

**Solutions:**

#### Click "Tizimdan chiqish" (Logout)

This clears all auth data and redirects to login.

#### Click "Qayta urinish" (Retry)

Retries the auth flow without clearing data.

#### Check Browser Console

Look for the actual error message (visible in development mode).

#### Report the Error

If persistent, contact development team with:

- Browser console errors
- Steps to reproduce
- User account (if not sensitive)

---

### 10. Slow Auth Checks (Performance)

**Symptoms:**

- Long loading screens
- Slow redirects
- App feels sluggish

**Causes:**

- Too many re-renders
- Not using memoization
- Inefficient auth checks

**Solutions:**

#### Check React DevTools Profiler

1. Install React DevTools
2. Record a session
3. Look for components re-rendering repeatedly

#### Verify Memoization

ProtectedRoute should use `useMemo`:

```typescript
const isAuthorized = useMemo(() => {
  if (!user || !allowedUserTypes) return true;
  return allowedUserTypes.includes(user.user_type);
}, [user, allowedUserTypes]);
```

#### Reduce Auth Checks

Don't check auth in every component. Trust ProtectedRoute and middleware.

---

## 🔧 Debug Mode

### Enable Detailed Logging

Add this to [stores/auth.tsx](packages/web/src/stores/auth.tsx):

```typescript
const DEBUG = process.env.NODE_ENV === "development";

// In login function:
if (DEBUG) {
  console.log("[AUTH] Login successful:", { user, tokens: "***" });
}

// In logout function:
if (DEBUG) {
  console.log("[AUTH] Logout executed");
}

// In hydration:
if (DEBUG) {
  console.log("[AUTH] Hydration complete:", {
    isAuthenticated,
    userType: user?.user_type,
  });
}
```

### Check Middleware Execution

Add to [middleware.ts](packages/web/middleware.ts):

```typescript
const DEBUG = process.env.NODE_ENV === "development";

export function middleware(request: NextRequest) {
  if (DEBUG) {
    console.log("[MIDDLEWARE]", {
      path: request.nextUrl.pathname,
      isAuthenticated,
      userType,
    });
  }
  // ... rest of code
}
```

---

## 📊 Health Check Checklist

Use this checklist to verify auth system is working correctly:

### Server-Side

- [ ] Middleware file exists at `packages/web/middleware.ts`
- [ ] Middleware matcher includes all protected routes
- [ ] Cookie parsing works without errors
- [ ] Redirects happen server-side (check Network tab)

### Client-Side

- [ ] `isHydrated` flag exists in auth store
- [ ] `isHydrated` starts as `false` and becomes `true`
- [ ] Cookie is set on login
- [ ] Cookie is cleared on logout
- [ ] localStorage syncs with cookie

### Components

- [ ] LoadingScreen displays during hydration
- [ ] No hydration mismatch warnings
- [ ] ProtectedRoute waits for hydration
- [ ] AuthErrorBoundary wraps app
- [ ] No duplicate auth checks in pages

### User Flow

- [ ] Login → Dashboard (smooth, no flicker)
- [ ] Refresh → Stays logged in
- [ ] Logout → Redirects to /auth
- [ ] Wrong dashboard → Redirects to correct one
- [ ] Unauth access → Redirects to /auth

---

## 🆘 Emergency Reset

If all else fails, perform a complete reset:

### Step 1: Clear All Data

```javascript
// Browser console
localStorage.clear();
sessionStorage.clear();
document.cookie.split(";").forEach((c) => {
  document.cookie = c
    .replace(/^ +/, "")
    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
```

### Step 2: Hard Refresh

Press `Ctrl + Shift + Delete` (or `Cmd + Shift + Delete` on Mac)

- Select "Cookies and other site data"
- Select "Cached images and files"
- Click "Clear data"

### Step 3: Restart Browser

Completely close and reopen the browser.

### Step 4: Try Login Again

Go to `/auth` and login with fresh credentials.

---

## 📞 Getting Help

If issues persist after trying these solutions:

1. **Check the Migration Guide:** [AUTH_MIGRATION_GUIDE.md](AUTH_MIGRATION_GUIDE.md)
2. **Search Issues:** Look for similar problems in project issues
3. **Create Bug Report:** Include:
   - Browser and version
   - Steps to reproduce
   - Console errors (screenshot)
   - Network tab (screenshot)
   - Cookie value (redact sensitive data)

---

**Last Updated:** January 20, 2026
**Maintained by:** EduArena Development Team
