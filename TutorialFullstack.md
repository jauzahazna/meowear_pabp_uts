Warning!:Perlu diingat bahwa Vercel tidak dirancang untuk menyimpan file yang diunggah secara permanen. Saat deployment ulang atau scaling terjai, file yang disimpan di sistem bisa hilang. Oleh karena itu, penggunaan layanan penyimpanan pihak ketiga seperti AWS S3, Google Cloud Storage,a tau layanan penyimpanan lain sangat dianjurkan untuk penyimpanan file jangka panjang.

## Cara menjalankan kedua folder server, dan client

- jadi kita pakai cloudinary untuk penyimpanan pihak ketiganya
- menggunakan concurrently => npmjs.com/package/concurrently
- "$ cd eccomerce" => masuk ke folder eccomerce
- "$ npm init -y"
- "$ npm i concurrently"
- "$ cd client" => masuk ke folder client
- "$ npm i axios"
- cari dokumentasi di google "Server Options - Vite"
- Ubah file "client\vite.config.js" dari kode docs bagian server.proxy
- masuk ke concole.cloudinary.com
- "$ cd server", "$ npm i cloudinary"
- "$ cd server", "$ npm i streamifier" => from npmjs.com
- Set up cloudinary di env dan app.js
- atur env di vercel
- commit ke github

## Folder Server

-- Documentasi --

- npmjs.com
- expressjs.com
- mongoosejs.com
- https://docs.midtrans.com/

- $ npm init -y
- $ npm install express
- 1. server/app.js
- 2. server/routes/authRouter.js
- Buat environtment di insomnia dengan nama devecommerce
- Buat request untuk Auth di insomnia/postman
- 3. Buat mongodb
- 4. middlewares/errorMiddleware.js
- 5. models/userModel.js
- 6. middlewares/asyncHandler.js
- "$ npm i jsonwebtoken" => from npmjs.com
- "$ npm i bcryptsjs" => from npmjs.com
- "$ npm i validator" => from npmjs.com
- "$ npm install cookie-parser" => from npmjs.com
- 7. controllers/authController.js
- 8. isi .env: NODE_EVN=development, JWT_SECRET=secret-jwt-saya
- 9. jwt.io untuk melihat token id
- 10. middlewares/authMiddleware.js
- 11. routes/productRouter.js
- 12. controllers/ProductController.js
- 13. Buat request untuk Product di insomnia/postman
- 14. models/productModel.js
- 15. "$ npm install --save multer"=> from npmjs.com , ini untuk upload foto
- 16. utils/uploadFileHandler.js
- 17. public/uploads
- 18. controllers/OrderController.js
      |Fungsinya ada:
      |- buat order
      |-semua order
      |-detail order
      |- order by user auth
- 19. routes/orderRouter.js
- 20. models/orderModels.js
- 21. Baca dokumentasi https://docs.midtrans.com/
- 22. deploy to vercel
      |
      |-"$ npm install express-mongo-sanitize" from npmjs.com
      |-"$ npm i helmet" from npmjs.com for security shield
      |- server/vercel.json
      |- server/.gitignore
      |- Jalankan dibawah:
      git init
      git add .
      git commit -m "first commit"
      git branch -M main
      git remote add origin https://github.com/faiqyr/BE-ecommerce.git
      git push -u origin main
- 23. jika sudah berhasil jalan, Buat environtment di insomnia dengan nama ProdEcommerce
- 24. TUTORIAL PAYMENT GATEWAY DENGAN MIDTRANS
      |- "https://docs.midtrans.com/docs/midtrans-api-libraries-plugins"
      |-1."$ cd server", "$ npm install --save midtrans-client"
      |-2. Coba di bagian sandbox midtrans
      |-3. Buka accesskey dan taruh di env
      |-4. Atur url notification endpoint
      |-5. Fokus di server\OrderController.js

## Folder client

-- Documentasi --

- daisyui.com
- tailwindcss.com
- npmjs.com
- https://reactrouter.com/
- redux-tolkit.js.org

- "$ npm create vite@latest"
- "$ npm install"
- "$ npm install tailwindcss @tailwindcss/vite"
- test tailwind jalan tidaknya di src/app.jsx
- "$ npm i -D daisyui@latest" => from daisyui.com
- Baca dokumentasi daisy UI
- "$ npm i react-router-dom" => from npmjs.com
- "$ npm install react-icons"
- 1. src\page\AboutView.jsx
- 2. src\page\HomeView.jsx
- 3. src\page\ProductView.jsx
- 4. src\page\OrderView.jsx
- 5. src\page\CartView.jsx
- 6. src\page\auth\LoginView.jsx
- 7. src\page\auth\RegisterView.jsx
- 8. src\Layouts\PublicLayout.jsx
- 8. src\components\Header.jsx
- 9. src\components\Nav.jsx
- 10. src\components\NavList.jsx
- 11. src\components\Footer.jsx
- 12. src\api.js
- 13. "Intl.NumberFormat" untuk atur penulisan mata uang
- 14. src\components\CartProduct.jsx
- 15. src\page\DetailProduct.jsx
- 16. kita akan fetch datanya menggunakan react router yang berdasarkan dari endpoint yang kita gunakan => dari docs reactrouter.com
- 17. src\components\Hero.jsx
- 18. src\components\Filter.jsx
- 19. src\components\Form\FormInput.jsx
- 20. src\components\Form\FormSelect.jsx
- 21. src\components\Pagination.jsx
- 22. src\components\FormAuth.jsx
- baca dokumentasi redux-tolkit.js.org
- 23. "$ cd \client", "$ npm install @reduxjs/toolkit react-redux"
- 24. src\features\userSlice.js
- 25. src\store.js
- 26. src\components\Loading.jsx
- 27. "$ cd \client","$ npm install --save react-toastify"
- 28. src\utils\index.jsx
- 29. src\features\cartSlice.js
- 30. src\components\CartList.jsx
- 31. src\components\CartListItems.jsx
- 32. src\components\CartTotal.jsx
- 33. src\page\CheckoutView.jsx
- 34. beralih ke TUTORIAL PAYMENT GATEWAY DENGAN MIDTRANS
- 35. client\.env
- 36. Atur di midtrans
- 37. src\page\ErrorView.jsx
- 38. styling di orderview.jsx
- 39. src\page\CreateProductView.jsx
- 40. src\page\EditProductView.jsx
- 41. src\components\Form\FormTextArea.jsx
- 42. deploy ke vercel dengan ubah url target di vite.config.js