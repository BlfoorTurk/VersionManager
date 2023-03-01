'use strict';

class VersionManager {
  #release;
  #major;
  #minor;
  #patch;

  constructor(version = '0.0.1') {
    this.changeVersion(version);
  }

  //////////////////////////////////////////////////
  // Methods

  changeVersion(version = '0.0.1') {
    const releaseArr = version.split('.').map(n => +n);
    if (releaseArr.length > 3 || releaseArr.length < 1)
      throw new Error('You passed the version wrongly.');
    this.#release = version;
    this.#major = releaseArr[0];
    this.#minor = releaseArr[1];
    this.#patch = releaseArr[2];
    return this;
  }

  reset() {
    return this.changeVersion('0.0.1');
  }

  addMajor(count = 1) {
    this.#major += count;
    this.#minor = 0;
    this.#patch = 0;
    this._fixRelease();
    return this;
  }

  addMinor(count = 1) {
    if (this.#minor ?? false)
      throw new Error("The system doesn't have minor type.");
    this.#minor += count;
    this.#patch = 0;
    this._fixRelease();
    return this;
  }

  addPatch(count = 1) {
    if (this.#patch ?? false)
      throw new Error("The system doesn't have patch type.");
    this.#patch += count;
    this._fixRelease();
    return this;
  }

  increase(type = 'patch', count = 1) {
    switch (type) {
      case 'major':
      case 'minor':
      case 'patch':
        return this['add' + type.at(0).toUpperCase() + type.slice(1)](count);
      default:
        throw new Error('Wrong release type.');
    }
  }

  //////////////////////////////////////////////////
  // Private methods

  _fixRelease() {
    const get = function (type) {
      const rlType = this[type];
      return `${
        (rlType ?? '') !== '' ? `${type !== 'major' ? '.' : ''}${rlType}` : ''
      }`;
    };
    this.#release = `${get.call(this, 'major')}${get.call(
      this,
      'minor'
    )}${get.call(this, 'patch')}`;
  }

  //////////////////////////////////////////////////
  // Getters

  get release() {
    return this.#release;
  }

  get major() {
    return this.#major;
  }

  get minor() {
    return this.#minor;
  }

  get patch() {
    return this.#patch;
  }
}

/*
Example usages:

const vm = new VersionManager();
console.log(vm);
console.log(vm.release);
console.log(vm.major);
console.log(vm.minor);
console.log(vm.patch);
console.log(
  vm
    .addMajor()
    .addMinor()
    .addPatch()
    .increase('major', 5)
    .increase('minor', 1)
    .increase('patch', 1)
);
console.log(vm.changeVersion('0.0.1').reset());
console.log(vm.patch);
console.log(vm.addMajor(1));
console.log(vm.addMinor());
console.log(vm.addPatch(5));
console.log(vm.major);
console.log(vm.patch);
*/
