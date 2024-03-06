import { useState, type FormEventHandler } from 'react';
import { clsx } from 'keycloakify/tools/clsx';
import { useConstCallback } from 'keycloakify/tools/useConstCallback';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import { useGetClassName } from 'keycloakify/login/lib/useGetClassName';
import type { KcContext } from '../kcContext';
import type { I18n } from '../i18n';
import { retrieveQueryParamFromUrl } from 'oidc-spa/tools/urlQueryParams';
import theme from './theme';
import Sheet from '@mui/joy/Sheet';
import { styled } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import LoginComponent from './LoginComponent';


const result = retrieveQueryParamFromUrl({
  url: window.location.href,
  name: 'my_custom_param',
});

if (result.wasPresent) {
  console.log('my_custom_param', result.value);
}
const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(1),
  borderRadius: theme.radius.md,
}));
export default function Login(props: PageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { social, realm, url, usernameHidden, login, auth, registrationDisabled, message } =
    kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement.querySelector("input[name='email']")?.setAttribute('name', 'username');

    formElement.submit();
  });

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme} disableTransitionOnChange>
        <CssBaseline />
        <Template
          {...{ kcContext, i18n, doUseDefaultCss, classes }}
          displayInfo={social.displayInfo}
          displayWide={realm.password && social.providers !== undefined}
          headerNode={msg('doLogIn')}
          infoNode={
            realm.password &&
            realm.registrationAllowed &&
            !registrationDisabled && (
              <div id="kc-registration">
                <span>
                  {msg('noAccount')}
                  <a tabIndex={6} href={url.registrationUrl}>
                    {msg('doRegister')}
                  </a>
                </span>
              </div>
            )
          }
        >
          <LoginComponent {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />
        </Template>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}
