(function () {
  'use strict';

  angular.module('BlurAdmin.pages.bad.insert')
      .controller('BadInsertCtrl', BadInsertCtrl);

  /** @ngInject */
  function BadInsertCtrl($scope, $rootScope, $timeout) {
   var vm = this;
    vm.playerinfos = {
      player:"Johanna",
      opponent: "Phillip",
      date: new Date()
    };
    vm.gameinfos = {
      game: [//game
          [//satz
            [ // Round
            ]
          ]
      ],
      current: {
        player: 0,
        opponent: 0
      }
    };
    vm.canvasDirectiveLoaded = false;

    vm.currentgame = {
      play: 0,
      satz: {
        number:0,
        wins: 0
      },
      rounds: {
        number:0,
        wins: 0
      }
    };
    $scope.playerinfos = vm.playerinfos;

    vm.playerinfos.date = new Date();
    vm.options = {
        showWeeks: false
    };

    // BADMINTON FIELD
    var  draw = {
        normal: 2,
        strong: 4,
        small: 0.5,
        color: "rgba(	32, 158, 145, 0.4)"
    };
    var keepGoing = true;
    var w,h;
    var drawCanvas = function() {
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      w = canvas.width;
      h = w*0.455;
      canvas.height = h;

      var lines = [
        { // midline
          weight: draw.strong,
          startx: (w/2),
          starty: 0,
          toy: h,
          tox: (w/2)
        },
        { // left midline
          weight: draw.normal,
          startx: ((w/2)-(w*0.148)),
          starty: 0,
          toy: h,
          tox: ((w/2)-(w*0.148))
        },
        { // right midline
          weight: draw.normal,
          startx: ((w/2)+(w*0.148)),
          starty: 0,
          toy: h,
          tox: ((w/2)+(w*0.148))
        },
        { // left verticle midline
          weight: draw.normal,
          startx: 0, //((w/2)+(w*0.148))-(draw.normal / 2),
          starty: (h/2),
          toy: (h/2),
          tox: ((w/2)-(w*0.148))-(draw.normal)
        },
        { // right verticle midline
          weight: draw.normal,
          startx: ((w/2)+(w*0.148))+(draw.normal), //((w/2)+(w*0.148))-(draw.normal / 2),
          starty: (h/2),
          toy: (h/2),
          tox: w
        },
        { // left outer line
          weight: draw.small,
          startx: ((w*0.0567)), //((w/2)+(w*0.148))-(draw.normal / 2),
          starty: 0,
          toy: h,
          tox: ((w*0.0567))
        },
        { // right outer line
          weight: draw.small,
          startx: (w-(w*0.0567)), //((w/2)+(w*0.148))-(draw.normal / 2),
          starty: 0,
          toy: h,
          tox: (w-(w*0.0567))
        },
        { // upper outer line
          weight: draw.small,
          startx: 0, //((w/2)+(w*0.148))-(draw.normal / 2),
          starty: (h*0.0754),
          toy: (h*0.0754),
          tox: w
        },
        { // lower outer line
          weight: draw.small,
          startx: 0, //((w/2)+(w*0.148))-(draw.normal / 2),
          starty: h-(h*0.0754),
          toy: h-(h*0.0754),
          tox: w
        }
      ];
      for (var line in lines) {
        context.beginPath();
        context.moveTo(lines[line].startx, lines[line].starty);
        context.lineTo(lines[line].tox, lines[line].toy);
        context.lineWidth = lines[line].weight;
        context.strokeStyle = draw.color;
        context.stroke();
        context.closePath();
      }
    };
    var reprintCanvas = function() {
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCanvas();
      return [canvas, context];
    };
   $scope.$watch("vm.canvasDirectiveLoaded", function(newVal, oldVal){
       if(newVal === true  && keepGoing) {
          drawCanvas();
          keepGoing = false;
        }
    });
    var colorRect = function(dir, area){
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var w = canvas.width;
      var h = w*0.455;
      if (dir == 'l') {
        if (vm.gameinfos.current.player) {
          context = reprintCanvas()[1];
        }
        vm.gameinfos.current.player = area;
      } else {
        if (vm.gameinfos.current.opponent) {
          context = reprintCanvas()[1];
        }
        vm.gameinfos.current.opponent = area;
      }
      // Links
      // 1,2,3 drittel von oben nach unten
      // 4,5 Mitte oben/unten
      // Rechtes
      // 6,7 Mitte oben/unten
      // 8,9,10 drittel von oben nach unten

      var drawrectintern = function (context, area, color) {
        var rect = {
          color: color
        };
        switch (area) {
          case 1: rect.area = {x: 0,y:0,      tx: (w/2)-(w*0.148), ty: (0.33*h)};       break;
          case 2: rect.area = {x: 0,y:0.33*h, tx: (w/2)-(w*0.148), ty: (0.33*h)};       break;
          case 3: rect.area = {x: 0,y:0.66*h, tx: (w/2)-(w*0.148), ty: (0.33*h)};       break;
          case 4: rect.area = {x: (w/2)-(w*0.148),y:0,      tx: (w*0.148), ty: (0.5*h)};  break;
          case 5: rect.area = {x: (w/2)-(w*0.148),y:(0.5*h),tx: (w*0.148), ty: (0.5*h)};  break;
          case 6: rect.area = {x: (0.5*w),y:0,      tx: (w*0.148), ty: (0.5*h)};       break;
          case 7: rect.area = {x: (0.5*w),y:(0.5*h),tx: (w*0.148), ty: (0.5*h)};       break;
          case 8: rect.area = {x: (w/2)+(w*0.148),y:0,      tx: (w/2)-(w*0.148), ty: (0.33*h)};       break;
          case 9: rect.area = {x: (w/2)+(w*0.148),y:0.33*h, tx: (w/2)-(w*0.148), ty: (0.33*h)};       break;
          case 10:rect.area = {x: (w/2)+(w*0.148),y:0.66*h, tx: (w/2)-(w*0.148), ty: (0.33*h)};       break;
          default:
          case 10:rect.area = {x: 0,y:0, tx:0, ty:0};
        }
        //  console.log(w,h,rect, area);
        context.fillStyle = rect.color;
        context.fillRect(rect.area.x,rect.area.y,rect.area.tx,rect.area.ty);
        context.stroke();
      };

      if (vm.gameinfos.current.player) drawrectintern(context, vm.gameinfos.current.player, "rgba(124,252,0,0.1)");
      if (vm.gameinfos.current.opponent) drawrectintern(context, vm.gameinfos.current.opponent, "rgba(220,20,60,0.1)");
    };
    vm.updateCanvas = function (event) {
      console.log("KLICK");
      var canvas = document.getElementById('canvas');
      w = canvas.offsetWidth;
      h = w*0.455;
      var x = event.offsetX;
      var y = event.offsetY;
      if (x<((w/2)-(w*0.148)) && y<(0.34*h)) {
      //  console.log("linkes Oberes drittel");
        colorRect('l', 1);
      }
      else if (x<((w/2)-(w*0.148)) && y>=(0.34*h) && y<(0.66*h)) {
        //  console.log("linkes mittleres drittel");
        colorRect('l', 2);
      }
      else if (x<((w/2)-(w*0.148)) && y>=(0.66*h)) {
        //  console.log("linkes Unteres drittel");
        colorRect('l', 3);
      }
      else if (x>=((w/2)-(w*0.148)) && x<=(w/2) &&  y<(0.5*h)) {
        //  console.log("Halb linkes Obere Hälfte");
        colorRect('l', 4);
      }
      else if (x>=((w/2)-(w*0.148)) && x<=(w/2) &&  y>=(0.5*h)) {
        //  console.log("Halb linkes Unteres Hälfte");
        colorRect('l', 5);
      }
      else if (x > (w/2) && x<((w/2)+(w*0.148)) && y<(0.5*h)) {
        //  console.log("Halb rechtes Obere Hälfte");
        colorRect('r', 6);
      }
      else if (x > (w/2) && x<((w/2)+(w*0.148)) && y>=(0.5*h)) {
        //  console.log("Halb rechtes untere Hälfte");
        colorRect('r', 7);
      }
      else if (x>=((w/2)+(w*0.148)) && y<(0.34*h)) {
        //  console.log("Rechtes Oberes drittel");
        colorRect('r', 8);
      }
      else if (x>=((w/2)+(w*0.148)) && y>=(0.34*h) && y<(0.66*h)) {
        //  console.log("Rechtes mittleres drittel");
        colorRect('r', 9);
      }
      else if (x>=((w/2)+(w*0.148)) && y>=(0.66*h)) {
        //  console.log("Rechtes Unteres drittel");
        colorRect('r', 10);
      }
    };


  /*  context.beginPath();
    context.moveTo(, 100%);
    context.lineTo(450, 50);
    context.lineWidth = 10;*/

      // buttons
    $scope.progressFunction = function() {
      return $timeout(function() {}, 500);
    };

    vm.endSchlag =function(){
      if (vm.gameinfos.current.player != 0 && vm.gameinfos.current.opponent != 0){
        vm.gameinfos.game[vm.currentgame.satz.number][vm.currentgame.rounds.number].push({id: vm.currentgame.rounds.number, player: vm.gameinfos.current.player, opponent: vm.gameinfos.current.opponent});
        vm.currentgame.play++;
        vm.gameinfos.current.opponent = 0;
        vm.gameinfos.current.player = 0;
        reprintCanvas()[1];
        return true;
      }
      return false;
    }
    vm.endRound = function(win, reason) {
      if (vm.gameinfos.current.player != 0 && vm.gameinfos.current.opponent != 0){
        vm.gameinfos.game[vm.currentgame.satz.number][vm.currentgame.rounds.number].push({id: vm.currentgame.rounds.number, player: vm.gameinfos.current.player, opponent: vm.gameinfos.current.opponent, win: win, reason: reason});
        vm.currentgame.play=0;
        vm.gameinfos.current.opponent = 0;
        vm.gameinfos.current.player = 0;
        vm.gameinfos.game[vm.currentgame.satz.number].push([]);
        vm.currentgame.rounds.number++;
        if (win) vm.currentgame.rounds.wins++;
        reprintCanvas()[1];
        console.log(vm.gameinfos);
        return true;
      }
      return false;
    }
    vm.endSatz = function(win) {
      if (vm.currentgame.rounds.number!=0){
        vm.gameinfos.game[vm.currentgame.satz.number][vm.currentgame.rounds.number].push({id: vm.currentgame.satz.number, player: vm.gameinfos.current.player, opponent: vm.gameinfos.current.opponent, win: win});
        if (vm.currentgame.play == 0) vm.gameinfos.game[vm.currentgame.satz.number].pop();
        vm.currentgame.play=0;
        vm.gameinfos.current.opponent = 0;
        vm.gameinfos.current.player = 0;
        vm.gameinfos.game.push([[]]);
        vm.currentgame.satz.number++;
        vm.currentgame.rounds= {number:0,wins: 0};
        if (win) vm.currentgame.satz.wins++;
        reprintCanvas()[1];
        return true;
      }
      return false;
    }
    vm.checkField = function(){
      return vm.gameinfos.current.player == 0 || vm.gameinfos.current.opponent == 0;
    }

    vm.submit = function(){
      alert("Send data");
    }

    //
  }



})();
