# Google Search Console Resubmission Guide

## Changes Made to Fix Google Indexing Issues

1. **Fixed Duplicate Redirect Rules**
   - Removed duplicate `redirects()` function in `next.config.mjs`
   - Consolidated all redirect rules into a single function

2. **Fixed Sitemap Configuration**
   - Removed `X-Robots-Tag: noindex, follow` from sitemap responses
   - Prioritized Polish (/pl) locale as the main page in sitemap index

3. **Fixed Canonical URL Issues**
   - Updated canonical URL generation to use URL objects
   - Prevented duplicate locale segments in URLs (e.g., `/pl/pl`)
   - Removed duplicate canonical link tags from components

## Steps to Resubmit to Google Search Console

1. **Deploy the Changes**
   - Push all changes to your repository
   - Deploy the updated code to your hosting provider

2. **Verify the Fixes**
   - Visit https://mernserwis.com/sitemap.xml to ensure it loads correctly
   - Check that the sitemap no longer has the "noindex" header
   - Verify that canonical URLs are correctly set on various pages

3. **Resubmit Sitemap in Google Search Console**
   - Log in to [Google Search Console](https://search.google.com/search-console)
   - Select your property (https://mernserwis.com/)
   - Go to "Sitemaps" in the left sidebar
   - Click "Add a new sitemap"
   - Enter "sitemap.xml" and click "Submit"

4. **Request Indexing for Key Pages**
   - In Google Search Console, go to "URL Inspection"
   - Enter the URL of your main page (https://mernserwis.com/pl)
   - Click "Request Indexing"
   - Repeat for other important pages like:
     - https://mernserwis.com/pl/about
     - https://mernserwis.com/pl/services
     - https://mernserwis.com/pl/contacts
     - https://mernserwis.com/pl/gallery
     - https://mernserwis.com/pl/news

5. **Monitor Indexing Status**
   - Check the "Coverage" report in Google Search Console
   - Look for any remaining errors or warnings
   - Monitor the "Excluded" tab for pages that are still not indexed

## Expected Timeline

- Sitemap processing: 1-3 days
- Initial indexing of key pages: 3-7 days
- Full site indexing: 1-4 weeks

## Additional Recommendations

1. **Add Structured Data**
   - Consider adding structured data (JSON-LD) to improve search results
   - Use appropriate schemas for your business (LocalBusiness, Service, etc.)

2. **Improve Page Speed**
   - Use tools like Google PageSpeed Insights to identify performance issues
   - Optimize images, reduce JavaScript, and implement caching

3. **Create Quality Content**
   - Regularly update your site with fresh, relevant content
   - Focus on keywords relevant to your business

4. **Build Quality Backlinks**
   - Get listed in local business directories
   - Partner with related businesses for backlinks

Remember that Google indexing can take time, especially for new sites or sites with previous indexing issues. Be patient and continue monitoring your progress in Google Search Console.
