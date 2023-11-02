# Create directories
$directories = @(
  'src',
  'src\config',
  'src\middleware',
  'src\api\v1\url',
  'src\api\v1\tags',
  'src\api\v1\visits',
  'src\api\v1\system',
  'src\db\models',
  'src\db\migrations',
  'src\utils',
  'public',
  'public\assets',
  'test\unit',
  'test\integration',
  'test\e2e',
  'docs',
  'scripts'
)

foreach ($dir in $directories) {
  if (-not (Test-Path -Path $dir)) {
    New-Item -ItemType Directory -Path $dir
  }
}

# Create files
$files = @(
  'src\server.ts',
  'src\api\v1\url\url.controller.ts',
  'src\api\v1\url\url.service.ts',
  'src\api\v1\url\url.model.ts',
  'src\api\v1\tags\tags.controller.ts',
  'src\api\v1\tags\tags.service.ts',
  'src\api\v1\tags\tags.model.ts',
  'src\api\v1\visits\visits.controller.ts',
  'src\api\v1\visits\visits.service.ts',
  'src\api\v1\visits\visits.model.ts',
  'src\api\v1\system\system.controller.ts',
  'src\api\v1\system\system.service.ts',
  'src\utils\errorHandler.ts',
  'src\utils\validators.ts',
  'src\utils\auth.ts',
  'public\404.html',
  'test\unit\placeholder.txt',
  'test\integration\placeholder.txt',
  'test\e2e\placeholder.txt',
  'docs\API.md',
  'docs\DEPLOYMENT.md',
  'README.md',
  'LICENSE',
  '.env',
  'tsconfig.json',
  'ormconfig.json',
  'Dockerfile',
  '.dockerignore',
  '.gitignore',
  'scripts\updateCheck.ts'
)

foreach ($file in $files) {
  if (-not (Test-Path -Path $file)) {
    New-Item -ItemType File -Path $file
  }
}
