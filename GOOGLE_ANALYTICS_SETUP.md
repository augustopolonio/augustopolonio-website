# Google Analytics Setup Guide

## Prerequisites
1. A Google Analytics account
2. A GA4 property created for your website

## Step 1: Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click on **Admin** (gear icon in the bottom left)
3. Under the **Property** column, click **Data Streams**
4. Select your web data stream or create a new one
5. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

## Step 2: Add Environment Variable

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## Step 3: Verify Installation

1. Run your development server: `npm run dev`
2. Open your website in a browser
3. Open Google Analytics and go to **Reports** → **Realtime**
4. You should see your active session

## What's Being Tracked

### Automatic Tracking
- **Page Views**: Every page visit and route change
- **User Demographics**: Location, device, browser
- **Session Duration**: Time spent on site
- **Bounce Rate**: Single-page sessions

### Custom Event Tracking
The following interactions are automatically tracked:

#### Navigation
- All navigation menu clicks
- Home logo clicks
- Page transitions

#### Social Media
- LinkedIn clicks
- Twitter/X clicks
- GitHub clicks
- Instagram clicks
- YouTube clicks
- Linktree clicks

#### Downloads
- Resume PDF downloads

#### Projects
- Project card clicks
- Demo button clicks
- GitHub repository links

#### Engagement
- Scroll depth tracking
- Time on page metrics
- Interactive terminal commands

## Using Analytics in Other Components

To add tracking to any component, import the tracking functions:

```typescript
import { trackEvent, trackProjectClick, trackExternalLink } from '@/app/utils/analytics';

// Track a custom event
trackEvent({
  action: 'click',
  category: 'Button',
  label: 'CTA Button',
  value: 1
});

// Track a project interaction
trackProjectClick('My Game', 'demo');

// Track an external link
trackExternalLink('https://example.com', 'Example Site');
```

## Available Tracking Functions

- `trackNavigation(destination)` - Track navigation clicks
- `trackExternalLink(url, linkName)` - Track external link clicks
- `trackSocialClick(platform, url)` - Track social media clicks
- `trackProjectClick(projectName, action)` - Track project interactions
- `trackResumeDownload()` - Track resume downloads
- `trackContact(method)` - Track contact interactions
- `trackGameInteraction(gameName, action)` - Track game demo interactions
- `trackTerminalCommand(command)` - Track terminal commands
- `trackScrollDepth(depth)` - Track scroll percentage
- `trackTimeOnPage(seconds)` - Track time spent on page

## Viewing Analytics Data

### Real-time Data
1. Go to **Reports** → **Realtime** in Google Analytics
2. See current active users and their behavior

### Traffic Sources
1. Go to **Reports** → **Acquisition** → **Traffic acquisition**
2. View where visitors are coming from (direct, search, social, referral)

### User Demographics
1. Go to **Reports** → **User** → **Demographics**
2. See visitor location, age, gender, interests

### Events
1. Go to **Reports** → **Engagement** → **Events**
2. See all custom tracked events (button clicks, downloads, etc.)

### Company Tracking
To identify companies visiting your site, you can:
1. Use Google Analytics 4's built-in company data (limited)
2. Integrate with third-party tools like:
   - **Clearbit Reveal** (identifies companies by IP)
   - **HubSpot** (free CRM with visitor identification)
   - **LinkedIn Insights Tag** (B2B traffic insights)

## Enhanced Company Tracking (Optional)

For better company identification, consider adding:

### LinkedIn Insights Tag
1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager)
2. Create a new Insight Tag
3. Add the tag to your website alongside Google Analytics

### HubSpot Tracking
1. Create a free [HubSpot account](https://www.hubspot.com/)
2. Install the HubSpot tracking code
3. View company visitors in HubSpot dashboard

## Privacy Considerations

- Google Analytics only activates in production (`NODE_ENV === 'production'`)
- Consider adding a cookie consent banner for GDPR/CCPA compliance
- The tracking respects user privacy and doesn't collect PII without consent

## Testing

To test in development, temporarily remove the production check in:
```typescript
// app/components/GoogleAnalytics.tsx
if (!GA_MEASUREMENT_ID) { // Remove: || process.env.NODE_ENV !== 'production'
  return null;
}
```

Don't forget to add it back before deploying!

## Troubleshooting

### Not seeing data in Google Analytics?
1. Check that your `.env.local` file has the correct Measurement ID
2. Verify the ID starts with `G-` not `UA-` (GA4 vs Universal Analytics)
3. Make sure you're in production mode or removed the production check
4. Check browser console for errors
5. Use Google Analytics Debugger Chrome extension

### Events not tracking?
1. Open browser console and check for gtag errors
2. Verify window.gtag is defined
3. Test in production mode where GA is active

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
