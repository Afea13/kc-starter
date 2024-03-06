import theme from './theme';
// ejected using 'npx eject-keycloak-page'
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import { useGetClassName } from 'keycloakify/login/lib/useGetClassName';
import type { KcContext } from '../kcContext';
import type { I18n } from '../i18n';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import GlobalStyles from '@mui/joy/GlobalStyles';
import { styled } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Checkbox from '@mui/joy/Checkbox';
import CssBaseline from '@mui/joy/CssBaseline';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';


const LogoItem = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  border: '0px',
  borderRadius: 0,
  backgroundColor: 'inherit',
}));
export default function Register(
  props: PageProps<Extract<KcContext, { pageId: 'register.ftl' }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    url,
    messagesPerField,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
    message,
  } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme} disableTransitionOnChange>
        <CssBaseline />
        <Template
          {...{ kcContext, i18n, doUseDefaultCss, classes }}
          headerNode={msg('registerTitle')}
        >
          <GlobalStyles
            styles={{
              ':root': {
                '--bgcolormain': '#f0f4f8',
              },
            }}
          />

          <Grid
            id="kc-form-wrapper"
            container
            sx={{
              flexGrow: 1,
              backgroundColor: 'var(--bgcolormain)',
              alignItems: 'center',
              justifyContent: 'center',
              marginX: { xs: 2, md: 0 },
            }}
          >
            <Grid xs={12}>
            
            </Grid>

            <Grid xs={12} sx={{ maxWidth: '472px' }}>
              <Sheet
                variant="plain"
                sx={{
                  backgroundColor: 'white',
                  boxShadow:
                    ' 0px 6px 12px -2px rgba(21, 21, 21, 0.08), 0px 2px 8px -2px rgba(21, 21, 21, 0.08)',
                  padding: 4,
                  borderRadius: '6px',
                }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                  <Grid xs={12}>
                    <form
                      id="kc-register-form"
                      className={getClassName('kcFormClass')}
                      action={url.registrationAction}
                      method="post"
                    >
                      <Stack spacing={2}>
                        <Typography level="h3">Create account</Typography>
                        <Typography level="body-md">
                          Already have an account?&nbsp;
                          <Link href={url.loginUrl}>Log in</Link>
                        </Typography>

                        <FormControl error={messagesPerField.existsError('email')}>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={register.formData.email ?? ''}
                            autoComplete="email"
                          />
                          {messagesPerField.existsError('email') ? (
                            <FormHelperText>{messagesPerField.get('email')}</FormHelperText>
                          ) : (
                            <FormHelperText>Please enter an individual email.</FormHelperText>
                          )}
                        </FormControl>
                        <FormControl error={messagesPerField.existsError('firstName')}>
                          <FormLabel htmlFor="firstName">First name</FormLabel>
                          <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            defaultValue={register.formData.firstName ?? ''}
                          />
                          <FormHelperText>{messagesPerField.get('firstName')}</FormHelperText>
                        </FormControl>
                        <FormControl error={messagesPerField.existsError('lastName')}>
                          <FormLabel htmlFor="lastName">Last name</FormLabel>
                          <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            defaultValue={register.formData.lastName ?? ''}
                          />
                          <FormHelperText>{messagesPerField.get('lastName')}</FormHelperText>
                        </FormControl>

                        {passwordRequired && (
                          <>
                            <FormControl error={messagesPerField.existsError('password')}>
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <Input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="new-password"
                              />
                              {messagesPerField.existsError('password') ? (
                                <FormHelperText>{messagesPerField.get('password')}</FormHelperText>
                              ) : (
                                <FormHelperText>Must be at least 8 characters.</FormHelperText>
                              )}
                            </FormControl>
                            <FormControl error={messagesPerField.existsError('password-confirm')}>
                              <FormLabel htmlFor="password-confirm">Confirm password</FormLabel>
                              <Input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                              />
                              <FormHelperText>
                                {messagesPerField.get('password-confirm')}
                              </FormHelperText>
                            </FormControl>
                          </>
                        )}
                      </Stack>
                      <div style={{ marginTop: '16px' }}>
                        <FormControl error={messagesPerField.existsError('termsAccepted')}>
                          <Stack direction={'row'} spacing={1}>
                            <Checkbox variant="outlined" size="md" />
                            <Typography level="body-md">
                              I accept the&nbsp;
                              <Link href="#basics">Terms and Conditions</Link>
                            </Typography>
                          </Stack>
                          <FormHelperText>{messagesPerField.get('termsAccepted')}</FormHelperText>
                        </FormControl>
                      </div>
                      <div id="kc-form-buttons">
                        <Button
                          fullWidth
                          sx={{ color: 'background.level1', marginTop: '16px' }}
                          type="submit"
                          value={msgStr('doRegister')}
                        >
                          Create account
                        </Button>
                      </div>
                      <br />
                    </form>
                  </Grid>
                </Stack>
              </Sheet>
            </Grid>
          </Grid>
        </Template>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}