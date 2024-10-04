import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <SafeAreaView>
      <ImageBackground source={require('../assets/images/Raouche.jpg')}>
        <View style={styles.innerView}>
          <Text style={styles.text}>Welcome Back</Text>
          <View style={styles.line} />
          <Text>{'\n'}</Text>
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
          <Text>{'\n'}</Text>
          <View style={styles.line} />
          <Text>{'\n'}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              alert('Great to have you back again!');
            }}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  innerView: {
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    height: '100%',
    paddingTop: 100,
  },
  line: {
    marginTop: 10,
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    width: '70%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#00A850',
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
    fontSize: 45,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    right: 70,
    height: 50,
    justifyContent: 'center',
  },
});

export default Login;
