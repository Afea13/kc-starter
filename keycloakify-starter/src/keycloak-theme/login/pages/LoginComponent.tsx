import React from 'react';
import { useState, type FormEventHandler } from 'react';
import { useConstCallback } from 'keycloakify/tools/useConstCallback';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import { useGetClassName } from 'keycloakify/login/lib/useGetClassName';
import type { KcContext } from '../kcContext';
import type { I18n } from '../i18n';
import { retrieveQueryParamFromUrl } from 'oidc-spa/tools/urlQueryParams';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Alert from '@mui/joy/Alert';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Cancel from '@mui/icons-material/Cancel';
import GlobalStyles from '@mui/joy/GlobalStyles';
import { styled } from '@mui/joy/styles';
import { FaAngleDown } from 'react-icons/fa';
import healthPathwaysLogoPng from '../assets/HPteallogo.png';

const LogoItem = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  border: '0px',
  padding: theme.spacing(3),
  borderRadius: 0,
  backgroundColor: 'inherit',
}));

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

const result = retrieveQueryParamFromUrl({
  url: window.location.href,
  name: 'my_custom_param',
});

if (result.wasPresent) {
  console.log('my_custom_param', result.value);
}

export default function LoginComponent(
  props: PageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n>
) {
  const [showTermsAndConditions, setShowsTermsAndConditions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { social, realm, url, usernameHidden, login, auth, registrationDisabled, message } =
    kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement.querySelector("input[name='email']")?.setAttribute('name', 'username');

    formElement.submit();
  });
  const onShowDetailsClick = (e: any) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };
  const onRegisterClick = () => {
    Response.redirect(url.registrationUrl);
  };
  return (
    <>
      {' '}
      <GlobalStyles
        styles={{
          ':root': {
            '--bgcolormain': '#f0f4f8',
          },
        }}
      />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            TermsAndConditionsWindow
            <button className="close-button" onClick={toggleModal}>
              Close Modal
            </button>
          </div>
        </div>
      )}
      <div id="kc-form">
        <Grid
          id="kc-form-wrapper"
          container
          spacing={2}
          xs={12}
          sx={{
            flexGrow: 1,
            backgroundColor: 'var(--bgcolormain)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/**logo */}
          <Grid
            xs={12}
            md={realm.password && realm.registrationAllowed && !registrationDisabled ? 8 : 8}
          >
            <LogoItem>
              <img src={healthPathwaysLogoPng} alt="hplogo" className="logo" />
            </LogoItem>
          </Grid>

          <Grid
            xs={12}
            md={realm.password && realm.registrationAllowed && !registrationDisabled ? 8 : 5}
          >
            <Sheet
              variant="plain"
              sx={{
                backgroundColor: 'white',
                boxShadow:
                  ' 0px 6px 12px -2px rgba(21, 21, 21, 0.08), 0px 2px 8px -2px rgba(21, 21, 21, 0.08)',
                padding: 3,
                borderRadius: '6px',
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid
                  xs={12}
                  md={
                    realm.password && realm.registrationAllowed && !registrationDisabled ? 5.5 : 12
                  }
                >
                  {realm.password && (
                    <form
                      id="kc-form-login"
                      onSubmit={onSubmit}
                      action={url.loginAction}
                      method="post"
                    >
                      <Typography level="h3">Log in</Typography>
                      {/* Validation message error */}
                      {message !== undefined && message.type === 'error' && (
                        <Alert
                          key={message?.summary}
                          color="danger"
                          variant="plain"
                          sx={{ alignItems: 'flex-start', marginTop: 1 }}
                          startDecorator={<Cancel />}
                        >
                          {' '}
                          <div>
                            <Typography level="body-sm" color="danger">
                              {message?.summary}
                            </Typography>
                          </div>
                        </Alert>
                      )}
                      <br />
                      <Stack spacing={2}>
                        <FormControl required>
                          <FormLabel>Email</FormLabel>
                          <Input type="email" name="email" defaultValue={login.username ?? ''} />
                        </FormControl>
                        <FormControl required>
                          <FormLabel>Password</FormLabel>
                          <Input type="password" name="password" />
                        </FormControl>
                      </Stack>

                      {realm.resetPasswordAllowed && (
                        <Link
                          href="#basics"
                          sx={{
                            color: '#2B6FA6',
                            textDecoration: 'underline',
                            padding: '4px',
                            paddingTop: '16px',
                            fontWeight: 400,
                            fontSize: '16px',
                            height: '24px',
                          }}
                        >
                          Forgot password?
                        </Link>
                      )}
                      <br />
                      <div id="kc-form-buttons">
                        <input
                          type="hidden"
                          id="id-hidden-input"
                          name="credentialId"
                          {...(auth?.selectedCredential !== undefined
                            ? {
                                value: auth.selectedCredential,
                              }
                            : {})}
                        />

                        <Button
                          fullWidth
                          sx={{
                            color: 'background.level1',
                            marginTop: '24px',
                            marginBottom: '24px',
                          }}
                          type="submit"
                          id="kc-login"
                          disabled={isLoginButtonDisabled}
                        >
                          Log in
                        </Button>
                      </div>

                      <br />
                    </form>
                  )}
                  <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
                    {realm.password && social.providers !== undefined && (
                      <div id="kc-social-providers">
                        <Typography>Or log in with</Typography>
                        <br />
                        {social?.providers?.map((p) => (
                          <Button
                            fullWidth
                            variant="outlined"
                            type="submit"
                            id="kc-login"
                            disabled={isLoginButtonDisabled}
                            onClick={() => (window.location.href = p.loginUrl)}
                          >
                            {p.displayName}
                          </Button>
                        ))}
                      </div>
                    )}
                  </Stack>
                </Grid>
                {realm.password && realm.registrationAllowed && !registrationDisabled && (
                  <>
                    <Divider orientation="vertical"></Divider>
                    <Grid xs={12} md={5.5}>
                      <Typography level="h3">Don’t have an account?</Typography>
                      <br />
                      <FormControl>
                        <FormLabel>
                          Create HealthPathways account to request access to a HealthPathways site.
                        </FormLabel>
                      </FormControl>
                      <FormControl onClick={onShowDetailsClick}>
                        <FormLabel sx={{ fontWeight: 'bold' }}>
                          How to request access
                          <FaAngleDown />
                        </FormLabel>
                        {showDetails ? (
                          <List component="ol" type="1">
                            <ListItem>1. Create an account with your name and email.</ListItem>
                            <ListItem>
                              2. Request access to a site by submitting a request form to a local
                              HealthPathways team.
                            </ListItem>
                          </List>
                        ) : null}
                      </FormControl>

                      <br />
                      <Link
                        href={url.registrationUrl}
                        underline="none"
                        variant="outlined"
                        color="neutral"
                        sx={{
                          '--Link-gap': '0.5rem',
                          pl: 1,
                          py: 0.5,
                          borderRadius: 'md',
                          width: '100%',
                          alignContent: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Create account
                      </Link>
                      <br />
                    </Grid>
                  </>
                )}
              </Stack>
            </Sheet>
          </Grid>
          {/**footer */}
          <Grid xs={12} md={8}>
            <LogoItem sx={{ color: '#2B6FA6', textDecoration: 'underline' }}>
              Terms and Conditions
            </LogoItem>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
