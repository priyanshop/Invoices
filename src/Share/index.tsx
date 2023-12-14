import {Platform} from 'react-native';
import Share from 'react-native-share';

const url = 'https://awesome.contents.com/';
const title = 'Awesome Contents';
const message = 'Please check this out.';
const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
const options = Platform.select({
  ios: {
    activityItemSources: [
      {
        // For sharing url with custom title.
        placeholderItem: {type: 'url', content: url},
        item: {
          default: {type: 'url', content: url},
        },
        subject: {
          default: title,
        },
        linkMetadata: {originalUrl: url, url, title},
      },
      {
        // For sharing text.
        placeholderItem: {type: 'text', content: message},
        item: {
          default: {type: 'text', content: message},
          message: null, // Specify no text to share via Messages app.
        },
        linkMetadata: {
          // For showing app icon on share preview.
          title: message,
        },
      },
      {
        // For using custom icon instead of default text icon at share preview when sharing with message.
        placeholderItem: {
          type: 'url',
          content: icon,
        },
        item: {
          default: {
            type: 'text',
            content: `${message} ${url}`,
          },
        },
        linkMetadata: {
          title: message,
          icon: icon,
        },
      },
    ],
  },
  default: {
    title,
    subject: title,
    message: `${message} ${url}`,
  },
});

export const sendData = async () => {
  await Share.open(options);
};
