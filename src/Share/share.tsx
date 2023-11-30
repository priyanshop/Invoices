//@ts-nocheck
import Share from 'react-native-share';

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