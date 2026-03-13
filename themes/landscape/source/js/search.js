/* 本地搜索功能 */
(function($){
  var $searchWrap = $('#search-form-wrap');
  var $searchInput = $('.search-form-input');
  var isSearchAnim = false;
  var searchAnimDuration = 200;
  var searchData = null;

  // 加载搜索数据
  function loadSearchData() {
    if (!searchData) {
      $.ajax({
        url: '/hexo/search.json',
        dataType: 'json',
        async: false,
        success: function(data) {
          searchData = data;
        }
      });
    }
    return searchData;
  }

  // 搜索功能
  function performSearch(query) {
    var results = [];
    var data = loadSearchData();
    
    if (!data || !query) return results;
    
    query = query.toLowerCase();
    
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var title = item.title ? item.title.toLowerCase() : '';
      var content = item.content ? item.content.toLowerCase() : '';
      
      if (title.indexOf(query) !== -1 || content.indexOf(query) !== -1) {
        results.push({
          title: item.title,
          url: item.url,
          content: item.content ? item.content.substring(0, 100) + '...' : ''
        });
      }
    }
    
    return results.slice(0, 10); // 最多显示10条结果
  }

  // 显示搜索结果
  function showResults(results) {
    var html = '';
    if (results.length > 0) {
      html += '<div class="search-results">';
      for (var i = 0; i < results.length; i++) {
        html += '<div class="search-result-item">';
        html += '<a href="' + results[i].url + '">' + results[i].title + '</a>';
        html += '<p>' + results[i].content + '</p>';
        html += '</div>';
      }
      html += '</div>';
    } else {
      html = '<p>没有找到相关内容</p>';
    }
    
    // 创建结果容器
    var $resultsContainer = $('#search-results-container');
    if (!$resultsContainer.length) {
      $resultsContainer = $('<div id="search-results-container"></div>');
      $searchWrap.append($resultsContainer);
    }
    $resultsContainer.html(html);
  }

  // 点击搜索按钮
  $('.nav-search-btn').on('click', function(){
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $searchInput.focus();
      loadSearchData(); // 预加载搜索数据
    });
  });

  // 搜索输入
  $searchInput.on('input', function(){
    var query = $(this).val();
    if (query.length > 0) {
      var results = performSearch(query);
      showResults(results);
    } else {
      $('#search-results-container').html('');
    }
  });

  // 失去焦点关闭
  $searchInput.on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim(function(){
      setTimeout(function(){
        $('#search-results-container').remove();
      }, 300);
    });
  });

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  });
})(jQuery);
