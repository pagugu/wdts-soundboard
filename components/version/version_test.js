'use strict';

describe('SoundboardApp.version module', function() {
  beforeEach(module('SoundboardApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
