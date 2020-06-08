# Project Name: Booking Class System

## Author ##
|                               Ruoyan CHi                                  |                               Huiyu Ran                                  |                               Yijing Zhu                               |
| :---------------------------------------------------------------------: | :--------------------------------------------------------------------: | :------------------------------------------------------------------: |
|                                 ix19849                                 |                                pj19174                                 |                               gh19117                                |
|     login and display users' information     |     insert and delete data     |     show data     |

## Introduction ##
The system is designed for classes such as gyms, toastmasters and interest classes that need to be booked in advance. And it has three interfaces for student,teacher and staff. For Students, they can browse the available class hours, get information about the course’s teachers, and book classes for the ones they’re interested in. Meanwhile, the class which booked by the student can be canceled. For Teachers, they can give a brief introduction to themselves and fill in their available time for the staff to adjust and schedule. For the staff, they can schedule, publish, and modify course schedules andinformation.

## Project Schedule ##
We have created two sides for the system including client side and server side. 
### client side ###
Use HTML, CSS and js to display the static wedpage
### server side ###
#### start the server ####
`$ node app.js`

The system can only be used for one student, one teacher and one staff member at a time. During the test, a student, a teacher and a staff member should be registered, and the data will be stored in the database.

For example, using the following information to register, which include Email Address, Password, Full Name, Date of Birth, Phone Number and Status.

|                               harry@student.com                                  |                               severus@teacher.com                                  |                               albus@staff.com                               |
| :---------------------------------------------------------------------: | :--------------------------------------------------------------------: | :------------------------------------------------------------------: |
|                                 harry                                 |                                serverus                                 |                               albus                                |
|     Harry Potter     |     Severus Snape     |     Albus Dumbledore     |
|     31/7/1980     |     9/1/1960     |     1/8/1881     |
|     7851892175     |     7917482487     |     7098472815     |
|     student     |     teacher     |     staff     |

Use Mongodb to store the user information. In addition, these information will be shown in student-information page, teacher-information page and staff-information page.
