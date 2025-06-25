const { spawn } = require('child_process');
const http = require('http');

const SERVER_URL = 'http://localhost:3000'; // change if needed
const TIMEOUT = 20000; // 20s timeout for server to start

function waitForServer(url, timeout) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) return resolve();
        retry();
      }).on('error', retry);
    };

    const retry = () => {
      if (Date.now() - start > timeout) return reject(new Error('Timeout waiting for server'));
      setTimeout(check, 500);
    };

    check();
  });
}

(async () => {
  console.log('[INFO] Starting dev server...');
  const devServer = spawn('npx', ['nyc', '--reporter=html', 'next', 'dev'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env,
        NODE_ENV: 'development',
        INSTRUMENT: 'true'
    },
  });

  // Forward dev server logs to console
  devServer.stdout.on('data', (data) => process.stdout.write(data.toString()));
  devServer.stderr.on('data', (data) => process.stderr.write(data.toString()));

  try {
    await waitForServer(SERVER_URL, TIMEOUT);
    console.log('[INFO] Server is ready. Running Playwright tests...');

    const tests = spawn('npx', ['playwright', 'test'], { stdio: 'inherit' });

    tests.on('exit', (code) => {
      console.log('[INFO] Tests complete. Killing dev server...');
      devServer.kill('SIGTERM');
      process.exit(code);
    });

  } catch (err) {
    console.error('[ERROR]', err.message);
    devServer.kill('SIGTERM');
    process.exit(1);
  }
})();
