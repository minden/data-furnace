import { Meteor } from 'meteor/meteor';

const subscribeAndWait = (subscriptionNames, callback) => {
  const subscriptions = [];
  subscriptionNames.forEach((subscriptionName) => {
    subscriptions.push(Meteor.subscribe(subscriptionName));
  });

  let allDone = false;
  const interval = setInterval(() => {
    subscriptions.forEach((subscription) => {
      if (subscription.ready()) {
        allDone = true;
      } else {
        allDone = false;
      }
    });

    if (allDone) {
      clearInterval(interval);
      callback();
    }
  });
};

export default subscribeAndWait;
