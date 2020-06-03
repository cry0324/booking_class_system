var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', function (req, res) {
  res.render('introduction.html', {
    user: req.session.user
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res, next) {
  var body = req.body

  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(200).json({
        err_code: 3,
        message: 'Email or password is invalid.'
      })
    }

    req.session.user = user
    if(user.status === 0){
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    } else if(user.status === 1){
      res.status(200).json({
        err_code: 1,
        message: 'OK'
      })
    } else if(user.status === 2){
      res.status(200).json({
        err_code: 2,
        message: 'OK'
      })
    }
  })
})


router.get('/register', function (req, res, next) {
  res.render('register.html')
})

router.post('/register', function (req, res, next) {
  var body = req.body
  User.findOne({
        email: body.email
  }, function (err, data) {
    if (err) {
      return next(err)
    }
    if (data) {
      return res.status(200).json({
        err_code: 3,
        message: 'The email already exists.'
      })
      return res.send('The email already exists, please try agian.')
    }

    body.password = md5(md5(body.password))

    body.status = Number(body.status)

    new User(body).save(function (err, user) {
      if (err) {
        return next(err)
      }

      req.session.user = user

      if(user.status === 0){
        res.status(200).json({
          err_code: 0,
          message: 'OK'
        })
      } else if(user.status === 1){
        res.status(200).json({
          err_code: 1,
          message: 'OK'
        })
      } else if(user.status === 2){
        res.status(200).json({
          err_code: 2,
          message: 'OK'
        })
      }

    })
  })
})

// router.get('/forgotten_password', function (req, res, next) {
//   res.render('forgotten_password.html')
// })
//
// router.post('/forgotten_password', function (req, res, next) {
//   var body = req.body
//   User.findOne({
//     email: body.email
//   }, function (err, data) {
//     if (err) {
//       return next(err)
//     }
//     if (data) {
//       return res.status(200).json({
//         err_code: 3,
//         message: 'The email already exists.'
//       })
//       return res.send('The email already exists, please try agian.')
//     }
//     })
// })

router.get('/student', function (req, res, next) {
  res.render('student.html')
})

