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
import Icon from 'react-native-vector-icons/FontAwesome';

function Jeita(navigation) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSubmit = () => {
    console.log({
      comment,
    });
  };

  const handleStarPress = newRating => {
    setRating(rating === newRating ? 0 : newRating);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Icon
            name={i <= rating ? 'star' : 'star-o'}
            size={25}
            color="yellow"
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/Jeita.jpg')}
          style={styles.image}
        />
        <TouchableOpacity style={styles.bookmarkIcon} onPress={toggleBookmark}>
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-o'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerView}>
        <Text style={styles.title}>Jeita Grotto</Text>
        <Text>{'\n'}</Text>
        <View style={styles.desc}>
          <Image
            source={require('../assets/images/star.png')}
            style={styles.star}
          />
          <Text style={styles.rate}>4.8</Text>
          <Icon
            name="map-marker"
            size={25}
            color="red"
            style={{paddingLeft: 45}}
          />
          <Text style={styles.location}>Mt. Lebanon</Text>
          <Text style={styles.type}>Natural</Text>
        </View>
        <Text>{'\n'}</Text>
        <Text style={styles.description}>
          The Jeita Grotto (Arabic: مغارة جعيتا) is a system of two separate,
          but interconnected, karstic limestone caves spanning an overall length
          of nearly 9 kilometres (5.6 mi). The caves are situated in the Nahr
          al-Kalb valley within the locality of Jeita, 18 kilometres (11 mi)
          north of the Lebanese capital Beirut. Though inhabited in prehistoric
          times, the lower cave was not rediscovered until 1836 by Reverend
          William Thomson; it can only be visited by boat since it channels an
          underground river that provides fresh drinking water to more than a
          million Lebanese.
        </Text>
        <Text>{'\n'}</Text>
        <View style={styles.line} />
        <Text>{'\n'}</Text>
        <Text style={styles.header}>Rate:</Text>
        <View style={styles.rating}>{renderStars()}</View>
        <Text>{'\n'}</Text>
        <Text style={styles.header}>Comment:</Text>
        <TextInput
          style={styles.comment}
          onChangeText={setComment}
          value={comment}
          placeholder="Write a comment..."
          multiline
        />
        <Text>{'\n'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit();
          }}>
          <Text style={styles.buttonText}>ADD CRITIQUE</Text>
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    marginLeft: 360,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
  },
  header: {
    color: '#000000',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  desc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    marginRight: 10,
    color: '#000',
    fontSize: 20,
  },
  location: {
    fontSize: 20,
    color: '#000',
    marginLeft: 10,
  },
  type: {
    fontSize: 20,
    color: '#000',
    paddingLeft: 50,
  },
  comment: {
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
  star: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  line: {
    borderColor: '#000',
    borderWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
  },
  description: {
    color: 'grey',
    fontSize: 15,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 200,
  },
});

export default Jeita;
