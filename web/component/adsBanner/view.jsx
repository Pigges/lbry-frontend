// @flow
import React from 'react';
import Button from 'component/button';
import I18nMessage from 'component/i18nMessage';
import * as PAGES from 'constants/pages';
import useShouldShowAds from 'effects/use-should-show-ads';

const AD_SCRIPT_URL = 'https://widgets.outbrain.com/outbrain.js';

// ****************************************************************************
// ****************************************************************************

const adsSignInDriver = (
  <I18nMessage
    tokens={{
      sign_up_for_premium: (
        <Button button="link" label={__('Get Odysee Premium+')} navigate={`/$/${PAGES.ODYSEE_MEMBERSHIP}`} />
      ),
    }}
  >
    Hate these? %sign_up_for_premium% for an ad free experience.
  </I18nMessage>
);

// ****************************************************************************
// AdsBanner
// ****************************************************************************

let gReferenceCounter = 0;

type Props = {
  userHasPremiumPlus: boolean,
  doSetAdBlockerFound: (boolean) => void,
};

export default function AdsBanner(props: Props) {
  const { userHasPremiumPlus, doSetAdBlockerFound } = props;
  const shouldShowAds = useShouldShowAds(userHasPremiumPlus, doSetAdBlockerFound);

  React.useEffect(() => {
    if (shouldShowAds) {
      try {
        const script = document.createElement('script');
        script.src = AD_SCRIPT_URL;
        script.async = true;
        script.onload = () => {
          ++gReferenceCounter;
        };

        // $FlowFixMe
        document.body.appendChild(script);
        return () => {
          // $FlowFixMe
          document.body.removeChild(script);

          if (--gReferenceCounter <= 0) {
            delete window.OBR;
            // TODO: clear styles after the team adds an ID or class for us to query.
          }
        };
      } catch (e) {}
    }
  }, [shouldShowAds]);

  if (!shouldShowAds) {
    return null;
  }

  return (
    <div className="banner-ad">
      <div
        className="banner-ad__container OUTBRAIN"
        data-ob-contenturl="DROP_PERMALINK_HERE"
        data-widget-id="AR_6"
        data-ob-installation-key="ADNIMKAJDGAG4GAO6AGG6H5KP"
      />
      <div className="banner-ad__driver">
        <div className="banner-ad__driver-label">Ad</div>
        <div className="banner-ad__driver-value">{adsSignInDriver}</div>
      </div>
    </div>
  );
}
