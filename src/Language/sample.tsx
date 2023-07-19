import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

const YourComponent = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Text>{t('greeting', { name: 'John' })}</Text>
    </View>
  );
};

export default YourComponent;
