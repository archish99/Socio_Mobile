import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFormik} from 'formik';
import {
  Box,
  Checkbox,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryBtn from '../../components/common/primaryBtn';
import PrimaryInput from '../../components/common/primaryInput';
import Container from '../../components/layout/container';
import colors from '../../constants/common/colors';
import {AuthStackParamsList} from '../../navigation/auth';
import {loginSchema} from '../../utils/validation/schema/auth';

type Props = NativeStackScreenProps<AuthStackParamsList, 'login'>;

const Login: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formikProps = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values: {
      email: string;
      password: string;
      rememberMe: boolean;
    }) => {
      console.log('values:: ', values);
    },
  });

  const {values, touched, errors, handleChange, handleSubmit, setFieldValue} =
    formikProps;

  return (
    <Container>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <Box flex={1} px="15px">
          <Text fontSize="24px" fontWeight={700} my="30px">
            Login to your {'\n'}Account
          </Text>
          <VStack my="20px" space="15px">
            <FormControl
              isRequired
              isInvalid={!!touched.email && !!errors.email}>
              <PrimaryInput
                value={values.email}
                placeholder="Email"
                onChange={handleChange('email')}
                keyboardType="email-address"
              />
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!touched.password && !!errors.password}>
              <PrimaryInput
                value={values.password}
                placeholder="Password"
                onChange={handleChange('password')}
                type={showPassword ? 'text' : 'password'}
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(prev => !prev)}>
                    <Icon
                      as={Ionicons}
                      name={showPassword ? 'eye' : 'eye-off'}
                      size="20px"
                      mr="10px"
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <Checkbox
              isChecked={values.rememberMe}
              value=""
              colorScheme="red"
              mx="auto"
              my="10px"
              borderColor={colors.primaryColor}
              onChange={e => setFieldValue('rememberMe', e)}>
              <Text>Remember Me</Text>
            </Checkbox>
            <PrimaryBtn
              title="Login"
              extraBtnStyles={{mt: '10px', rounded: 'full'}}
              disabled={!values.email || !values.password}
              onPress={handleSubmit}
            />
            <Text textAlign="center" color={colors.primaryColor}>
              Forgot password?
            </Text>
          </VStack>
          <Text my="20px" textAlign="center">
            Or continue with
          </Text>
          <HStack justifyContent="center" alignItems="center">
            <IconButton
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="facebook"
                  color={colors.facebookBlue}
                  size="20px"
                />
              }
              mr="10px"
              borderWidth={1}
              borderColor={colors.lightGray}
              _pressed={{bg: 'white', opacity: 0.7}}
            />
            <IconButton
              icon={
                <Icon
                  as={Ionicons}
                  name="logo-google"
                  color="black"
                  size="20px"
                />
              }
              borderWidth={1}
              borderColor={colors.lightGray}
              _pressed={{bg: 'white', opacity: 0.7}}
            />
          </HStack>
          <Text textAlign="center" color={colors.darkGray} mt="20px">
            Don't have an account?{' '}
            <Text color={colors.primaryColor}>Sign up</Text>
          </Text>
        </Box>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Login;
