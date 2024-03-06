// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { assert } from 'keycloakify/tools/assert';
import { clsx } from 'keycloakify/tools/clsx';
import { usePrepareTemplate } from 'keycloakify/lib/usePrepareTemplate';
import { type TemplateProps } from 'keycloakify/login/TemplateProps';
import { useGetClassName } from 'keycloakify/login/lib/useGetClassName';
import type { KcContext } from './kcContext';
import type { I18n } from './i18n';
import Sheet from '@mui/joy/Sheet';

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode,
    showUsernameNode = null,
    infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,

    htmlClassName: getClassName('kcHtmlClass'),
    bodyClassName: getClassName('kcBodyClass'),
  });

  if (!isReady) {
    return null;
  }

  return (
    <>
      <div className="my-main-login-container">
        <div id="kc-content">
          <div id="kc-content-wrapper">
            <div className="my-header-top"></div>
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {/** section 1 - this section is kept the same */}
            { /**heilene */}
            {/* {displayMessage &&
              message !== undefined &&
              (message.type !== 'warning' || !isAppInitiatedAction) && (
                <div className={clsx('alert', `alert-${message.type}`)}>
                  {message.type === 'success' && (
                    <span className={getClassName('kcFeedbackSuccessIcon')}></span>
                  )}
                  {message.type === 'warning' && (
                    <span className={getClassName('kcFeedbackWarningIcon')}></span>
                  )}
                  {message.type === 'error' && (
                    <span className={getClassName('kcFeedbackErrorIcon')}></span>
                  )}
                  {message.type === 'info' && (
                    <span className={getClassName('kcFeedbackInfoIcon')}></span>
                  )}
                  <span
                    className="kc-feedback-text"
                    dangerouslySetInnerHTML={{
                      __html: message.summary,
                    }}
                  />
                </div>
              )} */}
            {/** section 1 - end */}
            <div>{children}</div>
            {/** section 2- keeping it the same */}
            {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
              <form
                id="kc-select-try-another-way-form"
                action={url.loginAction}
                method="post"
                className={clsx(displayWide && getClassName('kcContentWrapperClass'))}
              >
                <div
                  className={clsx(
                    displayWide && [
                      getClassName('kcFormSocialAccountContentClass'),
                      getClassName('kcFormSocialAccountClass'),
                    ]
                  )}
                >
                  <div className={getClassName('kcFormGroupClass')}>
                    <input type="hidden" name="tryAnotherWay" value="on" />
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href="#"
                      id="try-another-way"
                      onClick={() => {
                        document.forms['kc-select-try-another-way-form' as never].submit();
                        return false;
                      }}
                    >
                      {msg('doTryAnotherWay')}
                    </a>
                  </div>
                </div>
              </form>
            )}
            {/** section 2 - end */}
            {/* {displayInfo && (
              <div id="kc-info" className="my-main-login-page-bottom-signup">
                <div id="kc-info-wrapper">
                  <a href="/">Terms and Conditions</a>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
