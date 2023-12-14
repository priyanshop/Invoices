//@ts-nocheck
import Share from 'react-native-share';
import qs from 'qs';
import { Linking } from 'react-native';
import SendSMS from 'react-native-sms';


export async function sendEmailCall(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });
    console.log("query",query);

    if (query.length) {
        url += `?${query}`;
    }
    console.log("query2",url);

    // check if we can use this link
    // const canOpen = await Linking.canOpenURL(url);
    // console.log("query",canOpen);

    // if (!canOpen) {
    //     throw new Error('Provided URL can not be handled');
    // }
console.log("url",url);

    return Linking.openURL(url);
}

export const sendSMSWithoutNumber = (message:any) => {
  // You would typically get the number from user input or another source
  const recipientNumber = ''; // Provide a valid recipient number here

  const messageBody = message;
console.log("KKKK");

  SendSMS.send({
    body: messageBody,
    successTypes: ['sent', 'queued'],
    allowAndroidSendWithoutReadPermission: true,
  }, (completed, cancelled, error) => {
    console.log('SMS Callback: completed: ', completed);
    console.log('SMS Callback: cancelled: ', cancelled);
    console.log('SMS Callback: error: ', error);
  });
};


export const handleShareMessage = (selectedText:string) => {
   

    Share.open({
      title: 'Share via',
      message: selectedText,
      social: Share.Social.SMS,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  export const handleShareEmail = (selectedText:string) => {
   
    Share.open({
      title: 'Share via',
      message: selectedText,
      social: Share.Social.EMAIL,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };