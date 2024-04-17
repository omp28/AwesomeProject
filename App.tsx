import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native';

// form validation with Yup or else we can use normal javascript
// import normally or destructur it like below

import * as Yup from 'yup';
import {set} from 'mongoose';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password must be at least 4 characters')
    .max(16, 'Password must be at most 16 characters')
    .required('Password is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatePassword = (passwordLength: number) => {};

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {};

  const testing = () => {
    const try1 = createPassword('abc', 12);
    setPassword(try1);
    console.log(try1);
  };

  return (
    <View>
      <Text>App</Text>
      {/* call the function testing by clicking the button  */}
      <Button title="Testing" onPress={testing} />
      <Text className=" text-3xl">{password}</Text>
    </View>
  );
}

// const styles = StyleSheet.create({});
