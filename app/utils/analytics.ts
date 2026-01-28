// Google Analytics Event Tracking Utility

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}

/**
 * Send a custom event to Google Analytics
 * @param event The event object containing action, category, label, and value
 */
export const trackEvent = ({ action, category, label, value }: GAEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined tracking functions for common interactions

/**
 * Track navigation clicks
 */
export const trackNavigation = (destination: string) => {
  trackEvent({
    action: 'click',
    category: 'Navigation',
    label: destination,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkName: string) => {
  trackEvent({
    action: 'click',
    category: 'External Link',
    label: `${linkName} - ${url}`,
  });
};

/**
 * Track social media link clicks
 */
export const trackSocialClick = (platform: string, url: string) => {
  trackEvent({
    action: 'click',
    category: 'Social Media',
    label: `${platform} - ${url}`,
  });
};

/**
 * Track project interactions
 */
export const trackProjectClick = (projectName: string, action: 'view' | 'demo' | 'github') => {
  trackEvent({
    action: action,
    category: 'Project',
    label: projectName,
  });
};

/**
 * Track resume downloads
 */
export const trackResumeDownload = () => {
  trackEvent({
    action: 'download',
    category: 'Resume',
    label: 'PDF Download',
  });
};

/**
 * Track contact form interactions
 */
export const trackContact = (method: string) => {
  trackEvent({
    action: 'contact',
    category: 'Contact',
    label: method,
  });
};

/**
 * Track game demo interactions
 */
export const trackGameInteraction = (gameName: string, action: string) => {
  trackEvent({
    action: action,
    category: 'Game Demo',
    label: gameName,
  });
};

/**
 * Track terminal interactions
 */
export const trackTerminalCommand = (command: string) => {
  trackEvent({
    action: 'command',
    category: 'Interactive Terminal',
    label: command,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent({
    action: 'scroll',
    category: 'Engagement',
    label: `${depth}% scrolled`,
    value: depth,
  });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds: number) => {
  trackEvent({
    action: 'time_on_page',
    category: 'Engagement',
    label: 'Time spent on page',
    value: seconds,
  });
};
