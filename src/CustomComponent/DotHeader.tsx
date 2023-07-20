import React from 'react';
import { Appbar, Menu } from 'react-native-paper';

const DotHeader = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Appbar.Action icon="dots-vertical" onPress={openMenu} />
      ),
    });
  }, [navigation]);

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={{ x: 0, y: 0 }}>
      <Menu.Item onPress={() => {}} title="Item 1" />
      <Menu.Item onPress={() => {}} title="Item 2" />
      <Menu.Item onPress={() => {}} title="Item 3" />
    </Menu>
  );
};

export default DotHeader;