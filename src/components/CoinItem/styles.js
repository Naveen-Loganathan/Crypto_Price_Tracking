import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
      // this will align the image according to the view
      alignSelf: 'center'
    },
    title: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5
    },
    text: {
      color: 'white',
      marginRight: 5
    },
    coinContainer: {
      flexDirection: 'row',
      // this is allow the minimum width ie 0.3
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#282828',
      padding: 15,
      // justifyContent: 'space-between'
    },
    rank: {
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#585858'
    },
    rankContainer: {
      backgroundColor: '#585858',
      paddingHorizontal: 5,
      borderRadius: 5,
      marginRight: 5,
    }
  });

  export default styles