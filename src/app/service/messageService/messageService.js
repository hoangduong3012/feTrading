import FuseUtils from '@fuse/utils/FuseUtils';
/* eslint-disable camelcase */

class MessageService extends FuseUtils.EventEmitter {}

const instance = new MessageService();

export default instance;
