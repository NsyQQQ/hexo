const fs = require('fs');

console.log('=== Tagcloud Filter ===');

// 1. 过滤 public/index.html 中的标签云（显示2次及以上）
const publicDir = process.cwd() + '/public';
const indexPath = publicDir + '/index.html';

function filterPublicTagcloud() {
  if (!fs.existsSync(indexPath)) {
    console.log('Index not found!');
    return;
  }

  const content = fs.readFileSync(indexPath, 'utf8');
  
  // 获取标签文章数
  const tagsDir = publicDir + '/tags';
  if (!fs.existsSync(tagsDir)) return;
  
  const counts = {};
  const dirs = fs.readdirSync(tagsDir);
  
  for (const dir of dirs) {
    const indexPath2 = tagsDir + '/' + dir + '/index.html';
    if (!fs.existsSync(indexPath2)) continue;
    
    const c = fs.readFileSync(indexPath2, 'utf8');
    const matches = c.match(/class="archive-article archive-type-post"/g);
    const count = matches ? matches.length : 0;
    
    if (count > 0) {
      counts[dir] = count;
    }
  }
  
  console.log('Found', Object.keys(counts).length, 'tags with posts');
  
  // 过滤标签云：只显示 >= 2 次的标签
  const tagcloudRegex = /<div class="widget tagcloud">([\s\S]*?)<\/div>/;
  const match = content.match(tagcloudRegex);
  
  if (!match) return;
  
  const tags = match[1].match(/<a href="[^"]*"[^>]*>[^<]*<\/a>/g) || [];
  console.log('Tags in cloud:', tags.length);
  
  const filteredTags = tags.filter(tag => {
    const hrefMatch = tag.match(/href="[^"]*\/tags\/([^"]*)\//);
    if (!hrefMatch) return false;
    const tagName = decodeURIComponent(hrefMatch[1]);
    return (counts[tagName] || 0) >= 2;
  });
  
  console.log('Filtered:', filteredTags.length, 'tags (>=2 posts)');
  
  const newContent = content.replace(tagcloudRegex, 
    '<div class="widget tagcloud">' + filteredTags.join('') + '</div>');
  fs.writeFileSync(indexPath, newContent);
}

filterPublicTagcloud();
console.log('Done!');
