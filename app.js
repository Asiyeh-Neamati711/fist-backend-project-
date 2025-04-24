const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// تنظیم EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// تنظیم محل ذخیره‌سازی فایل‌ها با Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // اسم جدید: زمان + پسوند
  }
});

const upload = multer({ storage: storage });

// صفحه اصلی
app.get('/', (req, res) => {
  res.render('index');
});

// فرم آپلود
app.get('/upload', (req, res) => {
  res.render('upload');
});

// ارسال فایل
app.post('/upload', upload.single('image'), (req, res) => {
  res.render('index', { image: `/uploads/${req.file.filename}` });
});

// اجرا روی پورت 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

