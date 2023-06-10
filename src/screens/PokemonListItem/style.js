import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundImg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    padding: 10,
    backgroundColor: '#000',
    width: '45%',
    height: 200,
    borderRadius: 7,
    margin: 10,
  },
  pokemonName: {
    color: 'white',
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
