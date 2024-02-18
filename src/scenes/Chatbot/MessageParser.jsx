import React from 'react';

// const MessageParser = ({ children, actions }) => {
//   const parse = (message) => {
//     // Check if the message contains text
//     if (message && message.text) {
//       if (message.includes('hello')) {
//         console.log('hi');
//       // } else if (message.includes('crop management')) {
//       //   actions.showCropManagementTips(); // Example: Trigger the 'showCropManagementTips' action
//       // } else {
//       //   actions.defaultResponse(); // Example: Trigger a default response action
//       // }
//     }
//   };

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }

    if (message.includes('dog')) {
      actions.handleDog();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
