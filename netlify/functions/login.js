const mongoose = require('mongoose');

// MongoDB bağlantısı
const mongoUri = 'mongodb+srv://jeryandt23om123:guxK0JUTAusV3rB8@cluster0.xmgor.mongodb.net/';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model('User', UserSchema);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Kullanıcı adı ve şifre gerekli!' }),
      };
    }

    const user = new User({ username, password });
    await user.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Veri başarıyla kaydedildi!' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Sunucu hatası.' }),
    };
  }
};