router.get('/student-information', async (req, res) => {

  let Users = await User.find({status: 0});
  let list = `
 <!--<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />-->
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>Information</title>
     <link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.css" />
     <link rel="stylesheet" type="text/css" href="public/css/reset.css" />
     <link rel="stylesheet" type="text/css" href="public/css/student-mystyle.css" />
     <!-- head -->
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <!-- demo stylesheet -->
     <link type="text/css" rel="stylesheet" href="helpers/demo.css?v=2020.2.4325" />
     <link type="text/css" rel="stylesheet" href="helpers/media/layout.css?v=2020.2.4325" />
     <link type="text/css" rel="stylesheet" href="helpers/media/elements.css?v=2020.2.4325" />
     <!-- helper libraries -->
     <script src="helpers/jquery-1.12.2.min.js" type="text/javascript"></script>
     <!-- daypilot libraries -->
     <script src="public/js/daypilot-all.min.js?v=2020.2.4325" type="text/javascript"></script>
     <!-- /head -->
 </head>
<body>

<div class="header">
    <h1>Student Homepage</h1>
</div>

<div class="test">
    <div class="nav">
        <!--<ul class="nav">-->
        <a href="/student-information" id="1" class="btn2"><img src="public/img/My.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/student-information" id="2" class="btn2">Information</a><br><br>
        <a href="/student-timetable" id="3" class="btn1"><img src="public/img/Calendar.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/student-timetable" id="4" class="btn1">Timetable</a><br><br>
        <a href="/login" id="7" class="btn1"><img src="public/img/Logout.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/login" id="8" class="btn1">Sign Out</a><br><br>
        <!--    </ul>-->
    </div>
<div class="container">
    <table class="table table-striped table-bordered">
        <tr>
            <td>Full Name</td>
            <td>Email Address</td>
            <td>Phone Number</td>
            <td>Date of Birth</td>
            <td>Status</td>
        </tr>
        `;
  Users.forEach((item) => {
    list += `
                <tr>
				<td>${item.fullname}</td>
                <td>${item.email}</td>
                <td>${item.telephone_number}</td>
                <td>${item.date_of_birth}</td>
                <td>student</td>
                </tr>
                `
  });
  list += `
</table>
    <div class="nu">
        <h2>Photo</h2>
        <img src="public/img/student-avatar.jpg" style="width: 300px ">
    </div>

    <br><br>
    <div class="co">
            <h2>Change profile photo</h2>
            <form>
                <input type="file" name="pic" id="pic" accept="image/gif, image/jpeg" />
            </form>
            <br><br>
            <!--<button type="button">Insert</button>-->
            <table id = "course" class="gridtable">
                <thead>
                <tr>
                    <th>Lecture Name</th>
                    <th>Teacher Name</th>
                    <th>Lecture Time</th>
                    <th>Modify</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
</div>

<div class="footer">
    Copyright ? Bristol.RainbowGroup
</div>

<script type="text/javascript">
    window.onload = function(){
        var arr = document.getElementsByTagName('a');
        for(var i = 0;i<arr.length;i++){
            arr[i].onclick = function(){
                if ((this.id == '1') || (this.id=='2'))
                {
                    document.getElementById("box1").style.display = 'block' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'none' ;
                }
                else if((this.id == '3') || (this.id=='4'))
                {
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'block' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'none' ;
                }
                else if((this.id == '5') || (this.id=='6')){
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'block' ;
                    document.getElementById("box4").style.display = 'none' ;
                }else{
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'block' ;
                }

                if(this.className == 'btn1' ){
                    this.className = 'btn2';
                    var name = this.id;
                    var btn = document.getElementsByClassName('btn2');
                    for(var j=0;j<btn.length;j++){
                        if(btn[j].id!=name){
                            btn[j].className = 'btn1';
                        }
                    }
                }
            }
        }
    }
    
</script>
<script type="text/javascript"> 
    window.onload = function () {
        var oTab = document.getElementById('course');
        var url = "/data/timetable.json";
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            if (request.status === 200) {
                var oTbody = oTab.tBodies[0];
                var data = JSON.parse(request.responseText);
                for (var index = 0; index < data.length; index++) {
                    if(data[index].selected === "1"){
                        var oTr = document.createElement('tr');
                        oTbody.appendChild(oTr);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = data[index].text;
                        oTr.appendChild(oTd);

                        oTd = document.createElement('td');
                        oTd.innerHTML = data[index].teacher;
                        oTr.appendChild(oTd);

                        oTd = document.createElement('td');
                        oTd.innerHTML = data[index].time;
                        oTr.appendChild(oTd);

                        oTd = document.createElement('td');
                        oTr.appendChild(oTd);

                        var oA = document.createElement('a');
                        oA.innerHTML = "delete";
                        oA.href = "javascript:;";
                        oTd.appendChild(oA);
                        oA.onclick = function () {
                            oTbody.removeChild(this.parentNode.parentNode);
                        }
                    }
                }
            }
        }
    }
</script>
</body>
</html>
                `;
  res.end(list);
  res.end("ok")
})

// router.get('/student-settings', function (req, res, next) {
//   res.render('student-settings.html')
// })
router.get('/student-timetable', function (req, res, next) {
  res.render('student-timetable.html')
})

router.use('/data', express.static('data'))

router.get('/teacher', function (req, res, next) {
  res.render('teacher.html')
})

