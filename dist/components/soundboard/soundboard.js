(function () {
    'use strict';

    var app = angular.module('soundboard', []);
    angular.module('soundboard').controller('SoundboardController', SoundboardController);

	var player;

	var config = {};
	config.buttons = {
		rows: [
			{'header':"Conversation Starters",'buttons':[{'name':"Hello",'startTime':130.7,'endTime':132.5},{'name':"Animated Dreams", 'startTime':78.5, 'endTime':82},{'name':"Stupid Fantasy Team!", 'startTime':82.7, 'endTime':85},{'name':"Pineapple Musings", 'startTime':113.5, 'endTime':116}]},
			{'header':"Basic Responses",'buttons':[{'name':"No!",'startTime':76.3,'endTime':78.3},{'name':"Yes!",'startTime':88.3,'endTime':90},{'name':"Maybe?",'startTime':100.3,'endTime':102.3},
			{'name':"No Response",'startTime':104.7,'endTime':107.2 }]},
			{'header':"Requests",'buttons':[{'name':"I'm Itchy", 'startTime':92.5, 'endTime':94.8},{'name':"Need Water",'startTime':95,'endTime':97.3},{'name':"Need Tissues",'startTime':109.3,'endTime':111},
			{'name':"Need Blanket",'startTime':116.7,'endTime':120.8}]},
			{'header':"Requests",'buttons':[{'name':"I'm Itchy and Scottish",'startTime':137.5,'endTime':140},{'name':"Need Remote control",'startTime':147,'endTime':149.7},{'name':"Sit down...",'startTime':102.5,'endTime':104.1},{'name':"Need Hug",'startTime':133,'endTime':136}]},
			{'header':"Acknowledgements",'buttons':[{'name':"So much better", 'startTime':86, 'endTime':87.9},{'name':"You're the best!",'startTime':98,'endTime':100},{'name':"I love you",'startTime':90.5,'endTime':91.8},{'name':"Bless You",'startTime':136,'endTime':137}]}
		]
	};

	var clipQueue = [];
	var dummyQueue = [{'name':"Tst Clip",'startTime':1,'endTime':3}];
	var isPlaying = false;

	function SoundboardController( $scope, $timeout ) {
		$scope.config = config;
		$scope.clipQueue = clipQueue;

		$scope.queueClip = function( name, startTime, endTime ) {
			clipQueue.push( { "name":name, "startTime":startTime, "endTime":endTime} );
			if ( ( clipQueue.length === 1 ) && ( ! isPlaying ) ) {
				// make sure the queue is processing
				playNext();
			}
		};

		var playNext = function () {
			if ( $scope.clipQueue.length === 0 ) {
				player.pauseVideo();
				isPlaying = false;
				return;
			};
			isPlaying = true;
			var nextClip = $scope.clipQueue[0];
			$scope.clipQueue.splice(0,1);
			player.seekTo( nextClip["startTime"]);
			player.playVideo();
			var clipDuration = nextClip["endTime"] - nextClip["startTime"];
			$timeout(playNext, clipDuration * 1000);
		}

	}

    app.directive('soundboard', function($window) {
    	return {
    		restrict: "E",
		    scope: {
		      height:   "@",
		      width:    "@",
		      videoid:  "@"  
		    },
			templateUrl: "components/soundboard/soundboard.html",
    		link: function(scope, element, attrs) {
				// 2. This code loads the IFrame Player API code asynchronously.
				var tag = document.createElement('script');
				tag.src = "https://www.youtube.com/iframe_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

				// 3. This function creates an <iframe> (and YouTube player)
				//    after the API code downloads.
				window.onYouTubeIframeAPIReady = function() {
					player = new YT.Player('player', {
			          height: scope.height,
			          width: scope.width,
			          videoId: scope.videoid,
//					  events: {
//					    'onReady': onPlayerReady,
//					    'onStateChange': onPlayerStateChange
//					  }
					});
				};
    		},
    	}
    });

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		//event.target.playVideo();
	}

	// 5. The API calls this function when the player's state changes.
	//    The function indicates that when playing a video (state=1),
	//    the player should play for six seconds and then stop.
	var done = false;
	function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.PLAYING && !done) {
		  setTimeout(stopVideo, 6000);
		  done = true;
		}
	}
	function stopVideo() {
		player.stopVideo();
	}
})();