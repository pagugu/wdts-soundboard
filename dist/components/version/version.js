'use strict';

angular.module('SoundboardApp.version', [
  'SoundboardApp.version.interpolate-filter',
  'SoundboardApp.version.version-directive'
])

.value('version', '0.1');
