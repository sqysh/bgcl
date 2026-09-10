const magicLinkTemplate = (url: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to Boys &amp; Girls Club of Lynn</title>
</head>
<body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #ffffff;">
  <div style="max-width: 520px; margin: 0 auto;">

    <!-- Header -->
    <div style="padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
      <p style="margin: 0; color: #171717; font-size: 15px; font-weight: 600;">
        Boys &amp; Girls Club of Lynn
      </p>
      <p style="margin: 2px 0 0 0; color: #737373; font-size: 13px;">
        Sign in
      </p>
    </div>

    <!-- Message -->
    <p style="margin: 24px 0 0 0; color: #171717; font-size: 15px; line-height: 1.6;">
      Press the button below to sign in. The link works once and expires in 15 minutes.
    </p>

    <!-- Button -->
    <div style="margin-top: 24px;">
      <a href="${url}" style="display: inline-block; background: #0284c7; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
        Sign in
      </a>
    </div>

    <!-- Fallback link -->
    <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
      <p style="margin: 0 0 8px 0; color: #737373; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em;">
        Or paste this into your browser
      </p>
      <p style="margin: 0; word-break: break-all; font-family: 'SF Mono', Monaco, 'Courier New', monospace; font-size: 12px; color: #737373; line-height: 1.6;">
        ${url}
      </p>
    </div>

    <!-- Not you -->
    <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
      <p style="margin: 0; color: #737373; font-size: 13px; line-height: 1.7;">
        If you did not ask to sign in, you can ignore this email. Nothing will happen until the link is used.
      </p>
    </div>

    <!-- Footer -->
    <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
      <p style="margin: 0 0 6px 0; color: #737373; font-size: 12px; line-height: 1.6;">
        Questions?
        <a href="mailto:info@bgcl.org" style="color: #1a72b8; text-decoration: none;">info@bgcl.org</a>
        &nbsp;·&nbsp;
        <a href="tel:781-593-1772" style="color: #1a72b8; text-decoration: none;">(781) 593-1772</a>
      </p>
      <p style="margin: 0; color: #a3a3a3; font-size: 11px; line-height: 1.5;">
        Boys &amp; Girls Club of Lynn &nbsp;·&nbsp; 25 North Common Street, Lynn, MA 01902
      </p>
    </div>

  </div>
</body>
</html>
`

export default magicLinkTemplate
