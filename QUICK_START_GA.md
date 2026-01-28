# 🚀 Quick Start - Google Analytics

## 1️⃣ Get Your Measurement ID
1. Visit [Google Analytics](https://analytics.google.com/)
2. Admin → Data Streams → Copy Measurement ID (G-XXXXXXXXXX)

## 2️⃣ Add Environment Variable
Create `.env.local` in project root:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 3️⃣ Deploy
Deploy to production - GA tracking is ready!

## 📊 What's Already Tracked

✅ All page views
✅ Navigation menu clicks
✅ Social media link clicks (LinkedIn, GitHub, Twitter, etc.)
✅ Resume downloads
✅ Project card clicks & demos
✅ Contact button clicks
✅ External link clicks
✅ User location, device, browser
✅ Session duration & engagement

## 🔍 View Your Data

**Real-time**: GA Dashboard → Reports → Realtime
**Traffic Sources**: Reports → Acquisition → Traffic acquisition
**Events**: Reports → Engagement → Events
**Demographics**: Reports → User → Demographics

## 🏢 Track Companies

For better company identification, add:
- **LinkedIn Insights Tag** (Free, B2B focused)
- **HubSpot** (Free tier, IP-based company ID)
- **Clearbit Reveal** (Premium, detailed company data)

## 📝 Add More Tracking

```typescript
import { trackEvent } from '@/app/utils/analytics';

<button onClick={() => trackEvent({
  action: 'click',
  category: 'Button',
  label: 'My Button',
  value: 1
})}>
  Click Me
</button>
```

## 📚 Full Documentation
See **GOOGLE_ANALYTICS_SETUP.md** for complete details.

---
**Ready in 3 steps!** Get ID → Add to .env.local → Deploy 🎉
