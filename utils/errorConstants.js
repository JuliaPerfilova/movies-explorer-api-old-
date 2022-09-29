module.exports.ERROR_CODES = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports.ERROR_MESSAGES = {
  BAD_REQUEST: 'Ваш браузер отправил запрос, который этот сервер не смог понять',
  WRONG_URL: 'Введен некорректный URL',
  WRONG_EMAIL: 'Введен некорректный Email',
  WRONG_INPUT_DATA: 'Введены некорректные данные',

  CONFLICT: 'Этот ресурс уже существует в базе данных',
  EMAIL_IN_USE: 'Email уже используется',

  FORBIDDEN: 'Отказано в доступе',

  NOT_FOUND: 'Ресурс с таким id не найден',

  UNAUTHORIZED: 'Требуется авторизация',
  WRONG_USER_DATA: 'Неправильный логин или пароль',

  INTERNAL_SERVER_ERROR: 'Неизвестная ошибка',
};
