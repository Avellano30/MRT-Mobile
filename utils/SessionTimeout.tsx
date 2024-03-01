import React, { useEffect } from 'react';
import { InteractionManager, Alert } from 'react-native';

const SESSION_TIMEOUT = 60000; // 1 minute in milliseconds

const SessionTimeout: React.FC = () => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        // Perform logout or other actions here
        Alert.alert('Session Expired', 'Your session has expired due to inactivity.');
      }, SESSION_TIMEOUT);
    };

    const handleUserActivity = () => {
      resetTimeout();
    };

    resetTimeout();

    const interactionSubscription = InteractionManager.runAfterInteractions(() => {
      InteractionManager.setDeadline(SESSION_TIMEOUT);
      InteractionManager.setDeadline(0); // Reset the deadline
    });

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      // Listen to user activity events here
      // For example, you can use AppState to check for app state changes
      // and reset the timeout accordingly
    });

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      interactionSubscription.cancel();

      activityEvents.forEach(event => {
        // Remove event listeners
      });
    };
  }, []);

  return null;
};

export default SessionTimeout;
