import ReactObserver from 'react-event-observer';

const FLASH_MSG_STR = "flashMessage";

class MessageBus {
    static observer = ReactObserver();  // singleton across everything in the app

    flashMessage = (msg) => MessageBus.observer.publish(FLASH_MSG_STR, msg);
    onFlashMessage = (callback) => MessageBus.observer.subscribe(FLASH_MSG_STR, callback);
    stopFlashMessages = (callback) => MessageBus.observer.unsubscribe(FLASH_MSG_STR, callback);
    stopAllFlashMessages = () => MessageBus.observer.unsubscribe(FLASH_MSG_STR);
}

export default MessageBus;