router.get('/teacher-information', async (req, res) => {

  let Users = await User.find({status: 1});
  let list = `
 <!--<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />-->
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>Information</title>
     <link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.css" />
     <link rel="stylesheet" type="text/css" href="public/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="public/css/teacher-mystyle.css" />
     <!-- head -->
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <!-- demo stylesheet -->
     <link type="text/css" rel="stylesheet" href="helpers/demo.css?v=2020.2.4325" />
     <link type="text/css" rel="stylesheet" href="helpers/media/layout.css?v=2020.2.4325" />
     <link type="text/css" rel="stylesheet" href="helpers/media/elements.css?v=2020.2.4325" />
     <!-- helper libraries -->
     <script src="helpers/jquery-1.12.2.min.js" type="text/javascript"></script>
     <!-- daypilot libraries -->
     <script src="public/js/daypilot-all.min.js?v=2020.2.4325" type="text/javascript"></script>
     <!-- /head -->
 </head>
<body>

<div class="header">
    <h1>Teacher Homepage</h1>
</div>

<div class="test">
    <div class="nav">
        <!--<ul class="nav">-->
        <a href="/teacher-information" id="1" class="btn2"><img src="public/img/My.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/teacher-information" id="2" class="btn2">Information</a><br><br>
        <a href="/teacher-timetable" id="3" class="btn1"><img src="public/img/Calendar.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/teacher-timetable" id="4" class="btn1">Timetable</a><br><br>
        <a href="/login" id="7" class="btn1"><img src="public/img/Logout.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/login" id="8" class="btn1">Sign Out</a><br><br>
        <!--    </ul>-->
    </div>
<div class="container">
    <table class="table table-striped table-bordered">
        <tr>
            <td>Full Name</td>
            <td>Email Address</td>
            <td>Phone Number</td>
            <td>Date of Birth</td>
            <td>Status</td>
        </tr>
        `;
  Users.forEach((item) => {
    list += `
                <tr>
				<td>${item.fullname}</td>
                <td>${item.email}</td>
                <td>${item.telephone_number}</td>
                <td>${item.date_of_birth}</td>
                <td>teacher</td>
                </tr>
                `});
  list += `
</table>
    <div class="nu">
        <h2>Photo</h2>
        <img src="public/img/teacher-avatar.jpeg" style="width: 300px ">
    </div>

    <br><br>
    <div class="co">
        <h2>Change profile photo</h2>
        <form>
            <input type="file" name="pic" id="pic" accept="image/gif, image/jpeg" />
        </form>
        <br><br>
        <h2>Teacher available time</h2>
        <button type="button">Insert</button>
        <table id = "course" class="gridtable">
            <thead>
            <tr>
                <th>Lecture Name</th>
                <th>Teacher Name</th>
                <th>Available Time</th>
                <th>Modify</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<div class="footer">
    Copyright ? Bristol.RainbowGroup
</div>

<script type="text/javascript">


    window.onload = function(){
        var arr = document.getElementsByTagName('a');
        for(var i = 0;i<arr.length;i++){
            arr[i].onclick = function(){
                if ((this.id == '1') || (this.id=='2'))
                {
                    document.getElementById("box1").style.display = 'block' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'none' ;
                }
                else if((this.id == '3') || (this.id=='4'))
                {
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'block' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'none' ;
                }
                else if((this.id == '5') || (this.id=='6')){
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'block' ;
                    document.getElementById("box4").style.display = 'none' ;
                }else{
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'block' ;
                }

                if(this.className == 'btn1' ){
                    this.className = 'btn2';
                    var name = this.id;
                    var btn = document.getElementsByClassName('btn2');
                    for(var j=0;j<btn.length;j++){
                        if(btn[j].id!=name){
                            btn[j].className = 'btn1';
                        }
                    }
                }
            }
        }
    }

</script>
<script>
    window.onload = function () {
        var oTab = document.getElementById('course');
        var url = "/data/information.json";
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            if (request.status === 200) {
                var oTbody = oTab.tBodies[0];
                var data = JSON.parse(request.responseText);
                for (var index = 0; index < data.length; index++) {
                    var oTr = document.createElement('tr');
                    oTbody.appendChild(oTr);

                    var oTd = document.createElement('td');
                    oTd.innerHTML = data[index].text;
                    oTr.appendChild(oTd);

                    oTd = document.createElement('td');
                    oTd.innerHTML = data[index].teacher;
                    oTr.appendChild(oTd);

                    oTd = document.createElement('td');
                    oTd.innerHTML = data[index].time;
                    oTr.appendChild(oTd);

                    oTd = document.createElement('td');
                    oTr.appendChild(oTd);

                    var oA = document.createElement('a');
                    oA.innerHTML = "delete";
                    oA.href = "javascript:;";
                    oTd.appendChild(oA);
                    oA.onclick = function () {
                        oTbody.removeChild(this.parentNode.parentNode);
                    }
                }
            }
        }
    }
</script>
</body>
</html>
                `;
  res.end(list);
  res.end("ok")
})

// router.get('/teacher-settings', function (req, res, next) {
//   res.render('teacher-settings.html')
// })
router.get('/teacher-timetable', function (req, res, next) {
  res.render('teacher-timetable.html')
})

router.get('/staff', function (req, res, next) {
  res.render('staff.html')
})

