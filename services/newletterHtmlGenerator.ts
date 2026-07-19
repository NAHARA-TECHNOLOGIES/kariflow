import { NewsletterSubscriber, BlogPost } from '../types';

export function generateNewsletterHTML(
  sub: NewsletterSubscriber, 
  posts: BlogPost[], 
  templateSettings?: any, 
  brandingSettings?: any
) {
  const tSet = templateSettings || {
    theme: 'emerald',
    headerText: 'Kariflow Journal',
    subtitleText: 'Empowering dressmakers and design hubs worldwide.',
    introGreeting: 'Hi Artisan,',
    introBody: 'Here are your custom insights selected for your interest. Optimize your studio, organize task workflows, and scale your brand values.',
    footerAddress: '35, Joel Ogunnaike Street, GRA Ikeja, Lagos, Nigeria',
    footerSocials: {
      twitter: 'https://twitter.com/kariflow',
      linkedin: 'https://linkedin.com/company/kariflow',
      instagram: 'https://instagram.com/kariflow'
    },
    footerSignature: 'Kariflow Inc. All rights reserved.',
    includeFooter: true
  };

  const bSet = brandingSettings || {
    logoMode: 'crop',
    cropType: 'vertical',
    cropIndex: 0
  };

  // Compile Dynamic Theme Colors
  let outerBg, cardBg, headerBg, headerTextCol, subtitleCol, primaryAccent, textCol, dividerBorder, buttonBg, buttonText, footerBg, footerTextCol, borderStyle, greetingColor, titleColor;

  if (tSet.theme === 'emerald') {
    outerBg = '#f8fafc';
    cardBg = '#ffffff';
    headerBg = '#022c22';
    headerTextCol = '#ffffff';
    subtitleCol = '#a7f3d0';
    primaryAccent = '#059669';
    textCol = '#475569';
    dividerBorder = '#e2e8f0';
    buttonBg = '#059669';
    buttonText = '#ffffff';
    footerBg = '#f1f5f9';
    footerTextCol = '#64748b';
    borderStyle = '1px solid #e2e8f0';
    greetingColor = '#1e293b';
    titleColor = '#0f171e';
  } else if (tSet.theme === 'modern') {
    outerBg = '#f3f4f6';
    cardBg = '#ffffff';
    headerBg = '#0f172a';
    headerTextCol = '#ffffff';
    subtitleCol = '#94a3b8';
    primaryAccent = '#0f172a';
    textCol = '#334155';
    dividerBorder = '#f1f5f9';
    buttonBg = '#0f172a';
    buttonText = '#ffffff';
    footerBg = '#f8fafc';
    footerTextCol = '#475569';
    borderStyle = '1px solid #e2e8f0';
    greetingColor = '#0f172a';
    titleColor = '#1e293b';
  } else { // artisanal
    outerBg = '#f4efe6';
    cardBg = '#faf7f2';
    headerBg = '#5c4d3c';
    headerTextCol = '#ffffff';
    subtitleCol = '#d1c7bd';
    primaryAccent = '#b45309';
    textCol = '#5c544d';
    dividerBorder = '#e2d9cd';
    buttonBg = '#b45309';
    buttonText = '#ffffff';
    footerBg = '#eae3d5';
    footerTextCol = '#6c5c4c';
    borderStyle = '2px dashed #d1c7bd';
    greetingColor = '#4a3f35';
    titleColor = '#3a2f28';
  }

  const postListHtml = posts.map(post => `
    <div style="margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid ${dividerBorder}; text-align: left;">
      <div style="border-radius: 16px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <img src="${post.image}" alt="${post.title}" style="width: 100%; max-height: 240px; object-fit: cover; display: block;">
      </div>
      <div style="margin-bottom: 12px;">
        <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: ${primaryAccent}; background: rgba(5, 150, 105, 0.08); padding: 6px 12px; border-radius: 99px; display: inline-block;">
          ${post.category}
        </span>
      </div>
      <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 800; color: ${titleColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.3;">
        ${post.title}
      </h3>
      <p style="color: ${textCol}; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        ${post.excerpt}
      </p>
      <a href="https://kariflow.app/blog/${post.slug}" style="display: inline-block; padding: 12px 24px; background: ${buttonBg}; color: ${buttonText}; text-decoration: none; border-radius: 12px; font-size: 13px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; box-shadow: 0 4px 10px rgba(5,150,105,0.15); transition: all 0.2s ease;">
        Read Full Article &rarr;
      </a>
    </div>
  `).join('');

  const unsubscribeUrl = `https://kariflow.app/unsubscribe?email=${encodeURIComponent(sub.email)}`;

  const headerHtml = `
    <!-- Header -->
    <tr>
      <td style="background-color: ${headerBg}; padding: 40px; text-align: center;">
        <!-- Brand Header (Simulated Cropped Logo or Styled typography) -->
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: inline-block; margin-bottom: 12px;">
          <table border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color: ${tSet.theme === 'artisanal' ? '#b45309' : '#ffffff'}; padding: 8px 12px; border-radius: 10px; text-align: center; vertical-align: middle;">
                <span style="font-size: 16px; font-weight: bold; color: ${tSet.theme === 'artisanal' ? '#ffffff' : primaryAccent}; line-height: 1;">K</span>
              </td>
              <td style="padding-left: 12px; vertical-align: middle;">
                <span style="font-size: 24px; font-weight: 900; color: ${headerTextCol}; letter-spacing: -0.04em;">KARIFLOW<span style="color: ${subtitleCol};">.</span></span>
              </td>
            </tr>
          </table>
        </div>
        <p style="color: ${subtitleCol}; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 4px 0;">${tSet.headerText}</p>
        <p style="color: ${headerTextCol}; font-size: 14px; opacity: 0.75; margin: 0;">${tSet.subtitleText}</p>
      </td>
    </tr>
  `;

  const footerHtml = tSet.includeFooter ? `
    <!-- Footer -->
    <tr>
      <td style="background-color: ${footerBg}; padding: 40px; border-top: 1px solid ${dividerBorder}; text-align: center;">
        <div style="font-size: 18px; font-weight: 800; color: ${greetingColor}; margin-bottom: 12px;">
          KARIFLOW<span style="color: ${primaryAccent};">.</span>
        </div>
        
        <p style="font-size: 12px; color: ${footerTextCol}; line-height: 1.6; margin: 0 0 20px 0; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <strong>Kariflow Studio Directory</strong><br>
          ${tSet.footerAddress}
        </p>

        <!-- Social Handles -->
        <div style="margin-bottom: 24px;">
          ${tSet.footerSocials.twitter ? `<a href="${tSet.footerSocials.twitter}" style="display: inline-block; width: 32px; height: 32px; line-height: 32px; background: rgba(0,0,0,0.04); color: ${footerTextCol}; border-radius: 50%; font-size: 12px; font-weight: bold; text-decoration: none; margin: 0 6px;">TW</a>` : ''}
          ${tSet.footerSocials.linkedin ? `<a href="${tSet.footerSocials.linkedin}" style="display: inline-block; width: 32px; height: 32px; line-height: 32px; background: rgba(0,0,0,0.04); color: ${footerTextCol}; border-radius: 50%; font-size: 12px; font-weight: bold; text-decoration: none; margin: 0 6px;">LN</a>` : ''}
          ${tSet.footerSocials.instagram ? `<a href="${tSet.footerSocials.instagram}" style="display: inline-block; width: 32px; height: 32px; line-height: 32px; background: rgba(0,0,0,0.04); color: ${footerTextCol}; border-radius: 50%; font-size: 12px; font-weight: bold; text-decoration: none; margin: 0 6px;">IG</a>` : ''}
        </div>

        <!-- Subscription controls & Unsubscribe completely -->
        <p style="font-size: 11px; color: ${footerTextCol}; opacity: 0.8; line-height: 1.5; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          You are receiving this digest because you subscribed to Kariflow updates.<br>
          <a href="https://kariflow.app/settings" style="color: ${primaryAccent}; text-decoration: none; font-weight: bold;">Update Preferences</a> 
          <span style="margin: 0 6px; color: ${dividerBorder};">|</span> 
          <a href="${unsubscribeUrl}" style="color: #ef4444; text-decoration: none; font-weight: bold;" id="subscriber-unsubscribe-btn">Unsubscribe completely</a>
        </p>
        
        <hr style="border: none; border-top: 1px solid ${dividerBorder}; margin: 24px 0;">
        
        <p style="font-size: 10px; color: ${footerTextCol}; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.1em; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          © ${new Date().getFullYear()} ${tSet.footerSignature}
        </p>
      </td>
    </tr>
  ` : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${tSet.headerText}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${outerBg}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${outerBg}; padding: 20px 10px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: ${cardBg}; border: ${borderStyle}; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.02);">
              
              ${headerHtml}

              <!-- Greeting & Content Intro -->
              <tr>
                <td style="padding: 40px 40px 20px 40px; text-align: left;">
                  <h2 style="font-size: 22px; font-weight: 800; color: ${greetingColor}; margin: 0 0 12px 0;">${tSet.introGreeting}</h2>
                  <p style="color: ${textCol}; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                    ${tSet.introBody.replace(/\$\{sub\.categories\}/g, Array.isArray(sub.categories) ? sub.categories.join(', ') : '')}
                  </p>
                </td>
              </tr>

              <!-- Blog List -->
              <tr>
                <td style="padding: 0 40px;">
                  ${postListHtml}
                </td>
              </tr>

              ${footerHtml}

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
