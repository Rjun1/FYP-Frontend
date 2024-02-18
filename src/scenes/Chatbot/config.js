import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import CropManagementWidget from './CropManagementWidget';
import DogPicture from './DogPicture';

const botName = 'SmartFarmer';

const config = {
  botName: botName,
  lang: 'no',
  initialMessages: [
    createChatBotMessage(
      `Hi, I'm ${botName}. I'm here to help you with crop management tips.`
    ),
    createChatBotMessage(
      "Please select the name of the crop you'd like management tips for.",
      {
        withAvatar: true,
        delay: 500,
        widget: 'cropManagement',
      }
    ),
  ],
  // state: {
  //   gist: '',
  //   infoBox: '',
  // },
  widgets: [
    {
      widgetName: 'cropManagement',
      widgetFunc: (props) => <CropManagementWidget {...props} />,
    },
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
};

export default config;
