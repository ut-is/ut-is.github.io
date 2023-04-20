		$(function(){

//ページトップへスムーススクロール
     $(".pageTop a").click(function(){
     $('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top }, 'slow','swing');
     return false;
     });
        
//FAQアコーディオン部分
  /**
  * getSearchQueryObject()
  * location.search をパースしてクエリをオブジェクトとして返す
  * @return {Object}
  */
  var getSearchQueryObject = function () {
    "use strict";

    var query_object = {}, i, item, query;

    if (location.search.length) {
      query = location.search.substring(1).split("&");

      for (i in query) {
        item = query[i].split("=");
        query_object[item[0]] = item[1];
      }
    }

    return query_object;
  };

  /**
   * openAc()
   * location.search を確認しアコーディオンを開く
   * アコーディオンを開いた場合は True を返す。
   * なにもしなかった場合には False を返す
   * @param queryObj
   * @param queryObj.qa {String} "01"
   * @returns {boolean}
   */
  var openAc = function (queryObj) {
    "use strict";

    var prefix = ".q", key, target;

    for (key in queryObj) {
      // Query を精査する
      if (/^qa$/i.test(key) && /^[0-9]+$/.test(queryObj[key])) {
        target = prefix + queryObj[key];
        $("#acMenu").find(target).trigger("click");
        return true;
      }
    }
    return false;
  };


  $("#acMenu > dt").click(function () {
    $(this).toggleClass("open").next().slideToggle("normal");
  });


  openAc(getSearchQueryObject());

		
//ULやDLの高さを揃える

set_height2();
    
            function set_height2() {
		var foo$ = $('.ml2');
		var foo_length = foo$.length;
		for(var i = 0 ; i < Math.ceil(foo_length / 2) ; i++) {
			var maxHeight = 0;
			for(var j = 0; j < 2; j++){
				if (foo$.eq(i * 2 + j).height() > maxHeight) { 
					maxHeight = foo$.eq(i * 2 + j).height(); 
				}
			}
			for(var k = 0; k < 2; k++){
				foo$.eq(i * 2 + k).height(maxHeight); 
			}
		}		
	} 
//タブレット以下は解除
    var w = $(window).width();
    var x = 767;
    if (w <= x) {
        $(".tableDL dt,.tableDL dd").height('auto');
    }
//リサイズ対応
$(window).resize(function(){
    var w = $(window).width();
    var x = 767;
    if (w <= x) {
       $(".tableDL dt,.tableDL dd").height('auto');
    } else {
        set_height2()
    }
});    
   
			              });