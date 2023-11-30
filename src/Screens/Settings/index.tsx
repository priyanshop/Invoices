import React, {useState} from 'react';
import {
  View,
  SectionList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Switch} from 'react-native-paper';
import {Colors} from '../../Helper/Colors';
import {
  changeSendToEmail,
  removeUserData,
} from '../../redux/reducers/user/UserReducer';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {useTranslation} from 'react-i18next';
import ToastService from '../../Helper/ToastService';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import XLSX from 'xlsx';
import {Dialog} from 'react-native-elements';

const SettingScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.user);
  const {t, i18n} = useTranslation();
  const [visible2, setVisible2] = useState(false);
  const toggleDialog2 = () => {
    setVisible2(!visible2);
  };
  const apiCall = async () => {
    try {
      if (selector.token !== 'Guest') {
        const data = await FetchAPI('delete', endpoint.deleteUser, null, {
          Authorization: 'Bearer ' + selector.token,
        });
        if (data.status === 'success') {
          dispatch(removeUserData());
          navigation.reset({
            index: 0,
            routes: [{name: 'LandingPage'}],
          });
          ToastService.showToast('Account Deleted Successfully');
        }
      } else {
        dispatch(removeUserData());
        navigation.reset({
          index: 0,
          routes: [{name: 'LandingPage'}],
        });
        ToastService.showToast('Account Deleted Successfully');
      }
    } catch (error) {}
  };

  const accountAction = (screen: any) => {
    dispatch(removeUserData());
    navigation.reset({
      index: 0,
      routes: [{name: screen}],
    });
    ToastService.showToast('Logout Successfully');
  };

  const data = [
    {
      sectionName: 'Support',
      sectionName2: t('Settings.Support'),
      sectionType: '',
      data: [
        {
          title: 'Contact us',
          titleTxt: t('Settings.ContactUs'),
          description: '',
          onPress: () => navigation.navigate('ContactUs'),
        },
      ],
    },
    {
      sectionName: 'Invoice',
      sectionName2: t('Settings.Invoice'),
      sectionType: '',
      data: [
        {
          title: 'Expenses Beta',
          titleTxt: t('Settings.ExpensesBeta'),
          description: 'Scan and organize receipts',
          descriptionTxt: t('Settings.ScanReceipts'),
          onPress: () => navigation.navigate('ManualExpense'),
        },
        {
          title: 'Business Details',
          titleTxt: t('Settings.BusinessDetails'),
          description: 'Logo, Name and Contact Information',
          descriptionTxt: t('Settings.LogoInformation'),
          onPress: () => navigation.navigate('BusinessDetails'),
        },
        {
          title: 'Template',
          titleTxt: t('Settings.Template'),
          description: 'Select your invoice design and color',
          descriptionTxt: t('Settings.SelectColor'),
          onPress: () => navigation.navigate('Template'),
        },
        {
          title: 'Payment Info',
          titleTxt: t('Settings.PaymentInfo'),
          description: 'Do not enter sensitive information',
          descriptionTxt: t('Settings.SensitiveInformation'),
          onPress: () => navigation.navigate('PaymentInfo'),
        },
        // {
        //   title: 'Tax',
        //   description: '',
        //   onPress: () => navigation.navigate('TaxScreen'),
        // },
        {
          title: 'Default Notes',
          titleTxt: t('Settings.DefaultNotes'),
          description: '',
          onPress: () => navigation.navigate('DefaultNotes'),
        },
        {
          title: 'Invoice Number',
          titleTxt: t('Settings.InvoiceNumber'),
          description: '',
          onPress: () => navigation.navigate('GlobalInvoiceNumber'),
        },
        {
          title: 'Export Expense Summary',
          titleTxt: t('Settings.ExportExpenseSummary'),
          description: '',
        },
        {
          title: 'Export as Spreadsheet',
          titleTxt: t('Settings.ExportAsSpreadsheet'),
          description: '',
          onPress: () => handleDownloadAndShare(),
        },
        {
          title: 'Customize',
          titleTxt: t('Settings.Customize'),
          description: '',
          onPress: () => navigation.navigate('Customize'),
        },
        {
          title: 'Default Email Message',
          titleTxt: t('Settings.DefaultEmailMessage'),
          description: '',
          onPress: () => navigation.navigate('DefaultEmailMessage'),
        },
        {
          title: 'Send me a copy of emails',
          titleTxt: t('Settings.SendCopyEmail'),
          description: '',
        },
      ],
    },
    {
      sectionName: 'Account',
      sectionName2: t('Settings.Account'),
      sectionType: 'Guest',
      data: [
        {
          title: 'Sync',
          titleTxt: t('Settings.Sync'),
          descriptionTxt: 'last synced 0 seconds ago',
          description: 'last synced 0 seconds ago',
        },
        {
          title: 'Region',
          titleTxt: t('Settings.Region'),
          description: 'Language, Currency, Tax year and Date Format',
          descriptionTxt: t('Settings.Language'),
          onPress: () => navigation.navigate('RegionScreen'),
        },
        {
          title: 'Upgrade',
          titleTxt: t('Settings.Upgrade'),
          description: '',
        },
        {
          title: 'Backup',
          titleTxt: t('Settings.Backup'),
          description: '',
        },
        {
          title: 'Restore Purchases',
          titleTxt: t('Settings.RestorePurchases'),
          description: '',
        },
        {
          title: 'Subscribe',
          titleTxt: t('Subscribe'),
          description: '',
          onPress: () => navigation.navigate('Subscribe'),
        },
        {
          title: 'Check Subscriptions',
          titleTxt: t('Settings.CheckSubscriptions'),
          description: '',
        },
        {
          title: 'Switch Account',
          titleTxt: t('Settings.SwitchAccount'),
          description: '',
          onPress: () => accountAction('LandingPage'),
        },
        {
          title: 'Sign Up',
          titleTxt: t('Settings.SignUp'),
          description: '',
          onPress: () => navigation.navigate('SignUpOriginal'),
        },
        {
          title: 'Delete Account',
          titleTxt: t('Settings.DeleteAccount'),
          description: '',
          onPress: () => {
            // apiCall();
            toggleDialog2();
          },
        },
        {
          title: 'Logout',
          titleTxt: t('Settings.Logout'),
          description: '',
          onPress: () => accountAction('LandingPage'),
        },
      ],
    },
    {
      sectionName: 'Information',
      sectionName2: t('Settings.Information'),
      sectionType: '',
      data: [
        {
          title: 'About',
          titleTxt: t('Settings.About'),
          description: 'v3.4.47',
          descriptionTxt: 'v3.4.47',
        },
        {
          title: 'Terms of Use',
          titleTxt: t('Settings.TermsUse'),
          description: '',
        },
        {
          title: 'Privacy Policy',
          titleTxt: t('Settings.PrivacyPolicy'),
          description: '',
        },
      ],
    },
  ];

  const handleDownloadAndShare = async () => {
    try {
      const response = await FetchAPI('get', endpoint.exportSpreadSheet, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      const data = response.data;
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'DataSheet');
      const excelFilePath = `${RNFS.DocumentDirectoryPath}/data.xlsx`;
      RNFS.writeFile(
        excelFilePath,
        XLSX.write(wb, {bookType: 'xlsx', type: 'base64'}),
        'base64',
      ).then(() => {
        Share.open({
          url: `file://${excelFilePath}`,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          title: 'Share Excel File',
        });
      });
    } catch (error) {
      console.error('Error downloading and sharing Excel file', error);
    }
  };

  const renderSectionHeader = ({section}: any) => (
    <View style={styles.headerView}>
      <Text style={{fontSize: 18, color: '#fff', fontWeight: '500'}}>
        {section.sectionName}
      </Text>
      <Text style={{fontSize: 16, color: '#fff', fontWeight: '500'}}>
        {section.sectionName === 'Account' && selector.token
          ? selector.userData.email
          : section.sectionType}
      </Text>
    </View>
  );

  const renderItem = ({item, index}: any) =>
    item.title === 'Sign Up' && selector.token !== 'Guest' ? null : (
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
        <View
          style={
            item.title === 'Send me a copy of emails' ? styles.switchView : null
          }>
          <Text style={styles.titleTxt}>{item.titleTxt}</Text>
          {item.description === '' ? null : (
            <Text style={styles.descriptionTxt}>{item.descriptionTxt}</Text>
          )}
          {'Send me a copy of emails' === item.title && (
            <Switch
              value={selector.sendToEmail}
              color={Colors.landingColor}
              onValueChange={(value: any) => {
                dispatch(changeSendToEmail(value));
              }}
            />
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
        contentContainerStyle={{paddingBottom: 40}}
      />
      <Dialog isVisible={visible2} onBackdropPress={toggleDialog2}>
        {/* <Dialog.Title title=""/> */}
        <Text>{t('confirmDeleteAccount')}</Text>
        <Dialog.Actions>
          <Dialog.Button
            title={t('sureButton')}
            onPress={() => {
              apiCall();
              toggleDialog2();
            }}
          />
          <Dialog.Button
            title={t('cancelButton')}
            onPress={() => toggleDialog2()}
          />
        </Dialog.Actions>
      </Dialog>
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
  switchView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
});

export default SettingScreen;
