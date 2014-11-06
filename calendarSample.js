var MyApp = angular.module('calendarApp', []);

MyApp.service('CalendarService', [function () {

    this.header = function() {
        return ["月", "火", "水", "木", "金", "土", "日"];
    }

    this.calendar = function() {
        var date = new Date();              // 現在日付を取得
        var week = [6, 0, 1, 2, 3, 4, 5];   // 月曜始まりにするための変換テーブル
        var monthdays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        var year = date.getFullYear();
        // うるう年の計算
        if (((year % 4) == 0 && (year % 100) != 0) || (year % 400) == 0){
            monthdays[1] = 29;
        }

        // 月を取得
        var month = date.getMonth();
        // 今日の日を取得
        var today = date.getDate();

        // 一日を取得
        date.setDate(1);
        var startDay = date.getDay();

        var carendar = [];                  // カレンダーデータ
        var day;                            // ループ用
        var index = 1;                      // 日付


        for(var i = 0; i < 6; i++) {
            var tableLine = [];             // 1週間分のデータ
            var d = 0;                      // ループ用

            do {
                date.setDate(index);
                day = date.getDay();

                // 1段目：　前月の分を空白にする
                if (i == 0 && day > d) {
                    tableLine[d] = {dd: "", color: "none"};
                }
                // 6段目：　次の月の分を空白にする
                else if(i == 6 &&  monthdays[month] < day) {
                    tableLine[week[day]] = {dd: "", color: "none"};
                    index++;
                }
                // 最終日の段： 次の月の分を空白にする
                else if (index > monthdays[month]) {
                    tableLine[week[day]] = {dd: "", color: "none"};
                    index++;
                }
                // 日にちを設定する
                else {
                    tableLine[week[day]] = {dd: date.getDate(), color: date.getDate() == today ? "today" : "none"};
                    index++;
                }
                d++;
            // 月曜日開始のカレンダーにするため、土曜日になるまでループする
            } while (week[day] != 6)

            carendar.push(tableLine);
        }
        return carendar;
    }
}]);


MyApp.controller('CalendarCtrl', ['$scope', 'CalendarService', function ($scope, CalendarService) {

    $scope.header = function() {
        return CalendarService.header();
    }
    $scope.calendar = function() {
        return CalendarService.calendar();
    }
}]);