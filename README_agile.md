#Assignment1 
<br>Name: Zhenyu Shao</br>
<br>Student id: 20086425</br>
##Overview
Base on Web API, I developed several test files corresponding to models and routes. The followings are API endpoints and Link to my github.
##API endpoints
<br>GET /member - get all members</br>
<br>GET /member/:email - get a specific member via email</br>
<br>POST /member/signup - member sign up for this platform</br> 
<br>POST /member/login - member login</br>
<br>PUT /member/changePassword/:member - member change his own password</br>
<br>GET /artwork - get all existed artworks</br>
<br>GET /artwork/:id - get a specific artwork via id</br>
<br>POST /artwork - add new artwork</br>
<br>DELETE /artwork/:art_name - delete certain artwork via its name</br>
<br>POST /admin/login - administrator login</br>
<br>GET /admin - get all authorized administrators</br>
<br>GET /admin/:email - get a certain administrator via email</br>
<br>DELETE /:admin/member/:email - authorized administrator delete member</br>
<br></br>
<br></br>
##Test results
###Admin-test
```hiadeMacBook-Pro:AIE hia$ npm test
   
   > aie@0.0.0 test /Users/hia/Desktop/AIE
   > NODE_ENV=test mocha --timeout 20000 test/routes/admin-test.js
   
   
   
     Admin
   Admins inserted successfully.
       POST /admin/login
   (node:74789) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
   running at localhost:3001
   Successfully Connected to [ aie_api ] 
   POST /admin/login 200 193.128 ms - 47
         ✓ should return admin does't exist message (216ms)
   POST /admin/login 200 14.347 ms - 41
         ✓ should return wrong password message
         Login function
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphY2tzaGF3aGlhQGdtYWlsLmNvbSIsImlhdCI6MTU3Mjk1NzU1N30.fTnKZEvaN-qnmeubZiZi0sD6LcVaY9kmz7tRfYNVujI
   POST /admin/login 200 11.369 ms - 175
           ✓ should return message about login successfully
       GET /admin
   [ { _id: 5db31a7b7c213e556143eda9,
       admin_name: 'HIA',
       admin_id: '971116',
       email: 'jackshawhia@gmail.com',
       password: '123456789o' },
     { _id: 5dc16d7507ecdb2426641122,
       admin_name: 'Jane',
       admin_id: '001',
       email: 'admin1@qq.com',
       password:
        '$2a$10$3put9Zc2dGgPTs6koQanYeizZrZjbtiAreXOwhjXSgTSXtmRDw4XC' } ]
   GET /admin 200 19.962 ms - 446
         ✓ should return all admins in an array
       GET /admin/admin1@qq.com
   [ { _id: 5dc16d7507ecdb2426641122,
       admin_name: 'Jane',
       admin_id: '001',
       email: 'admin1@qq.com',
       password:
        '$2a$10$3put9Zc2dGgPTs6koQanYeizZrZjbtiAreXOwhjXSgTSXtmRDw4XC' } ]
   GET /admin/admin1@qq.com 200 11.198 ms - 244
         ✓ should return a admin 
       DELETE /:admin/member/:email
   DELETE /member/10949@qq.com 404 9.244 ms - 41
         ✓ should return unauthorized error
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzI5NTc1NTZ9.WmduaE88NCHhrGnEtd4vfgQWPwnuffQh-Dt5Zfz4fpE
   (node:74789) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
   DELETE /jackshawhia@gmail.com/member/666@qq.com 200 15.562 ms - 53
         ✓ should return member deleted successfully message
   Admins deleted successfully.
   
   (node:74789) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
   
     7 passing (448ms)
```
###Artwork-test
```hiadeMacBook-Pro:AIE hia$ npm test
      
      > aie@0.0.0 test /Users/hia/Desktop/AIE
      > NODE_ENV=test mocha --timeout 20000 test/routes/artwork-test.js
      
      
      
        artwork
       Artworks inserted successfully.
          GET /artwork
      (node:75231) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
      running at localhost:3001
      Successfully Connected to [ aie_api ] 
      [ { view_times: 8,
          _id: 5db3154285f24ace6708cf51,
          art_name: 'Legend',
          author: 'Will',
          description: 'legends never die',
          __v: 0 },
        { view_times: 1,
          _id: 5dc171741bdf3925e0a49bb1,
          art_name: 'Sunshine',
          author: 'Cathy',
          description: 'nothing' } ]
      GET /artwork 200 198.856 ms - 399
            ✓ should return all artworks in an array (220ms)
          GET /artwork/5db304557c213e556143e1f4
      GET /artwork/5db304557c213e556143e1f4 200 8.405 ms - 2
            ✓ should return an artwork 
          DELETE /artwork/:art_name
      (node:75231) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
      DELETE /artwork/Sunshine 200 14.093 ms - 162
            ✓ should return artwork deleted successfully message
      Artworks deleted successfully.
      
      (node:75231) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
      [ { view_times: 8,
          _id: 5db3154285f24ace6708cf51,
          art_name: 'Legend',
          author: 'Will',
          description: 'legends never die',
          __v: 0 } ]
      GET /artwork 200 6.236 ms - 214
      
        3 passing (373ms)
```
###Member-test
```hiadeMacBook-Pro:AIE hia$ npm test
   
   > aie@0.0.0 test /Users/hia/Desktop/AIE
   > NODE_ENV=test mocha --timeout 20000 test/routes/member-test.js
   
   
   
     Member
   Members inserted successfully.
       POST /member/signup
   (node:75643) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
   running at localhost:3001
         Sign Up function
   Successfully Connected to [ aie_api ] 
   POST /member/signup 200 771.767 ms - 277
           ✓ should return message about sign up successfully (795ms)
   POST /member/signup 200 403.233 ms - 78
           ✓ should return message about account already exists (407ms)
   POST /member/signup 200 377.050 ms - 33
           ✓ should return message about wrong email format (380ms)
   POST /member/signup 200 376.138 ms - 68
           ✓ should return message about password length too short (379ms)
   POST /member/signup 200 375.614 ms - 69
           ✓ should return message about password length too long (378ms)
   POST /member/signup 200 375.958 ms - 101
           ✓ should return message about password complexity (378ms)
   POST /member/signup 200 374.899 ms - 57
           ✓ should return message about the password and confirm password should be same (376ms)
       POST /member/login
   POST /member/login 200 14.415 ms - 47
         ✓ should return member does't exist message
   POST /member/login 200 217.559 ms - 41
         ✓ should return wrong password message (219ms)
         Login function
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjY2NkBxcS5jb20iLCJpYXQiOjE1NzI5NTkzNjN9.2_jY0waSMD460M2f-aj5Gfo1yM-PKkPymMMf4K2Tn9s
   POST /member/login 200 210.362 ms - 276
           ✓ should return message about login successfully (213ms)
       PUT /member/changePassword/:member
   (node:75643) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
   PUT /member/changePassword/777@qq.com 200 895.868 ms - 280
         ✓ should return password changed successfully message (898ms)
   PUT /member/changePassword/777@qq.com 200 377.744 ms - 68
         ✓ should return error message about length of password  (380ms)
   PUT /member/changePassword/777@qq.com 200 384.160 ms - 100
         ✓ should return error message about complexity of password  (386ms)
   PUT /member/changePassword/777@qq.com 200 374.225 ms - 57
         ✓ should return error message about the same of password and confirm password (376ms)
       GET /member
   [ { _id: 5db325fa7c213e556143f605,
       member_id: '888',
       member_name: 'Tracer',
       username: 'GEE',
       phone: '123414124',
       email: '13513143@qq.com',
       password: '123456789o',
       confirmpwd: '123456789o' },
     { _id: 5db44d8ad217b51089c15ec0,
       email: '10949@qq.com',
       password:
        '$2a$10$MPHwBNj/Fz6zbcUOvT5Pte5D2SI.fs7/SZVl29l6hCUVYs5AgbDUe',
       confirmpwd:
        '$2a$10$uP4JVWSlZsE9UrFu7w5dXOIMQf17s6h9LSr9rr75YIRN.UQQRSTZy',
       __v: 0 },
     { _id: 5db455ab53a76302103dcfbf,
       member_name: 'kasdr',
       email: '123646789@qq.com',
       password:
        '$2a$10$lBKmFCoM1b.rZe1.31Iy3.fd39zJ5yYOfc4yZz5uHCoOeviQRjzW2',
       confirmpwd:
        '$2a$10$Dh3/fhHgNZlzsW26lTIBmeX4hfBCTWTLduhL8rfJKTdHwKVtCxA0S',
       __v: 0 },
     { _id: 5db4676c25f850090fa45ea1,
       member_name: 'Kris',
       email: '987654321@qq.com',
       password:
        '$2a$10$MjieNAW/pg9YI.VpQY9xoOxPulY9jWZBHso4P.Es9a0xTNF9TGZ62',
       confirmpwd:
        '$2a$10$ioQejHjeyx0VPupmSi9K/uECRTXuY2nEYTX14EQMJn6.IjqSWB5z.',
       __v: 0 },
     { _id: 5db4bf9d4a4ca6309d6ea936,
       member_name: 'HIA',
       email: '1238494@qq.com',
       password:
        '$2a$10$y2EHgRRsS/GLPi5mox3wUOxMCIkEFCJfCdwSNc.YoprSZYNKti.6u',
       confirmpwd:
        '$2a$10$SYdo1zMuAKybeodzWHeoh.lB4BOU.3zK6aNO9yd6msFWGJT9kRB5S',
       __v: 0 },
     { _id: 5db5a7c18266b408960e30b8,
       member_name: 'GEE',
       email: '12382354@qq.com',
       password:
        '$2a$10$Ry3HgUBDGtDRUe6bTKMqT.MHJWfEUj3Fa9UtQQca9RXJ8XfajBvzO',
       confirmpwd:
        '$2a$10$cZoAWoUfGORUwGuzFf1M/uaJyxoohWWGXrWTXuyXDfmxW.ky/ESdW',
       __v: 0 },
     { _id: 5db5b7198266b408960e30bb,
       member_name: 'GEED',
       email: '123823545@qq.com',
       password:
        '$2a$10$rIkUm4vTtiG.g8PJ6S.rTuIXMKt7OwUiRBFA9iyoDiR5F2PDiU12O',
       confirmpwd:
        '$2a$10$azTy3I9ISlhTbuFWw0bLsebh7FSwqRPoANOlZhPUFiVhrKHtCxAky',
       __v: 0 },
     { _id: 5db5b9b0b5ae390fb5a695f6,
       member_name: 'GE',
       email: '1238235455@qq.com',
       password:
        '$2a$10$QepQUgUoEIL6wsD/B4YjkeqqDPHG9FwSIQBXCUojYYUSXmDBteYQK',
       confirmpwd:
        '$2a$10$rqGbSMhiB6p862nWwicBQurjGJS00zWBU/uWLYg6AhtlWkpR8ugpW',
       __v: 0 },
     { _id: 5dc0e6e53f70010414833028,
       member_name: 'Jack',
       email: '222@qq.com',
       password:
        '$2a$10$S8s98TI5FxXmhvQVK9TA0eFLuTo3Oyz6bZZfcwe57FrWqEagi1.bC',
       confirmpwd:
        '$2a$10$BZVxWUsPqoudnTO3fuAYG.NfCcbyzFtZgW.oIJxcm2/IFiGzRbAoS',
       __v: 0 },
     { _id: 5dc17480d7a0fc277c6767f6,
       member_name: 'Jack',
       email: '666@qq.com',
       password:
        '$2a$10$5EXxvpDzxTy9KcvBdDin3up6VcIBqIj4Re/jQsLzqXoQ6Rsr17Aiy',
       confirmpwd:
        '$2a$10$5EXxvpDzxTy9KcvBdDin3up6VcIBqIj4Re/jQsLzqXoQ6Rsr17Aiy' },
     { _id: 5dc17480d7a0fc277c6767f7,
       member_name: 'Yvette',
       email: '777@qq.com',
       password:
        '$2a$10$ffbdlvvXJEz0NeIF0nzYDuR2VLN/o.OUbxNYqDemmNoeRcZ6T63ia',
       confirmpwd:
        '$2a$10$45h2DtVhPPNNbBCQ6G7Ae.PUaNku5nS4M.HASVWrsfet.YgRDEnWy' },
     { _id: 5dc1747fd7a0fc277c6767f5,
       member_name: 'Jack',
       email: '123@qq.com',
       password:
        '$2a$10$hUjViAsbt1rAl1.mBO6A.OFHLo7L6JsbQ.75MY5t7PPIGrWGNlxX6',
       confirmpwd:
        '$2a$10$csDoSojvbUeh7wXP7ami9OgOW3WQLv/qlrs3.trNWEhQXq3Sorb42',
       __v: 0 } ]
   GET /member 200 151.641 ms - 3770
         ✓ should return all members in an array (154ms)
       GET /member/666@qq.com
   GET /member/666@qq.com 200 32.649 ms - 301
         ✓ should return a member 
   Members deleted successfully.
   
   (node:75643) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
   
     16 passing (6s)
```
##Github Link
[AIE](https://github.com/jack-shaw/AIE)





