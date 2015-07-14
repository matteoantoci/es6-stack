import EventEmitter from 'eventemitter3';

export default new EventEmitter({wildcard: true, maxlisteners: 20});