router.get('/staff-information', async (req, res) => {
  let Users = await User.find({status: 2});
  let list = `
 <!--<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />-->
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <title>Information</title>
     <link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.css" />
     <link rel="stylesheet" type="text/css" href="public/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="public/css/staff-mystyle.css" />
     <!-- head -->
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <!-- demo stylesheet -->
     <link type="text/css" rel="stylesheet" href="helpers/demo.css?v=2020.2.4325" />
     <link type="text/css" rel="stylesheet" href="helpers/media/layout.css?v=2020.2.4325" />
     <link type="text/css" rel="stylesheet" href="helpers/media/elements.css?v=2020.2.4325" />
     <!-- helper libraries -->
     <script src="helpers/jquery-1.12.2.min.js" type="text/javascript"></script>
     <!-- daypilot libraries -->
     <script src="public/js/daypilot-all.min.js?v=2020.2.4325" type="text/javascript"></script>
     <!-- /head -->
 </head>
<body>

<div class="header">
    <h1>Staff Homepage</h1>
</div>

<div class="test">
    <div class="nav">
        <!--<ul class="nav">-->
        <a href="/staff-information" id="1" class="btn2"><img src="public/img/My.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/staff-information" id="2" class="btn2">Information</a><br><br>
        <a href="/staff-timetable" id="3" class="btn1"><img src="public/img/Calendar.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/staff-timetable" id="4" class="btn1">Timetable</a><br><br>
        <a href="/login" id="7" class="btn1"><img src="public/img/Logout.png" style="width:75px;height: 75px;align-content: center"></a> <br>
        <a href="/login" id="8" class="btn1">Sign Out</a><br><br>
        <!--    </ul>-->
    </div>
<div class="container">
    <table class="table table-striped table-bordered">
        <tr>
            <td>Full Name</td>
            <td>Email Address</td>
            <td>Phone Number</td>
            <td>Date of Birth</td>
            <td>Status</td>
        </tr>
        `;
  Users.forEach((item) => {
    list += `
                <tr>
				<td>${item.fullname}</td>
                <td>${item.email}</td>
                <td>${item.telephone_number}</td>
                <td>${item.date_of_birth}</td>
                <td>staff</td>
                </tr>
                `});
  list += `
</table>
    <div class="nu">
        <h2>Photo</h2>
        <img src="public/img/staff-avatar.jpg" style="width: 300px ">
    </div>

    <br><br>
    <div class="co">
        <h2>Change profile photo</h2>
        <form>
            <input type="file" name="pic" id="pic" accept="image/gif, image/jpeg" />
        </form>
        <br><br>
        <h2>Teacher available time</h2>
        <table id = "course" class="gridtable">
            <thead>
            <tr>
                <th>Lecture Name</th>
                <th>Teacher Name</th>
                <th>Available Time</th>
                <th>Modify</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<div class="footer">
    Copyright ? Bristol.RainbowGroup
</div>

<script type="text/javascript">


    window.onload = function(){
        var arr = document.getElementsByTagName('a');
        for(var i = 0;i<arr.length;i++){
            arr[i].onclick = function(){
                if ((this.id == '1') || (this.id=='2'))
                {
                    document.getElementById("box1").style.display = 'block' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'none' ;
                }
                else if((this.id == '3') || (this.id=='4'))
                {
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'block' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'none' ;
                }
                else if((this.id == '5') || (this.id=='6')){
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'block' ;
                    document.getElementById("box4").style.display = 'none' ;
                }else{
                    document.getElementById("box1").style.display = 'none' ;
                    document.getElementById("box2").style.display = 'none' ;
                    document.getElementById("box3").style.display = 'none' ;
                    document.getElementById("box4").style.display = 'block' ;
                }

                if(this.className == 'btn1' ){
                    this.className = 'btn2';
                    var name = this.id;
                    var btn = document.getElementsByClassName('btn2');
                    for(var j=0;j<btn.length;j++){
                        if(btn[j].id!=name){
                            btn[j].className = 'btn1';
                        }
                    }
                }
            }
        }
    }

</script>
<script>
    window.onload = function () {
        var oTab = document.getElementById('course');
        var url = "/data/information.json";
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            if (request.status === 200) {
                var oTbody = oTab.tBodies[0];
                var data = JSON.parse(request.responseText);
                for (var index = 0; index < data.length; index++) {
                        var oTr = document.createElement('tr');
                        oTbody.appendChild(oTr);

                        var oTd = document.createElement('td');
                        oTd.innerHTML = data[index].text;
                        oTr.appendChild(oTd);

                        oTd = document.createElement('td');
                        oTd.innerHTML = data[index].teacher;
                        oTr.appendChild(oTd);

                        oTd = document.createElement('td');
                        oTd.innerHTML = data[index].time;
                        oTr.appendChild(oTd);

                        oTd = document.createElement('td');
                        oTr.appendChild(oTd);

                        var oA = document.createElement('a');
                        oA.innerHTML = "delete";
                        oA.href = "javascript:;";
                        oTd.appendChild(oA);
                        oA.onclick = function () {
                            oTbody.removeChild(this.parentNode.parentNode);
                        }
                }
            }
        }
    }
</script>
</body>
</html>
                `;
  res.end(list);
  res.end("ok")
})

// router.get('/staff-settings', function (req, res, next) {
//   res.render('staff-settings.html')
// })
router.get('/staff-timetable', function (req, res, next) {
  res.render('staff-timetable.html')
})

router.get('/logout', function (req, res) {
  req.session.user = null

  res.redirect('/login')
})


module.exports = router
