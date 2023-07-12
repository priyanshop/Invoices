import { Colors } from "./Colors";

// Define the common styles for the actions
export const actionStyle = {
    backgroundColor: '#fff',
    borderRadius: 50,
    color: '#000',
    labelTextColor: '#000',
    containerStyle: {
      backgroundColor: '#fff',
      borderRadius: 5,
    },
  };
  
  // Define the fabStyle outside the component
 export const fabStyle = {
    backgroundColor: Colors.appColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  };
  