var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
app.use('/data/', express.static(path.join(__dirname, './data/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

// app.on('request', async (req, res) => {
//   const method = req.method;
//   const { pathname, query } = url.parse(req.url, true);
//   if (method == 'get') {
//     if (pathname == '/student_information' || pathname == '/staff-information' || pathname =='/teacher-information') {
//       let Users = await User.find();
//       console.log(Users)
//       let list = `
// <!--<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />-->
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Information</title>
//     <link rel="stylesheet" type="text/css" href="public/css/reset.css" />
//     <link rel="stylesheet" type="text/css" href="public/css/student-mystyle.css" />
//     <!-- head -->
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <!-- demo stylesheet -->
//     <link type="text/css" rel="stylesheet" href="helpers/demo.css?v=2020.2.4325" />
//     <link type="text/css" rel="stylesheet" href="helpers/media/layout.css?v=2020.2.4325" />
//     <link type="text/css" rel="stylesheet" href="helpers/media/elements.css?v=2020.2.4325" />
//     <!-- helper libraries -->
//     <script src="helpers/jquery-1.12.2.min.js" type="text/javascript"></script>
//     <!-- daypilot libraries -->
//     <script src="public/js/daypilot-all.min.js?v=2020.2.4325" type="text/javascript"></script>
//     <!-- /head -->
//
// </head>
//                 <body>
//                 	<div class="container">
//                 		<h6>
//                 			<a href="/add" class="btn btn-primary">添加用户</a>
//                 		</h6>
//                 		<table class="table table-striped table-bordered">
//                 			<tr>
//                 				<td>用户名</td>
//                 				<td>年龄</td>
//                 				<td>爱好</td>
//                 				<td>邮箱</td>
//                 				<td>操作</td>
//                 			</tr>
//                 		</table>
//                     </div>
//                 </body>
//                 </html>
//                 `;
//       // Users.forEach((item) => {
//       //   list += `
//       //           <tr>
// 		// 		        <td>${item.name}</td>
//       //           <td>${item.age}</td>
//       //           <td>
//       //           `;
//       //
//       //   item.hobbies.forEach(item => {
//       //     list += `<span>${item}</span>`;
//       //   });
//       //
//       //
//       //   list += `</td>
// 		// 		<td>${item.email}</td>
// 		// 		<td>
// 		// 			<a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
// 		// 			<a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
// 		// 		</td>
// 		// 	    </tr>
//       //               `
//       // });
//       //
//       // list += `
//       //                    </table>
//       //               </div>
//       //           </body>
//       //           </html>
//       //           `;
//       // res.end(list);
//     }
//   };
//
//   res.end("ok")
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({

  secret: 'itcast',
  resave: false,
  saveUninitialized: false
}))

// app.get('/student-information', function (req, res) {
//   fs.readFile('./db.json', 'utf8', function (err, data) {
//     if(err){
//       return res.status(500).send('server error.')
//     }
//
//     var projects = JSON.parse(data).projects
//     res.render('project_list.html', {
//       projects: projects
//     })
//   })
//
// })
/*app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
  res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
  res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//创建get接口
app.get('/student-timetable', function(req, res) {
  //console.log(req.body); //获取请求参数
  var file = path.join(__dirname, 'data/timetable.json');
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      res.send('文件读取失败');
    } else {
      res.render('student-timetable.html',{
        courses:JSON.parse(data)
      });
    }
  });
});*/
app.use(router)

app.use(function (req, res) {
  res.render('404.html')
})

app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(5000, function () {
  console.log('running...')
})
