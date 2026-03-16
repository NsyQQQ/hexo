/* 搜索功能 */
(function() {
  var searchWrap = document.getElementById('search-form-wrap');
  var searchInput = document.querySelector('.search-form-input');
  var resultsContainer = document.getElementById('search-results-container');
  var searchForm = document.querySelector('.search-form');
  var searchData = null;
  var isOpen = false;

  // 阻止表单默认提交
  if (searchForm) {
    searchForm.onsubmit = function(e) {
      e.preventDefault();
    };
  }

  function loadSearchData() {
    if (!searchData) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/hexo/search.json', false);
      xhr.send();
      if (xhr.status === 200) {
        searchData = JSON.parse(xhr.responseText);
      }
    }
    return searchData;
  }

  function doSearch(query) {
    var data = loadSearchData();
    if (!data || !query) return [];
    
    var results = [];
    query = query.toLowerCase();
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var title = item.title ? item.title.toLowerCase() : '';
      var content = item.content ? item.content.toLowerCase() : '';
      
      if (title.indexOf(query) !== -1 || content.indexOf(query) !== -1) {
        results.push(item);
      }
    }
    return results.slice(0, 10);
  }

  function showResults(results) {
    if (results.length === 0) {
      resultsContainer.innerHTML = '<div style="padding:10px;color:#666;">没有找到</div>';
      resultsContainer.classList.remove('show');
      return;
    }
    
    var html = '';
    for (var i = 0; i < results.length; i++) {
      var url = results[i].url;
      var title = results[i].title;
      var content = results[i].content ? results[i].content.substring(0, 80) + '...' : '';
      html += '<div class="search-result-item">';
      html += '<a href="' + url + '">' + title + '</a>';
      if (content) {
        html += '<p>' + content + '</p>';
      }
      html += '</div>';
    }
    
    // 先定位再显示
    var searchInput = document.querySelector('.search-form-input');
    var rect = searchInput.getBoundingClientRect();
    resultsContainer.style.top = (rect.bottom + 15) + 'px';
    resultsContainer.style.left = rect.left + 'px';
    
    resultsContainer.innerHTML = html;
    resultsContainer.classList.add('show');
  }

  // 搜索按钮点击
  var navBtn = document.querySelector('.nav-search-btn');
  navBtn.onclick = function(e) {
    e.stopPropagation();
    if (isOpen) {
      isOpen = false;
      searchWrap.classList.remove('on');
      resultsContainer.classList.remove('show');
    } else {
      isOpen = true;
      searchWrap.classList.add('on');
      searchInput.focus();
      // 只在有内容时显示结果
      if (searchInput.value.length > 0) {
        var results = doSearch(searchInput.value);
        showResults(results);
      }
    }
  };

  // 搜索按钮本身也阻止默认行为
  var submitBtn = document.querySelector('.search-form-submit');
  if (submitBtn) {
    submitBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
    };
  }

  // 输入搜索
  searchInput.oninput = function() {
    var query = this.value;
    if (query.length > 0) {
      var results = doSearch(query);
      showResults(results);
      resultsContainer.classList.add('show');
    } else {
      resultsContainer.innerHTML = '';
      resultsContainer.classList.remove('show');
    }
  };

  // 点击外部关闭
  document.onclick = function(e) {
    if (isOpen && !searchWrap.contains(e.target) && !e.target.classList.contains('nav-search-btn')) {
      isOpen = false;
      searchWrap.classList.remove('on');
      resultsContainer.classList.remove('show');
    }
  };

  // 搜索框内部点击不关闭
  searchWrap.onclick = function(e) {
    e.stopPropagation();
  };
})();
