import {useState, React} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Signup from './signup';
import Login from './login';
import Bookmarks from './bookmarks';

function TouristMain({navigation}) {
  const categoryData = [
    {
      id: 1,
      name: 'Beirut',
    },
    {
      id: 2,
      name: 'Akkar',
    },
    {
      id: 3,
      name: 'North',
    },
    {
      id: 4,
      name: 'Mt. Lebanon',
    },
    {
      id: 5,
      name: 'South',
    },
    {
      id: 6,
      name: 'Baalbek-Hermel',
    },
    {
      id: 7,
      name: 'Beqaa',
    },
    {
      id: 8,
      name: 'Nabatieh',
    },
  ];

  const siteData = [
    {
      id: 1,
      name: 'Beirut Souks',
      rating: 3.7,
      categories: [1],
      photo: require('../assets/images/Beirut-Souks.jpg'),
    },
    {
      id: 2,
      name: 'The National Museum of Beirut',
      rating: 3.9,
      categories: [1],
      photo: require('../assets/images/Museum.jpg'),
    },
    {
      id: 3,
      name: 'Qammouaa Nature Reserve',
      rating: 4.1,
      categories: [2],
      photo: require('../assets/images/Nature.jpg'),
    },
    {
      id: 4,
      name: 'Halba Citadel',
      rating: 4.0,
      categories: [2],
      photo: require('../assets/images/Halba.jpg'),
    },
    {
      id: 5,
      name: 'Byblos',
      rating: 4.6,
      categories: [3],
      photo: require('../assets/images/Byblos.jpg'),
    },
    {
      id: 6,
      name: 'The Cedars of God',
      rating: 4.4,
      categories: [3],
      photo: require('../assets/images/Cedars.jpg'),
    },
    {
      id: 7,
      name: 'Jeita Grotto',
      rating: 4.8,
      categories: [4],
      photo: require('../assets/images/Jeita.jpg'),
    },
    {
      id: 8,
      name: 'Beit ed-Dine Palace',
      rating: 4.4,
      categories: [4],
      photo: require('../assets/images/Beit.jpg'),
    },
    {
      id: 9,
      name: 'Tyre',
      rating: 3.9,
      categories: [5],
      photo: require('../assets/images/Tyre.jpg'),
    },
    {
      id: 10,
      name: 'Al-Bass Archaeological Site',
      rating: 4.1,
      categories: [5],
      photo: require('../assets/images/Al-Bass.jpg'),
    },
    {
      id: 11,
      name: 'Baalbek',
      rating: 4.5,
      categories: [6],
      photo: require('../assets/images/Baalbek.jpg'),
    },
    {
      id: 12,
      name: 'Qadisha Valley',
      rating: 4.6,
      categories: [6],
      photo: require('../assets/images/Qadisha.jpg'),
    },
    {
      id: 13,
      name: 'Qaraoun Lake',
      rating: 4.7,
      categories: [7],
      photo: require('../assets/images/Lake.jpg'),
    },
    {
      id: 14,
      name: 'Ksara Winery',
      rating: 4.2,
      categories: [7],
      photo: require('../assets/images/Winery.jpg'),
    },
    {
      id: 15,
      name: 'Beaufort Castle',
      rating: 4.6,
      categories: [8],
      photo: require('../assets/images/Castle.jpg'),
    },
    {
      id: 16,
      name: 'Deir Al Zahrani',
      rating: 4.2,
      categories: [8],
      photo: require('../assets/images/Deir.jpg'),
    },
  ];

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sites, setSites] = useState(siteData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [isUserModalVisible, setUserModalVisible] = useState(false);

  function onSelectCategory(category) {
    let siteList = siteData.filter(a => a.categories.includes(category.id));
    setSites(siteList);
    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter(a => a.id == id);
    if (category.length > 0) return category[0].name;
    return '';
  }

  const toggleUserModal = () => setUserModalVisible(!isUserModalVisible);
  const navigateToLogin = () => {
    toggleUserModal();
    navigation.navigate(Login);
  };
  const navigateToSignup = () => {
    toggleUserModal();
    navigation.navigate(Signup);
  };

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  function sortSites(option) {
    let sortedSites = [...sites];
    if (option === 'highestToLowest') {
      sortedSites.sort((a, b) => b.rating - a.rating);
    } else if (option === 'lowestToHighest') {
      sortedSites.sort((a, b) => a.rating - b.rating);
    }
    setSites(sortedSites);
    setSortOption(option);
    setModalVisible(false);
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.filters}
        onPress={() => onSelectCategory(item)}>
        <Text style={styles.filtersText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem1 = ({item}) => {
    const handlePress = () => {
      if (item.name === 'Jeita Grotto') {
        navigation.navigate('Jeita');
      }
    };
    return (
      <TouchableOpacity style={styles.sites} onPress={handlePress}>
        <View>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={styles.siteImages}
          />
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.desc}>
          <Image
            source={require('../assets/images/star.png')}
            style={styles.star}
          />
          <Text style={styles.rate}>{item.rating}</Text>
          <Icon
            name="map-marker"
            size={25}
            color="red"
            style={{paddingLeft: 20}}
          />
          <Text>
            {item.categories.map(categoryId => {
              return (
                <View key={categoryId}>
                  <Text style={styles.cat}>
                    {getCategoryNameById(categoryId)}
                  </Text>
                </View>
              );
            })}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={toggleUserModal}>
          <Image
            source={require('../assets/images/user.png')}
            style={styles.user}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(Bookmarks)}>
          <Icon
            name="bookmark"
            size={30}
            color="#FFF"
            style={styles.bookmark}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require('../assets/images/filter.png')}
            style={styles.filter}
          />
        </TouchableOpacity>
        <FlatList
          data={categories}
          horizontal
          showHorizontalScrollIndicator={true}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>
      <View style={styles.container3}>
        <FlatList
          data={sites}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem1}
        />
      </View>
      <Modal isVisible={isUserModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.modalText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={styles.modalText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleUserModal}>
            <Text style={styles.modalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => sortSites('highestToLowest')}>
            <Text style={styles.modalText}>Sort by Highest Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sortSites('lowestToHighest')}>
            <Text style={styles.modalText}>Sort by Lowest Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.modalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container1: {
    backgroundColor: '#EE161F',
    flexDirection: 'row',
    height: 50,
  },
  container2: {
    backgroundColor: '#00A850',
    flexDirection: 'row',
    height: 50,
    marginBottom: 30,
  },
  container3: {
    marginBottom: 100,
  },
  user: {
    width: 55,
    height: 50,
  },
  filter: {
    marginLeft: 15,
    width: 30,
    height: 30,
    marginTop: 10,
    marginRight: 10,
  },
  filters: {
    padding: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFF',
    borderWidth: 1,
    marginLeft: 7.5,
    marginRight: 7.5,
    height: 35,
    marginTop: 6,
    width: 120,
  },
  filtersText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  sites: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 55,
  },
  siteImages: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    paddingTop: 7.5,
    fontWeight: 'bold',
    color: '#000',
  },
  desc: {
    paddingTop: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  rate: {
    marginRight: 10,
    color: '#000',
  },
  cat: {
    fontSize: 15,
    color: '#000',
    marginLeft: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    color: '#000',
  },
  bookmark: {
    paddingTop: 10,
    paddingLeft: 320,
  },
});

export default TouristMain;
