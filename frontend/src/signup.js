import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import TouristMain from './touristMain';
import AddSite from './addSite';

function Signup({navigation}) {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={require('../assets/images/Cliff.jpg')}>
          <View style={styles.innerView}>
            <Text style={styles.text}>Get Started</Text>
            <View style={styles.line} />
            <Text>{'\n'}</Text>
            <Text style={styles.header}>Role:</Text>
            <Picker
              selectedValue={role}
              style={[styles.input, {height: 20}]}
              onValueChange={itemValue => setRole(itemValue)}>
              <Picker.Item
                label="Select Role"
                value=""
                color="grey"
                enabled={false}
              />
              <Picker.Item label="Tourist" value="Tourist" />
              <Picker.Item label="Manager" value="Manager" />
            </Picker>
            <Text style={styles.header}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="ex: John Doe"
              cursorColor="black"
              inputMode="text"
              keyboardType="default"
              placeholderTextColor="grey"
              onChangeText={setName}
              value={name}
            />
            <Text style={styles.header}>Email:</Text>
            <TextInput
              style={styles.input}
              inputMode="email"
              placeholder="ex: user@domain.extension"
              cursorColor="black"
              keyboardType="email-address"
              placeholderTextColor="grey"
              onChangeText={setEmail}
              value={email}
            />
            <Text style={styles.header}>D.O.B:</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              cursorColor="black"
              keyboardType="numeric"
              placeholderTextColor="grey"
              maxLength={10}
              onChangeText={setDob}
              value={dob}
            />
            <Text style={styles.header}>Gender:</Text>
            <Picker
              selectedValue={gender}
              style={[styles.input, {height: 20}]}
              onValueChange={itemValue => setGender(itemValue)}>
              <Picker.Item
                label="Select Gender"
                value=""
                color="grey"
                enabled={false}
              />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
            <Text style={styles.header}>Username:</Text>
            <TextInput
              style={styles.input}
              placeholder="ex: JohnDoe"
              cursorColor="black"
              inputMode="text"
              keyboardType="default"
              placeholderTextColor="grey"
              onChangeText={setUsername}
              value={username}
            />
            <Text style={styles.header}>Password:</Text>
            <View>
              <TextInput
                style={[styles.input, {marginBottom: 0}]}
                inputMode="text"
                secureTextEntry={!passwordVisible}
                placeholder="Min. 8 characters"
                cursorColor="black"
                keyboardType="default"
                placeholderTextColor="grey"
                minLength={8}
                onChangeText={setPassword}
                value={password}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.icon}>
                <Icon
                  name={passwordVisible ? 'eye' : 'eye-slash'}
                  size={25}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            <Text>{'\n\n'}</Text>
            <View style={[styles.line, {marginTop: 0}]} />
            <Text>{'\n'}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (role === 'Manager') {
                  navigation.navigate(AddSite);
                } else if (role === 'Tourist') {
                  navigation.navigate(TouristMain);
                }
                alert('Welcome ' + name);
              }}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerView: {
    backgroundColor: 'rgba(10, 10, 10, 0.25)',
    paddingTop: 40,
    paddingBottom: 70,
  },
  line: {
    marginTop: 10,
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    width: '75%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#EE161F',
    width: 130,
    height: 50,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    width: 300,
    padding: 15,
    height: 55,
    alignSelf: 'center',
    marginBottom: 40,
  },
  header: {
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 55,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    right: 70,
    height: 50,
    justifyContent: 'center',
  },
});

export default Signup;
