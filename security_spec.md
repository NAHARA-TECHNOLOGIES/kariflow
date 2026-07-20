# Firebase Security Specification - Kariflow

## 1. Data Invariants
- **Waitlist**: Must have valid email, fullName, country, and state. `submittedAt` must match server time.
- **Blog Posts**: Only admins can manage. Must have title, slug, content, and author. `views` can only be incremented by 1.
- **Cookie Consents**: Publicly writable, admin readable. Must have IP (optional), preferences, and timestamp.
- **Newsletter**: One per email. `email` must match the document ID.
- **Admins**: Only the primary admin (`chinemeremsmart81@gmail.com`) can add/remove other admins.
- **Legal Pages**: Managed only by admins. Publicly readable.
- **Storage**: Only admins can upload blog images. Images must be < 5MB and of specific MIME types.

## 2. The "Dirty Dozen" Payloads (Rejected)
1. **Schema Violation**: Creating a blog post with a "views" field set to 1,000,000.
2. **Identity Spoofing**: Trying to set `authorId` on a post to another admin's UID.
3. **Ghost Fields**: Creating a waitlist entry with `isAdmin: true`.
4. **ID Poisoning**: Document IDs over 128 characters or containing scripts.
5. **PII Leak**: Non-admin user trying to `list` the `/newsletterSubscribers` collection.
6. **State Hijacking**: Updating a `legalPage` content without being in the `admins` collection.
7. **Resource Exhaustion**: Uploading a 50MB file to `blog-images/`.
8. **MIME Spoofing**: Uploading an `.exe` file renamed to `.jpg`.
9. **Query Scrapping**: Trying to `getDocs` on `admins` collection as a generic user.
10. **Data Corruption**: Updating `waitlist` entries (Waitlist should be immutable once submitted).
11. **Future Sync**: Setting `submittedAt` to a future date in the browser.
12. **Admin Escalation**: A standard user trying to write to the `admins` collection.

## 3. Test Runner
- Verified: `isAdmin()` helper correctly checks the `admins` collection and the hardcoded master email.
- Verified: `isValidBlogPost` and `isValidWaitlistEntry` helpers enforce strict typing and size constraints.
- Verified: All `update` operations use `affectedKeys().hasOnly()` gates.