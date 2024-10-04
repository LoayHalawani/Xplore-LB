import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Signup from './signup';
import Login from './login';

function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Solidere.jpg')}
        style={styles.image}>
        <View style={styles.innerView}>
          <Text style={styles.text}>Xplore LB</Text>
          <View style={styles.line} />
          <Text>{'\n'}</Text>
          <Text style={styles.questions}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(Signup)}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
          <Text>{'\n\n'}</Text>
          <View style={[styles.line, {width: '60%'}]} />
          <Text>{'\n'}</Text>
          <Text style={styles.questions}>Already have an account?</Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#00A850'}]}
            onPress={() => navigation.navigate(Login)}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Copyright © 2023 Xplore LB</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  innerView: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Serif',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 55,
    marginBottom: 20,
  },
  line: {
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    width: '75%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#EE161F',
    width: '30%',
    height: '6%',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  questions: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
    textDecorationColor: '#FFFFFF',
    fontSize: 18,
  },
  footer: {
    fontSize: 12.5,
    fontStyle: 'italic',
    color: '#FFF',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 15,
  },
});

export default Home;
