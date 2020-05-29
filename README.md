# dingyang-server

> koa2 project

## start

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3004
$ npm run dev
```

For detailed explanation on how things work, check out [koa2 docs]( https://koa.bootcss.com/ ).

- 默认端口：3004

## config

- config/mongo.js       数据库连接

- nuxt.js                         Nuxt项目路径

  **注意：**因为需要在Nuxt项目中的count.json文件中写入数据，所以需要配置正确路径，如果仅测试接口，可以注释掉相关代码

## API

**接口设计**

### dy.tcualhp.cn:

URL前缀：`http://HOSTNAME/dingyang/api`

获取所有文章信息：

`GET    /article`

获取某类型文章信息：

`GET    /article?type=`

可以添加count限制获取数量

`GET    /article?type=prediction&count=4`

type取值：

```
prediction,stcok,investment,report,research
```

获取所有视频信息(暂无分类)：

`GET    /video`

添加文章：

`POST    /article/add`

数据格式：

```json
	{
  	"title": "标题",
  	"description": "简介",
  	"content": "正文",
  	"type": "stock",
  	"coverUrl": "2020.jpg"
}
```

*后端接口会自动加上日期和id*

添加视频信息:

 `POST	 /video/add`

数据格式：

```json
  {
    "title": "标题",
      "coverUrl": "0202.jpg",
    "url": "20200202.mp4"
  }
```

#### hy.tcualhp.cn:

URL前缀：`http://HOSTNAME/huayin/api`

获取某类文章信息：

`GET    /huayin/article?type=`

增加某类文章（新闻或报告）：

`POST    /huayin/article/add`

数据格式

- 注意因为没有Vue中渲染markdown格式的插件，所以在后台存的时候就要存html代码

```json
{
    "title" : "华银德洋基金S26669分红公告",
    "description" : "这里是简介",
    "content" : "这里是正文",
    "type" : "news"
}
```

获取其他信息：

`GET    /huayin/other?type=`

增加其他信息：

`POST    /huayin/other/add`

```json
{
    "type" : "about",
    "typeTitle" : "关于我们",
    "content" : "深圳市华银精治资产管理公司是全国顶尖的私募基金管理机构。公司成立于2007年。业务范围涵盖私募基金管理、上市公司、定向增发、股权激励等。\n2009年公司被人大聘为《基金法》立法起草小组顾问，2013年5月华银精治在前海股权交易所成功上市。2014年4月公司获得中国基金业协会首批特别会员资格。\n作为第一批拥有合法牌照的财富管理机构，我们意识到，中国的财富管理行业将面临空前的发展契机，对私募机构和投资人来说，都将面临一波大行情的起点。华银精治拥有多年的财富管理经验，在基金投资、基金销售、政策法规、内控管理各方面理解深刻，具有丰富的运作经验。\n投资需要信仰，更需要善意。华银精治更希望给投资者提供一个创新平台，在法务、投资、市场等各个合伙角度上，迎来财富管理行业的美好明天。"
}
```

