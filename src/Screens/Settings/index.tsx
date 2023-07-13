import React from 'react';
import {
  View,
  SectionList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../Helper/Colors';

const SettingScreen = ({navigation}: any) => {
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
        {
          title: 'Expenses Beta',
          description: 'Scan and organize receipts',
          onPress: () => navigation.navigate('ManualExpense'),
        },
        {
          title: 'Business Details',
          description: 'Logo, Name and Contact Information',
          onPress: () => navigation.navigate('BusinessDetails'),
        },
        {
          title: 'Template',
          description: 'Select your invoice design and color',
        },
        {
          title: 'Payment Info',
          description: 'Do not enter sensitive information',
          onPress: () => navigation.navigate('PaymentInfo'),
        },
        {
          title: 'Tax',
          description: '',
          onPress: () => navigation.navigate('TaxScreen'),
        },
        {
          title: 'Default Notes',
          description: '',
          onPress: () => navigation.navigate('DefaultNotes'),
        },
        {
          title: 'Invoice Number',
          description: '',
          onPress: () => navigation.navigate('InvoiceNumber'),
        },
        {title: 'Export Expense Summary', description: ''},
        {title: 'Export as Spreadsheet', description: ''},
        {title: 'Customize', description: ''},
        {
          title: 'Default Email Message',
          description: '',
          onPress: () => navigation.navigate('DefaultEmailMessage'),
        },
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
          onPress: () => navigation.navigate('DefaultEmailMessage'),
        },
        {title: 'Upgrade', description: ''},
        {title: 'Backup', description: ''},
        {title: 'Restore Purchases', description: ''},
        {title: 'Check Subscriptions', description: ''},
        {title: 'Switch Account', description: ''},
        {
          title: 'Sign Up',
          description: '',
          onPress: () => navigation.navigate('SignIn'),
        },
        {title: 'Delete Account', description: ''},
        {
          title: 'Logout',
          description: '',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{name: 'LandingPage'}],
            }),
        },
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

  const renderSectionHeader = ({section}: any) => (
    <View style={styles.headerView}>
      <Text style={{fontSize: 18, color: '#fff', fontWeight: '500'}}>
        {section.sectionName}
      </Text>
      <Text style={{fontSize: 16, color: '#fff', fontWeight: '500'}}>
        {section.sectionType}
      </Text>
    </View>
  );

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      onPress={item.onPress}
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
        <Text style={styles.titleTxt}>{item.title}</Text>
        {item.description === '' ? null : (
          <Text style={styles.descriptionTxt}>{item.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.mainContainer}>
      <SectionList
        sections={data}
        keyExtractor={(item: any, index: any) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{paddingBottom:40}}
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
    backgroundColor: Colors.commonBg,
  },
  itemView: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 0.1,
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
    backgroundColor: Colors.landingColor,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  titleTxt: {fontSize: 16, fontWeight: '500', color: '#36454F'},
  descriptionTxt: {fontSize: 14, fontWeight: '400', color: '#A9A9A9'},
});

export default SettingScreen;
