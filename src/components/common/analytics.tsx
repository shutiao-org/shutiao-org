import Script from 'next/script'
import { env } from '@/env'

export const Analytics = () => {
  if (env.NODE_ENV === 'development') {
    return null
  }

  return (
    <>
      {env.NEXT_PUBLIC_UMAMI_ANALYTICS_ID &&
        env.NEXT_PUBLIC_UMAMI_ANALYTICS_JS && (
          <Script
            src={env.NEXT_PUBLIC_UMAMI_ANALYTICS_JS}
            data-website-id={env.NEXT_PUBLIC_UMAMI_ANALYTICS_ID}
            strategy='afterInteractive'
          />
        )}

      {env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID && (
        <Script
          id='microsoft-clarity'
          strategy='afterInteractive'
        >
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  )
}
