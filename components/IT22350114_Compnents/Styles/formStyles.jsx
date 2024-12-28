import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors'; 

const formStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'medium',
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
    marginLeft: 10,
  },
  separator: {
    height: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
  },
  inputContainer: {
    marginTop: 20,
    gap: 10,
    padding: 20,
    backgroundColor: '#ccccff',
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    backgroundColor: '#fff',
    borderColor: Colors.PRIMARY,
  },
  radioGroup: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap', // Allows items to wrap to the next line if necessary
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonCircle: {
    height: 20,
    width: 20,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
  },
  radioButtonText: {
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 15, // Add margin to create vertical gap between radio buttons

  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5, // Add margin to create vertical gap between radio buttons

  },
  imagePreview: {
    width: 220,
    height: 220,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
  },
  uploadImage: {
    width: 320,
    height: 130,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
  },
  
});

export default formStyles;
