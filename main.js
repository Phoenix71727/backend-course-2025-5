//імпорт модулів
const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 
const { program } = require('commander'); 

// аргументи командного рядка
program
  .requiredOption('-h, --host <type>', 'Адреса сервера')
  .requiredOption('-p, --port <type>', 'Порт сервера')
  .requiredOption('-c, --cache <type>', 'Шлях до папки кешу')
  .parse(process.argv); 

const options = program.opts();
const host = options.host;
const port = parseInt(options.port, 10);
const cacheDir = path.resolve(options.cache); //повний шлях до папки кешу

// створення папки кешу, якщо її не існує
if (!fs.existsSync(cacheDir)) {
  console.log(`Створюю папку кешу за шляхом: ${cacheDir}`);
  fs.mkdirSync(cacheDir, { recursive: true });
}

// створення веб-сервера
const server = http.createServer((req, res) => {
  // в майбутньому
  console.log(`Отримано запит: ${req.method} ${req.url}`);
  res.statusCode = 501;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Логіка проксі-сервера ще не реалізована.');
});

// запуск
server.listen(port, host, () => {
  console.log(`Проксі-сервер запущено за адресою http://${host}:${port}`);
  console.log(`Кеш зберігається у папці: ${cacheDir}`);
});
