<#
.SYNOPSIS
  Tạo user/database brainbook (khớp .env), chạy prisma migrate deploy + db seed.

.DESCRIPTION
  Cần mật khẩu tài khoản PostgreSQL superuser (thường là postgres) mà bạn đã đặt lúc cài đặt.

.EXAMPLE
  .\scripts\setup-database.ps1 -PostgresPassword 'MatKhauCuaBan'
#>
param(
  [Parameter(Mandatory = $true, HelpMessage = "Mật khẩu user postgres (superuser)")]
  [string]$PostgresPassword,

  [string]$PgBin = "",
  [string]$PgHost = "localhost",
  [int]$Port = 5432
)

$ErrorActionPreference = "Stop"
$env:PGPASSWORD = $PostgresPassword

function Find-Psql {
  if ($PgBin -and (Test-Path (Join-Path $PgBin "psql.exe"))) {
    return Join-Path $PgBin "psql.exe"
  }
  $roots = @("C:\Program Files\PostgreSQL", "C:\Program Files (x86)\PostgreSQL")
  foreach ($root in $roots) {
    if (-not (Test-Path $root)) { continue }
    Get-ChildItem $root -Directory -ErrorAction SilentlyContinue | Sort-Object Name -Descending | ForEach-Object {
      $c = Join-Path $_.FullName "bin\psql.exe"
      if (Test-Path $c) { return $c }
    }
  }
  return $null
}

$psql = Find-Psql
if (-not $psql) {
  Write-Error "Không tìm thấy psql.exe. Cài PostgreSQL hoặc truyền -PgBin 'C:\Program Files\PostgreSQL\18\bin'"
}
Write-Host "Dùng: $psql" -ForegroundColor DarkGray

$sql = Join-Path $PSScriptRoot "init-brainbook-db.sql"
& $psql -U postgres -h $PgHost -p $Port -d postgres -v ON_ERROR_STOP=1 -f $sql
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$backendRoot = Split-Path $PSScriptRoot -Parent
Push-Location $backendRoot
try {
  npx prisma migrate deploy
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  npx prisma db seed
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  Write-Host ""
  Write-Host "Xong. Chạy API: npm run start:dev" -ForegroundColor Green
}
finally {
  Pop-Location
  Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
}
