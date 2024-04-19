import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native';
// form validation with Yup or else we can use normal javascript
// import normally or destructur it like below

import * as Yup from 'yup';
import {set} from 'mongoose';

import {Formik} from 'formik';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
// import {tailwind} from 'react-native-tailwindcss';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
});

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password must be at least 4 characters')
    .max(16, 'Password must be at most 16 characters')
    .required('Password Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList = '';
    const uppercaseChars = 'HWEFGUWHGFHBNDCJASNCJDVBHERBHTBR';
    const lowercaseChars = 'jehdbfgebrghebrgvhjekzdnsiqwroi';
    const digitsChars = '1234567890';
    const specialChars = '!@#$%^&*()=';

    if (lowerCase) {
      characterList += lowercaseChars;
    }
    if (upperCase) {
      characterList += uppercaseChars;
    }
    if (number) {
      characterList += digitsChars;
    }
    if (symbol) {
      characterList += specialChars;
    }

    const finalPasswordResult = () => {
      // shufflle the password result
      const shufflle = characterList.split('').sort(() => 0.5 - Math.random());
      return shufflle.join('');
    };
    const passwordResultIntermediate = finalPasswordResult();
    console.log('passwordResultIntermediate', passwordResultIntermediate);
    const passwordResult = createPassword(
      passwordResultIntermediate,
      passwordLength,
    );

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbol(false);
  };

  const testing = () => {
    const try1 = createPassword('abc', 12);
    setPassword(try1);
    console.log(try1);
  };

  return (
    <ScrollView className=" bg-slate-50" keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View>
          <Text className=" text-black text-center py-4 text-2xl font-bold">
            Password Generator
          </Text>
          {isPassGenerated && (
            <View className=" my-4">
              <Text className=" text-center font-bold text-xl">
                Generated Password
              </Text>
              <Text className=" text-center font-bold text-black text-2xl">
                {password}
              </Text>
            </View>
          )}
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              console.log('value', values);
              generatePassword(Number(values.passwordLength));
              // generatePassword(+values.passwordLength); typescript method
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
              isValid,
              handleReset,
            }) => (
              <>
                <View>
                  <Text className=" ml-4 font-bold ">
                    Enter Password Length
                  </Text>

                  <TextInput
                    className="border-2 border-black m-2 rounded-2xl p-2 pl-4"
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Enter Password Length"
                    keyboardType="numeric"
                  />

                  {errors.passwordLength ? (
                    <Text className=" text-red-600 ml-4">
                      {errors.passwordLength}
                    </Text>
                  ) : null}
                </View>
                <View>
                  <Text className=" ml-4 font-bold">
                    Select Password Options
                  </Text>
                </View>
                <View className=" items-center flex-row">
                  <Text className=" ml-4 font-bold">Lowercase</Text>
                  <BouncyCheckBox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="black"
                    className=" m-4"
                  />
                </View>
                <View className=" items-center flex-row">
                  <Text className=" ml-4 font-bold">Uppercase</Text>
                  <BouncyCheckBox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => {
                      setUpperCase(!upperCase);
                    }}
                    fillColor="black"
                    className=" m-4"
                  />
                </View>
                <View className=" items-center flex-row">
                  <Text className=" ml-4 font-bold">Numbers</Text>
                  <BouncyCheckBox
                    disableBuiltInState
                    isChecked={number}
                    onPress={() => setNumber(!number)}
                    fillColor="black"
                    className=" m-4"
                  />
                </View>
                <View className=" items-center flex-row">
                  <Text className=" ml-4 font-bold">Special Symbol</Text>
                  <BouncyCheckBox
                    disableBuiltInState
                    isChecked={symbol}
                    onPress={() => setSymbol(!symbol)}
                    fillColor="black"
                    className=" m-4"
                  />
                </View>
                <View className=" flex-row justify-around">
                  {/* dont call the method Onsubmut in the onpress as it need to collect the data from the form and submit to handsubmit which will call our Onsubmit function --->> this help in state management of the form ( AUTOMATED by YUP )   */}
                  <TouchableOpacity
                    className="  bg-black py-4 px-8 rounded-2xl  "
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text className=" text-white font-bold">
                      Generate Password
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="  bg-black py-4 px-8 rounded-2xl   "
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text className=" text-white font-bold">RESET</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({});
