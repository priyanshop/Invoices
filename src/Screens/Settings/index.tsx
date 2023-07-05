import React from 'react';
import {View, SectionList, Text, StyleSheet} from 'react-native';
const data = [
  {
    sectionName: 'Support',
    sectionType: '',
    data: [{title: 'Contact us', description: ''}],
  },
  {
    sectionName: 'Invoice',
    sectionType: '',
    data: [
      {title: 'Expenses Beta', description: 'Scan and organize receipts'},
      {
        title: 'Business Details',
        description: 'Logo, Name and Contact Information',
      },
      {title: 'Template', description: 'Select your invoice design and color'},
      {
        title: 'Payment Info',
        description: 'Do not enter sensitive information',
      },
      {title: 'Tax', description: ''},
      {title: 'Default Notes', description: ''},
      {title: 'Invoice Number', description: ''},
      {title: 'Export Expense Summary', description: ''},
      {title: 'Export as Spreadsheet', description: ''},
      {title: 'Customise', description: ''},
      {title: 'Default Email Message', description: ''},
      {title: 'Send me a copy of emails', description: ''},
    ],
  },
  {
    sectionName: 'Account',
    sectionType: 'Guest',
    data: [
      {title: 'Sync', description: 'last synced 0 seconds ago'},
      {
        title: 'Region',
        description: 'Language, Currency, Tax year and Date Format',
      },
      {title: 'Upgrade', description: ''},
      {title: 'Backup', description: ''},
      {title: 'Restore Purchases', description: ''},
      {title: 'Check Subscriptions', description: ''},
      {title: 'Switch Account', description: ''},
      {title: 'Sign Up', description: ''},
      {title: 'Delete Account', description: ''},
      {title: 'Logout', description: ''},
    ],
  },
  {
    sectionName: 'Information',
    sectionType: '',
    data: [
      {title: 'About', description: 'v3.4.47'},
      {title: 'Terms of Use', description: ''},
      {title: 'Privacy Policy', description: ''},
    ],
  },
];
const SettingScreen = () => {
  const renderSectionHeader = ({section}) => (
    <View style={styles.headerView}>
      <Text style={{fontSize: 18, color: '#fff', fontWeight: '500'}}>
        {section.sectionName}
      </Text>
      <Text style={{fontSize: 16, color: '#fff', fontWeight: '500'}}>
        {section.sectionType}
      </Text>
    </View>
  );

  const renderItem = ({item, index}) => (
    <View
      style={[
        styles.itemView,
        item.title === 'Contact us' ||
        item.title === 'Send me a copy of emails' ||
        item.title === 'Logout' ||
        item.title === 'Privacy Policy'
          ? styles.itemBorder
          : null,
      ]}>
      <View>
        <Text style={{fontSize: 16, fontWeight: '500'}}>{item.title}</Text>
        {item.description === '' ? null : (
          <Text style={{fontSize: 14}}>{item.description}</Text>
        )}
      </View>
    </View>
  );
  return (
    <View style={styles.mainContainer}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#d4d4d4',
  },
  itemView: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 0.3,
    alignItems: 'center',
  },
  itemBorder: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 0,
  },
  headerView: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});

export default SettingScreen;
