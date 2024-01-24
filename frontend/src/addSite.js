import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';

function AddSite(navigation) {
  const [siteName, setSiteName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const defaultImage = require('../assets/images/default.png');
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleSubmit = () => {
    console.log({
      siteName,
      location,
      type,
      description,
      imageUri: selectedImageUri || defaultImage,
    });
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImageUri(response.uri);
      }
    });
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={selectedImageUri ? {uri: selectedImageUri} : defaultImage}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.innerView}>
        <Text style={styles.header}>Site Name:</Text>
        <TextInput
          style={styles.name}
          onChangeText={setSiteName}
          value={siteName}
          placeholder="Site Name"
        />
        <Text>{'\n'}</Text>
        <Text style={styles.header}>Location:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={location}
            onValueChange={itemValue => setLocation(itemValue)}>
            <Picker.Item
              label="Select Location"
              value=""
              color="grey"
              enabled={false}
            />
            <Picker.Item label="Beirut" value="Beirut" />
            <Picker.Item label="Akkar" value="Akkar" />
            <Picker.Item label="North" value="North" />
            <Picker.Item label="Mt. Lebanon" value="Mt. Lebanon" />
            <Picker.Item label="South" value="South" />
            <Picker.Item label="Baalbek-Hermel" value="Baalbek-Hermel" />
            <Picker.Item label="Beqaa" value="Beqaa" />
            <Picker.Item label="Nabatieh" value="Nabatieh" />
          </Picker>
        </View>
        <Text>{'\n'}</Text>
        <Text style={styles.header}>Type:</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={type}
            onValueChange={itemValue => setType(itemValue)}>
            <Picker.Item
              label="Select Type"
              value=""
              color="grey"
              enabled={false}
            />
            <Picker.Item label="Historical" value="Historical" />
            <Picker.Item label="Natural" value="Natural" />
            <Picker.Item label="Retail" value="Retail" />
            <Picker.Item label="Industrial" value="Industrial" />
            <Picker.Item label="Academic" value="Academic" />
            <Picker.Item label="Residential" value="Residential" />
            <Picker.Item label="Athletics" value="Athletics" />
            <Picker.Item label="Entertainment" value="Enterntainment" />
            <Picker.Item label="Religious" value="Religious" />
            <Picker.Item label="Medical" value="Medical" />
            <Picker.Item label="Government" value="Government" />
            <Picker.Item label="Artistic" value="Artisitc" />
            <Picker.Item label="Culinary" value="Culinary" />
            <Picker.Item label="Transportation" value="Transportation" />
            <Picker.Item label="Cultural" value="Cultural" />
          </Picker>
        </View>
        <Text>{'\n'}</Text>
        <Text style={styles.header}>Description:</Text>
        <TextInput
          style={styles.description}
          onChangeText={setDescription}
          value={description}
          placeholder="Describe your site..."
          multiline
        />
        <Text>{'\n'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit();
          }}>
          <Text style={styles.buttonText}>ADD SITE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  innerView: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  header: {
    color: '#000000',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  picker: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  name: {
    padding: 10,
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 15,
  },
  description: {
    padding: 10,
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#00A850',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AddSite;
